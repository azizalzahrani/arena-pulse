/*
  # Fix Database Permissions and Tables

  1. Changes
    - Grant schema permissions first
    - Create tables with proper ownership
    - Set up RLS and policies
    - Insert sample data
  
  2. Security
    - Enable RLS on all tables
    - Grant explicit permissions to authenticated users
    - Create read-only policies for authenticated users
*/

-- First, ensure schema permissions
GRANT USAGE ON SCHEMA public TO postgres, anon, authenticated, service_role;

-- Create tables if they don't exist
CREATE TABLE IF NOT EXISTS real_time_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  zone_id TEXT NOT NULL,
  timestamp TIMESTAMPTZ NOT NULL DEFAULT now(),
  occupancy INTEGER NOT NULL CHECK (occupancy >= 0),
  revenue DECIMAL(10,2) NOT NULL DEFAULT 0,
  dwell_time INTEGER,
  temperature DECIMAL(4,1),
  humidity INTEGER CHECK (humidity BETWEEN 0 AND 100),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS zone_config (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  zone_id TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  capacity INTEGER NOT NULL CHECK (capacity > 0),
  warning_threshold INTEGER NOT NULL CHECK (warning_threshold BETWEEN 0 AND 100),
  critical_threshold INTEGER NOT NULL CHECK (critical_threshold BETWEEN 0 AND 100),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  zone_id TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('occupancy', 'revenue', 'safety', 'system')),
  severity TEXT NOT NULL CHECK (severity IN ('info', 'warning', 'critical')),
  message TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('active', 'acknowledged', 'resolved')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  resolved_at TIMESTAMPTZ,
  resolved_by UUID REFERENCES auth.users(id)
);

CREATE TABLE IF NOT EXISTS traffic_flow (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  from_zone TEXT NOT NULL,
  to_zone TEXT NOT NULL,
  count INTEGER NOT NULL DEFAULT 1,
  timestamp TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Grant table permissions
GRANT ALL ON ALL TABLES IN SCHEMA public TO postgres, service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO postgres, service_role;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;

-- Enable RLS
ALTER TABLE real_time_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE zone_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE traffic_flow ENABLE ROW LEVEL SECURITY;

-- Create simplified policies for read access
CREATE POLICY "Enable read access for all users on real_time_metrics"
ON real_time_metrics FOR SELECT
TO public
USING (true);

CREATE POLICY "Enable read access for all users on zone_config"
ON zone_config FOR SELECT
TO public
USING (true);

CREATE POLICY "Enable read access for all users on alerts"
ON alerts FOR SELECT
TO public
USING (true);

CREATE POLICY "Enable read access for all users on traffic_flow"
ON traffic_flow FOR SELECT
TO public
USING (true);

-- Insert sample data
INSERT INTO zone_config (zone_id, name, capacity, warning_threshold, critical_threshold)
SELECT * FROM (
  VALUES 
    ('main-entrance', 'Main Entrance', 1000, 75, 90),
    ('north-stands', 'North Stands', 15000, 75, 90),
    ('vip-section', 'VIP Section', 500, 70, 85),
    ('concessions', 'Concessions', 800, 80, 95),
    ('south-stands', 'South Stands', 15000, 75, 90)
) AS data(zone_id, name, capacity, warning_threshold, critical_threshold)
WHERE NOT EXISTS (
  SELECT 1 FROM zone_config WHERE zone_id = data.zone_id
);

-- Insert sample metrics data if table is empty
INSERT INTO real_time_metrics (zone_id, occupancy, revenue, temperature, humidity)
SELECT * FROM (
  VALUES 
    ('main-entrance', 603, 0, 24.0, 46),
    ('north-stands', 12755, 150000, 23.9, 48),
    ('vip-section', 200, 50000, 22.6, 42),
    ('concessions', 755, 75000, 24.9, 51),
    ('south-stands', 11537, 125000, 24.3, 45)
) AS data(zone_id, occupancy, revenue, temperature, humidity)
WHERE NOT EXISTS (
  SELECT 1 FROM real_time_metrics LIMIT 1
);

-- Insert sample alerts if table is empty
INSERT INTO alerts (zone_id, type, severity, message, status)
SELECT * FROM (
  VALUES 
    ('north-stands', 'occupancy', 'warning', 'High occupancy detected', 'active'),
    ('concessions', 'occupancy', 'critical', 'Critical density level reached', 'active')
) AS data(zone_id, type, severity, message, status)
WHERE NOT EXISTS (
  SELECT 1 FROM alerts LIMIT 1
);

-- Insert sample traffic flow if table is empty
INSERT INTO traffic_flow (from_zone, to_zone, count)
SELECT * FROM (
  VALUES 
    ('main-entrance', 'north-stands', 150),
    ('main-entrance', 'south-stands', 120),
    ('north-stands', 'concessions', 45),
    ('south-stands', 'concessions', 38)
) AS data(from_zone, to_zone, count)
WHERE NOT EXISTS (
  SELECT 1 FROM traffic_flow LIMIT 1
);