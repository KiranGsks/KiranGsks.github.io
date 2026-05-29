import { useNavigate } from 'react-router-dom'
import { StepHeader } from '../../components/layout/StepHeader'
import { SelectGrid } from '../../components/ui/SelectGrid'
import { YEARS } from '../../data/catalog'
import { useVehicleSelection } from '../../hooks/useVehicleSelection'

const TOTAL_STEPS = 5

export function YearStep() {
  const navigate = useNavigate()
  const { draft, setYear } = useVehicleSelection()

  const handleSelect = (yearStr: string) => {
    setYear(Number(yearStr))
    navigate('/new/make')
  }

  return (
    <>
      <StepHeader
        title="Select year"
        subtitle="Choose the vehicle model year."
        currentStep={1}
        totalSteps={TOTAL_STEPS}
        showBack
        onBack={() => navigate('/')}
      />
      <div className="page-content">
        <SelectGrid
          options={YEARS.map(String)}
          selected={draft.year != null ? String(draft.year) : null}
          onSelect={handleSelect}
        />
      </div>
    </>
  )
}
