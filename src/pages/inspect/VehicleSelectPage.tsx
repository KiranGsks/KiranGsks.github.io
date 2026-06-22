/**
 * VehicleSelectPage — AI-driven dynamic vehicle selection flow.
 *
 * Flow for Brand New: Segment → Make → Year → Model → Variant → Confirm
 * Flow for Used:      Segment → Entry Method → (Reg Lookup | Manual) → Confirm
 *
 * Each step after Segment calls the AI model to generate contextually
 * relevant options based on all prior selections.
 */

import { useState, useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import type { VehicleType, VehicleSegment, FuelType, TransmissionType } from '../../types/vehicle'
import type { StepContext, AIMenuStep, MenuOption } from '../../types/aiMenu'
import { useAIMenu } from '../../hooks/useAIMenu'
import { buildVehicleId } from '../../data/catalog/index'
import { lookupByRegistration, getDemoPlates } from '../../data/registrationLookup'

type FlowStep = 'segment' | 'entry_method' | 'registration' | 'make' | 'year' | 'model' | 'variant' | 'confirm'

type Selections = {
  segment: VehicleSegment | null
  make: string | null
  year: number | null
  model: string | null
  variant: string | null
  fuelType: FuelType | null
  transmission: TransmissionType | null
  engineCC: number | null
  registration: string | null
}

const MANUAL_STEPS: FlowStep[] = ['segment', 'make', 'year', 'model', 'variant', 'confirm']
const USED_REG_STEPS: FlowStep[] = ['segment', 'entry_method', 'registration', 'confirm']
const USED_MANUAL_STEPS: FlowStep[] = ['segment', 'entry_method', 'make', 'year', 'model', 'variant', 'confirm']

const SEGMENT_OPTIONS: { id: VehicleSegment; icon: string; title: string; description: string }[] = [
  {
    id: 'brand_new',
    icon: '✨',
    title: 'Brand New',
    description: 'Showroom purchase — pre-delivery inspection for a factory-fresh vehicle.',
  },
  {
    id: 'used',
    icon: '🔄',
    title: 'Used / Pre-owned',
    description: 'Second-hand or certified pre-owned — thorough buyer inspection before purchase.',
  },
]

export function VehicleSelectPage() {
  const { type } = useParams<{ type: string }>()
  const vehicleType: VehicleType = type === 'bike' ? 'bike' : 'car'
  const navigate = useNavigate()

  const [step, setStep] = useState<FlowStep>('segment')
  const [entryMethod, setEntryMethod] = useState<'registration' | 'manual' | null>(null)
  const [selections, setSelections] = useState<Selections>({
    segment: null,
    make: null,
    year: null,
    model: null,
    variant: null,
    fuelType: null,
    transmission: null,
    engineCC: null,
    registration: null,
  })
  const [customInput, setCustomInput] = useState('')
  const [showCustom, setShowCustom] = useState(false)

  // Registration lookup state
  const [regInput, setRegInput] = useState('')
  const [regLoading, setRegLoading] = useState(false)
  const [regError, setRegError] = useState<string | null>(null)

  // Build context for the AI menu hook (only when on an AI-driven step)
  const aiContext: StepContext | null = useMemo(() => {
    const aiSteps: AIMenuStep[] = ['make', 'year', 'model', 'variant']
    if (!aiSteps.includes(step as AIMenuStep)) return null
    if (!selections.segment) return null

    return {
      vehicleType,
      segment: selections.segment,
      locale: 'IN',
      currentStep: step as AIMenuStep,
      selections: {
        ...(selections.make ? { make: selections.make } : {}),
        ...(selections.year ? { year: selections.year } : {}),
        ...(selections.model ? { model: selections.model } : {}),
      },
    }
  }, [step, selections, vehicleType])

  const { loading, error, menu, retry } = useAIMenu(aiContext)

  // Determine active step list based on segment and entry method
  const getActiveSteps = (): FlowStep[] => {
    if (selections.segment === 'brand_new') return MANUAL_STEPS
    if (selections.segment === 'used') {
      if (entryMethod === 'registration') return USED_REG_STEPS
      if (entryMethod === 'manual') return USED_MANUAL_STEPS
      // Before entry method is chosen, show up to entry_method
      return ['segment', 'entry_method']
    }
    return ['segment']
  }

  const activeSteps = getActiveSteps()
  const currentIdx = activeSteps.indexOf(step)

  // Navigation
  const goBack = () => {
    if (step === 'entry_method') {
      setStep('segment')
      setEntryMethod(null)
      setSelections({ ...selections, segment: null })
    } else if (step === 'registration') {
      setStep('entry_method')
      setEntryMethod(null)
      setRegInput('')
      setRegError(null)
    } else if (step === 'make' && selections.segment === 'used') {
      setStep('entry_method')
      setEntryMethod(null)
    } else if (currentIdx > 0) {
      const prevStep = activeSteps[currentIdx - 1]
      setStep(prevStep)
      setShowCustom(false)
      setCustomInput('')
    } else {
      navigate('/')
    }
  }

  const goForward = (nextStep: FlowStep) => {
    setStep(nextStep)
    setShowCustom(false)
    setCustomInput('')
  }

  // Selection handlers
  const selectSegment = (segment: VehicleSegment) => {
    const resetSelections: Selections = {
      segment,
      make: null,
      year: null,
      model: null,
      variant: null,
      fuelType: null,
      transmission: null,
      engineCC: null,
      registration: null,
    }
    setSelections(resetSelections)
    setEntryMethod(null)

    if (segment === 'used') {
      goForward('entry_method')
    } else {
      goForward('make')
    }
  }

  const selectEntryMethod = (method: 'registration' | 'manual') => {
    setEntryMethod(method)
    if (method === 'registration') {
      goForward('registration')
    } else {
      goForward('make')
    }
  }

  const handleRegLookup = async () => {
    const reg = regInput.trim()
    if (!reg) return

    setRegLoading(true)
    setRegError(null)

    try {
      const vehicle = await lookupByRegistration(reg)
      if (vehicle) {
        setSelections({
          ...selections,
          make: vehicle.make,
          year: vehicle.year,
          model: vehicle.model,
          variant: vehicle.variant,
          fuelType: vehicle.fuelType || null,
          transmission: vehicle.transmission || null,
          engineCC: vehicle.engineCC || null,
          registration: vehicle.registration || reg,
        })
        goForward('confirm')
      } else {
        setRegError('Vehicle not found. Please check the registration number or select manually.')
      }
    } catch {
      setRegError('Lookup failed. Please try again or select manually.')
    } finally {
      setRegLoading(false)
    }
  }

  const selectMake = (option: MenuOption | string) => {
    const make = typeof option === 'string' ? option : option.label
    setSelections({ ...selections, make, year: null, model: null, variant: null, fuelType: null, transmission: null, engineCC: null })
    goForward('year')
  }

  const selectYear = (option: MenuOption | string) => {
    const yearStr = typeof option === 'string' ? option : option.label
    const year = parseInt(yearStr, 10)
    if (isNaN(year)) return
    setSelections({ ...selections, year, model: null, variant: null, fuelType: null, transmission: null, engineCC: null })
    goForward('model')
  }

  const selectModel = (option: MenuOption | string) => {
    const model = typeof option === 'string' ? option : option.label
    setSelections({ ...selections, model, variant: null, fuelType: null, transmission: null, engineCC: null })
    goForward('variant')
  }

  const selectVariant = (option: MenuOption | string) => {
    if (typeof option === 'string') {
      setSelections({ ...selections, variant: option })
    } else {
      const fuelType = (option.metadata?.fuelType as FuelType) || null
      const transmission = (option.metadata?.transmission as TransmissionType) || null
      const engineCC = option.metadata?.engineCC ? Number(option.metadata.engineCC) : null
      setSelections({ ...selections, variant: option.label, fuelType, transmission, engineCC })
    }
    goForward('confirm')
  }

  const handleOptionSelect = (option: MenuOption) => {
    switch (step) {
      case 'make': selectMake(option); break
      case 'year': selectYear(option); break
      case 'model': selectModel(option); break
      case 'variant': selectVariant(option); break
    }
  }

  const handleCustomSubmit = () => {
    const value = customInput.trim()
    if (!value) return
    switch (step) {
      case 'make': selectMake(value); break
      case 'year': selectYear(value); break
      case 'model': selectModel(value); break
      case 'variant': selectVariant(value); break
    }
  }

  const confirmVehicle = () => {
    if (!selections.year || !selections.make || !selections.model || !selections.variant) return
    const id = buildVehicleId(selections.year, selections.make, selections.model, selections.variant)
    const vehicleData = {
      id,
      type: vehicleType,
      segment: selections.segment,
      year: selections.year,
      make: selections.make,
      model: selections.model,
      variant: selections.variant,
      fuelType: selections.fuelType,
      transmission: selections.transmission,
      engineCC: selections.engineCC,
      ...(selections.registration ? { registration: selections.registration } : {}),
    }
    sessionStorage.setItem('unipdi_vehicle', JSON.stringify(vehicleData))
    sessionStorage.setItem('unipdi_segment', selections.segment || 'used')
    navigate('/inspect/vehicle-info')
  }

  // Progress bar steps (exclude segment from display)
  const progressSteps = activeSteps.filter((s) => s !== 'segment')
  const progressIdx = progressSteps.indexOf(step as typeof progressSteps[number])

  return (
    <div className="page">
      {/* Header */}
      <div className="flex-between">
        <button type="button" className="back-btn" onClick={goBack}>
          ← Back
        </button>
        <span className="text-muted" style={{ fontSize: 'var(--font-size-sm)' }}>
          {vehicleType === 'car' ? '🚗 Car' : '🏍️ Bike'} Inspection
        </span>
      </div>

      {/* Progress */}
      {step !== 'segment' && progressSteps.length > 1 && (
        <div className="progress-bar">
          {progressSteps.map((s, i) => (
            <div
              key={s}
              className={`progress-bar__step ${
                i < progressIdx ? 'progress-bar__step--done' :
                i === progressIdx ? 'progress-bar__step--active' : ''
              }`}
            />
          ))}
        </div>
      )}

      {/* Step: Segment */}
      {step === 'segment' && (
        <div className="flex-col gap-lg" style={{ animation: 'fadeIn 0.2s ease-out' }}>
          <div className="page__header">
            <h2 className="page__title">What kind of purchase?</h2>
            <p className="page__subtitle">This helps us tailor the inspection to your situation.</p>
          </div>

          <div className="flex-col gap-md">
            {SEGMENT_OPTIONS.map((seg) => (
              <div
                key={seg.id}
                className="card card--interactive"
                onClick={() => selectSegment(seg.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && selectSegment(seg.id)}
              >
                <div className="card__icon">{seg.icon}</div>
                <div className="card__title">{seg.title}</div>
                <div className="card__description">{seg.description}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Step: Entry Method (Used cars only) */}
      {step === 'entry_method' && (
        <div className="flex-col gap-lg" style={{ animation: 'fadeIn 0.2s ease-out' }}>
          <div className="page__header">
            <h2 className="page__title">How would you like to identify the vehicle?</h2>
            <p className="page__subtitle">
              Enter the registration number for instant lookup, or select manually.
            </p>
          </div>

          <div className="flex-col gap-md">
            <div
              className="card card--interactive"
              onClick={() => selectEntryMethod('registration')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && selectEntryMethod('registration')}
            >
              <div className="card__icon">🔢</div>
              <div className="card__title">Enter Registration Number</div>
              <div className="card__description">
                Quick lookup — we'll fetch the vehicle details from the registration number (e.g., KA-01-AB-1234).
              </div>
            </div>

            <div
              className="card card--interactive"
              onClick={() => selectEntryMethod('manual')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && selectEntryMethod('manual')}
            >
              <div className="card__icon">✏️</div>
              <div className="card__title">Select Manually</div>
              <div className="card__description">
                Pick the make, year, model, and variant step by step.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Step: Registration Lookup */}
      {step === 'registration' && (
        <div className="flex-col gap-lg" style={{ animation: 'fadeIn 0.2s ease-out' }}>
          <div className="page__header">
            <h2 className="page__title">Enter vehicle registration number</h2>
            <p className="page__subtitle">
              We'll look up the make, model, year, and variant automatically.
            </p>
          </div>

          <div className="flex-col gap-md">
            <div className="flex-row gap-sm">
              <input
                type="text"
                className="input input--lg"
                placeholder="e.g., KA-01-AB-1234"
                value={regInput}
                onChange={(e) => setRegInput(e.target.value.toUpperCase())}
                onKeyDown={(e) => e.key === 'Enter' && handleRegLookup()}
                autoFocus
                style={{ fontFamily: 'monospace', letterSpacing: '1px', textTransform: 'uppercase' }}
              />
              <button
                type="button"
                className="btn btn--primary"
                onClick={handleRegLookup}
                disabled={!regInput.trim() || regLoading}
              >
                {regLoading ? '...' : 'Look up'}
              </button>
            </div>

            {regError && (
              <div className="hint-box hint-box--warning">
                <p>{regError}</p>
                <button
                  type="button"
                  className="btn btn--ghost btn--sm mt-sm"
                  onClick={() => {
                    setEntryMethod('manual')
                    setStep('make')
                    setRegError(null)
                  }}
                >
                  Select manually instead →
                </button>
              </div>
            )}

            {/* Demo plates hint */}
            <div className="hint-box hint-box--info" style={{ marginTop: 'var(--space-md)' }}>
              <p style={{ fontWeight: 600, marginBottom: '4px' }}>Demo plates for testing:</p>
              {getDemoPlates().map((demo) => (
                <button
                  key={demo.plate}
                  type="button"
                  className="btn btn--ghost btn--sm"
                  style={{ display: 'block', textAlign: 'left', padding: '4px 0' }}
                  onClick={() => setRegInput(demo.plate.replace(/-/g, ''))}
                >
                  <code>{demo.plate}</code> — {demo.vehicle}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* AI-Driven Steps: make, year, model, variant */}
      {(['make', 'year', 'model', 'variant'] as FlowStep[]).includes(step) && (
        <div className="flex-col gap-md" style={{ animation: 'fadeIn 0.2s ease-out' }}>
          {/* Loading State */}
          {loading && (
            <div className="flex-col gap-md" style={{ alignItems: 'center', padding: '3rem 0' }}>
              <div className="loading-spinner" />
              <p className="text-muted">Thinking about {step} options...</p>
              <p className="text-muted" style={{ fontSize: 'var(--font-size-xs)' }}>
                The AI is generating contextual choices based on your selections.
              </p>
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="flex-col gap-md">
              <div className="page__header">
                <h2 className="page__title">Something went wrong</h2>
                <p className="page__subtitle" style={{ color: 'var(--color-error, #e53e3e)' }}>
                  {error}
                </p>
              </div>
              <div className="flex-col gap-sm">
                <button type="button" className="btn btn--primary" onClick={retry}>
                  🔄 Retry
                </button>
                <button
                  type="button"
                  className="btn btn--secondary"
                  onClick={() => setShowCustom(true)}
                >
                  ✏️ Enter manually instead
                </button>
              </div>
              {showCustom && (
                <div className="flex-row gap-sm mt-md">
                  <input
                    type="text"
                    className="input"
                    placeholder={`Enter ${step} manually...`}
                    value={customInput}
                    onChange={(e) => setCustomInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleCustomSubmit()}
                    autoFocus
                  />
                  <button
                    type="button"
                    className="btn btn--primary btn--sm"
                    onClick={handleCustomSubmit}
                    disabled={!customInput.trim()}
                  >
                    Go
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Success State — Render AI-generated options */}
          {menu && !loading && !error && (
            <>
              <div className="page__header">
                <h2 className="page__title">{menu.question}</h2>
                {menu.subtitle && <p className="page__subtitle">{menu.subtitle}</p>}
              </div>

              <div className="grid-options">
                {menu.options.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    className="chip"
                    onClick={() => handleOptionSelect(option)}
                    title={option.description || undefined}
                  >
                    {option.icon && <span className="chip__icon">{option.icon}</span>}
                    <span>{option.label}</span>
                  </button>
                ))}
              </div>

              {/* Custom entry fallback */}
              {menu.allowCustom && !showCustom && (
                <div className="text-center mt-md">
                  <button
                    type="button"
                    className="btn btn--ghost btn--sm"
                    onClick={() => setShowCustom(true)}
                  >
                    Not listed? Enter manually →
                  </button>
                </div>
              )}

              {showCustom && (
                <div className="flex-row gap-sm mt-md">
                  <input
                    type="text"
                    className="input"
                    placeholder={`Enter ${step} manually...`}
                    value={customInput}
                    onChange={(e) => setCustomInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleCustomSubmit()}
                    autoFocus
                  />
                  <button
                    type="button"
                    className="btn btn--primary btn--sm"
                    onClick={handleCustomSubmit}
                    disabled={!customInput.trim()}
                  >
                    Go
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      )}

      {/* Step: Confirm */}
      {step === 'confirm' && (
        <div className="flex-col gap-lg" style={{ animation: 'fadeIn 0.2s ease-out' }}>
          <div className="page__header">
            <h2 className="page__title">Confirm vehicle</h2>
            <p className="page__subtitle">Is this the vehicle you want to inspect?</p>
          </div>

          <div className="vehicle-summary">
            <div className="vehicle-summary__title">
              {selections.year} {selections.make} {selections.model}
            </div>
            <div className="vehicle-summary__specs">
              <span className="vehicle-summary__spec">📋 {selections.variant}</span>
              {selections.fuelType && (
                <span className="vehicle-summary__spec">⛽ {selections.fuelType}</span>
              )}
              {selections.transmission && (
                <span className="vehicle-summary__spec">⚙️ {selections.transmission}</span>
              )}
              {selections.engineCC && (
                <span className="vehicle-summary__spec">🔧 {selections.engineCC}cc</span>
              )}
              <span className="vehicle-summary__spec">
                {vehicleType === 'car' ? '🚗' : '🏍️'} {vehicleType}
              </span>
              {selections.segment && (
                <span className="vehicle-summary__spec">
                  {selections.segment === 'brand_new' ? '✨' : '🔄'}{' '}
                  {selections.segment === 'brand_new' ? 'Brand New' : 'Used'}
                </span>
              )}
              {selections.registration && (
                <span className="vehicle-summary__spec">
                  🔢 {selections.registration}
                </span>
              )}
            </div>
          </div>

          <div className="flex-col gap-sm">
            <button
              type="button"
              className="btn btn--primary btn--full btn--lg"
              onClick={confirmVehicle}
            >
              ✓ Yes, inspect this vehicle
            </button>
            <button
              type="button"
              className="btn btn--secondary btn--full"
              onClick={() => {
                setSelections({ segment: null, make: null, year: null, model: null, variant: null, fuelType: null, transmission: null, engineCC: null, registration: null })
                setStep('segment')
                setEntryMethod(null)
                setRegInput('')
                setRegError(null)
              }}
            >
              ✗ Not this vehicle — start over
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
