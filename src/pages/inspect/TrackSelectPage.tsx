/**
 * Track selection page with credit gating.
 * 
 * Quick Scan = always free for everyone.
 * Bike inspections = always free for all tracks.
 * Standard/Deep car inspections = require credit or free trial.
 */

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import type { InspectionTrack, Vehicle } from '../../types/vehicle'
import { useAuth } from '../../contexts/AuthContext'
import {
  checkEligibility,
  fetchUserCredits,
  getTotalCredits,
  type VehicleContext,
  type InspectionEligibility,
} from '../../utils/creditSystem'
import type { Credit } from '../../types/database'

type TrackOption = {
  id: InspectionTrack
  icon: string
  title: string
  time: string
  description: string
  items: string
  isFree: boolean
}

const TRACKS: TrackOption[] = [
  {
    id: 'quick',
    icon: '⚡',
    title: 'Quick Scan',
    time: '~10 minutes',
    description: 'Critical red flags only. Perfect for a first look or when you have limited time with the vehicle.',
    items: '5–10 checks',
    isFree: true,
  },
  {
    id: 'standard',
    icon: '📋',
    title: 'Standard Check',
    time: '~30 minutes',
    description: 'Covers important mechanical and cosmetic checks. Recommended for most inspections.',
    items: '20–30 checks',
    isFree: false,
  },
  {
    id: 'deep',
    icon: '🔍',
    title: 'Deep Dive',
    time: '~60 minutes',
    description: 'Exhaustive inspection including niche items specific to this vehicle. For when you have extended time.',
    items: '40–60 checks',
    isFree: false,
  },
]

export function TrackSelectPage() {
  const navigate = useNavigate()
  const { user, profile, isAuthenticated, isConfigured: authConfigured } = useAuth()
  const [selected, setSelected] = useState<InspectionTrack | null>(null)
  const [credits, setCredits] = useState<Credit[]>([])
  const [eligibility, setEligibility] = useState<InspectionEligibility | null>(null)

  // Get vehicle from session
  const vehicleRaw = sessionStorage.getItem('unipdi_vehicle')
  const vehicle: Vehicle | null = vehicleRaw ? JSON.parse(vehicleRaw) : null

  // Determine vehicle type from URL or vehicle data
  const vehicleType: 'car' | 'bike' = vehicle?.type === 'bike' ? 'bike' : 'car'
  const segment = (sessionStorage.getItem('unipdi_segment') as 'brand_new' | 'used') || 'used'

  // Fetch credits on mount
  useEffect(() => {
    if (user) {
      fetchUserCredits(user.id).then(setCredits)
    }
  }, [user])

  // Check eligibility when track selection changes
  useEffect(() => {
    if (selected) {
      const context: VehicleContext = { vehicleType, segment, track: selected }
      const result = checkEligibility(profile, credits, context)
      setEligibility(result)
    } else {
      setEligibility(null)
    }
  }, [selected, profile, credits, vehicleType, segment])

  if (!vehicle) {
    return (
      <div className="page">
        <div className="page__header">
          <h2 className="page__title">No vehicle selected</h2>
          <p className="page__subtitle">Please go back and select a vehicle first.</p>
        </div>
        <button type="button" className="btn btn--primary" onClick={() => navigate('/')}>
          ← Go home
        </button>
      </div>
    )
  }

  const startInspection = () => {
    if (!selected || !eligibility) return

    // If needs payment, redirect to pricing
    if (!eligibility.allowed) {
      navigate('/pricing')
      return
    }

    // If needs auth (for credit deduction/trial tracking)
    if (eligibility.reason === 'free_trial' && !isAuthenticated) {
      // Need account to track trial usage
      navigate('/auth')
      return
    }

    sessionStorage.setItem('unipdi_track', selected)
    navigate('/inspect/checklist')
  }

  const totalCredits = getTotalCredits(credits)
  const isBike = vehicleType === 'bike'

  return (
    <div className="page">
      {/* Header */}
      <div className="flex-between">
        <button type="button" className="back-btn" onClick={() => navigate(-1)}>
          ← Back
        </button>
        {/* Credit badge */}
        {authConfigured && isAuthenticated && !isBike && (
          <span className="badge badge--primary" title="Your inspection credits">
            🎫 {profile?.tier === 'pro' || profile?.tier === 'pro_plus' ? '∞' : totalCredits} credits
          </span>
        )}
      </div>

      {/* Vehicle context */}
      <div className="vehicle-summary">
        <div className="vehicle-summary__title">
          {vehicle.year} {vehicle.make} {vehicle.model}
        </div>
        <div className="vehicle-summary__specs">
          <span className="vehicle-summary__spec">📋 {vehicle.variant}</span>
          {vehicle.fuelType && (
            <span className="vehicle-summary__spec">⛽ {vehicle.fuelType}</span>
          )}
          {vehicle.transmission && (
            <span className="vehicle-summary__spec">⚙️ {vehicle.transmission}</span>
          )}
        </div>
      </div>

      {/* Track selection */}
      <div className="page__header">
        <h2 className="page__title">How deep do you want to go?</h2>
        <p className="page__subtitle">
          Choose based on how much time you have with the vehicle.
        </p>
      </div>

      <div className="grid-3">
        {TRACKS.map((track) => {
          const trackIsFree = track.isFree || isBike
          return (
            <div
              key={track.id}
              className={`track-card ${selected === track.id ? 'track-card--selected' : ''}`}
              onClick={() => setSelected(track.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && setSelected(track.id)}
            >
              <div className="track-card__icon">{track.icon}</div>
              <div className="track-card__title">{track.title}</div>
              <div className="track-card__time">{track.time} • {track.items}</div>
              <div className="track-card__description">{track.description}</div>
              {trackIsFree && (
                <div className="track-card__free-badge">FREE</div>
              )}
              {!trackIsFree && (
                <div className="track-card__price-hint">
                  {segment === 'brand_new' ? '₹299' : '₹149'} or use a credit
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Eligibility message */}
      {eligibility && (
        <div
          className={`hint-box ${
            eligibility.allowed ? 'hint-box--success' : 'hint-box--warning'
          }`}
          style={{ marginTop: '16px' }}
        >
          {eligibility.message}
        </div>
      )}

      {/* Action */}
      <button
        type="button"
        className="btn btn--primary btn--full btn--lg"
        disabled={!selected}
        onClick={startInspection}
        style={{ opacity: selected ? 1 : 0.5 }}
      >
        {!selected
          ? 'Select a track to continue'
          : eligibility && !eligibility.allowed
            ? 'Get Credits →'
            : `Start ${TRACKS.find((t) => t.id === selected)?.title}`}
      </button>

      {/* Upsell for non-authenticated */}
      {!isAuthenticated && authConfigured && (
        <div className="text-center" style={{ marginTop: '12px' }}>
          <button
            type="button"
            className="btn-link"
            onClick={() => navigate('/auth')}
          >
            Sign in to use your credits or free trial
          </button>
        </div>
      )}
    </div>
  )
}
