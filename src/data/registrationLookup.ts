import type { Vehicle } from '../types/vehicle'

const MOCK_PLATES: Record<string, Vehicle> = {
  ABC123: {
    id: '2023-toyota-camry-se',
    year: 2023,
    make: 'Toyota',
    model: 'Camry',
    trim: 'SE',
    registration: 'ABC123',
  },
  XYZ789: {
    id: '2024-ford-f150-xlt',
    year: 2024,
    make: 'Ford',
    model: 'F150',
    trim: 'XLT',
    registration: 'XYZ789',
  },
  HONDA1: {
    id: '2024-honda-civic-sport',
    year: 2024,
    make: 'Honda',
    model: 'Civic',
    trim: 'Sport',
    registration: 'HONDA1',
  },
}

const LOOKUP_DELAY_MS = 400

function normalizeRegistration(reg: string): string {
  return reg.trim().toUpperCase().replace(/\s+/g, '')
}

export async function lookupByRegistration(
  reg: string,
): Promise<Vehicle | null> {
  const key = normalizeRegistration(reg)
  if (!key) return null

  await new Promise((resolve) => setTimeout(resolve, LOOKUP_DELAY_MS))

  return MOCK_PLATES[key] ?? null
}

export const SAMPLE_REGISTRATIONS = Object.keys(MOCK_PLATES)
