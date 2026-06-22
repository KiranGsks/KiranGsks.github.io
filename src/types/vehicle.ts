/** Vehicle type — car or bike */
export type VehicleType = 'car' | 'bike'

/** Fuel type options */
export type FuelType = 'petrol' | 'diesel' | 'cng' | 'electric' | 'hybrid'

/** Transmission type */
export type TransmissionType = 'manual' | 'automatic' | 'amt' | 'cvt' | 'dct'

/** Vehicle purchase segment */
export type VehicleSegment = 'brand_new' | 'used'

/** A fully identified vehicle */
export type Vehicle = {
  id: string
  type: VehicleType
  segment?: VehicleSegment
  year: number
  make: string
  model: string
  variant: string
  fuelType?: FuelType
  transmission?: TransmissionType
  registration?: string
  engineCC?: number
}

/** Flow mode — how the user is identifying the vehicle */
export type FlowMode = 'registration' | 'manual' | 'custom'

/** Draft state during manual vehicle selection */
export type VehicleSelectionDraft = {
  type: VehicleType | null
  segment: VehicleSegment | null
  year: number | null
  make: string | null
  model: string | null
  variant: string | null
  fuelType: FuelType | null
  transmission: TransmissionType | null
}

/** Inspection depth track */
export type InspectionTrack = 'quick' | 'standard' | 'deep'

/** Inspection track metadata for display */
export type InspectionTrackInfo = {
  id: InspectionTrack
  label: string
  description: string
  estimatedMinutes: number
  itemCountRange: string
  icon: string
}

/** Locale/market identifier */
export type MarketLocale = 'IN' | 'BR' | 'FR' | 'US' | 'UK' | 'DE'

/** Deal context for pricing analysis */
export type DealContext = {
  askingPrice: number
  odometerKm?: number
  ownerCount?: number
  sellerNotes?: string
  currency: string
}
