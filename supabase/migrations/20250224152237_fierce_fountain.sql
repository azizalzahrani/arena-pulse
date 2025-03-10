/*
  # Fix Table Permissions

  1. Changes
    - Drop existing RLS policies
    - Create new policies allowing authenticated users to access tables
    - Grant necessary permissions to authenticated users
  
  2. Security
    - Enable RLS on all tables
    - Create policies for read access
    - Create policies for admin write access
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Allow read access to real_time_metrics" ON real_time_metrics;
DROP POLICY IF EXISTS "Allow read access to zone_config" ON zone_config;
DROP POLICY IF EXISTS "Allow read access to alerts" ON alerts;
DROP POLICY IF EXISTS "Allow read access to traffic_flow" ON traffic_flow;

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
GRANT SELECT ON real_time_metrics TO authenticated;
GRANT SELECT ON zone_config TO authenticated;
GRANT SELECT ON alerts TO authenticated;
GRANT SELECT ON traffic_flow TO authenticated;

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