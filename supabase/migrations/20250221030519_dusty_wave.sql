-- Create analytics schema
CREATE SCHEMA IF NOT EXISTS analytics;

-- Create real-time metrics table
CREATE TABLE IF NOT EXISTS analytics.real_time_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  zone_id TEXT NOT NULL,
  timestamp TIMESTAMPTZ NOT NULL DEFAULT now(),
  occupancy INTEGER NOT NULL CHECK (occupancy >= 0),
  revenue DECIMAL(10,2) NOT NULL DEFAULT 0,
  dwell_time INTEGER, -- in minutes
  temperature DECIMAL(4,1),
  humidity INTEGER CHECK (humidity BETWEEN 0 AND 100),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create zone configuration table
CREATE TABLE IF NOT EXISTS analytics.zone_config (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  zone_id TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  capacity INTEGER NOT NULL CHECK (capacity > 0),
  warning_threshold INTEGER NOT NULL CHECK (warning_threshold BETWEEN 0 AND 100),
  critical_threshold INTEGER NOT NULL CHECK (critical_threshold BETWEEN 0 AND 100),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create alerts table
CREATE TABLE IF NOT EXISTS analytics.alerts (
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

-- Create traffic flow table
CREATE TABLE IF NOT EXISTS analytics.traffic_flow (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  from_zone TEXT NOT NULL,
  to_zone TEXT NOT NULL,
  count INTEGER NOT NULL DEFAULT 1,
  timestamp TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create indexes
CREATE INDEX idx_real_time_metrics_zone_timestamp ON analytics.real_time_metrics(zone_id, timestamp);
CREATE INDEX idx_alerts_zone_status ON analytics.alerts(zone_id, status);
CREATE INDEX idx_traffic_flow_zones ON analytics.traffic_flow(from_zone, to_zone);

-- Enable RLS
ALTER TABLE analytics.real_time_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics.zone_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics.alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics.traffic_flow ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow read access to real-time metrics"
  ON analytics.real_time_metrics
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow read access to zone config"
  ON analytics.zone_config
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow admins to manage zone config"
  ON analytics.zone_config
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_id = auth.uid()
      AND role = 'admin'
    )
  );

CREATE POLICY "Allow read access to alerts"
  ON analytics.alerts
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow admins to manage alerts"
  ON analytics.alerts
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_id = auth.uid()
      AND role = 'admin'
    )
  );

CREATE POLICY "Allow read access to traffic flow"
  ON analytics.traffic_flow
  FOR SELECT
  TO authenticated
  USING (true);

-- Insert sample zone configurations
INSERT INTO analytics.zone_config (zone_id, name, capacity, warning_threshold, critical_threshold) VALUES
  ('zone-a', 'Main Entrance', 1000, 75, 90),
  ('zone-b', 'Food Court', 500, 80, 95),
  ('zone-c', 'VIP Area', 200, 70, 85),
  ('zone-d', 'General Seating', 5000, 75, 90);

-- Create function to update zone metrics
CREATE OR REPLACE FUNCTION analytics.update_zone_metrics(
  p_zone_id TEXT,
  p_occupancy INTEGER,
  p_revenue DECIMAL,
  p_dwell_time INTEGER DEFAULT NULL,
  p_temperature DECIMAL DEFAULT NULL,
  p_humidity INTEGER DEFAULT NULL
)
RETURNS analytics.real_time_metrics
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_result analytics.real_time_metrics;
BEGIN
  INSERT INTO analytics.real_time_metrics (
    zone_id,
    occupancy,
    revenue,
    dwell_time,
    temperature,
    humidity
  ) VALUES (
    p_zone_id,
    p_occupancy,
    p_revenue,
    p_dwell_time,
    p_temperature,
    p_humidity
  )
  RETURNING * INTO v_result;

  -- Check thresholds and create alerts if needed
  WITH zone_status AS (
    SELECT
      zc.warning_threshold,
      zc.critical_threshold,
      CASE
        WHEN p_occupancy >= zc.critical_threshold THEN 'critical'
        WHEN p_occupancy >= zc.warning_threshold THEN 'warning'
        ELSE NULL
      END as alert_severity
    FROM analytics.zone_config zc
    WHERE zc.zone_id = p_zone_id
  )
  INSERT INTO analytics.alerts (zone_id, type, severity, message, status)
  SELECT
    p_zone_id,
    'occupancy',
    alert_severity,
    CASE
      WHEN alert_severity = 'critical' THEN 'Critical occupancy level reached'
      ELSE 'High occupancy warning'
    END,
    'active'
  FROM zone_status
  WHERE alert_severity IS NOT NULL;

  RETURN v_result;
END;
$$;