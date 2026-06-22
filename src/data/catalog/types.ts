import type { VehicleType, FuelType, TransmissionType } from '../../types/vehicle'

export type VariantInfo = {
  name: string
  fuelType: FuelType
  transmission: TransmissionType
  engineCC?: number
}

export type ModelInfo = {
  name: string
  variants: VariantInfo[]
  yearsAvailable: number[]
}

export type MakeInfo = {
  name: string
  models: ModelInfo[]
}

export type MarketCatalog = {
  locale: string
  vehicleType: VehicleType
  makes: MakeInfo[]
}

/** Helper: generate year range inclusive */
export function yearRange(start: number, end: number): number[] {
  const years: number[] = []
  for (let y = start; y <= end; y++) years.push(y)
  return years
}
