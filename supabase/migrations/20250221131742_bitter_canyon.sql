-- Enable RLS on all tables
ALTER TABLE real_time_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE zone_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE traffic_flow ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow read access to real-time metrics" ON real_time_metrics;
DROP POLICY IF EXISTS "Allow read access to zone config" ON zone_config;
DROP POLICY IF EXISTS "Allow read access to alerts" ON alerts;
DROP POLICY IF EXISTS "Allow read access to traffic flow" ON traffic_flow;

-- Create new policies that allow authenticated users to read data
CREATE POLICY "Allow read access to real-time metrics"
  ON real_time_metrics
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow read access to zone config"
  ON zone_config
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow read access to alerts"
  ON alerts
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow read access to traffic flow"
  ON traffic_flow
  FOR SELECT
  TO authenticated
  USING (true);

-- Grant necessary permissions to authenticated users
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT SELECT ON real_time_metrics TO authenticated;
GRANT SELECT ON zone_config TO authenticated;
GRANT SELECT ON alerts TO authenticated;
GRANT SELECT ON traffic_flow TO authenticated;

-- Create admin policies for full access
CREATE POLICY "Allow admin full access to real-time metrics"
  ON real_time_metrics
  FOR ALL
  TO authenticated
  USING (is_admin());

CREATE POLICY "Allow admin full access to zone config"
  ON zone_config
  FOR ALL
  TO authenticated
  USING (is_admin());

CREATE POLICY "Allow admin full access to alerts"
  ON alerts
  FOR ALL
  TO authenticated
  USING (is_admin());

CREATE POLICY "Allow admin full access to traffic flow"
  ON traffic_flow
  FOR ALL
  TO authenticated
  USING (is_admin());