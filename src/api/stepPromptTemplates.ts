/**
 * Prompt templates for AI-driven dynamic menu generation.
 * Each step in the vehicle selection flow uses buildMenuPrompt()
 * to create a structured prompt that forces the AI to return
 * a strict MenuResponse JSON.
 */

import type { StepContext, VehicleSegment } from '../types/aiMenu'

const SEGMENT_LABELS: Record<VehicleSegment, string> = {
  brand_new: 'Brand New (current production, showroom purchase)',
  used: 'Used / Pre-owned (second-hand market, includes certified pre-owned)',
}

/**
 * System prompt for the vehicle catalog assistant.
 * Instructs the model to always return strict JSON matching MenuResponse shape.
 */
export const MENU_SYSTEM_PROMPT = `You are a vehicle catalog assistant for the Indian market. You have comprehensive knowledge of:
- All car and bike brands sold in India, including their entry year into the market
- Model lineups by year, including discontinued models for used vehicle context
- Trim/variant naming conventions each manufacturer uses (e.g., Maruti uses LXi/VXi/ZXi, Hyundai uses Era/Magna/Sportz/Asta)
- Fuel types and transmission options available for each variant
- Regional popularity and market presence

CRITICAL RULES:
1. Return ONLY valid JSON — no markdown, no code fences, no explanations outside JSON
2. The JSON must exactly match the MenuResponse schema provided in the user prompt
3. Sort options by popularity/relevance in the Indian market (most popular first)
4. Never include options that are factually incorrect for the Indian market
5. For years: never include years before the brand had official presence in India
6. For variants: use the EXACT trim names the manufacturer used in that specific market and year
7. Keep option IDs as kebab-case lowercase strings
8. Keep labels human-readable with proper capitalization`

/**
 * Builds a structured prompt for a given step context.
 * The AI will return a MenuResponse JSON with options for that step.
 */
export function buildMenuPrompt(ctx: StepContext): string {
  const vehicleLabel = ctx.vehicleType === 'car' ? 'car' : 'motorcycle/scooter'
  const segmentLabel = SEGMENT_LABELS[ctx.segment]

  const baseContext = `Context:
- Vehicle Type: ${vehicleLabel}
- Purchase Segment: ${segmentLabel}
- Market/Region: India (locale: ${ctx.locale})`

  const selectionContext = Object.entries(ctx.selections)
    .filter(([, v]) => v !== undefined)
    .map(([k, v]) => `- Selected ${k}: ${v}`)
    .join('\n')

  const responseSchema = `{
  "stepId": "${ctx.currentStep}",
  "question": "string — the question to display as heading",
  "subtitle": "string — optional contextual subtitle",
  "options": [
    {
      "id": "kebab-case-id",
      "label": "Display Name",
      "description": "optional short description",
      "icon": "optional emoji",
      "metadata": {}
    }
  ],
  "allowCustom": true
}`

  switch (ctx.currentStep) {
    case 'make':
      return `${baseContext}
${selectionContext ? '\nSelections so far:\n' + selectionContext : ''}

Task: List all ${vehicleLabel} manufacturers/brands available in India for the "${ctx.segment}" segment.

Rules:
- Include all major and popular brands in the Indian market
- Sort by market share / popularity (most popular first)
- For "brand_new" segment: only brands currently selling vehicles in India
- For "used" segment: include brands that have sold vehicles in India (even if exited, like Ford)
- Maximum 25 options
- Use the brand's commonly known name in India (e.g., "Maruti Suzuki" not just "Suzuki")

Return ONLY valid JSON matching this exact schema:
${responseSchema}`

    case 'year':
      return `${baseContext}
${selectionContext ? '\nSelections so far:\n' + selectionContext : ''}

Task: List the valid model years for ${ctx.selections.make} ${vehicleLabel}s in India.

Rules:
- Start year must be when ${ctx.selections.make} first started selling in India (DO NOT go before their India entry)
- End year: current year (${new Date().getFullYear()}) for used, or only current year for brand_new
- For "brand_new" segment: only the current production year(s)
- For "used" segment: show all years from India market entry to current year
- Sort newest first
- Maximum 20 options
- Each option's id should be the year as string, label should be the year as string

Return ONLY valid JSON matching this exact schema:
${responseSchema}`

    case 'model':
      return `${baseContext}
${selectionContext ? '\nSelections so far:\n' + selectionContext : ''}

Task: List all ${ctx.selections.make} ${vehicleLabel} models that were available in India in ${ctx.selections.year}.

Rules:
- Only include models that were actually on sale or recently discontinued in ${ctx.selections.year} in India
- For "brand_new" segment: only currently produced models
- For "used" segment: include models sold that year even if now discontinued
- Sort by popularity in India
- Include the body type or category in the description (e.g., "Compact SUV", "Premium Hatchback", "Commuter Bike")
- Maximum 15 options

Return ONLY valid JSON matching this exact schema:
${responseSchema}`

    case 'variant':
      return `${baseContext}
${selectionContext ? '\nSelections so far:\n' + selectionContext : ''}

Task: List all variants/trims of the ${ctx.selections.year} ${ctx.selections.make} ${ctx.selections.model} that were available in India.

Rules:
- Use the EXACT variant/trim names that ${ctx.selections.make} used in India for the ${ctx.selections.year} ${ctx.selections.model}
- Follow the manufacturer's naming philosophy (e.g., Maruti: LXi/VXi/ZXi/ZXi+, Hyundai: Era/Magna/Sportz/Asta, Tata: XE/XM/XT/XZ/XZ+)
- Include fuel type and transmission in the description (e.g., "1.2L Petrol Manual", "1.5L Diesel AMT")
- Include fuel type in metadata as "fuelType" and transmission as "transmission"
- Include engine CC in metadata as "engineCC" if known
- Sort from base to top-end variant
- Maximum 20 options

Return ONLY valid JSON matching this exact schema:
${responseSchema}`

    default:
      return `${baseContext}
${selectionContext ? '\nSelections so far:\n' + selectionContext : ''}

Task: Determine what information should be asked next in the vehicle selection flow.

Return ONLY valid JSON matching this exact schema:
${responseSchema}`
  }
}
