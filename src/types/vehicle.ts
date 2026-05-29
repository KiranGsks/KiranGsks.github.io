export type Vehicle = {
  id: string
  year: number
  make: string
  model: string
  trim: string
  registration?: string
}

export type FlowMode = 'new' | 'existing'

export type ExistingSearchMode = 'model' | 'registration'

export type VehicleSelectionDraft = {
  year: number | null
  make: string | null
  model: string | null
  trim: string | null
}
