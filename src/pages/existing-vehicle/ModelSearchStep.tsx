import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PageShell } from '../../components/layout/PageShell'
import { StepHeader } from '../../components/layout/StepHeader'
import { SelectGrid } from '../../components/ui/SelectGrid'
import { TextInput } from '../../components/ui/TextInput'
import { getAllCatalogVehicles } from '../../data/catalog'
import { navigateWithPending } from '../../utils/vehicleNavigation'

export function ModelSearchStep() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const allOptions = useMemo(() => getAllCatalogVehicles(), [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return allOptions.map((o) => o.label)
    return allOptions
      .filter((o) => o.label.toLowerCase().includes(q))
      .map((o) => o.label)
  }, [allOptions, query])

  const handleSelect = (label: string) => {
    const match = allOptions.find((o) => o.label === label)
    if (!match) return

    const vehicle = {
      id: match.id,
      year: match.year,
      make: match.make,
      model: match.model,
      trim: match.trim,
    }

    navigateWithPending(navigate, '/existing/confirm', vehicle)
  }

  return (
    <PageShell>
      <StepHeader
        title="Search by model"
        subtitle="Filter the list or pick a vehicle below."
        currentStep={2}
        totalSteps={3}
        showBack
        onBack={() => navigate('/existing')}
      />
      <div className="page-content">
        <TextInput
          label="Filter vehicles"
          placeholder="e.g. Toyota Camry"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          hint="Type to narrow the list."
        />
        {filtered.length === 0 ? (
          <div className="empty-state">
            <p className="empty-state__title">No matches</p>
            <p className="empty-state__text">
              Try a different search term or clear the filter.
            </p>
          </div>
        ) : (
          <SelectGrid options={filtered} onSelect={handleSelect} />
        )}
      </div>
    </PageShell>
  )
}
