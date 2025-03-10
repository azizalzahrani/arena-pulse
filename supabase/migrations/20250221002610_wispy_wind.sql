/*
  # Final Fix for User Roles Policies

  1. Changes
    - Simplify admin role checks
    - Use security definer function for admin checks
    - Remove recursive policy dependencies
    - Optimize policy performance

  2. Security
    - Maintain proper access control
    - Prevent infinite recursion
    - Ensure secure role management
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Allow users to read their own roles" ON user_roles;
DROP POLICY IF EXISTS "Allow admins to read all roles" ON user_roles;
DROP POLICY IF EXISTS "Allow admins to insert roles" ON user_roles;
DROP POLICY IF EXISTS "Allow admins to update roles" ON user_roles;
DROP POLICY IF EXISTS "Allow admins to delete roles" ON user_roles;

-- Create a security definer function for admin checks
CREATE OR REPLACE FUNCTION check_is_admin()
RETURNS BOOLEAN
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

-- Create simplified policies
CREATE POLICY "Users can read their own roles"
  ON user_roles
  FOR SELECT
  TO authenticated
  USING (
    user_id = auth.uid()
    OR check_is_admin()
  );

CREATE POLICY "Admins can insert roles"
  ON user_roles
  FOR INSERT
  TO authenticated
  WITH CHECK (check_is_admin());

CREATE POLICY "Admins can update roles"
  ON user_roles
  FOR UPDATE
  TO authenticated
  USING (check_is_admin())
  WITH CHECK (check_is_admin());

CREATE POLICY "Admins can delete roles"
  ON user_roles
  FOR DELETE
  TO authenticated
  USING (check_is_admin());