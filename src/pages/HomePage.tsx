import { useNavigate } from 'react-router-dom'
import { hasValidSettings } from '../utils/settingsStore'
import { useAuth } from '../contexts/AuthContext'

export function HomePage() {
  const navigate = useNavigate()
  const aiConfigured = hasValidSettings()
  const { isAuthenticated, profile, isConfigured: authConfigured } = useAuth()

  return (
    <div className="page">
      {/* Header area */}
      <div className="flex-between">
        <div>
          <h1 className="page__title">UniPDI</h1>
          <p className="page__subtitle">Your used vehicle buying assistant</p>
        </div>
        <div className="flex-row gap-sm">
          {aiConfigured ? (
            <span className="badge badge--success">● AI Ready</span>
          ) : (
            <span className="badge badge--warning">○ AI Not Set</span>
          )}
          <button
            type="button"
            className="btn btn--ghost btn--sm"
            onClick={() => navigate('/settings')}
            aria-label="Settings"
            title="AI Settings"
          >
            ⚙️
          </button>
          {/* Account button */}
          <button
            type="button"
            className="btn btn--ghost btn--sm"
            onClick={() => navigate(isAuthenticated ? '/account' : '/auth')}
            aria-label="Account"
            title={isAuthenticated ? 'My Account' : 'Sign In'}
          >
            {isAuthenticated ? '👤' : '🔑'}
          </button>
        </div>
      </div>

      {/* Main choice */}
      <div className="flex-col gap-md mt-lg">
        <p style={{ fontSize: 'var(--font-size-lg)', color: 'var(--color-text)' }}>
          What would you like to inspect?
        </p>

        <div className="grid-2">
          <div
            className="card card--interactive"
            onClick={() => navigate('/inspect/car')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && navigate('/inspect/car')}
          >
            <div className="card__icon">🚗</div>
            <div className="card__title">Inspect a Car</div>
            <div className="card__description">
              Hatchback, sedan, SUV, or MPV — get a vehicle-specific checklist
              tailored to the exact make, model, and variant.
            </div>
          </div>

          <div
            className="card card--interactive"
            onClick={() => navigate('/inspect/bike')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && navigate('/inspect/bike')}
          >
            <div className="card__icon">🏍️</div>
            <div className="card__title">Inspect a Bike</div>
            <div className="card__description">
              Motorcycle or scooter — check what matters for two-wheelers
              with model-specific known issues.
            </div>
            <div className="card__badge">FREE</div>
          </div>
        </div>
      </div>

      {/* Credit indicator — only show if auth configured */}
      {authConfigured && (
        <div
          className="credit-indicator"
          onClick={() => navigate(isAuthenticated ? '/account' : '/pricing')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && navigate(isAuthenticated ? '/account' : '/pricing')}
        >
          {isAuthenticated ? (
            <>
              <span className="credit-indicator__icon">🎫</span>
              <span className="credit-indicator__text">
                {profile?.tier === 'pro' || profile?.tier === 'pro_plus'
                  ? 'Pro Plan — Unlimited'
                  : 'View credits & plans →'}
              </span>
            </>
          ) : (
            <>
              <span className="credit-indicator__icon">🎁</span>
              <span className="credit-indicator__text">
                Quick Scan FREE • First inspection FREE → See plans
              </span>
            </>
          )}
        </div>
      )}

      {/* Secondary actions */}
      <div className="flex-col gap-sm mt-lg">
        <button
          type="button"
          className="btn btn--secondary btn--full"
          onClick={() => navigate('/ask')}
        >
          💬 Ask a question about any vehicle
        </button>
      </div>

      {/* Footer info */}
      <div className="text-center mt-lg">
        <p className="text-muted" style={{ fontSize: 'var(--font-size-xs)' }}>
          Location: India 🇮🇳 • Supports cars &amp; bikes • AI-powered inspections
        </p>
      </div>
    </div>
  )
}
