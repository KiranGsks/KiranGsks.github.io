import { useNavigate } from 'react-router-dom'
import { StepHeader } from '../../components/layout/StepHeader'
import { SelectGrid } from '../../components/ui/SelectGrid'
import { getTrims } from '../../data/catalog'
import { useVehicleSelection } from '../../hooks/useVehicleSelection'

const TOTAL_STEPS = 5

export function TrimStep() {
  const navigate = useNavigate()
  const { draft, setTrim } = useVehicleSelection()

  if (draft.year == null || !draft.make || !draft.model) {
    navigate('/new/year', { replace: true })
    return null
  }

  const trims = getTrims(draft.year, draft.make, draft.model)

  const handleSelect = (trim: string) => {
    setTrim(trim)
    navigate('/new/confirm')
  }

  return (
    <>
      <StepHeader
        title="Select trim"
        subtitle={`${draft.year} ${draft.make} ${draft.model}`}
        currentStep={4}
        totalSteps={TOTAL_STEPS}
        showBack
        onBack={() => navigate('/new/model')}
      />
      <div className="page-content">
        <SelectGrid
          options={trims}
          selected={draft.trim}
          onSelect={handleSelect}
        />
      </div>
    </>
  )
}
