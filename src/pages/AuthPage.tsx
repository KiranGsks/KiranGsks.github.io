/**
 * Auth page — Login / Sign Up for UniPDI.
 * 
 * Clean, minimal auth flow with email+password and Google OAuth.
 * Users can use the app without signing in (Quick Scan is free),
 * but need an account for paid features and credit tracking.
 */

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PageShell } from '../components/layout/PageShell'
import { StepHeader } from '../components/layout/StepHeader'
import { PrimaryButton } from '../components/ui/PrimaryButton'
import { useAuth } from '../contexts/AuthContext'

type AuthMode = 'login' | 'signup'

export function AuthPage() {
  const navigate = useNavigate()
  const { signInWithEmail, signUpWithEmail, signInWithGoogle, isConfigured } = useAuth()

  const [mode, setMode] = useState<AuthMode>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  if (!isConfigured) {
    return (
      <PageShell>
        <StepHeader
          title="Account"
          subtitle="Authentication is not configured yet"
          showBack
          onBack={() => navigate('/')}
        />
        <div className="page-content">
          <div className="hint-box hint-box--warning">
            <p>
              <strong>Supabase not configured.</strong> Set{' '}
              <code>VITE_SUPABASE_URL</code> and <code>VITE_SUPABASE_ANON_KEY</code>{' '}
              in your <code>.env.local</code> file to enable authentication.
            </p>
            <p style={{ marginTop: '8px', fontSize: 'var(--font-size-xs)' }}>
              The app still works without an account — Quick Scan and bike inspections are free.
            </p>
          </div>
        </div>
      </PageShell>
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccessMessage(null)
    setLoading(true)

    try {
      if (mode === 'login') {
        const { error: err } = await signInWithEmail(email, password)
        if (err) {
          setError(err)
        } else {
          navigate('/')
        }
      } else {
        const { error: err } = await signUpWithEmail(email, password, fullName)
        if (err) {
          setError(err)
        } else {
          setSuccessMessage('Account created! Check your email for a confirmation link.')
        }
      }
    } finally {
      setLoading(false)
    }
  }

  const handleGoogle = async () => {
    setError(null)
    const { error: err } = await signInWithGoogle()
    if (err) setError(err)
  }

  return (
    <PageShell>
      <StepHeader
        title={mode === 'login' ? 'Welcome Back' : 'Create Account'}
        subtitle={
          mode === 'login'
            ? 'Sign in to access your inspection credits and history'
            : 'Sign up to track inspections and purchase credits'
        }
        showBack
        onBack={() => navigate('/')}
      />
      <div className="page-content">
        {/* Google OAuth */}
        <button
          type="button"
          className="btn btn--secondary btn--full"
          onClick={handleGoogle}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 01-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
            <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853"/>
            <path d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
            <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
          </svg>
          Continue with Google
        </button>

        {/* Divider */}
        <div className="auth-divider">
          <span>or</span>
        </div>

        {/* Email/Password Form */}
        <form onSubmit={handleSubmit} className="settings-form">
          {mode === 'signup' && (
            <div className="text-input">
              <label className="text-input__label" htmlFor="auth-name">
                Full Name
              </label>
              <input
                id="auth-name"
                className="text-input__field"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Your name"
                autoComplete="name"
              />
            </div>
          )}

          <div className="text-input">
            <label className="text-input__label" htmlFor="auth-email">
              Email
            </label>
            <input
              id="auth-email"
              className="text-input__field"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              autoComplete="email"
            />
          </div>

          <div className="text-input">
            <label className="text-input__label" htmlFor="auth-password">
              Password
            </label>
            <input
              id="auth-password"
              className="text-input__field"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              minLength={6}
              autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
            />
          </div>

          {error && (
            <div className="hint-box hint-box--error">
              {error}
            </div>
          )}

          {successMessage && (
            <div className="hint-box hint-box--success">
              {successMessage}
            </div>
          )}

          <PrimaryButton type="submit" block disabled={loading}>
            {loading
              ? 'Please wait...'
              : mode === 'login'
                ? 'Sign In'
                : 'Create Account'}
          </PrimaryButton>
        </form>

        {/* Toggle mode */}
        <div className="text-center" style={{ marginTop: '16px' }}>
          {mode === 'login' ? (
            <p className="text-muted">
              Don't have an account?{' '}
              <button
                type="button"
                className="btn-link"
                onClick={() => { setMode('signup'); setError(null); setSuccessMessage(null) }}
              >
                Sign up
              </button>
            </p>
          ) : (
            <p className="text-muted">
              Already have an account?{' '}
              <button
                type="button"
                className="btn-link"
                onClick={() => { setMode('login'); setError(null); setSuccessMessage(null) }}
              >
                Sign in
              </button>
            </p>
          )}
        </div>

        {/* Skip auth notice */}
        <div className="hint-box" style={{ marginTop: '24px' }}>
          <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>
            💡 You don't need an account for Quick Scan (always free) or bike inspections.
            An account is needed for Standard/Deep car inspections and to track your history.
          </p>
        </div>
      </div>
    </PageShell>
  )
}
