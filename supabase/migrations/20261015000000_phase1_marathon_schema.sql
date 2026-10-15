-- ============================================================================
-- ASM Ventures Marathon 2027 — Phase 1 Database Migration
-- Tables: race_slots, registrations, payments, email_logs
-- Security: Strict Row Level Security (RLS) denying anonymous writes
-- ============================================================================

-- Enable pgcrypto for UUID generation
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ----------------------------------------------------------------------------
-- 1. RACE SLOTS & CAPACITY ALLOCATION
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.race_slots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_code TEXT NOT NULL,                         -- '5k', '10k', '21k', '42k'
  category_name TEXT NOT NULL,                         -- '5K Fun Run', '21K Half Marathon'
  slot_name TEXT NOT NULL,                             -- 'Corral A (Elite / Seeded)', 'Corral B (Open Wave)'
  reporting_time TIME NOT NULL,                        -- e.g. 04:30:00
  flag_off_time TIME NOT NULL,                         -- e.g. 05:00:00
  total_capacity INTEGER NOT NULL DEFAULT 500,
  allocated_count INTEGER NOT NULL DEFAULT 0,
  price_inr NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
  min_age INTEGER NOT NULL DEFAULT 8,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  CONSTRAINT valid_capacity CHECK (allocated_count <= total_capacity),
  CONSTRAINT positive_capacity CHECK (total_capacity > 0)
);

-- Index for rapid slot availability queries
CREATE INDEX IF NOT EXISTS idx_race_slots_cat_active ON public.race_slots (category_code, is_active);

-- ----------------------------------------------------------------------------
-- 2. REGISTRATIONS (Private Athlete Data)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  registration_number TEXT UNIQUE NOT NULL,            -- e.g. 'PRIDE-2027-21K-ABC12'
  slot_id UUID NOT NULL REFERENCES public.race_slots(id) ON DELETE RESTRICT,
  category_code TEXT NOT NULL,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  gender TEXT NOT NULL,
  dob DATE NOT NULL,
  city TEXT NOT NULL,
  blood_group TEXT,
  tshirt_size TEXT NOT NULL,
  bib_name TEXT NOT NULL,
  emergency_name TEXT NOT NULL,
  emergency_phone TEXT NOT NULL,
  medical_conditions TEXT,
  qualifying_proof_url TEXT,
  status TEXT NOT NULL DEFAULT 'slot_reserved',        -- 'slot_reserved', 'pending_payment', 'confirmed', 'cancelled'
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_registrations_email ON public.registrations (email);
CREATE INDEX IF NOT EXISTS idx_registrations_slot_id ON public.registrations (slot_id);
CREATE INDEX IF NOT EXISTS idx_registrations_status ON public.registrations (status);

-- ----------------------------------------------------------------------------
-- 3. PAYMENTS (Financial Ledger)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  registration_id UUID NOT NULL REFERENCES public.registrations(id) ON DELETE CASCADE,
  razorpay_order_id TEXT UNIQUE NOT NULL,
  razorpay_payment_id TEXT UNIQUE,
  razorpay_signature TEXT,
  amount_paise BIGINT NOT NULL,                        -- Amount in Indian Paise (e.g. 129900 = ₹1299.00)
  currency TEXT NOT NULL DEFAULT 'INR',
  status TEXT NOT NULL DEFAULT 'created',              -- 'created', 'authorized', 'captured', 'failed', 'refunded'
  error_code TEXT,
  error_description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_payments_registration_id ON public.payments (registration_id);
CREATE INDEX IF NOT EXISTS idx_payments_order_id ON public.payments (razorpay_order_id);

-- ----------------------------------------------------------------------------
-- 4. EMAIL LOGS (Audit Trail)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.email_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  registration_id UUID REFERENCES public.registrations(id) ON DELETE SET NULL,
  recipient_email TEXT NOT NULL,
  email_type TEXT NOT NULL,                            -- 'slot_reservation', 'payment_pending', 'order_receipt', 'bib_pass'
  delivery_status TEXT NOT NULL DEFAULT 'queued',      -- 'queued', 'sent', 'delivered', 'failed'
  provider_id TEXT,
  error_message TEXT,
  sent_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_email_logs_recipient ON public.email_logs (recipient_email);

-- ----------------------------------------------------------------------------
-- 5. ROW LEVEL SECURITY (RLS) POLICIES
-- Strict Isolation: Anonymous direct writes to private tables are strictly blocked
-- ----------------------------------------------------------------------------

-- Enable RLS across all tables
ALTER TABLE public.race_slots ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.email_logs ENABLE ROW LEVEL SECURITY;

-- RACE SLOTS: Public read access for active slots, but NO public insert/update/delete
DROP POLICY IF EXISTS "Public can view active race slots" ON public.race_slots;
CREATE POLICY "Public can view active race slots"
  ON public.race_slots
  FOR SELECT
  TO public
  USING (is_active = true);

-- REGISTRATIONS: Anonymous direct writes DENIED.
-- Only backend service-role / authenticated admin can write or read full records.
DROP POLICY IF EXISTS "Deny direct anon insert to registrations" ON public.registrations;
CREATE POLICY "Service role full access on registrations"
  ON public.registrations
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- PAYMENTS: Anonymous direct writes DENIED.
DROP POLICY IF EXISTS "Service role full access on payments" ON public.payments;
CREATE POLICY "Service role full access on payments"
  ON public.payments
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- EMAIL LOGS: Anonymous direct access DENIED.
DROP POLICY IF EXISTS "Service role full access on email_logs" ON public.email_logs;
CREATE POLICY "Service role full access on email_logs"
  ON public.email_logs
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- ----------------------------------------------------------------------------
-- 6. PHASE 1 SEED DATA: 2027 RACE CATEGORIES & REPORTING WAVE CORRALS
-- ----------------------------------------------------------------------------
INSERT INTO public.race_slots (category_code, category_name, slot_name, reporting_time, flag_off_time, total_capacity, allocated_count, price_inr, min_age, is_active)
VALUES
  -- 42.2K Full Marathon
  ('42k', '42K Full Marathon', 'Corral 1 — Elite & Sub-3h30 Wave', '04:15:00', '05:00:00', 800, 142, 1899.00, 18, true),
  ('42k', '42K Full Marathon', 'Corral 2 — Open Challenger Wave', '04:30:00', '05:10:00', 1200, 310, 1899.00, 18, true),

  -- 21.1K Half Marathon
  ('21k', '21K Half Marathon', 'Corral A — Fast Wave (Sub-2h)', '05:00:00', '05:45:00', 2500, 1890, 1299.00, 18, true),
  ('21k', '21K Half Marathon', 'Corral B — Open Endurance Wave', '05:15:00', '06:00:00', 3500, 1220, 1299.00, 18, true),

  -- 10K Challenge Run
  ('10k', '10K Challenge Run', 'Wave 1 — Speed Striders', '06:00:00', '06:45:00', 4000, 2150, 799.00, 14, true),
  ('10k', '10K Challenge Run', 'Wave 2 — Fitness Enthusiasts', '06:15:00', '07:00:00', 4000, 980, 799.00, 14, true),

  -- 5K Fun Run
  ('5k', '5K Fun Run', 'Wave 1 — Youth & Corporate Teams', '06:45:00', '07:30:00', 5000, 3100, 499.00, 8, true),
  ('5k', '5K Fun Run', 'Wave 2 — Community & Family Jog', '07:00:00', '07:45:00', 5000, 1400, 499.00, 8, true)
ON CONFLICT DO NOTHING;
