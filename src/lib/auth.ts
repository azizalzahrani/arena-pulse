import { supabase } from './supabase';
import { User } from '@supabase/supabase-js';

export async function signUp(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`
      }
    });
    
    if (error) throw error;

    if (data.user) {
      try {
        await supabase
          .from('user_roles')
          .insert([{ user_id: data.user.id, role: 'user' }])
          .select()
          .single();
      } catch (error) {
        console.error('Error setting user role:', error);
      }
    }

    return data;
  } catch (error) {
    console.error('Sign up error:', error);
    throw error;
  }
}

export async function signIn(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    
    if (error) {
      console.error('Sign in error:', error);
      throw error;
    }
    return data;
  } catch (error) {
    console.error('Sign in error:', error);
    throw error;
  }
}

export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  } catch (error) {
    console.error('Sign out error:', error);
    throw error;
  }
}

export function getUser(): Promise<User | null> {
  return supabase.auth.getUser()
    .then(({ data }) => data.user)
    .catch((error) => {
      console.error('Get user error:', error);
      return null;
    });
}

export async function isAdmin(userId: string): Promise<boolean> {
  if (!userId) return false;
  
  try {
    const { data, error } = await supabase
      .from('user_roles')
      .select()
      .eq('user_id', userId)
      .eq('role', 'admin')
      .maybeSingle();

    if (error) {
      console.error('Check admin role error:', error);
      return false;
    }

    return !!data;
  } catch (error) {
    console.error('Check admin role error:', error);
    return false;
  }
}

export function onAuthStateChange(callback: (user: User | null) => void) {
  try {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      callback(session?.user ?? null);
    });
    
    return subscription;
  } catch (error) {
    console.error('Auth state change error:', error);
    return null;
  }
}