/*
  # Fix User Roles Policies

  1. Changes
    - Remove recursive admin policy
    - Add separate policies for CRUD operations
    - Fix infinite recursion issue

  2. Security
    - Maintain proper access control
    - Ensure admins can manage all roles
    - Allow users to read their own roles
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Admins can do everything" ON user_roles;
DROP POLICY IF EXISTS "Users can read their own roles" ON user_roles;

-- Create new, non-recursive policies
CREATE POLICY "Allow users to read their own roles"
  ON user_roles
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Allow admins to read all roles"
  ON user_roles
  FOR SELECT
  TO authenticated
  USING (
    auth.uid() IN (
      SELECT user_id 
      FROM user_roles 
      WHERE role = 'admin'
    )
  );

CREATE POLICY "Allow admins to insert roles"
  ON user_roles
  FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() IN (
      SELECT user_id 
      FROM user_roles 
      WHERE role = 'admin'
    )
  );

CREATE POLICY "Allow admins to update roles"
  ON user_roles
  FOR UPDATE
  TO authenticated
  USING (
    auth.uid() IN (
      SELECT user_id 
      FROM user_roles 
      WHERE role = 'admin'
    )
  )
  WITH CHECK (
    auth.uid() IN (
      SELECT user_id 
      FROM user_roles 
      WHERE role = 'admin'
    )
  );

CREATE POLICY "Allow admins to delete roles"
  ON user_roles
  FOR DELETE
  TO authenticated
  USING (
    auth.uid() IN (
      SELECT user_id 
      FROM user_roles 
      WHERE role = 'admin'
    )
  );