import type { VehicleSelectionDraft, Vehicle } from '../types/vehicle'

const DRAFT_KEY = 'unipdi_draft'
const VEHICLE_KEY = 'unipdi_vehicle'

/** Save the current selection draft to sessionStorage */
export function saveDraft(draft: VehicleSelectionDraft): void {
  sessionStorage.setItem(DRAFT_KEY, JSON.stringify(draft))
}

/** Load the selection draft from sessionStorage */
export function loadDraft(): VehicleSelectionDraft {
  const raw = sessionStorage.getItem(DRAFT_KEY)
  if (raw) {
    try { return JSON.parse(raw) } catch { /* fall through */ }
  }
  return {
    type: null,
    segment: null,
    year: null,
    make: null,
    model: null,
    variant: null,
    fuelType: null,
    transmission: null,
  }
}

/** Save a confirmed vehicle to sessionStorage */
export function saveVehicle(vehicle: Vehicle): void {
  sessionStorage.setItem(VEHICLE_KEY, JSON.stringify(vehicle))
}

/** Load the confirmed vehicle from sessionStorage */
export function loadVehicle(): Vehicle | null {
  const raw = sessionStorage.getItem(VEHICLE_KEY)
  if (raw) {
    try { return JSON.parse(raw) } catch { /* fall through */ }
  }
  return null
}

/** Clear all vehicle session data */
export function clearAllVehicleSession(): void {
  sessionStorage.removeItem(DRAFT_KEY)
  sessionStorage.removeItem(VEHICLE_KEY)
  sessionStorage.removeItem('unipdi_track')
}
