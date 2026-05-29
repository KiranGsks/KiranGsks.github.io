import { useNavigate } from 'react-router-dom'
import { PageShell } from '../components/layout/PageShell'
import { StepHeader } from '../components/layout/StepHeader'
import { ChoiceCard } from '../components/ui/ChoiceCard'
import { clearAllVehicleSession } from '../utils/vehicleSession'

export function HomePage() {
  const navigate = useNavigate()

  const startNew = () => {
    clearAllVehicleSession()
    navigate('/new/year')
  }

  const startExisting = () => {
    clearAllVehicleSession()
    navigate('/existing')
  }

  return (
    <PageShell>
      <StepHeader
        title="Identify vehicle"
        subtitle="Is this a new vehicle or one already in the system?"
      />
      <div className="page-content">
        <div className="choice-grid choice-grid--horizontal">
          <ChoiceCard
            title="New vehicle"
            description="Select year, make, model, and trim step by step."
            onClick={startNew}
          />
          <ChoiceCard
            title="Existing vehicle"
            description="Search by model or registration number."
            onClick={startExisting}
          />
        </div>
      </div>
    </PageShell>
  )
}
