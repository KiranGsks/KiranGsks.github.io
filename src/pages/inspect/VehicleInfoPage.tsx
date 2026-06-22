/**
 * VehicleInfoPage — Informational page shown after vehicle selection.
 * 
 * Displays generation/platform info, engine blocks, pros/cons,
 * and known issues for the selected vehicle. Users can explore
 * this content or skip directly to track selection.
 * 
 * Data source: Static catalog (vehicleKnowledge.ts) with AI fallback.
 */

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import type { Vehicle } from '../../types/vehicle'
import {
  getVehicleKnowledge,
  findGeneration,
  type VehicleGeneration,
  type EngineBlock,
} from '../../data/vehicleKnowledge'

export function VehicleInfoPage() {
  const navigate = useNavigate()

  // Get vehicle from session
  const vehicleRaw = sessionStorage.getItem('unipdi_vehicle')
  const vehicle: Vehicle | null = vehicleRaw ? JSON.parse(vehicleRaw) : null

  const [generation, setGeneration] = useState<VehicleGeneration | null>(null)
  const [expandedEngine, setExpandedEngine] = useState<string | null>(null)
  const [showProsConsTab, setShowProsConsTab] = useState<'pros' | 'cons'>('pros')
  const [dataSource, setDataSource] = useState<'catalog' | 'ai' | 'none'>('none')

  useEffect(() => {
    if (!vehicle) return

    // Try static catalog first
    const knowledge = getVehicleKnowledge(vehicle.make, vehicle.model)
    if (knowledge) {
      const gen = findGeneration(knowledge, vehicle.year)
      if (gen) {
        setGeneration(gen)
        setDataSource('catalog')
        return
      }
    }

    // TODO: AI fallback — for now, show "no data" state
    // When AI is integrated, call buildVehicleKnowledgePrompt() and parse response
    setDataSource('none')
  }, [vehicle])

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

  const proceedToTrack = () => {
    navigate('/inspect/track')
  }

  return (
    <div className="page">
      {/* Header */}
      <div className="flex-between">
        <button type="button" className="back-btn" onClick={() => navigate(-1)}>
          ← Back
        </button>
        <button
          type="button"
          className="btn btn--ghost btn--sm"
          onClick={proceedToTrack}
        >
          Skip to inspection →
        </button>
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
          {vehicle.registration && (
            <span className="vehicle-summary__spec">🔢 {vehicle.registration}</span>
          )}
        </div>
      </div>

      {/* Main content */}
      {generation ? (
        <div className="flex-col gap-lg" style={{ animation: 'fadeIn 0.2s ease-out' }}>
          {/* Generation/Platform Info */}
          <div className="info-section">
            <h3 className="info-section__title">🏭 About this generation</h3>
            <div className="info-card">
              <div className="info-card__row">
                <span className="info-card__label">Generation</span>
                <span className="info-card__value">{generation.name}</span>
              </div>
              <div className="info-card__row">
                <span className="info-card__label">Production</span>
                <span className="info-card__value">
                  {generation.productionYears[0]} – {generation.productionYears[1]}
                </span>
              </div>
              {generation.platform && (
                <div className="info-card__row">
                  <span className="info-card__label">Platform</span>
                  <span className="info-card__value">{generation.platform}</span>
                </div>
              )}
              <div className="info-card__row">
                <span className="info-card__label">Body Style</span>
                <span className="info-card__value">{generation.bodyStyle}</span>
              </div>
            </div>

            {/* Generation highlights */}
            <div className="info-highlights">
              {generation.highlights.map((h, i) => (
                <div key={i} className="info-highlight">
                  <span className="info-highlight__bullet">✓</span>
                  <span>{h}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Engine Blocks */}
          <div className="info-section">
            <h3 className="info-section__title">🔧 Engine Options</h3>
            <p className="info-section__subtitle">
              Tap an engine to see detailed specifications
            </p>
            <div className="engine-grid">
              {generation.engines.map((engine) => (
                <EngineBlockCard
                  key={engine.id}
                  engine={engine}
                  isExpanded={expandedEngine === engine.id}
                  onToggle={() =>
                    setExpandedEngine(expandedEngine === engine.id ? null : engine.id)
                  }
                  isCurrentVehicle={
                    vehicle.engineCC ? engine.displacement === vehicle.engineCC : false
                  }
                />
              ))}
            </div>
          </div>

          {/* Pros & Cons */}
          <div className="info-section">
            <h3 className="info-section__title">⚖️ Pros & Cons</h3>
            <div className="tabs">
              <button
                type="button"
                className={`tab ${showProsConsTab === 'pros' ? 'tab--active' : ''}`}
                onClick={() => setShowProsConsTab('pros')}
              >
                👍 Pros ({generation.prosAndCons.pros.length})
              </button>
              <button
                type="button"
                className={`tab ${showProsConsTab === 'cons' ? 'tab--active' : ''}`}
                onClick={() => setShowProsConsTab('cons')}
              >
                👎 Cons ({generation.prosAndCons.cons.length})
              </button>
            </div>
            <div className="pros-cons-list">
              {(showProsConsTab === 'pros'
                ? generation.prosAndCons.pros
                : generation.prosAndCons.cons
              ).map((item, i) => (
                <div
                  key={i}
                  className={`pros-cons-item ${
                    showProsConsTab === 'pros' ? 'pros-cons-item--pro' : 'pros-cons-item--con'
                  }`}
                >
                  <span className="pros-cons-item__icon">
                    {showProsConsTab === 'pros' ? '✅' : '⚠️'}
                  </span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Known Issues (for used cars) */}
          {generation.knownIssues && generation.knownIssues.length > 0 && (
            <div className="info-section">
              <h3 className="info-section__title">🚨 Known Issues to Watch For</h3>
              <div className="known-issues-list">
                {generation.knownIssues.map((issue, i) => (
                  <div key={i} className="known-issue">
                    <span className="known-issue__icon">⚠️</span>
                    <span>{issue}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : dataSource === 'none' ? (
        /* No data available state */
        <div className="flex-col gap-md" style={{ alignItems: 'center', padding: '2rem 0' }}>
          <div className="card">
            <div className="card__icon">📚</div>
            <div className="card__title">Vehicle info not available yet</div>
            <div className="card__description">
              We don't have detailed knowledge for this specific vehicle in our catalog yet.
              This feature will expand over time with AI-generated content.
            </div>
          </div>
        </div>
      ) : null}

      {/* CTA — Proceed to inspection */}
      <div className="flex-col gap-sm" style={{ marginTop: 'var(--space-lg)' }}>
        <button
          type="button"
          className="btn btn--primary btn--full btn--lg"
          onClick={proceedToTrack}
        >
          Continue to Inspection →
        </button>
      </div>
    </div>
  )
}

// ─── Engine Block Card Component ─────────────────────────────────────────────

function EngineBlockCard({
  engine,
  isExpanded,
  onToggle,
  isCurrentVehicle,
}: {
  engine: EngineBlock
  isExpanded: boolean
  onToggle: () => void
  isCurrentVehicle: boolean
}) {
  return (
    <div
      className={`engine-card ${isExpanded ? 'engine-card--expanded' : ''} ${
        isCurrentVehicle ? 'engine-card--current' : ''
      }`}
      onClick={onToggle}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onToggle()}
    >
      {/* Header — always visible */}
      <div className="engine-card__header">
        <div className="engine-card__name">{engine.name}</div>
        <div className="engine-card__meta">
          {engine.displacement}cc • {engine.configuration} • {engine.fuelType}
        </div>
        {isCurrentVehicle && (
          <span className="engine-card__badge">Your variant</span>
        )}
      </div>

      {/* Expanded details */}
      {isExpanded && (
        <div className="engine-card__details" style={{ animation: 'fadeIn 0.15s ease-out' }}>
          {engine.power && (
            <div className="engine-card__spec">
              <span className="engine-card__spec-label">Power</span>
              <span className="engine-card__spec-value">{engine.power}</span>
            </div>
          )}
          {engine.torque && (
            <div className="engine-card__spec">
              <span className="engine-card__spec-label">Torque</span>
              <span className="engine-card__spec-value">{engine.torque}</span>
            </div>
          )}
          <div className="engine-card__spec">
            <span className="engine-card__spec-label">Cylinders</span>
            <span className="engine-card__spec-value">
              {engine.cylinders} ({engine.configuration})
            </span>
          </div>
          <div className="engine-card__spec">
            <span className="engine-card__spec-label">Transmissions</span>
            <span className="engine-card__spec-value">
              {engine.transmissions.join(', ')}
            </span>
          </div>

          {/* Technology tags */}
          <div className="engine-card__tech">
            <span className="engine-card__spec-label">Technology</span>
            <div className="engine-card__tech-tags">
              {engine.technology.map((tech, i) => (
                <span key={i} className="tech-tag">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Engine highlights */}
          {engine.highlights && engine.highlights.length > 0 && (
            <div className="engine-card__highlights">
              {engine.highlights.map((h, i) => (
                <div key={i} className="engine-card__highlight">
                  💡 {h}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
