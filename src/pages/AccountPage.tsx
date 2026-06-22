/**
 * Account page — Shows user profile, credit balance, and plan status.
 */

import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PageShell } from '../components/layout/PageShell'
import { StepHeader } from '../components/layout/StepHeader'
import { PrimaryButton } from '../components/ui/PrimaryButton'
import { SecondaryButton } from '../components/ui/SecondaryButton'
import { useAuth } from '../contexts/AuthContext'
import { fetchUserCredits, getTotalCredits } from '../utils/creditSystem'
import type { Credit } from '../types/database'

export function AccountPage() {
  const navigate = useNavigate()
  const { user, profile, isAuthenticated, isConfigured, signOut } = useAuth()
  const [credits, setCredits] = useState<Credit[]>([])
  const [loadingCredits, setLoadingCredits] = useState(false)

  useEffect(() => {
    if (user) {
      setLoadingCredits(true)
      fetchUserCredits(user.id).then((data) => {
        setCredits(data)
        setLoadingCredits(false)
      })
    }
  }, [user])

  // Not authenticated — redirect to auth
  if (!isAuthenticated && isConfigured) {
    return (
      <PageShell>
        <StepHeader
          title="Account"
          subtitle="Sign in to view your account"
          showBack
          onBack={() => navigate('/')}
        />
        <div className="page-content">
          <PrimaryButton block onClick={() => navigate('/auth')}>
            Sign In / Create Account
          </PrimaryButton>
        </div>
      </PageShell>
    )
  }

  if (!isConfigured) {
    return (
      <PageShell>
        <StepHeader
          title="Account"
          subtitle="Not configured"
          showBack
          onBack={() => navigate('/')}
        />
        <div className="page-content">
          <div className="hint-box hint-box--warning">
            Authentication not configured. The app works in free mode.
          </div>
        </div>
      </PageShell>
    )
  }

  const totalCredits = getTotalCredits(credits)
  const tierLabel = {
    free: 'Free',
    hunter: 'Hunter',
    pro: 'Pro',
    pro_plus: 'Pro+',
  }[profile?.tier ?? 'free']

  const handleSignOut = async () => {
    await signOut()
    navigate('/')
  }

  return (
    <PageShell>
      <StepHeader
        title="Account"
        subtitle="Manage your profile and credits"
        showBack
        onBack={() => navigate('/')}
      />
      <div className="page-content">
        {/* Profile card */}
        <div className="account-card">
          <div className="account-card__avatar">
            {profile?.full_name?.[0]?.toUpperCase() ?? user?.email?.[0]?.toUpperCase() ?? '?'}
          </div>
          <div className="account-card__info">
            <div className="account-card__name">
              {profile?.full_name ?? 'User'}
            </div>
            <div className="account-card__email">{user?.email}</div>
            <div className="account-card__tier">
              <span className="badge badge--primary">{tierLabel} Plan</span>
            </div>
          </div>
        </div>

        {/* Credit balance */}
        <div className="credit-balance">
          <div className="credit-balance__header">
            <h3>Inspection Credits</h3>
            {profile?.tier === 'pro' || profile?.tier === 'pro_plus' ? (
              <span className="badge badge--success">Unlimited</span>
            ) : null}
          </div>

          {profile?.tier === 'pro' || profile?.tier === 'pro_plus' ? (
            <p className="credit-balance__unlimited">
              ♾️ Unlimited inspections with your Pro plan
            </p>
          ) : (
            <>
              <div className="credit-balance__count">
                {loadingCredits ? '...' : totalCredits}
              </div>
              <p className="credit-balance__label">
                {totalCredits === 1 ? 'credit remaining' : 'credits remaining'}
              </p>

              {/* Credit packs breakdown */}
              {credits.length > 0 && (
                <div className="credit-balance__packs">
                  {credits.map((c) => (
                    <div key={c.id} className="credit-pack-item">
                      <span>{c.credits_remaining}/{c.credits_total} remaining</span>
                      {c.expires_at && (
                        <span className="text-muted" style={{ fontSize: 'var(--font-size-xs)' }}>
                          Expires {new Date(c.expires_at).toLocaleDateString('en-IN')}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {!profile?.free_trial_used && (
                <div className="hint-box hint-box--success" style={{ marginTop: '12px' }}>
                  🎁 You have a <strong>free first inspection</strong> available for used cars!
                </div>
              )}
            </>
          )}

          <PrimaryButton block onClick={() => navigate('/pricing')} style={{ marginTop: '16px' }}>
            {totalCredits > 0 ? 'Buy More Credits' : 'Get Credits'}
          </PrimaryButton>
        </div>

        {/* Quick stats */}
        <div className="account-stats">
          <h3>Quick Stats</h3>
          <div className="account-stats__grid">
            <div className="account-stat">
              <div className="account-stat__value">—</div>
              <div className="account-stat__label">Inspections done</div>
            </div>
            <div className="account-stat">
              <div className="account-stat__value">—</div>
              <div className="account-stat__label">Vehicles checked</div>
            </div>
          </div>
          <p className="text-muted" style={{ fontSize: 'var(--font-size-xs)', marginTop: '8px' }}>
            Stats will populate as you use the app.
          </p>
        </div>

        {/* Actions */}
        <div className="page-actions" style={{ marginTop: '24px' }}>
          <SecondaryButton block onClick={handleSignOut}>
            Sign Out
          </SecondaryButton>
        </div>
      </div>
    </PageShell>
  )
}
