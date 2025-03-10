/*
  # Fix Admin Password Update

  1. Changes
    - Updates admin user password using Supabase's auth.users password update
    - Uses proper password hashing method
    - Ensures password is updated correctly

  2. Security
    - Uses secure password hashing
    - Maintains existing security policies
*/

-- Update admin user password using auth.users table
UPDATE auth.users
SET 
  encrypted_password = crypt('hkhLDK135$$$', gen_salt('bf')),
  updated_at = now()
WHERE 
  email = 'orbite.studio@gmail.com';