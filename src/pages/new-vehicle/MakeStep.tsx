import { useNavigate } from 'react-router-dom'
import { StepHeader } from '../../components/layout/StepHeader'
import { SelectGrid } from '../../components/ui/SelectGrid'
import { getMakes } from '../../data/catalog'
import { useVehicleSelection } from '../../hooks/useVehicleSelection'

const TOTAL_STEPS = 5

export function MakeStep() {
  const navigate = useNavigate()
  const { draft, setMake } = useVehicleSelection()

  if (draft.year == null) {
    navigate('/new/year', { replace: true })
    return null
  }

  const makes = getMakes(draft.year)

  const handleSelect = (make: string) => {
    setMake(make)
    navigate('/new/model')
  }

  return (
    <>
      <StepHeader
        title="Select make"
        subtitle={`Year: ${draft.year}`}
        currentStep={2}
        totalSteps={TOTAL_STEPS}
        showBack
        onBack={() => navigate('/new/year')}
      />
      <div className="page-content">
        <SelectGrid
          options={makes}
          selected={draft.make}
          onSelect={handleSelect}
        />
      </div>
    </>
  )
}
