/**
 * Types for AI-driven PDI inspection items.
 * The AI model returns structured data matching these types,
 * and the app dynamically renders UI based on them.
 */

export type CheckType = 'toggle' | 'confirm' | 'measure' | 'select'

export type InspectionItem = {
  id: string
  label: string
  category: string
  description?: string
  checkType: CheckType
  expectedState?: string
  options?: string[] // for 'select' checkType
}

export type InspectionCategory = {
  id: string
  label: string
  icon?: string
  items: InspectionItem[]
}

export type InspectionResponse = {
  vehicleSummary: string
  categories: InspectionCategory[]
  notes?: string[]
}

export type InspectionItemStatus = 'pending' | 'pass' | 'fail' | 'skipped'

export type InspectionProgress = Record<string, InspectionItemStatus>
