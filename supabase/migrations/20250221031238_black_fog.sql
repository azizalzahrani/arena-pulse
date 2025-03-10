-- Grant usage on analytics schema to authenticated users
GRANT USAGE ON SCHEMA analytics TO authenticated;

-- Grant select permissions on all tables in analytics schema to authenticated users
GRANT SELECT ON ALL TABLES IN SCHEMA analytics TO authenticated;

-- Grant insert, update, delete permissions on all tables in analytics schema to authenticated users with admin role
DO $$
BEGIN
  -- Create admin_access role if it doesn't exist
  IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'admin_access') THEN
    CREATE ROLE admin_access;
  END IF;
END
$$;

GRANT admin_access TO authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA analytics TO admin_access;

-- Create function to check if user is admin
CREATE OR REPLACE FUNCTION is_admin()
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1
    FROM user_roles
    WHERE user_id = auth.uid()
    AND role = 'admin'
  );
END;
$$;

-- Create policy to grant admin access based on user role
ALTER DEFAULT PRIVILEGES IN SCHEMA analytics
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO admin_access;

-- Ensure the analytics schema is included in PostgREST's schema list
COMMENT ON SCHEMA analytics IS 'Schema for real-time analytics data';