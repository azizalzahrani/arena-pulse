-- Move tables from analytics schema to public schema
ALTER TABLE IF EXISTS analytics.real_time_metrics SET SCHEMA public;
ALTER TABLE IF EXISTS analytics.zone_config SET SCHEMA public;
ALTER TABLE IF EXISTS analytics.alerts SET SCHEMA public;
ALTER TABLE IF EXISTS analytics.traffic_flow SET SCHEMA public;

-- Drop analytics schema if it exists and is empty
DROP SCHEMA IF EXISTS analytics CASCADE;

-- Update function to use public schema
CREATE OR REPLACE FUNCTION update_zone_metrics(
  p_zone_id TEXT,
  p_occupancy INTEGER,
  p_revenue DECIMAL,
  p_dwell_time INTEGER DEFAULT NULL,
  p_temperature DECIMAL DEFAULT NULL,
  p_humidity INTEGER DEFAULT NULL
)
RETURNS public.real_time_metrics
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_result public.real_time_metrics;
BEGIN
  INSERT INTO public.real_time_metrics (
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
    FROM public.zone_config zc
    WHERE zc.zone_id = p_zone_id
  )
  INSERT INTO public.alerts (zone_id, type, severity, message, status)
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