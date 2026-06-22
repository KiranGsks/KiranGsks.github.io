/**
 * Pricing page — Shows available plans and allows purchase.
 * 
 * Designed to be simple and non-overwhelming:
 * - Laypeople see single purchases and packs
 * - Professionals discover Pro plans via a "For Professionals" section
 */

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PageShell } from '../components/layout/PageShell'
import { StepHeader } from '../components/layout/StepHeader'
import { useAuth } from '../contexts/AuthContext'
import { PRICING, type PricingPlan } from '../utils/creditSystem'
import { openCheckout, isRazorpayConfigured, type RazorpaySuccessResponse } from '../lib/razorpay'

export function PricingPage() {
  const navigate = useNavigate()
  const { user, profile, isAuthenticated } = useAuth()
  const [purchasing, setPurchasing] = useState<PricingPlan | null>(null)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const handlePurchase = async (plan: PricingPlan) => {
    if (!isAuthenticated) {
      navigate('/auth')
      return
    }

    if (!isRazorpayConfigured()) {
      setMessage({ type: 'error', text: 'Payment system not configured. Contact support.' })
      return
    }

    setPurchasing(plan)
    setMessage(null)

    try {
      await openCheckout({
        plan,
        userEmail: user?.email,
        userName: profile?.full_name ?? undefined,
        onSuccess: (_response: RazorpaySuccessResponse) => {
          setMessage({ type: 'success', text: 'Payment successful! Credits will be added shortly.' })
          setPurchasing(null)
          // In production: verify payment on backend, then refresh credits
        },
        onDismiss: () => {
          setPurchasing(null)
        },
      })
    } catch (err) {
      setMessage({
        type: 'error',
        text: err instanceof Error ? err.message : 'Payment failed. Please try again.',
      })
      setPurchasing(null)
    }
  }

  return (
    <PageShell>
      <StepHeader
        title="Plans & Pricing"
        subtitle="Get more from your vehicle inspections"
        showBack
        onBack={() => navigate('/')}
      />
      <div className="page-content">
        {/* Free tier reminder */}
        <div className="hint-box hint-box--success" style={{ marginBottom: '24px' }}>
          <strong>🎉 Always free:</strong> Quick Scan for any vehicle + all bike inspections.
          Your first full used car inspection is also free!
        </div>

        {/* Single Purchases */}
        <section className="pricing-section">
          <h3 className="pricing-section__title">Single Inspections</h3>
          <p className="pricing-section__subtitle">
            Pay per inspection — no commitment needed
          </p>

          <div className="pricing-cards">
            <div className="pricing-card">
              <div className="pricing-card__header">
                <span className="pricing-card__icon">🚗</span>
                <span className="pricing-card__name">Used Car Check</span>
              </div>
              <div className="pricing-card__price">{PRICING.single_used.priceDisplay}</div>
              <div className="pricing-card__details">
                1 Standard or Deep Dive inspection for a used car
              </div>
              <button
                type="button"
                className="btn btn--primary btn--full"
                onClick={() => handlePurchase('single_used')}
                disabled={purchasing === 'single_used'}
              >
                {purchasing === 'single_used' ? 'Processing...' : 'Buy Now'}
              </button>
            </div>

            <div className="pricing-card pricing-card--highlight">
              <div className="pricing-card__header">
                <span className="pricing-card__icon">✨</span>
                <span className="pricing-card__name">New Car PDI</span>
              </div>
              <div className="pricing-card__price">{PRICING.single_new.priceDisplay}</div>
              <div className="pricing-card__details">
                1 comprehensive pre-delivery inspection for your brand new car
              </div>
              <button
                type="button"
                className="btn btn--primary btn--full"
                onClick={() => handlePurchase('single_new')}
                disabled={purchasing === 'single_new'}
              >
                {purchasing === 'single_new' ? 'Processing...' : 'Buy Now'}
              </button>
            </div>
          </div>
        </section>

        {/* Packs */}
        <section className="pricing-section">
          <h3 className="pricing-section__title">Hunter Packs</h3>
          <p className="pricing-section__subtitle">
            Shopping around? Save with multi-inspection packs.
          </p>

          <div className="pricing-cards">
            <div className="pricing-card">
              <div className="pricing-card__header">
                <span className="pricing-card__icon">🎯</span>
                <span className="pricing-card__name">5 Inspections</span>
              </div>
              <div className="pricing-card__price">{PRICING.hunter_5.priceDisplay}</div>
              <div className="pricing-card__details">
                5 Standard/Deep inspections • Valid 30 days
                <br />
                <span className="pricing-card__savings">₹100/inspection — save ₹246</span>
              </div>
              <button
                type="button"
                className="btn btn--primary btn--full"
                onClick={() => handlePurchase('hunter_5')}
                disabled={purchasing === 'hunter_5'}
              >
                {purchasing === 'hunter_5' ? 'Processing...' : 'Buy Pack'}
              </button>
            </div>

            <div className="pricing-card pricing-card--highlight">
              <div className="pricing-card__badge">Best Value</div>
              <div className="pricing-card__header">
                <span className="pricing-card__icon">🏆</span>
                <span className="pricing-card__name">15 Inspections</span>
              </div>
              <div className="pricing-card__price">{PRICING.hunter_15.priceDisplay}</div>
              <div className="pricing-card__details">
                15 Standard/Deep inspections • Valid 60 days
                <br />
                Includes Deal Analysis feature
                <br />
                <span className="pricing-card__savings">₹67/inspection — save ₹1,236</span>
              </div>
              <button
                type="button"
                className="btn btn--primary btn--full"
                onClick={() => handlePurchase('hunter_15')}
                disabled={purchasing === 'hunter_15'}
              >
                {purchasing === 'hunter_15' ? 'Processing...' : 'Buy Pack'}
              </button>
            </div>
          </div>
        </section>

        {/* Pro Plans */}
        <section className="pricing-section">
          <h3 className="pricing-section__title">For Professionals</h3>
          <p className="pricing-section__subtitle">
            Unlimited inspections, branded reports, and tool discounts for freelance inspectors.
          </p>

          <div className="pricing-cards">
            <div className="pricing-card">
              <div className="pricing-card__header">
                <span className="pricing-card__icon">🔧</span>
                <span className="pricing-card__name">Pro Monthly</span>
              </div>
              <div className="pricing-card__price">{PRICING.pro_monthly.priceDisplay}</div>
              <div className="pricing-card__details">
                Unlimited inspections
                <br />PDF reports with your branding
                <br />Client management
              </div>
              <button
                type="button"
                className="btn btn--primary btn--full"
                onClick={() => handlePurchase('pro_monthly')}
                disabled={purchasing === 'pro_monthly'}
              >
                {purchasing === 'pro_monthly' ? 'Processing...' : 'Subscribe'}
              </button>
            </div>

            <div className="pricing-card">
              <div className="pricing-card__header">
                <span className="pricing-card__icon">⭐</span>
                <span className="pricing-card__name">Pro+ with Perks</span>
              </div>
              <div className="pricing-card__price">{PRICING.pro_plus.priceDisplay}</div>
              <div className="pricing-card__details">
                Everything in Pro
                <br />+ Discounts on OBD-II scanners
                <br />+ Priority AI responses
                <br />+ Partner tool discounts
              </div>
              <button
                type="button"
                className="btn btn--primary btn--full"
                onClick={() => handlePurchase('pro_plus')}
                disabled={purchasing === 'pro_plus'}
              >
                {purchasing === 'pro_plus' ? 'Processing...' : 'Subscribe'}
              </button>
            </div>
          </div>
        </section>

        {/* Messages */}
        {message && (
          <div className={`hint-box hint-box--${message.type}`} style={{ marginTop: '16px' }}>
            {message.text}
          </div>
        )}

        {/* Footer note */}
        <div className="text-center" style={{ marginTop: '24px' }}>
          <p className="text-muted" style={{ fontSize: 'var(--font-size-xs)' }}>
            All prices in INR. Payments processed securely via Razorpay.
            <br />UPI, cards, netbanking, and wallets accepted.
          </p>
        </div>
      </div>
    </PageShell>
  )
}
