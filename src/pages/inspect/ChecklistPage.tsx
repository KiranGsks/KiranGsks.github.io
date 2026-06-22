import { useNavigate } from 'react-router-dom'
import type { Vehicle, InspectionTrack } from '../../types/vehicle'

export function ChecklistPage() {
  const navigate = useNavigate()

  const vehicleRaw = sessionStorage.getItem('unipdi_vehicle')
  const vehicle: Vehicle | null = vehicleRaw ? JSON.parse(vehicleRaw) : null
  const track = (sessionStorage.getItem('unipdi_track') || 'standard') as InspectionTrack

  if (!vehicle) {
    return (
      <div className="page">
        <h2 className="page__title">No vehicle selected</h2>
        <button type="button" className="btn btn--primary" onClick={() => navigate('/')}>
          ← Go home
        </button>
      </div>
    )
  }

  const trackLabels: Record<InspectionTrack, string> = {
    quick: '⚡ Quick Scan',
    standard: '📋 Standard Check',
    deep: '🔍 Deep Dive',
  }

  return (
    <div className="page">
      {/* Header */}
      <div className="flex-between">
        <button type="button" className="back-btn" onClick={() => navigate('/inspect/track')}>
          ← Back to tracks
        </button>
        <span className="badge badge--success">{trackLabels[track]}</span>
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

      {/* Placeholder content */}
      <div className="card">
        <div className="card__icon">🤖</div>
        <div className="card__title">AI Inspection Checklist</div>
        <div className="card__description">
          This is where the AI-generated inspection checklist will appear.
          The checklist will be dynamically generated based on:
        </div>
        <ul style={{ marginTop: 'var(--space-md)', paddingLeft: 'var(--space-lg)', color: 'var(--color-text-secondary)' }}>
          <li>Vehicle: {vehicle.year} {vehicle.make} {vehicle.model} {vehicle.variant}</li>
          <li>Fuel: {vehicle.fuelType || 'unknown'}</li>
          <li>Transmission: {vehicle.transmission || 'unknown'}</li>
          <li>Track: {track} ({track === 'quick' ? '5-10' : track === 'standard' ? '20-30' : '40-60'} items)</li>
          <li>Known issues specific to this model/year</li>
        </ul>
        <div className="mt-lg">
          <p className="text-muted" style={{ fontSize: 'var(--font-size-sm)' }}>
            Connect AWS Bedrock credentials in Settings to enable AI-generated checklists.
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex-col gap-sm">
        <button
          type="button"
          className="btn btn--primary btn--full"
          onClick={() => navigate('/settings')}
        >
          ⚙️ Configure AI Settings
        </button>
        <button
          type="button"
          className="btn btn--secondary btn--full"
          onClick={() => {
            sessionStorage.removeItem('unipdi_vehicle')
            sessionStorage.removeItem('unipdi_track')
            navigate('/')
          }}
        >
          🏠 Start over
        </button>
      </div>
    </div>
  )
}
