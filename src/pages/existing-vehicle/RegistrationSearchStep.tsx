import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PageShell } from '../../components/layout/PageShell'
import { StepHeader } from '../../components/layout/StepHeader'
import { LoadingPlaceholder } from '../../components/ui/LoadingPlaceholder'
import { PrimaryButton } from '../../components/ui/PrimaryButton'
import { TextInput } from '../../components/ui/TextInput'
import { VehicleSummaryCard } from '../../components/vehicle/VehicleSummaryCard'
import {
  lookupByRegistration,
  SAMPLE_REGISTRATIONS,
} from '../../data/registrationLookup'
import type { Vehicle } from '../../types/vehicle'
import { navigateWithPending } from '../../utils/vehicleNavigation'

export function RegistrationSearchStep() {
  const navigate = useNavigate()
  const [registration, setRegistration] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<Vehicle | null>(null)
  const [searched, setSearched] = useState(false)

  const handleSearch = async () => {
    const value = registration.trim()
    if (!value) {
      setError('Enter a registration number.')
      return
    }

    setError(null)
    setLoading(true)
    setSearched(true)
    setResult(null)

    try {
      const vehicle = await lookupByRegistration(value)
      setResult(vehicle)
      if (!vehicle) {
        setError('No vehicle found for that registration.')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleContinue = () => {
    if (!result) return
    navigateWithPending(navigate, '/existing/confirm', result)
  }

  return (
    <PageShell>
      <StepHeader
        title="Search by registration"
        subtitle="Enter the plate number to find a likely match."
        currentStep={2}
        totalSteps={3}
        showBack
        onBack={() => navigate('/existing')}
      />
      <div className="page-content">
        <TextInput
          label="Registration number"
          placeholder="e.g. ABC123"
          value={registration}
          onChange={(e) => {
            setRegistration(e.target.value)
            setError(null)
            setSearched(false)
            setResult(null)
          }}
          error={error ?? undefined}
          hint={`Try: ${SAMPLE_REGISTRATIONS.join(', ')}`}
          onKeyDown={(e) => {
            if (e.key === 'Enter') void handleSearch()
          }}
        />

        {loading && <LoadingPlaceholder />}

        {!loading && result && (
          <>
            <VehicleSummaryCard
              vehicle={result}
              title="Detected vehicle"
            />
            <div className="page-actions">
              <PrimaryButton onClick={handleContinue}>
                Review and confirm
              </PrimaryButton>
            </div>
          </>
        )}

        {!loading && searched && !result && !error && (
          <div className="empty-state">
            <p className="empty-state__title">No vehicle found</p>
            <p className="empty-state__text">
              Check the registration and try again.
            </p>
          </div>
        )}

        {!loading && !result && (
          <div className="page-actions">
            <PrimaryButton onClick={() => void handleSearch()}>
              Look up registration
            </PrimaryButton>
          </div>
        )}
      </div>
    </PageShell>
  )
}
