import { create } from 'zustand';
import { supabase, checkSupabaseConnection } from '../lib/supabase';
import { Database } from '../lib/database.types';

type RealTimeMetrics = Database['public']['Tables']['real_time_metrics']['Row'];
type ZoneConfig = Database['public']['Tables']['zone_config']['Row'];
type Alert = Database['public']['Tables']['alerts']['Row'];
type TrafficFlow = Database['public']['Tables']['traffic_flow']['Row'];

interface AnalyticsState {
  metrics: {
    [zoneId: string]: RealTimeMetrics;
  };
  zoneConfigs: {
    [zoneId: string]: ZoneConfig;
  };
  alerts: Alert[];
  trafficFlow: TrafficFlow[];
  isLoading: boolean;
  error: string | null;
  fetchMetrics: () => Promise<void>;
  fetchZoneConfigs: () => Promise<void>;
  fetchAlerts: () => Promise<void>;
  fetchTrafficFlow: () => Promise<void>;
  updateZoneConfig: (zoneId: string, config: Partial<ZoneConfig>) => Promise<void>;
  resolveAlert: (alertId: string) => Promise<void>;
}

export const useAnalyticsStore = create<AnalyticsState>((set, get) => ({
  metrics: {},
  zoneConfigs: {},
  alerts: [],
  trafficFlow: [],
  isLoading: false,
  error: null,

  fetchMetrics: async () => {
    try {
      set({ isLoading: true, error: null });
      
      const { data, error } = await supabase
        .from('real_time_metrics')
        .select('*')
        .order('timestamp', { ascending: false })
        .limit(100);

      if (error) throw error;

      const metricsMap = (data || []).reduce((acc, metric) => {
        acc[metric.zone_id] = metric;
        return acc;
      }, {} as { [key: string]: RealTimeMetrics });

      set({ metrics: metricsMap });
    } catch (error) {
      console.error('Error fetching metrics:', error);
      set({ error: error instanceof Error ? error.message : 'Failed to fetch metrics' });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchZoneConfigs: async () => {
    try {
      set({ isLoading: true, error: null });
      
      // Check connection first
      const isConnected = await checkSupabaseConnection();
      if (!isConnected) {
        throw new Error('Unable to connect to Supabase');
      }
      
      const { data, error } = await supabase
        .from('zone_config')
        .select('*');

      if (error) {
        console.error('Supabase query error:', error);
        throw error;
      }

      const configsMap = (data || []).reduce((acc, config) => {
        acc[config.zone_id] = config;
        return acc;
      }, {} as { [key: string]: ZoneConfig });

      set({ zoneConfigs: configsMap });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch zone configs';
      console.error('Error fetching zone configs:', errorMessage);
      set({ error: errorMessage });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchAlerts: async () => {
    try {
      set({ isLoading: true, error: null });
      
      const { data, error } = await supabase
        .from('alerts')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) throw error;

      set({ alerts: data || [] });
    } catch (error) {
      console.error('Error fetching alerts:', error);
      set({ error: error instanceof Error ? error.message : 'Failed to fetch alerts' });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchTrafficFlow: async () => {
    try {
      set({ isLoading: true, error: null });
      
      const { data, error } = await supabase
        .from('traffic_flow')
        .select('*')
        .order('timestamp', { ascending: false })
        .limit(100);

      if (error) throw error;

      set({ trafficFlow: data || [] });
    } catch (error) {
      console.error('Error fetching traffic flow:', error);
      set({ error: error instanceof Error ? error.message : 'Failed to fetch traffic flow' });
    } finally {
      set({ isLoading: false });
    }
  },

  updateZoneConfig: async (zoneId: string, config: Partial<ZoneConfig>) => {
    try {
      set({ isLoading: true, error: null });
      
      const { data, error } = await supabase
        .from('zone_config')
        .update(config)
        .eq('zone_id', zoneId)
        .select()
        .single();

      if (error) throw error;

      set(state => ({
        zoneConfigs: {
          ...state.zoneConfigs,
          [zoneId]: { ...state.zoneConfigs[zoneId], ...data }
        }
      }));
    } catch (error) {
      console.error('Error updating zone config:', error);
      set({ error: error instanceof Error ? error.message : 'Failed to update zone config' });
    } finally {
      set({ isLoading: false });
    }
  },

  resolveAlert: async (alertId: string) => {
    try {
      set({ isLoading: true, error: null });
      
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { error } = await supabase
        .from('alerts')
        .update({
          status: 'resolved',
          resolved_at: new Date().toISOString(),
          resolved_by: user.id
        })
        .eq('id', alertId);

      if (error) throw error;

      // Refresh alerts after resolving
      await get().fetchAlerts();
    } catch (error) {
      console.error('Error resolving alert:', error);
      set({ error: error instanceof Error ? error.message : 'Failed to resolve alert' });
    } finally {
      set({ isLoading: false });
    }
  }
}));

// Set up real-time subscriptions
supabase
  .channel('analytics_changes')
  .on(
    'postgres_changes',
    {
      event: '*',
      schema: 'public',
      table: 'real_time_metrics'
    },
    () => {
      useAnalyticsStore.getState().fetchMetrics();
    }
  )
  .on(
    'postgres_changes',
    {
      event: '*',
      schema: 'public',
      table: 'alerts'
    },
    () => {
      useAnalyticsStore.getState().fetchAlerts();
    }
  )
  .subscribe();

// Initialize data
if (typeof window !== 'undefined') {
  Promise.all([
    useAnalyticsStore.getState().fetchMetrics(),
    useAnalyticsStore.getState().fetchZoneConfigs(),
    useAnalyticsStore.getState().fetchAlerts(),
    useAnalyticsStore.getState().fetchTrafficFlow()
  ]).catch(console.error);
}