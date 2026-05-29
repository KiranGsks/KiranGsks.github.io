import { useLocation, useNavigate } from 'react-router-dom'
import { PageShell } from '../components/layout/PageShell'
import { StepHeader } from '../components/layout/StepHeader'
import { PrimaryButton } from '../components/ui/PrimaryButton'
import { VehicleSummaryCard } from '../components/vehicle/VehicleSummaryCard'
import type { Vehicle } from '../types/vehicle'
import {
  clearAllVehicleSession,
  loadConfirmedVehicle,
} from '../utils/vehicleSession'

export function AirSetupPlaceholderPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const fromState = (location.state as { vehicle?: Vehicle } | null)?.vehicle
  const vehicle = fromState ?? loadConfirmedVehicle()

  const handleBackToStart = () => {
    clearAllVehicleSession()
    navigate('/')
  }

  return (
    <PageShell>
      <StepHeader
        title="Air setup"
        subtitle="Next phase — coming soon"
        currentStep={1}
        totalSteps={1}
      />
      <div className="page-content air-placeholder">
        {vehicle ? (
          <VehicleSummaryCard vehicle={vehicle} title="Confirmed vehicle" />
        ) : (
          <div className="empty-state">
            <p className="empty-state__title">No vehicle on record</p>
            <p className="empty-state__text">
              Complete vehicle identification first.
            </p>
          </div>
        )}

        <div className="air-placeholder__banner">
          <h2>Air setup not implemented</h2>
          <p>
            This screen is a placeholder for the next phase of the workflow
            (air system configuration, checks, and technician steps). Backend
            APIs and real air-setup logic will be connected later.
          </p>
        </div>

        <div className="hint-box">
          See <code>src/docs/BACKEND_TODO.md</code> for planned API integration.
        </div>

        <div className="page-actions">
          <PrimaryButton onClick={handleBackToStart}>
            Back to start
          </PrimaryButton>
        </div>
      </div>
    </PageShell>
  )
}
