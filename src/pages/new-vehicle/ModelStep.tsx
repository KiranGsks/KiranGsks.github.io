import { useNavigate } from 'react-router-dom'
import { StepHeader } from '../../components/layout/StepHeader'
import { SelectGrid } from '../../components/ui/SelectGrid'
import { getModels } from '../../data/catalog'
import { useVehicleSelection } from '../../hooks/useVehicleSelection'

const TOTAL_STEPS = 5

export function ModelStep() {
  const navigate = useNavigate()
  const { draft, setModel } = useVehicleSelection()

  if (draft.year == null || !draft.make) {
    navigate('/new/year', { replace: true })
    return null
  }

  const models = getModels(draft.year, draft.make)

  const handleSelect = (model: string) => {
    setModel(model)
    navigate('/new/trim')
  }

  return (
    <>
      <StepHeader
        title="Select model"
        subtitle={`${draft.year} ${draft.make}`}
        currentStep={3}
        totalSteps={TOTAL_STEPS}
        showBack
        onBack={() => navigate('/new/make')}
      />
      <div className="page-content">
        <SelectGrid
          options={models}
          selected={draft.model}
          onSelect={handleSelect}
        />
      </div>
    </>
  )
}
