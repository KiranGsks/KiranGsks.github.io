import type { Vehicle, InspectionTrack } from '../types/vehicle'

/**
 * Builds the structured prompt for generating a used-vehicle inspection checklist.
 * Tailored to the buyer's perspective — what to check before purchasing.
 */
export function buildInspectionPrompt(vehicle: Vehicle, track: InspectionTrack = 'standard'): string {
  const trackDescriptions: Record<InspectionTrack, string> = {
    quick: '5-10 critical items only — the absolute must-checks that reveal deal-breakers',
    standard: '20-30 items covering important mechanical, cosmetic, and safety checks',
    deep: '40-60 exhaustive items including niche vehicle-specific checks, minor cosmetic items, and all electronics',
  }

  return `You are a used vehicle buying assistant helping a consumer inspect a ${vehicle.type} before purchase in India. Given the vehicle details, return a structured JSON inspection checklist tailored to this specific vehicle.

Vehicle Details:
- Type: ${vehicle.type}
- Year: ${vehicle.year}
- Make: ${vehicle.make}
- Model: ${vehicle.model}
- Variant: ${vehicle.variant}
${vehicle.fuelType ? `- Fuel Type: ${vehicle.fuelType}` : ''}
${vehicle.transmission ? `- Transmission: ${vehicle.transmission}` : ''}
${vehicle.engineCC ? `- Engine: ${vehicle.engineCC}cc` : ''}
${vehicle.registration ? `- Registration: ${vehicle.registration}` : ''}

Inspection Track: ${track}
Track Description: ${trackDescriptions[track]}

Generate a checklist appropriate for a BUYER inspecting this vehicle. Consider:
1. Known issues specific to this make/model/year (e.g., VW Vento DSG issues, Hyundai diesel injector problems)
2. Features expected at this variant level
3. Common fraud indicators for this vehicle segment
4. Age-appropriate wear items (older cars need different checks than newer ones)
5. Fuel-type specific checks (diesel: injectors, DPF; petrol: spark plugs; CNG: tank expiry)
6. Transmission-specific checks (AMT: actuator, DCT: clutch wear, CVT: belt condition)

Return ONLY a valid JSON object (no markdown, no code fences) with this exact structure:

{
  "vehicleSummary": "Brief description of what to expect from this vehicle at this age/variant",
  "categories": [
    {
      "id": "category_id",
      "label": "Category Name",
      "items": [
        {
          "id": "unique_item_id",
          "label": "Human-readable check label (jargon-free)",
          "category": "category_id",
          "description": "What to look for and how to check it — written for a novice buyer",
          "checkType": "toggle|confirm|measure|select",
          "expectedState": "What a good result looks like",
          "redFlagIf": "What indicates a problem"
        }
      ]
    }
  ],
  "knownIssues": ["Known problems specific to this model/year that the buyer should be aware of"],
  "notes": ["General buying tips for this vehicle"]
}

checkType meanings:
- "toggle": Simple pass/fail check (e.g., AC blows cold)
- "confirm": Visual confirmation (e.g., no rust on underbody)
- "measure": Requires checking a value (e.g., tire tread depth)
- "select": Choose from options (include "options" array)

Categories to consider (adapt based on vehicle type and track depth):
- Exterior (paint, panels, gaps, rust, lights, mirrors)
- Interior (seats, dashboard, controls, smell, wear)
- Engine & Mechanical (start quality, sounds, leaks, belts)
- Electrical (all switches, infotainment, sensors, cameras)
- Wheels & Tyres (tread, age, spare, alignment signs)
- Underbody (rust, leaks, damage, exhaust)
- Documents (RC, insurance, service history, NOC)
- Test Drive (steering, brakes, gearbox, suspension, noise)

For ${track} track: generate exactly ${track === 'quick' ? '5-10' : track === 'standard' ? '20-30' : '40-60'} items.
Prioritize the most critical items first within each category.
Write descriptions as if explaining to someone who has never inspected a car before.`
}

/**
 * System prompt for the used-vehicle buying assistant.
 */
export const SYSTEM_PROMPT = `You are a knowledgeable used vehicle buying assistant for the Indian market. You have deep expertise in:
- All major car and bike brands sold in India (Maruti, Hyundai, Tata, Mahindra, Honda, Toyota, VW, Ford, Kia, etc.)
- Known issues and common problems for specific models and years
- Fair market pricing for used vehicles
- Common scam patterns in the Indian used car market
- Mechanical inspection techniques explained simply for non-experts

Always respond with valid JSON only — no markdown formatting, no explanations outside the JSON structure. Your responses directly drive a UI that renders inspection checklists for buyers. Write all descriptions in simple, jargon-free language that a first-time car buyer would understand.`

/**
 * Builds a pricing analysis prompt.
 */
export function buildPricingPrompt(vehicle: Vehicle, askingPrice: number, odometerKm?: number, ownerCount?: number): string {
  return `Analyze the pricing for this used vehicle listing in India:

Vehicle: ${vehicle.year} ${vehicle.make} ${vehicle.model} ${vehicle.variant}
${vehicle.fuelType ? `Fuel: ${vehicle.fuelType}` : ''}
${vehicle.transmission ? `Transmission: ${vehicle.transmission}` : ''}
Asking Price: ₹${askingPrice.toLocaleString('en-IN')}
${odometerKm ? `Odometer: ${odometerKm.toLocaleString()} km` : ''}
${ownerCount ? `Owner Count: ${ownerCount}` : ''}

Return ONLY valid JSON:
{
  "estimatedMarketRange": { "low": number, "high": number },
  "askingPriceVerdict": "too_cheap | fair | slightly_high | overpriced",
  "riskLevel": "low | medium | high | critical",
  "flags": [
    {
      "type": "pricing_anomaly | age_mismatch | odometer_suspect",
      "severity": "low | medium | high",
      "message": "Human-readable explanation",
      "explanation": "Why this is concerning"
    }
  ],
  "recommendation": "Overall recommendation for the buyer",
  "notes": "Any additional context"
}`
}
