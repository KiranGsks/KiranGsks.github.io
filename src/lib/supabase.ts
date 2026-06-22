/**
 * Supabase client initialization.
 * 
 * The Supabase URL and anon key are public (safe to expose in client).
 * They only allow access governed by Row Level Security (RLS) policies.
 * 
 * These are loaded from environment variables (Vite .env):
 *   VITE_SUPABASE_URL
 *   VITE_SUPABASE_ANON_KEY
 */

import { createClient } from '@supabase/supabase-js'
import type { Database } from '../types/database'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    '[UniPDI] Supabase not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env.local'
  )
}

export const supabase = createClient<Database>(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key',
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
    },
  }
)

/**
 * Check if Supabase is properly configured.
 */
export function isSupabaseConfigured(): boolean {
  return !!(supabaseUrl && supabaseAnonKey)
}
