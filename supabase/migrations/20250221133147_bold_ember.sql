/*
  # Database Permissions Update
  
  1. Changes
    - Create admin_access role
    - Grant permissions to authenticated users
    - Set up default privileges
    - Grant admin access permissions
  
  2. Security
    - Maintains existing RLS policies
    - Adds role-based access control
*/

-- Create admin_access role if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'admin_access') THEN
    CREATE ROLE admin_access;
  END IF;
END
$$;

-- Grant admin_access to authenticated users
GRANT admin_access TO authenticated;

-- Grant necessary permissions to authenticated users
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO authenticated;

-- Grant full access to admin_access role
GRANT ALL ON ALL TABLES IN SCHEMA public TO admin_access;

-- Set default privileges for future tables
ALTER DEFAULT PRIVILEGES IN SCHEMA public
GRANT SELECT ON TABLES TO authenticated;

ALTER DEFAULT PRIVILEGES IN SCHEMA public
GRANT ALL ON TABLES TO admin_access;

-- Create or replace admin check function
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

-- Grant execute permission on the is_admin function
GRANT EXECUTE ON FUNCTION is_admin() TO authenticated;