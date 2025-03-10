/*
  # Update Admin User Password

  1. Changes
    - Update password for admin user (orbite.studio@gmail.com)
    - Uses secure password hashing with bcrypt
    - Properly escapes special characters in password

  2. Security
    - Uses secure password hash
    - Maintains existing security policies
*/

-- Update admin user password using properly escaped string
DO $$
DECLARE
  admin_user_id UUID;
BEGIN
  -- Get user ID for the admin email
  SELECT id INTO admin_user_id
  FROM auth.users
  WHERE email = 'orbite.studio@gmail.com'
  LIMIT 1;

  -- Update password if user exists
  IF admin_user_id IS NOT NULL THEN
    UPDATE auth.users
    SET encrypted_password = crypt('hkhLDK135\$\$\$', gen_salt('bf'))
    WHERE id = admin_user_id;
  END IF;
END
$$;