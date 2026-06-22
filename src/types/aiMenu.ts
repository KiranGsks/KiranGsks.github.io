/**
 * Types for AI-driven dynamic menu generation.
 * The AI model returns responses matching these shapes,
 * and the frontend renders UI elements from them.
 */

/** A single selectable option in a menu step */
export type MenuOption = {
  id: string           // machine-safe identifier (kebab-case)
  label: string        // display text for the button/chip
  description?: string // optional subtitle or hint text
  icon?: string        // optional emoji for visual cue
  metadata?: Record<string, string | number | boolean> // extra data to carry forward
}

/** The full response from the AI for a single menu step */
export type MenuResponse = {
  stepId: string           // which step this answers (e.g. "make", "year", "model", "variant")
  question: string         // heading text for the step
  subtitle?: string        // optional subtitle for context
  options: MenuOption[]    // list of choices to render
  allowCustom?: boolean    // whether to show "Not listed? Enter manually" fallback
}

/** Vehicle purchase segment */
export type VehicleSegment = 'brand_new' | 'used'

/** The steps that are AI-driven */
export type AIMenuStep = 'make' | 'year' | 'model' | 'variant'

/** Accumulated context passed to the AI at each step */
export type StepContext = {
  vehicleType: 'car' | 'bike'
  segment: VehicleSegment
  locale: string         // "IN" for India
  currentStep: AIMenuStep
  selections: {
    make?: string
    year?: number
    model?: string
    variant?: string
  }
}
