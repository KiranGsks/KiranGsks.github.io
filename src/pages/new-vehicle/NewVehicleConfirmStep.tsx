import { useNavigate } from 'react-router-dom'
import { StepHeader } from '../../components/layout/StepHeader'
import { PrimaryButton } from '../../components/ui/PrimaryButton'
import { SecondaryButton } from '../../components/ui/SecondaryButton'
import { VehicleSummaryCard } from '../../components/vehicle/VehicleSummaryCard'
import { useVehicleSelection } from '../../hooks/useVehicleSelection'
import { navigateWithVehicle } from '../../utils/vehicleNavigation'

const TOTAL_STEPS = 5

export function NewVehicleConfirmStep() {
  const navigate = useNavigate()
  const { buildVehicle, isComplete } = useVehicleSelection()
  const vehicle = buildVehicle()

  if (!isComplete || !vehicle) {
    navigate('/new/year', { replace: true })
    return null
  }

  const handleConfirm = () => {
    navigateWithVehicle(navigate, '/air-setup', vehicle)
  }

  return (
    <>
      <StepHeader
        title="Confirm vehicle"
        subtitle="Check the details before continuing."
        currentStep={5}
        totalSteps={TOTAL_STEPS}
        showBack
        onBack={() => navigate('/new/trim')}
      />
      <div className="page-content">
        <VehicleSummaryCard vehicle={vehicle} />
        <div className="page-actions page-actions--row">
          <SecondaryButton block onClick={() => navigate('/new/trim')}>
            Edit selection
          </SecondaryButton>
          <PrimaryButton block onClick={handleConfirm}>
            Confirm and continue
          </PrimaryButton>
        </div>
      </div>
    </>
  )
}
