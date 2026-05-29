import { useCallback, useState } from 'react'
import { buildVehicleId } from '../data/catalog'
import type { Vehicle, VehicleSelectionDraft } from '../types/vehicle'
import { clearDraft, loadDraft, saveDraft } from '../utils/vehicleSession'

function createInitialDraft(): VehicleSelectionDraft {
  return loadDraft()
}

export function useVehicleSelection() {
  const [draft, setDraft] = useState<VehicleSelectionDraft>(createInitialDraft)

  const persist = useCallback((updater: (prev: VehicleSelectionDraft) => VehicleSelectionDraft) => {
    setDraft((prev) => {
      const next = updater(prev)
      saveDraft(next)
      return next
    })
  }, [])

  const setYear = useCallback(
    (year: number) => {
      persist(() => ({ year, make: null, model: null, trim: null }))
    },
    [persist],
  )

  const setMake = useCallback(
    (make: string) => {
      persist((prev) => ({ ...prev, make, model: null, trim: null }))
    },
    [persist],
  )

  const setModel = useCallback(
    (model: string) => {
      persist((prev) => ({ ...prev, model, trim: null }))
    },
    [persist],
  )

  const setTrim = useCallback(
    (trim: string) => {
      persist((prev) => ({ ...prev, trim }))
    },
    [persist],
  )

  const reset = useCallback(() => {
    clearDraft()
    setDraft({ year: null, make: null, model: null, trim: null })
  }, [])

  const buildVehicle = useCallback((): Vehicle | null => {
    const { year, make, model, trim } = draft
    if (year == null || !make || !model || !trim) return null

    return {
      id: buildVehicleId(year, make, model, trim),
      year,
      make,
      model,
      trim,
    }
  }, [draft])

  const isComplete =
    draft.year != null && !!draft.make && !!draft.model && !!draft.trim

  return {
    draft,
    setYear,
    setMake,
    setModel,
    setTrim,
    reset,
    buildVehicle,
    isComplete,
  }
}
