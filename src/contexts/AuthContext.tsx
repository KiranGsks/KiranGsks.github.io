/**
 * Authentication context for UniPDI.
 * 
 * Provides user session state, login/logout functions,
 * and profile data throughout the app.
 */

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import type { User, Session } from '@supabase/supabase-js'
import { supabase, isSupabaseConfigured } from '../lib/supabase'
import type { Profile } from '../types/database'

interface AuthState {
  user: User | null
  session: Session | null
  profile: Profile | null
  loading: boolean
  isAuthenticated: boolean
  isConfigured: boolean
}

interface AuthActions {
  signInWithEmail: (email: string, password: string) => Promise<{ error: string | null }>
  signUpWithEmail: (email: string, password: string, fullName?: string) => Promise<{ error: string | null }>
  signInWithGoogle: () => Promise<{ error: string | null }>
  signOut: () => Promise<void>
  refreshProfile: () => Promise<void>
}

type AuthContextValue = AuthState & AuthActions

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)

  const isConfigured = isSupabaseConfigured()

  // Fetch profile from database
  const fetchProfile = async (userId: string) => {
    if (!isConfigured) return

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()

    if (!error && data) {
      setProfile(data)
    }
  }

  // Initialize auth state
  useEffect(() => {
    if (!isConfigured) {
      setLoading(false)
      return
    }

    // Get initial session
    supabase.auth.getSession().then(({ data: { session: s } }) => {
      setSession(s)
      setUser(s?.user ?? null)
      if (s?.user) {
        fetchProfile(s.user.id)
      }
      setLoading(false)
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, newSession) => {
        setSession(newSession)
        setUser(newSession?.user ?? null)
        if (newSession?.user) {
          await fetchProfile(newSession.user.id)
        } else {
          setProfile(null)
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [isConfigured])

  const signInWithEmail = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    return { error: error?.message ?? null }
  }

  const signUpWithEmail = async (email: string, password: string, fullName?: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
      },
    })
    return { error: error?.message ?? null }
  }

  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin,
      },
    })
    return { error: error?.message ?? null }
  }

  const signOut = async () => {
    await supabase.auth.signOut()
    setUser(null)
    setSession(null)
    setProfile(null)
  }

  const refreshProfile = async () => {
    if (user) {
      await fetchProfile(user.id)
    }
  }

  const value: AuthContextValue = {
    user,
    session,
    profile,
    loading,
    isAuthenticated: !!user,
    isConfigured,
    signInWithEmail,
    signUpWithEmail,
    signInWithGoogle,
    signOut,
    refreshProfile,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

/**
 * Hook to access auth state and actions.
 */
export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
