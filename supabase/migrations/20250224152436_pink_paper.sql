/*
  # Fix Tables and Permissions

  1. Changes
    - Create tables if they don't exist
    - Drop and recreate RLS policies
    - Grant necessary permissions
  
  2. Security
    - Enable RLS on all tables
    - Create policies for read access
    - Create policies for admin write access
*/

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

-- Drop existing policies
DROP POLICY IF EXISTS "Enable read access for authenticated users on real_time_metrics" ON real_time_metrics;
DROP POLICY IF EXISTS "Enable read access for authenticated users on zone_config" ON zone_config;
DROP POLICY IF EXISTS "Enable read access for authenticated users on alerts" ON alerts;
DROP POLICY IF EXISTS "Enable read access for authenticated users on traffic_flow" ON traffic_flow;
DROP POLICY IF EXISTS "Enable full access for admin users on real_time_metrics" ON real_time_metrics;
DROP POLICY IF EXISTS "Enable full access for admin users on zone_config" ON zone_config;
DROP POLICY IF EXISTS "Enable full access for admin users on alerts" ON alerts;
DROP POLICY IF EXISTS "Enable full access for admin users on traffic_flow" ON traffic_flow;

-- Enable RLS
ALTER TABLE real_time_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE zone_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE traffic_flow ENABLE ROW LEVEL SECURITY;

-- Create policies for authenticated users
CREATE POLICY "Enable read access for authenticated users on real_time_metrics"
ON real_time_metrics FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Enable read access for authenticated users on zone_config"
ON zone_config FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Enable read access for authenticated users on alerts"
ON alerts FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Enable read access for authenticated users on traffic_flow"
ON traffic_flow FOR SELECT
TO authenticated
USING (true);

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO authenticated;

-- Create admin policies
CREATE POLICY "Enable full access for admin users on real_time_metrics"
ON real_time_metrics FOR ALL
TO authenticated
USING (is_admin());

CREATE POLICY "Enable full access for admin users on zone_config"
ON zone_config FOR ALL
TO authenticated
USING (is_admin());

CREATE POLICY "Enable full access for admin users on alerts"
ON alerts FOR ALL
TO authenticated
USING (is_admin());

CREATE POLICY "Enable full access for admin users on traffic_flow"
ON traffic_flow FOR ALL
TO authenticated
USING (is_admin());

-- Insert sample data for zone_config if empty
INSERT INTO zone_config (zone_id, name, capacity, warning_threshold, critical_threshold)
SELECT 'main-entrance', 'Main Entrance', 1000, 75, 90
WHERE NOT EXISTS (SELECT 1 FROM zone_config WHERE zone_id = 'main-entrance');

INSERT INTO zone_config (zone_id, name, capacity, warning_threshold, critical_threshold)
SELECT 'north-stands', 'North Stands', 15000, 75, 90
WHERE NOT EXISTS (SELECT 1 FROM zone_config WHERE zone_id = 'north-stands');

INSERT INTO zone_config (zone_id, name, capacity, warning_threshold, critical_threshold)
SELECT 'vip-section', 'VIP Section', 500, 70, 85
WHERE NOT EXISTS (SELECT 1 FROM zone_config WHERE zone_id = 'vip-section');

INSERT INTO zone_config (zone_id, name, capacity, warning_threshold, critical_threshold)
SELECT 'concessions', 'Concessions', 800, 80, 95
WHERE NOT EXISTS (SELECT 1 FROM zone_config WHERE zone_id = 'concessions');

INSERT INTO zone_config (zone_id, name, capacity, warning_threshold, critical_threshold)
SELECT 'south-stands', 'South Stands', 15000, 75, 90
WHERE NOT EXISTS (SELECT 1 FROM zone_config WHERE zone_id = 'south-stands');