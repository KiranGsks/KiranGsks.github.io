import type { Vehicle } from '../types/vehicle'
import type { VehicleSelectionDraft } from '../types/vehicle'

const DRAFT_KEY = 'vehicle-selection-draft'
const CONFIRMED_KEY = 'vehicle-confirmed'

export function loadDraft(): VehicleSelectionDraft {
  try {
    const raw = sessionStorage.getItem(DRAFT_KEY)
    if (!raw) {
      return { year: null, make: null, model: null, trim: null }
    }
    return JSON.parse(raw) as VehicleSelectionDraft
  } catch {
    return { year: null, make: null, model: null, trim: null }
  }
}

export function saveDraft(draft: VehicleSelectionDraft): void {
  sessionStorage.setItem(DRAFT_KEY, JSON.stringify(draft))
}

export function clearDraft(): void {
  sessionStorage.removeItem(DRAFT_KEY)
}

export function saveConfirmedVehicle(vehicle: Vehicle): void {
  sessionStorage.setItem(CONFIRMED_KEY, JSON.stringify(vehicle))
}

export function loadConfirmedVehicle(): Vehicle | null {
  try {
    const raw = sessionStorage.getItem(CONFIRMED_KEY)
    if (!raw) return null
    return JSON.parse(raw) as Vehicle
  } catch {
    return null
  }
}

export function clearConfirmedVehicle(): void {
  sessionStorage.removeItem(CONFIRMED_KEY)
}

export function clearAllVehicleSession(): void {
  clearDraft()
  clearConfirmedVehicle()
}
