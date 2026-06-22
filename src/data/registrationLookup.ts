import type { Vehicle } from '../types/vehicle'

/**
 * Mock registration lookup for Indian vehicles.
 * In production, this would call an RTO/Vahan API.
 */

const MOCK_REGISTRATIONS: Record<string, Vehicle> = {
  'KA01AB1234': {
    id: 'ka01ab1234-swift',
    type: 'car',
    year: 2019,
    make: 'Maruti Suzuki',
    model: 'Swift',
    variant: 'ZXi',
    fuelType: 'petrol',
    transmission: 'manual',
    registration: 'KA-01-AB-1234',
    engineCC: 1197,
  },
  'MH02CD5678': {
    id: 'mh02cd5678-creta',
    type: 'car',
    year: 2021,
    make: 'Hyundai',
    model: 'Creta',
    variant: 'SX',
    fuelType: 'petrol',
    transmission: 'manual',
    registration: 'MH-02-CD-5678',
    engineCC: 1497,
  },
  'DL03EF9012': {
    id: 'dl03ef9012-classic',
    type: 'bike',
    year: 2022,
    make: 'Royal Enfield',
    model: 'Classic 350',
    variant: 'Halcyon',
    fuelType: 'petrol',
    transmission: 'manual',
    registration: 'DL-03-EF-9012',
    engineCC: 349,
  },
}

/** Normalize a registration string for lookup */
function normalizeReg(reg: string): string {
  return reg.replace(/[-\s]/g, '').toUpperCase()
}

/**
 * Look up a vehicle by registration number.
 * Returns null if not found. Simulates network delay.
 */
export async function lookupByRegistration(registration: string): Promise<Vehicle | null> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 400))

  const normalized = normalizeReg(registration)
  return MOCK_REGISTRATIONS[normalized] ?? null
}

/** Get demo registration plates for testing */
export function getDemoPlates(): { plate: string; vehicle: string }[] {
  return [
    { plate: 'KA-01-AB-1234', vehicle: '2019 Maruti Swift ZXi' },
    { plate: 'MH-02-CD-5678', vehicle: '2021 Hyundai Creta SX' },
    { plate: 'DL-03-EF-9012', vehicle: '2022 Royal Enfield Classic 350' },
  ]
}
