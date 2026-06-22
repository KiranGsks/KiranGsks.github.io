/**
 * Catalog Index — aggregates all market-specific vehicle data
 * and provides query functions for the UI.
 */

import type { VehicleType } from '../../types/vehicle'
import type { MakeInfo, ModelInfo, VariantInfo } from './types'
export type { MakeInfo, ModelInfo, VariantInfo, MarketCatalog } from './types'

// Car data
import { MARUTI } from './cars-maruti'
import { HYUNDAI, TATA, MAHINDRA, KIA } from './cars-others'
import { VOLKSWAGEN, FORD, HONDA, TOYOTA, RENAULT, SKODA, MG } from './cars-euro-others'

// Bike data
import { HERO, HONDA_BIKES, BAJAJ, ROYAL_ENFIELD, TVS, YAMAHA, KTM, SUZUKI_BIKES } from './bikes-india'

// ─── Assembled Catalogs ──────────────────────────────────────────────────────

const INDIA_CAR_MAKES: MakeInfo[] = [
  MARUTI,
  HYUNDAI,
  TATA,
  MAHINDRA,
  KIA,
  TOYOTA,
  HONDA,
  VOLKSWAGEN,
  SKODA,
  FORD,
  RENAULT,
  MG,
]

const INDIA_BIKE_MAKES: MakeInfo[] = [
  HERO,
  HONDA_BIKES,
  BAJAJ,
  ROYAL_ENFIELD,
  TVS,
  YAMAHA,
  KTM,
  SUZUKI_BIKES,
]

export const CATALOGS: Record<string, Record<VehicleType, MakeInfo[]>> = {
  IN: {
    car: INDIA_CAR_MAKES,
    bike: INDIA_BIKE_MAKES,
  },
}

// ─── Query Functions ─────────────────────────────────────────────────────────

/** Get all available makes for a vehicle type in a locale */
export function getMakes(locale: string, vehicleType: VehicleType): string[] {
  const catalog = CATALOGS[locale]?.[vehicleType]
  if (!catalog) return []
  return catalog.map((m) => m.name)
}

/** Get all available years for a specific make (union of all model years) */
export function getYearsForMake(locale: string, vehicleType: VehicleType, make: string): number[] {
  const catalog = CATALOGS[locale]?.[vehicleType]
  if (!catalog) return []
  const makeData = catalog.find((m) => m.name === make)
  if (!makeData) return []

  const yearSet = new Set<number>()
  for (const model of makeData.models) {
    for (const y of model.yearsAvailable) yearSet.add(y)
  }
  return Array.from(yearSet).sort((a, b) => b - a) // newest first
}

/** Get models available for a make in a given year */
export function getModels(
  locale: string,
  vehicleType: VehicleType,
  make: string,
  year: number
): string[] {
  const catalog = CATALOGS[locale]?.[vehicleType]
  if (!catalog) return []
  const makeData = catalog.find((m) => m.name === make)
  if (!makeData) return []

  return makeData.models
    .filter((model) => model.yearsAvailable.includes(year))
    .map((model) => model.name)
    .sort()
}

/** Get variants for a specific model */
export function getVariants(
  locale: string,
  vehicleType: VehicleType,
  make: string,
  model: string
): VariantInfo[] {
  const catalog = CATALOGS[locale]?.[vehicleType]
  if (!catalog) return []
  const makeData = catalog.find((m) => m.name === make)
  if (!makeData) return []
  const modelData = makeData.models.find((m) => m.name === model)
  if (!modelData) return []
  return modelData.variants
}

/** Get full model info */
export function getModelInfo(
  locale: string,
  vehicleType: VehicleType,
  make: string,
  model: string
): ModelInfo | null {
  const catalog = CATALOGS[locale]?.[vehicleType]
  if (!catalog) return null
  const makeData = catalog.find((m) => m.name === make)
  if (!makeData) return null
  return makeData.models.find((m) => m.name === model) ?? null
}

/** Build a unique vehicle ID string */
export function buildVehicleId(
  year: number,
  make: string,
  model: string,
  variant: string
): string {
  return `${year}-${make}-${model}-${variant}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

/** Get all supported locales */
export function getSupportedLocales(): string[] {
  return Object.keys(CATALOGS)
}

/** Default locale */
export const DEFAULT_LOCALE = 'IN'
