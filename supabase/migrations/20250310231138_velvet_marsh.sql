/*
  # Stadium Notifications System

  1. New Tables
    - `stadium_notifications`
      - `id` (uuid, primary key)
      - `type` (enum: critical, operations, crowd, event)
      - `severity` (integer, 1-5)
      - `title` (text)
      - `message` (text)
      - `location` (text)
      - `timestamp` (timestamptz)
      - `ai_risk_score` (integer, 1-10)
      - `resolution_time` (text)
      - `assigned_team` (text)
      - `action_items` (jsonb)
      - `acknowledged` (boolean)
      - `acknowledged_by` (uuid, references users)
      - `acknowledged_at` (timestamptz)
      - `ai_suggestions` (jsonb)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS
    - Add policies for read/write access
*/

-- Create notification type enum
CREATE TYPE notification_type AS ENUM ('critical', 'operations', 'crowd', 'event');

-- Create notifications table
CREATE TABLE IF NOT EXISTS stadium_notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type notification_type NOT NULL,
  severity integer NOT NULL CHECK (severity BETWEEN 1 AND 5),
  title text NOT NULL,
  message text NOT NULL,
  location text NOT NULL,
  timestamp timestamptz NOT NULL DEFAULT now(),
  ai_risk_score integer CHECK (ai_risk_score BETWEEN 1 AND 10),
  resolution_time text,
  assigned_team text,
  action_items jsonb DEFAULT '[]'::jsonb,
  acknowledged boolean DEFAULT false,
  acknowledged_by uuid REFERENCES auth.users(id),
  acknowledged_at timestamptz,
  ai_suggestions jsonb DEFAULT '[]'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Create indexes
CREATE INDEX idx_notifications_type ON stadium_notifications(type);
CREATE INDEX idx_notifications_severity ON stadium_notifications(severity);
CREATE INDEX idx_notifications_timestamp ON stadium_notifications(timestamp);
CREATE INDEX idx_notifications_acknowledged ON stadium_notifications(acknowledged);

-- Enable RLS
ALTER TABLE stadium_notifications ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow read access to all authenticated users"
  ON stadium_notifications
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow admins to create notifications"
  ON stadium_notifications
  FOR INSERT
  TO authenticated
  WITH CHECK (is_admin());

CREATE POLICY "Allow admins to update notifications"
  ON stadium_notifications
  FOR UPDATE
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

CREATE POLICY "Allow users to acknowledge notifications"
  ON stadium_notifications
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (
    (acknowledged = true AND acknowledged_by = auth.uid() AND acknowledged_at IS NOT NULL) OR
    is_admin()
  );