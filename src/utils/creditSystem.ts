/**
 * Credit system for UniPDI.
 * 
 * Determines whether a user can perform an inspection based on:
 * - Vehicle type (bike = always free)
 * - Track level (quick = always free)
 * - User tier (pro = unlimited)
 * - Available credits
 * - Free trial status (first used car inspection is free)
 */

import { supabase, isSupabaseConfigured } from '../lib/supabase'
import type { Credit, Profile } from '../types/database'

export type InspectionEligibility = {
  allowed: boolean
  reason: 'free_quick_scan' | 'free_bike' | 'free_trial' | 'pro_unlimited' | 'has_credits' | 'needs_payment'
  creditToDeduct?: Credit
  message: string
}

export type VehicleContext = {
  vehicleType: 'car' | 'bike'
  segment: 'brand_new' | 'used'
  track: 'quick' | 'standard' | 'deep'
}

/**
 * Check if a user is eligible to perform an inspection.
 * This is the main gating function called before generating a checklist.
 */
export function checkEligibility(
  profile: Profile | null,
  credits: Credit[],
  context: VehicleContext
): InspectionEligibility {
  // Rule 1: Quick Scan is ALWAYS free for everyone
  if (context.track === 'quick') {
    return {
      allowed: true,
      reason: 'free_quick_scan',
      message: 'Quick Scan is always free!',
    }
  }

  // Rule 2: All bike inspections are free (for now)
  if (context.vehicleType === 'bike') {
    return {
      allowed: true,
      reason: 'free_bike',
      message: 'Bike inspections are free!',
    }
  }

  // Rule 3: Pro users get unlimited access
  if (profile?.tier === 'pro' || profile?.tier === 'pro_plus') {
    return {
      allowed: true,
      reason: 'pro_unlimited',
      message: 'Unlimited inspections with your Pro plan.',
    }
  }

  // Rule 4: First full used car inspection is free (one-time trial)
  if (profile && !profile.free_trial_used && context.segment === 'used') {
    return {
      allowed: true,
      reason: 'free_trial',
      message: 'Your first full used car inspection is on us!',
    }
  }

  // Rule 5: Check available credits
  const validCredit = findValidCredit(credits)
  if (validCredit) {
    return {
      allowed: true,
      reason: 'has_credits',
      creditToDeduct: validCredit,
      message: `Using 1 of your ${validCredit.credits_remaining} remaining credits.`,
    }
  }

  // Rule 6: No access — needs payment
  return {
    allowed: false,
    reason: 'needs_payment',
    message: context.segment === 'brand_new'
      ? 'New car PDI requires a credit. Starting at ₹299.'
      : 'This inspection requires a credit. Starting at ₹149.',
  }
}

/**
 * Find the best credit to use (nearest expiration first, then oldest first).
 */
function findValidCredit(credits: Credit[]): Credit | null {
  const now = new Date().toISOString()

  const valid = credits
    .filter((c) => c.credits_remaining > 0)
    .filter((c) => !c.expires_at || c.expires_at > now)
    .sort((a, b) => {
      // Expiring soonest first (use-it-or-lose-it)
      if (a.expires_at && b.expires_at) {
        return a.expires_at.localeCompare(b.expires_at)
      }
      if (a.expires_at && !b.expires_at) return -1
      if (!a.expires_at && b.expires_at) return 1
      // Then oldest created first
      return a.created_at.localeCompare(b.created_at)
    })

  return valid[0] ?? null
}

/**
 * Deduct one credit after a successful inspection generation.
 * Returns true if deduction succeeded.
 */
export async function deductCredit(credit: Credit): Promise<boolean> {
  if (!isSupabaseConfigured()) return false

  const { error } = await (supabase
    .from('credits') as any)
    .update({ credits_remaining: credit.credits_remaining - 1 })
    .eq('id', credit.id)
    .eq('credits_remaining', credit.credits_remaining) // optimistic lock

  return !error
}

/**
 * Mark the user's free trial as used.
 */
export async function markFreeTrialUsed(userId: string): Promise<boolean> {
  if (!isSupabaseConfigured()) return false

  const { error } = await (supabase
    .from('profiles') as any)
    .update({ free_trial_used: true, updated_at: new Date().toISOString() })
    .eq('id', userId)

  return !error
}

/**
 * Fetch all valid credits for a user.
 */
export async function fetchUserCredits(userId: string): Promise<Credit[]> {
  if (!isSupabaseConfigured()) return []

  const { data, error } = await supabase
    .from('credits')
    .select('*')
    .eq('user_id', userId)
    .gt('credits_remaining', 0)
    .order('expires_at', { ascending: true, nullsFirst: false })

  if (error) {
    console.error('[Credits] Failed to fetch:', error.message)
    return []
  }

  return data ?? []
}

/**
 * Get total remaining credits across all packs.
 */
export function getTotalCredits(credits: Credit[]): number {
  const now = new Date().toISOString()
  return credits
    .filter((c) => !c.expires_at || c.expires_at > now)
    .reduce((sum, c) => sum + c.credits_remaining, 0)
}

/**
 * Pricing constants for display in the UI.
 */
export const PRICING = {
  single_used: {
    label: 'Single Inspection (Used Car)',
    price: 149_00, // in paise
    priceDisplay: '₹149',
    credits: 1,
    validDays: null, // no expiry for single
  },
  single_new: {
    label: 'New Car PDI',
    price: 299_00,
    priceDisplay: '₹299',
    credits: 1,
    validDays: null,
  },
  hunter_5: {
    label: 'Hunter Pack (5 inspections)',
    price: 499_00,
    priceDisplay: '₹499',
    credits: 5,
    validDays: 30,
  },
  hunter_15: {
    label: 'Hunter Pack (15 inspections)',
    price: 999_00,
    priceDisplay: '₹999',
    credits: 15,
    validDays: 60,
  },
  pro_monthly: {
    label: 'Pro Monthly',
    price: 1499_00,
    priceDisplay: '₹1,499/mo',
    credits: -1, // unlimited
    validDays: 30,
  },
  pro_annual: {
    label: 'Pro Annual',
    price: 12999_00,
    priceDisplay: '₹12,999/yr',
    credits: -1,
    validDays: 365,
  },
  pro_plus: {
    label: 'Pro+ with Perks',
    price: 2499_00,
    priceDisplay: '₹2,499/mo',
    credits: -1,
    validDays: 30,
  },
} as const satisfies Record<string, {
  label: string
  price: number
  priceDisplay: string
  credits: number
  validDays: number | null
}>

export type PricingPlan = keyof typeof PRICING
