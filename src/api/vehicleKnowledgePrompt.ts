/**
 * AI prompt template for generating vehicle knowledge content.
 * Used as a fallback when the static catalog doesn't have data for a vehicle.
 */

import type { VehicleGeneration } from '../data/vehicleKnowledge'

export const VEHICLE_KNOWLEDGE_SYSTEM_PROMPT = `You are an automotive expert with deep knowledge of vehicles sold in the Indian market. You provide factual, educational information about vehicle platforms, engines, and generations.

CRITICAL RULES:
1. Return ONLY valid JSON — no markdown, no code fences, no explanations outside JSON
2. The JSON must exactly match the VehicleGenerationResponse schema provided
3. Be factually accurate — do not invent specifications
4. Focus on information relevant to a buyer inspecting this vehicle
5. Highlight maintenance-critical items (belt vs chain cam, known failure points)
6. Be informative but not overwhelming — a layperson should understand
7. For engine technology, mention whether cam is belt-driven or chain-driven — this is critical for used car buyers
8. Include real-world pros and cons, not marketing speak`

export type VehicleKnowledgeRequest = {
  make: string
  model: string
  year: number
  variant?: string
  fuelType?: string
  engineCC?: number
}

/**
 * Builds a prompt to generate vehicle knowledge for a specific vehicle.
 * The AI returns a VehicleGeneration-compatible JSON object.
 */
export function buildVehicleKnowledgePrompt(req: VehicleKnowledgeRequest): string {
  const variantInfo = req.variant ? `\n- Variant: ${req.variant}` : ''
  const fuelInfo = req.fuelType ? `\n- Fuel Type: ${req.fuelType}` : ''
  const engineInfo = req.engineCC ? `\n- Engine: ${req.engineCC}cc` : ''

  return `Generate detailed vehicle knowledge for:
- Make: ${req.make}
- Model: ${req.model}
- Year: ${req.year}${variantInfo}${fuelInfo}${engineInfo}
- Market: India

Provide information about the generation/platform this specific year belongs to.

Return ONLY valid JSON matching this exact schema:
{
  "name": "string — generation name (e.g., '3rd Generation' or 'Facelift')",
  "productionYears": [startYear, endYear],
  "platform": "string — platform/architecture name if known",
  "bodyStyle": "string — e.g., '5-door Hatchback', '4-door Sedan'",
  "engines": [
    {
      "id": "kebab-case-unique-id",
      "name": "string — e.g., '1.2L K12C DualJet Petrol'",
      "displacement": number_in_cc,
      "cylinders": number,
      "configuration": "string — e.g., 'Inline-4', 'V6', 'Single-cylinder'",
      "fuelType": "petrol|diesel|cng|electric|hybrid",
      "power": "string — e.g., '90 PS @ 6000 rpm'",
      "torque": "string — e.g., '113 Nm @ 4400 rpm'",
      "technology": ["array of tech highlights — MUST include cam drive type (belt/chain)"],
      "transmissions": ["array of available transmissions"],
      "highlights": ["1-3 notable points about this engine for a buyer"]
    }
  ],
  "highlights": ["4-6 key facts about this generation"],
  "knownIssues": ["3-5 common problems to watch for when buying used"],
  "prosAndCons": {
    "pros": ["4-6 genuine advantages"],
    "cons": ["4-6 honest disadvantages"]
  }
}

IMPORTANT:
- Include ALL engine options available for this generation in India (not just the one matching the variant)
- For each engine, ALWAYS specify whether the camshaft is belt-driven or chain-driven in the technology array
- Known issues should be specific and actionable (e.g., "timing belt needs replacement every 60,000 km" not just "engine issues")
- Pros and cons should be honest and balanced — not marketing material`
}

/**
 * Parse the AI response into a VehicleGeneration object.
 * Returns null if parsing fails.
 */
export function parseVehicleKnowledgeResponse(responseText: string): VehicleGeneration | null {
  try {
    // Try to extract JSON from the response (in case AI wraps it)
    let jsonStr = responseText.trim()
    
    // Remove markdown code fences if present
    if (jsonStr.startsWith('```')) {
      jsonStr = jsonStr.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '')
    }

    const parsed = JSON.parse(jsonStr)

    // Validate required fields
    if (!parsed.name || !parsed.productionYears || !parsed.engines || !parsed.prosAndCons) {
      console.error('[VehicleKnowledge] Missing required fields in AI response')
      return null
    }

    return parsed as VehicleGeneration
  } catch (err) {
    console.error('[VehicleKnowledge] Failed to parse AI response:', err)
    return null
  }
}
