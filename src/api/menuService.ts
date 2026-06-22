/**
 * AI Menu Service — calls Bedrock to generate dynamic menu options.
 * Includes in-memory + sessionStorage caching to avoid redundant API calls.
 */

import { invokeBedrockModel } from './bedrockClient'
import { buildMenuPrompt, MENU_SYSTEM_PROMPT } from './stepPromptTemplates'
import type { MenuResponse, StepContext } from '../types/aiMenu'

// ─── In-memory cache ─────────────────────────────────────────────────────────
const memoryCache = new Map<string, MenuResponse>()

const SESSION_CACHE_PREFIX = 'unipdi_menu_'

function getCacheKey(ctx: StepContext): string {
  return `${ctx.vehicleType}|${ctx.segment}|${ctx.locale}|${ctx.currentStep}|${JSON.stringify(ctx.selections)}`
}

function getFromSessionCache(key: string): MenuResponse | null {
  try {
    const raw = sessionStorage.getItem(SESSION_CACHE_PREFIX + key)
    if (raw) return JSON.parse(raw) as MenuResponse
  } catch { /* ignore */ }
  return null
}

function setSessionCache(key: string, data: MenuResponse): void {
  try {
    sessionStorage.setItem(SESSION_CACHE_PREFIX + key, JSON.stringify(data))
  } catch { /* ignore quota errors */ }
}

// ─── Response Parser ─────────────────────────────────────────────────────────

function parseMenuResponse(raw: string): MenuResponse {
  let jsonStr = raw.trim()

  // Strip markdown code fences if the model wrapped the response
  if (jsonStr.startsWith('```')) {
    jsonStr = jsonStr.replace(/^```(?:json)?\s*\n?/, '').replace(/\n?\s*```$/, '')
  }

  // Try to extract JSON object if there's extra text around it
  const jsonMatch = jsonStr.match(/\{[\s\S]*\}/)
  if (jsonMatch) {
    jsonStr = jsonMatch[0]
  }

  const parsed = JSON.parse(jsonStr)

  // Basic shape validation
  if (!parsed.stepId || !parsed.options || !Array.isArray(parsed.options)) {
    throw new Error('Invalid MenuResponse shape: missing stepId or options array')
  }

  // Ensure each option has at least id and label
  const validOptions = parsed.options.filter(
    (opt: Record<string, unknown>) => opt && typeof opt.id === 'string' && typeof opt.label === 'string'
  )

  return {
    stepId: parsed.stepId,
    question: parsed.question || 'Select an option',
    subtitle: parsed.subtitle,
    options: validOptions,
    allowCustom: parsed.allowCustom ?? true,
  } as MenuResponse
}

// ─── Public API ──────────────────────────────────────────────────────────────

/**
 * Fetches menu options for a given step context.
 * Checks memory cache → session cache → calls AI.
 */
export async function fetchMenuOptions(ctx: StepContext): Promise<MenuResponse> {
  const key = getCacheKey(ctx)

  // Level 1: in-memory cache
  if (memoryCache.has(key)) {
    return memoryCache.get(key)!
  }

  // Level 2: sessionStorage cache
  const sessionCached = getFromSessionCache(key)
  if (sessionCached) {
    memoryCache.set(key, sessionCached)
    return sessionCached
  }

  // Level 3: call AI
  const prompt = buildMenuPrompt(ctx)
  const rawResponse = await invokeBedrockModel(prompt, MENU_SYSTEM_PROMPT)
  const parsed = parseMenuResponse(rawResponse)

  // Store in both caches
  memoryCache.set(key, parsed)
  setSessionCache(key, parsed)

  return parsed
}

/**
 * Clears all cached menu responses (useful for testing or when settings change).
 */
export function clearMenuCache(): void {
  memoryCache.clear()
  // Clear sessionStorage entries with our prefix
  const keysToRemove: string[] = []
  for (let i = 0; i < sessionStorage.length; i++) {
    const key = sessionStorage.key(i)
    if (key?.startsWith(SESSION_CACHE_PREFIX)) {
      keysToRemove.push(key)
    }
  }
  keysToRemove.forEach((k) => sessionStorage.removeItem(k))
}
