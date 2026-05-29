import { useNavigate } from 'react-router-dom'
import { PageShell } from '../../components/layout/PageShell'
import { StepHeader } from '../../components/layout/StepHeader'
import { ChoiceCard } from '../../components/ui/ChoiceCard'
import { SecondaryButton } from '../../components/ui/SecondaryButton'

export function ExistingVehiclePage() {
  const navigate = useNavigate()

  return (
    <PageShell>
      <StepHeader
        title="Existing vehicle"
        subtitle="How would you like to find this vehicle?"
        currentStep={1}
        totalSteps={3}
        showBack
        onBack={() => navigate('/')}
      />
      <div className="page-content">
        <div className="choice-grid">
          <ChoiceCard
            title="Search by model"
            description="Browse the catalog and pick a matching vehicle."
            onClick={() => navigate('/existing/model')}
          />
          <ChoiceCard
            title="Search by registration"
            description="Enter a plate number to detect the likely vehicle."
            onClick={() => navigate('/existing/registration')}
          />
        </div>
        <div className="page-actions">
          <SecondaryButton block onClick={() => navigate('/')}>
            Cancel
          </SecondaryButton>
        </div>
      </div>
    </PageShell>
  )
}
