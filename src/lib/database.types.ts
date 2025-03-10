export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      stadiums: {
        Row: {
          id: string
          name: string
          city: string
          total_capacity: number
          parking_capacity: number
          coordinates: Json
          amenities: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          city: string
          total_capacity: number
          parking_capacity: number
          coordinates: Json
          amenities: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          city?: string
          total_capacity?: number
          parking_capacity?: number
          coordinates?: Json
          amenities?: Json
          created_at?: string
          updated_at?: string
        }
      }
      stadium_zones: {
        Row: {
          id: string
          stadium_id: string
          name: string
          type: string
          capacity: number
          coordinates: Json
          warning_threshold: number
          critical_threshold: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          stadium_id: string
          name: string
          type: string
          capacity: number
          coordinates: Json
          warning_threshold?: number
          critical_threshold?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          stadium_id?: string
          name?: string
          type?: string
          capacity?: number
          coordinates?: Json
          warning_threshold?: number
          critical_threshold?: number
          created_at?: string
          updated_at?: string
        }
      }
      stadium_metrics: {
        Row: {
          id: string
          zone_id: string
          timestamp: string
          current_occupancy: number
          entry_rate: number
          exit_rate: number
          queue_length: number
          temperature: number | null
          humidity: number | null
          emergency_score: number | null
          social_distance_score: number | null
          created_at: string
        }
        Insert: {
          id?: string
          zone_id: string
          timestamp?: string
          current_occupancy: number
          entry_rate: number
          exit_rate: number
          queue_length: number
          temperature?: number | null
          humidity?: number | null
          emergency_score?: number | null
          social_distance_score?: number | null
          created_at?: string
        }
        Update: {
          id?: string
          zone_id?: string
          timestamp?: string
          current_occupancy?: number
          entry_rate?: number
          exit_rate?: number
          queue_length?: number
          temperature?: number | null
          humidity?: number | null
          emergency_score?: number | null
          social_distance_score?: number | null
          created_at?: string
        }
      }
      stadium_events: {
        Row: {
          id: string
          stadium_id: string
          name: string
          type: string
          start_time: string
          end_time: string
          expected_attendance: number
          weather_conditions: Json | null
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          stadium_id: string
          name: string
          type: string
          start_time: string
          end_time: string
          expected_attendance: number
          weather_conditions?: Json | null
          status: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          stadium_id?: string
          name?: string
          type?: string
          start_time?: string
          end_time?: string
          expected_attendance?: number
          weather_conditions?: Json | null
          status?: string
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}