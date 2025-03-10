/*
  # Initial Schema for ArenaPulse

  1. New Tables
    - crowd_data: Real-time crowd density measurements
    - events: System events and notifications
    - fan_engagement: User interactions and engagement metrics
    - metrics: Stadium performance metrics

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create enum types
CREATE TYPE event_priority AS ENUM ('low', 'medium', 'high', 'critical');
CREATE TYPE interaction_type AS ENUM ('poll', 'trivia', 'social', 'purchase');
CREATE TYPE metric_type AS ENUM ('attendance', 'engagement', 'satisfaction', 'revenue');

-- Crowd Data table
CREATE TABLE IF NOT EXISTS crowd_data (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  timestamp TIMESTAMPTZ NOT NULL DEFAULT now(),
  zone_id TEXT NOT NULL,
  density_value INTEGER NOT NULL CHECK (density_value BETWEEN 0 AND 100),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Events table
CREATE TABLE IF NOT EXISTS events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type TEXT NOT NULL,
  timestamp TIMESTAMPTZ NOT NULL DEFAULT now(),
  metadata JSONB NOT NULL DEFAULT '{}',
  priority_level event_priority NOT NULL DEFAULT 'low',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Fan Engagement table
CREATE TABLE IF NOT EXISTS fan_engagement (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  interaction_type interaction_type NOT NULL,
  content_id TEXT NOT NULL,
  timestamp TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Metrics table
CREATE TABLE IF NOT EXISTS metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  metric_type metric_type NOT NULL,
  value NUMERIC NOT NULL,
  timestamp TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE crowd_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE fan_engagement ENABLE ROW LEVEL SECURITY;
ALTER TABLE metrics ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow read access to crowd data"
  ON crowd_data
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow read access to events"
  ON events
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow read access to metrics"
  ON metrics
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can manage their own engagement"
  ON fan_engagement
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create indexes
CREATE INDEX idx_crowd_data_timestamp ON crowd_data(timestamp);
CREATE INDEX idx_crowd_data_zone ON crowd_data(zone_id);
CREATE INDEX idx_events_timestamp ON events(timestamp);
CREATE INDEX idx_events_type ON events(type);
CREATE INDEX idx_fan_engagement_user ON fan_engagement(user_id);
CREATE INDEX idx_metrics_type_timestamp ON metrics(metric_type, timestamp);