/**
 * Razorpay payment integration for UniPDI.
 * 
 * Razorpay is loaded via their checkout.js script.
 * The flow is:
 * 1. User clicks "Buy" → we create an order (via backend/edge function)
 * 2. Razorpay checkout opens → user pays via UPI/card/netbanking
 * 3. On success → webhook updates credits in database
 * 4. Frontend refreshes credit balance
 * 
 * For the MVP, we use Razorpay's client-side checkout.
 * The Razorpay key_id is public (safe to expose).
 */

import type { PricingPlan } from '../utils/creditSystem'
import { PRICING } from '../utils/creditSystem'

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => RazorpayInstance
  }
}

interface RazorpayOptions {
  key: string
  amount: number
  currency: string
  name: string
  description: string
  order_id?: string
  prefill?: {
    name?: string
    email?: string
    contact?: string
  }
  theme?: {
    color?: string
  }
  handler: (response: RazorpaySuccessResponse) => void
  modal?: {
    ondismiss?: () => void
  }
}

interface RazorpayInstance {
  open: () => void
  close: () => void
}

export interface RazorpaySuccessResponse {
  razorpay_payment_id: string
  razorpay_order_id: string
  razorpay_signature: string
}

/**
 * Load Razorpay checkout script dynamically.
 */
export function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true)
      return
    }

    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.async = true
    script.onload = () => resolve(true)
    script.onerror = () => resolve(false)
    document.body.appendChild(script)
  })
}

/**
 * Get Razorpay key from environment.
 */
function getRazorpayKey(): string {
  const key = import.meta.env.VITE_RAZORPAY_KEY_ID as string
  if (!key) {
    throw new Error('VITE_RAZORPAY_KEY_ID not configured in environment')
  }
  return key
}

export function isRazorpayConfigured(): boolean {
  return !!(import.meta.env.VITE_RAZORPAY_KEY_ID as string)
}

export interface CheckoutParams {
  plan: PricingPlan
  orderId?: string // from backend, if pre-created
  userEmail?: string
  userName?: string
  onSuccess: (response: RazorpaySuccessResponse) => void
  onDismiss?: () => void
}

/**
 * Open Razorpay checkout for a specific plan.
 */
export async function openCheckout(params: CheckoutParams): Promise<void> {
  const loaded = await loadRazorpayScript()
  if (!loaded) {
    throw new Error('Failed to load Razorpay checkout script')
  }

  const planDetails = PRICING[params.plan]
  const key = getRazorpayKey()

  const options: RazorpayOptions = {
    key,
    amount: planDetails.price,
    currency: 'INR',
    name: 'UniPDI',
    description: planDetails.label,
    order_id: params.orderId,
    prefill: {
      email: params.userEmail,
      name: params.userName,
    },
    theme: {
      color: '#2563eb', // matches app primary color
    },
    handler: params.onSuccess,
    modal: {
      ondismiss: params.onDismiss,
    },
  }

  const rzp = new window.Razorpay(options)
  rzp.open()
}

/**
 * Pricing display helper for UI.
 */
export function getPlanDisplayInfo(plan: PricingPlan) {
  const details = PRICING[plan]
  return {
    ...details,
    perInspection: details.credits > 0
      ? `₹${Math.round(details.price / 100 / details.credits)}/inspection`
      : 'Unlimited',
    savings: plan === 'hunter_5'
      ? 'Save ₹246 vs singles'
      : plan === 'hunter_15'
        ? 'Save ₹1,236 vs singles'
        : null,
  }
}
