/**
 * Supabase Database type definitions.
 * 
 * These types represent the database schema for UniPDI.
 * In production, these would be auto-generated via `supabase gen types typescript`.
 * For now, we define them manually to match our planned schema.
 */

export type UserTier = 'free' | 'hunter' | 'pro' | 'pro_plus'

export type CreditPackType = 'free_trial' | 'single_used' | 'single_new' | 'hunter_5' | 'hunter_15' | 'pro_monthly' | 'pro_annual' | 'pro_plus'

export type InspectionStatus = 'in_progress' | 'completed' | 'abandoned'

export type PaymentStatus = 'created' | 'paid' | 'failed' | 'refunded'

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          tier: UserTier
          is_professional: boolean
          free_trial_used: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          tier?: UserTier
          is_professional?: boolean
          free_trial_used?: boolean
        }
        Update: {
          full_name?: string | null
          tier?: UserTier
          is_professional?: boolean
          free_trial_used?: boolean
          updated_at?: string
        }
      }
      credits: {
        Row: {
          id: string
          user_id: string
          credits_remaining: number
          credits_total: number
          pack_type: CreditPackType
          expires_at: string | null
          created_at: string
        }
        Insert: {
          user_id: string
          credits_remaining: number
          credits_total: number
          pack_type: CreditPackType
          expires_at?: string | null
        }
        Update: {
          credits_remaining?: number
          expires_at?: string | null
        }
      }
      inspections: {
        Row: {
          id: string
          user_id: string
          vehicle_type: 'car' | 'bike'
          vehicle_json: Record<string, unknown>
          segment: 'brand_new' | 'used'
          track: 'quick' | 'standard' | 'deep'
          checklist_json: Record<string, unknown> | null
          status: InspectionStatus
          credit_id: string | null
          created_at: string
          completed_at: string | null
        }
        Insert: {
          user_id: string
          vehicle_type: 'car' | 'bike'
          vehicle_json: Record<string, unknown>
          segment: 'brand_new' | 'used'
          track: 'quick' | 'standard' | 'deep'
          checklist_json?: Record<string, unknown> | null
          status?: InspectionStatus
          credit_id?: string | null
        }
        Update: {
          checklist_json?: Record<string, unknown> | null
          status?: InspectionStatus
          completed_at?: string | null
        }
      }
      payments: {
        Row: {
          id: string
          user_id: string
          razorpay_order_id: string | null
          razorpay_payment_id: string | null
          amount_paise: number
          currency: string
          pack_type: CreditPackType
          status: PaymentStatus
          created_at: string
          updated_at: string
        }
        Insert: {
          user_id: string
          razorpay_order_id?: string | null
          amount_paise: number
          currency?: string
          pack_type: CreditPackType
          status?: PaymentStatus
        }
        Update: {
          razorpay_order_id?: string | null
          razorpay_payment_id?: string | null
          status?: PaymentStatus
          updated_at?: string
        }
      }
    }
  }
}

// Convenience types extracted from Database
export type Profile = Database['public']['Tables']['profiles']['Row']
export type Credit = Database['public']['Tables']['credits']['Row']
export type Inspection = Database['public']['Tables']['inspections']['Row']
export type Payment = Database['public']['Tables']['payments']['Row']
