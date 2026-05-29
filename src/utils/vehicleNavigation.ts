import type { NavigateFunction } from 'react-router-dom'
import type { Vehicle } from '../types/vehicle'
import { saveConfirmedVehicle } from './vehicleSession'

const PENDING_KEY = 'vehicle-pending'

export function savePendingVehicle(vehicle: Vehicle): void {
  sessionStorage.setItem(PENDING_KEY, JSON.stringify(vehicle))
}

export function loadPendingVehicle(): Vehicle | null {
  try {
    const raw = sessionStorage.getItem(PENDING_KEY)
    if (!raw) return null
    return JSON.parse(raw) as Vehicle
  } catch {
    return null
  }
}

export function clearPendingVehicle(): void {
  sessionStorage.removeItem(PENDING_KEY)
}

export function navigateWithVehicle(
  navigate: NavigateFunction,
  path: string,
  vehicle: Vehicle,
): void {
  saveConfirmedVehicle(vehicle)
  navigate(path, { state: { vehicle } })
}

export function navigateWithPending(
  navigate: NavigateFunction,
  path: string,
  vehicle: Vehicle,
): void {
  savePendingVehicle(vehicle)
  navigate(path, { state: { vehicle } })
}

export function getVehicleFromLocation(
  state: unknown,
  fallback: () => Vehicle | null = loadPendingVehicle,
): Vehicle | null {
  const fromState = (state as { vehicle?: Vehicle } | null)?.vehicle
  if (fromState) return fromState
  return fallback()
}
