import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import { Database } from '../lib/database.types';

type Stadium = Database['public']['Tables']['stadiums']['Row'];
type StadiumZone = Database['public']['Tables']['stadium_zones']['Row'];
type StadiumMetrics = Database['public']['Tables']['stadium_metrics']['Row'];
type StadiumEvent = Database['public']['Tables']['stadium_events']['Row'];

interface StadiumState {
  stadiums: Stadium[];
  selectedStadium: Stadium | null;
  zones: StadiumZone[];
  metrics: Record<string, StadiumMetrics>;
  events: StadiumEvent[];
  isLoading: boolean;
  error: string | null;
  fetchStadiums: () => Promise<void>;
  selectStadium: (stadiumId: string) => Promise<void>;
  fetchZones: (stadiumId: string) => Promise<void>;
  fetchMetrics: (zoneIds: string[]) => Promise<void>;
  fetchEvents: (stadiumId: string) => Promise<void>;
}

export const useStadiumStore = create<StadiumState>((set, get) => ({
  stadiums: [],
  selectedStadium: null,
  zones: [],
  metrics: {},
  events: [],
  isLoading: false,
  error: null,

  fetchStadiums: async () => {
    try {
      set({ isLoading: true, error: null });
      
      const { data, error } = await supabase
        .from('stadiums')
        .select('*')
        .order('name');

      if (error) throw error;

      set({ stadiums: data || [] });
    } catch (error) {
      console.error('Error fetching stadiums:', error);
      set({ error: error instanceof Error ? error.message : 'Failed to fetch stadiums' });
    } finally {
      set({ isLoading: false });
    }
  },

  selectStadium: async (stadiumId: string) => {
    try {
      set({ isLoading: true, error: null });
      
      const { data, error } = await supabase
        .from('stadiums')
        .select('*')
        .eq('id', stadiumId)
        .single();

      if (error) throw error;

      set({ selectedStadium: data });
      await get().fetchZones(stadiumId);
      await get().fetchEvents(stadiumId);
    } catch (error) {
      console.error('Error selecting stadium:', error);
      set({ error: error instanceof Error ? error.message : 'Failed to select stadium' });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchZones: async (stadiumId: string) => {
    try {
      set({ isLoading: true, error: null });
      
      const { data, error } = await supabase
        .from('stadium_zones')
        .select('*')
        .eq('stadium_id', stadiumId)
        .order('name');

      if (error) throw error;

      set({ zones: data || [] });
      
      // Start fetching metrics for all zones
      if (data?.length) {
        await get().fetchMetrics(data.map(zone => zone.id));
      }
    } catch (error) {
      console.error('Error fetching zones:', error);
      set({ error: error instanceof Error ? error.message : 'Failed to fetch zones' });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchMetrics: async (zoneIds: string[]) => {
    try {
      set({ isLoading: true, error: null });
      
      const { data, error } = await supabase
        .from('stadium_metrics')
        .select('*')
        .in('zone_id', zoneIds)
        .order('timestamp', { ascending: false })
        .limit(1);

      if (error) throw error;

      const metricsMap = (data || []).reduce((acc, metric) => {
        acc[metric.zone_id] = metric;
        return acc;
      }, {} as Record<string, StadiumMetrics>);

      set({ metrics: metricsMap });
    } catch (error) {
      console.error('Error fetching metrics:', error);
      set({ error: error instanceof Error ? error.message : 'Failed to fetch metrics' });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchEvents: async (stadiumId: string) => {
    try {
      set({ isLoading: true, error: null });
      
      const { data, error } = await supabase
        .from('stadium_events')
        .select('*')
        .eq('stadium_id', stadiumId)
        .gte('end_time', new Date().toISOString())
        .order('start_time');

      if (error) throw error;

      set({ events: data || [] });
    } catch (error) {
      console.error('Error fetching events:', error);
      set({ error: error instanceof Error ? error.message : 'Failed to fetch events' });
    } finally {
      set({ isLoading: false });
    }
  }
}));

// Set up real-time subscriptions
supabase
  .channel('stadium_metrics')
  .on(
    'postgres_changes',
    {
      event: '*',
      schema: 'public',
      table: 'stadium_metrics'
    },
    async (payload) => {
      const { zones } = useStadiumStore.getState();
      if (zones.length) {
        await useStadiumStore.getState().fetchMetrics(zones.map(zone => zone.id));
      }
    }
  )
  .subscribe();

// Initialize data
if (typeof window !== 'undefined') {
  useStadiumStore.getState().fetchStadiums().catch(console.error);
}