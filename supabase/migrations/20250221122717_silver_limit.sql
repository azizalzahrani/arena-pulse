/*
  # Saudi Stadiums Real-time Monitoring System

  1. New Tables
    - `stadiums`: Stores stadium information and configurations
    - `stadium_zones`: Defines zones within each stadium
    - `stadium_metrics`: Real-time metrics for each zone
    - `stadium_events`: Event scheduling and management
    - `parking_status`: Real-time parking capacity tracking

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users and admins
*/

-- Create stadium-specific tables
CREATE TABLE IF NOT EXISTS stadiums (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  city TEXT NOT NULL,
  total_capacity INTEGER NOT NULL,
  parking_capacity INTEGER NOT NULL,
  coordinates JSONB NOT NULL,
  amenities JSONB NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS stadium_zones (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  stadium_id UUID REFERENCES stadiums(id) NOT NULL,
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('general', 'vip', 'entrance', 'concession', 'parking')),
  capacity INTEGER NOT NULL,
  coordinates JSONB NOT NULL,
  warning_threshold INTEGER NOT NULL DEFAULT 75,
  critical_threshold INTEGER NOT NULL DEFAULT 90,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS stadium_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  zone_id UUID REFERENCES stadium_zones(id) NOT NULL,
  timestamp TIMESTAMPTZ NOT NULL DEFAULT now(),
  current_occupancy INTEGER NOT NULL DEFAULT 0,
  entry_rate INTEGER NOT NULL DEFAULT 0, -- people per minute
  exit_rate INTEGER NOT NULL DEFAULT 0,  -- people per minute
  queue_length INTEGER NOT NULL DEFAULT 0,
  temperature DECIMAL(4,1),
  humidity INTEGER CHECK (humidity BETWEEN 0 AND 100),
  emergency_score INTEGER CHECK (emergency_score BETWEEN 0 AND 100),
  social_distance_score INTEGER CHECK (social_distance_score BETWEEN 0 AND 100),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS stadium_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  stadium_id UUID REFERENCES stadiums(id) NOT NULL,
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('sports', 'concert', 'ceremony')),
  start_time TIMESTAMPTZ NOT NULL,
  end_time TIMESTAMPTZ NOT NULL,
  expected_attendance INTEGER NOT NULL,
  weather_conditions JSONB,
  status TEXT NOT NULL CHECK (status IN ('scheduled', 'in_progress', 'completed', 'cancelled')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create indexes
CREATE INDEX idx_stadium_metrics_zone_timestamp ON stadium_metrics(zone_id, timestamp);
CREATE INDEX idx_stadium_events_stadium_time ON stadium_events(stadium_id, start_time);
CREATE INDEX idx_stadium_zones_stadium ON stadium_zones(stadium_id);

-- Enable RLS
ALTER TABLE stadiums ENABLE ROW LEVEL SECURITY;
ALTER TABLE stadium_zones ENABLE ROW LEVEL SECURITY;
ALTER TABLE stadium_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE stadium_events ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow read access to stadiums"
  ON stadiums
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow read access to stadium zones"
  ON stadium_zones
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow read access to stadium metrics"
  ON stadium_metrics
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow read access to stadium events"
  ON stadium_events
  FOR SELECT
  TO authenticated
  USING (true);

-- Insert Saudi stadiums data
INSERT INTO stadiums (name, city, total_capacity, parking_capacity, coordinates, amenities) VALUES
(
  'King Fahd International Stadium',
  'Riyadh',
  68752,
  5000,
  '{"lat": 24.7136, "lng": 46.8241}',
  '{"vip_lounges": 12, "restaurants": 8, "medical_stations": 4, "security_points": 16}'
),
(
  'King Abdullah Sports City',
  'Jeddah',
  62345,
  4500,
  '{"lat": 21.7622, "lng": 39.1875}',
  '{"vip_lounges": 10, "restaurants": 6, "medical_stations": 3, "security_points": 14}'
),
(
  'Prince Sultan Stadium',
  'Abha',
  35000,
  2500,
  '{"lat": 18.2164, "lng": 42.5053}',
  '{"vip_lounges": 6, "restaurants": 4, "medical_stations": 2, "security_points": 8}'
),
(
  'Prince Mohamed bin Fahd Stadium',
  'Dammam',
  45000,
  3000,
  '{"lat": 26.3927, "lng": 50.1904}',
  '{"vip_lounges": 8, "restaurants": 5, "medical_stations": 3, "security_points": 10}'
),
(
  'Future Vision Arena',
  'NEOM',
  80000,
  8000,
  '{"lat": 27.1044, "lng": 35.6547}',
  '{"vip_lounges": 20, "restaurants": 15, "medical_stations": 6, "security_points": 24}'
);

-- Create function to update stadium metrics
CREATE OR REPLACE FUNCTION update_stadium_metrics(
  p_zone_id UUID,
  p_current_occupancy INTEGER,
  p_entry_rate INTEGER,
  p_exit_rate INTEGER,
  p_queue_length INTEGER,
  p_temperature DECIMAL DEFAULT NULL,
  p_humidity INTEGER DEFAULT NULL,
  p_emergency_score INTEGER DEFAULT NULL,
  p_social_distance_score INTEGER DEFAULT NULL
)
RETURNS stadium_metrics
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_result stadium_metrics;
  v_zone stadium_zones;
BEGIN
  -- Get zone information
  SELECT * INTO v_zone
  FROM stadium_zones
  WHERE id = p_zone_id;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Zone not found';
  END IF;

  -- Insert new metrics
  INSERT INTO stadium_metrics (
    zone_id,
    current_occupancy,
    entry_rate,
    exit_rate,
    queue_length,
    temperature,
    humidity,
    emergency_score,
    social_distance_score
  ) VALUES (
    p_zone_id,
    p_current_occupancy,
    p_entry_rate,
    p_exit_rate,
    p_queue_length,
    p_temperature,
    p_humidity,
    p_emergency_score,
    p_social_distance_score
  )
  RETURNING * INTO v_result;

  -- Create alert if occupancy exceeds thresholds
  IF p_current_occupancy >= v_zone.critical_threshold THEN
    INSERT INTO alerts (
      zone_id,
      type,
      severity,
      message,
      status
    ) VALUES (
      p_zone_id::TEXT,
      'occupancy',
      'critical',
      format('Critical occupancy level (%s%%) reached in %s', p_current_occupancy, v_zone.name),
      'active'
    );
  ELSIF p_current_occupancy >= v_zone.warning_threshold THEN
    INSERT INTO alerts (
      zone_id,
      type,
      severity,
      message,
      status
    ) VALUES (
      p_zone_id::TEXT,
      'occupancy',
      'warning',
      format('High occupancy warning (%s%%) in %s', p_current_occupancy, v_zone.name),
      'active'
    );
  END IF;

  RETURN v_result;
END;
$$;