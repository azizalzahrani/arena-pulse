/*
  # Add test admin user

  1. Changes
    - Add a test admin user with email 'admin@test.com' and password '123456'
    - Add admin role for the new user
  
  2. Security
    - Uses secure password hashing
    - Adds appropriate role assignment
*/

-- Create admin user if it doesn't exist
DO $$
DECLARE
  new_user_id UUID;
BEGIN
  -- First try to get existing user ID
  SELECT id INTO new_user_id
  FROM auth.users
  WHERE email = 'admin@test.com';

  -- If user doesn't exist, create it
  IF new_user_id IS NULL THEN
    INSERT INTO auth.users (
      instance_id,
      id,
      aud,
      role,
      email,
      encrypted_password,
      email_confirmed_at,
      created_at,
      updated_at,
      raw_app_meta_data,
      raw_user_meta_data,
      is_super_admin,
      confirmation_token
    ) VALUES (
      '00000000-0000-0000-0000-000000000000',
      gen_random_uuid(),
      'authenticated',
      'authenticated',
      'admin@test.com',
      crypt('123456', gen_salt('bf')),
      now(),
      now(),
      now(),
      '{"provider":"email","providers":["email"]}',
      '{}',
      false,
      encode(gen_random_bytes(32), 'base64')
    )
    RETURNING id INTO new_user_id;
  END IF;

  -- Add admin role if not exists
  IF new_user_id IS NOT NULL THEN
    INSERT INTO user_roles (user_id, role)
    VALUES (new_user_id, 'admin')
    ON CONFLICT (user_id, role) DO NOTHING;
  END IF;
END;
$$;