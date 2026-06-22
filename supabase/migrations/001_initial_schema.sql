-- UniPDI Database Schema
-- Run this in your Supabase SQL editor to set up the database.
-- ═══════════════════════════════════════════════════════════════════════════════

-- Enable Row Level Security on all tables
-- Users can only access their own data.

-- ─── Profiles ─────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  tier TEXT NOT NULL DEFAULT 'free' CHECK (tier IN ('free', 'hunter', 'pro', 'pro_plus')),
  is_professional BOOLEAN NOT NULL DEFAULT FALSE,
  free_trial_used BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();


-- ─── Credits ──────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS credits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  credits_remaining INTEGER NOT NULL CHECK (credits_remaining >= 0),
  credits_total INTEGER NOT NULL CHECK (credits_total > 0),
  pack_type TEXT NOT NULL CHECK (pack_type IN (
    'free_trial', 'single_used', 'single_new', 
    'hunter_5', 'hunter_15', 
    'pro_monthly', 'pro_annual', 'pro_plus'
  )),
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE credits ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own credits"
  ON credits FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own credits"
  ON credits FOR UPDATE
  USING (auth.uid() = user_id);

-- Index for fast credit lookup
CREATE INDEX idx_credits_user_remaining ON credits(user_id, credits_remaining)
  WHERE credits_remaining > 0;


-- ─── Inspections ──────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS inspections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  vehicle_type TEXT NOT NULL CHECK (vehicle_type IN ('car', 'bike')),
  vehicle_json JSONB NOT NULL,
  segment TEXT NOT NULL CHECK (segment IN ('brand_new', 'used', 'certified_preowned')),
  track TEXT NOT NULL CHECK (track IN ('quick', 'standard', 'deep')),
  checklist_json JSONB,
  status TEXT NOT NULL DEFAULT 'in_progress' CHECK (status IN ('in_progress', 'completed', 'abandoned')),
  credit_id UUID REFERENCES credits(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  completed_at TIMESTAMPTZ
);

ALTER TABLE inspections ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own inspections"
  ON inspections FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own inspections"
  ON inspections FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own inspections"
  ON inspections FOR UPDATE
  USING (auth.uid() = user_id);

-- Index for history queries
CREATE INDEX idx_inspections_user_date ON inspections(user_id, created_at DESC);


-- ─── Payments ─────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  razorpay_order_id TEXT,
  razorpay_payment_id TEXT,
  amount_paise INTEGER NOT NULL CHECK (amount_paise > 0),
  currency TEXT NOT NULL DEFAULT 'INR',
  pack_type TEXT NOT NULL CHECK (pack_type IN (
    'single_used', 'single_new', 
    'hunter_5', 'hunter_15', 
    'pro_monthly', 'pro_annual', 'pro_plus'
  )),
  status TEXT NOT NULL DEFAULT 'created' CHECK (status IN ('created', 'paid', 'failed', 'refunded')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own payments"
  ON payments FOR SELECT
  USING (auth.uid() = user_id);

-- Only backend/edge functions should insert/update payments
-- (via service_role key, bypasses RLS)


-- ─── Summary ──────────────────────────────────────────────────────────────────
-- 
-- Tables created:
--   profiles   - User profile with tier and trial status
--   credits    - Credit packs with expiration
--   inspections - Inspection history
--   payments   - Payment records (Razorpay)
--
-- RLS enabled on all tables.
-- Auto-profile creation on signup via trigger.
-- 
-- To grant credits after payment (run from edge function with service_role):
--   INSERT INTO credits (user_id, credits_remaining, credits_total, pack_type, expires_at)
--   VALUES ($user_id, 5, 5, 'hunter_5', NOW() + INTERVAL '30 days');
