import { useLocation, useNavigate } from 'react-router-dom'
import { PageShell } from '../../components/layout/PageShell'
import { StepHeader } from '../../components/layout/StepHeader'
import { PrimaryButton } from '../../components/ui/PrimaryButton'
import { SecondaryButton } from '../../components/ui/SecondaryButton'
import { VehicleSummaryCard } from '../../components/vehicle/VehicleSummaryCard'
import {
  clearPendingVehicle,
  getVehicleFromLocation,
  navigateWithVehicle,
} from '../../utils/vehicleNavigation'

export function ExistingConfirmStep() {
  const navigate = useNavigate()
  const location = useLocation()
  const vehicle = getVehicleFromLocation(location.state)

  if (!vehicle) {
    return (
      <PageShell>
        <StepHeader title="Confirm vehicle" subtitle="No vehicle selected." />
        <div className="page-content">
          <div className="empty-state">
            <p className="empty-state__title">Nothing to confirm</p>
            <p className="empty-state__text">
              Start a search to select a vehicle first.
            </p>
          </div>
          <div className="page-actions">
            <PrimaryButton onClick={() => navigate('/existing')}>
              Back to search options
            </PrimaryButton>
          </div>
        </div>
      </PageShell>
    )
  }

  const handleConfirm = () => {
    clearPendingVehicle()
    navigateWithVehicle(navigate, '/air-setup', vehicle)
  }

  const handleReject = () => {
    clearPendingVehicle()
    navigate('/existing')
  }

  return (
    <PageShell>
      <StepHeader
        title="Confirm vehicle"
        subtitle="Is this the correct vehicle?"
        currentStep={3}
        totalSteps={3}
        showBack
        onBack={() => navigate(-1)}
      />
      <div className="page-content">
        <VehicleSummaryCard vehicle={vehicle} />
        <div className="page-actions page-actions--row">
          <SecondaryButton block onClick={handleReject}>
            Not this vehicle
          </SecondaryButton>
          <PrimaryButton block onClick={handleConfirm}>
            Yes, confirm
          </PrimaryButton>
        </div>
      </div>
    </PageShell>
  )
}
