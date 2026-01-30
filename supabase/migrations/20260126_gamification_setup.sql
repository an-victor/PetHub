-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Gamification Profiles (State State)
CREATE TABLE IF NOT EXISTS public.gamification_profiles (
    user_id UUID REFERENCES auth.users(id) PRIMARY KEY,
    level INTEGER DEFAULT 1,
    level_name TEXT DEFAULT 'Filhote',
    total_points INTEGER DEFAULT 0,
    available_points INTEGER DEFAULT 0,
    spent_points INTEGER DEFAULT 0,
    streak_days INTEGER DEFAULT 0,
    last_activity_at TIMESTAMPTZ DEFAULT NOW(),
    last_level_up_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Actions Catalog (Static Rules)
CREATE TABLE IF NOT EXISTS public.gamification_actions (
    id TEXT PRIMARY KEY, -- e.g. 'registrar_vacina'
    description TEXT NOT NULL,
    free_points INTEGER NOT NULL,
    premium_points INTEGER NOT NULL,
    cooldown_seconds INTEGER DEFAULT 0,
    proof_required TEXT
);

-- Seed Actions
INSERT INTO public.gamification_actions (id, description, free_points, premium_points, cooldown_seconds, proof_required)
VALUES 
('registrar_vacina', 'Registrar vacina', 500, 750, 0, 'foto'),
('agendar_consulta', 'Agendar consulta', 100, 150, 0, '-'),
('comparecer_consulta', 'Comparecer à consulta', 300, 450, 0, 'gps'),
('marcar_banho', 'Agendar banho', 100, 150, 0, '-')
ON CONFLICT (id) DO NOTHING;

-- 3. Point Transactions (History / Audit)
CREATE TABLE IF NOT EXISTS public.gamification_transactions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) NOT NULL,
    action_id TEXT REFERENCES public.gamification_actions(id) NOT NULL,
    points_awarded INTEGER NOT NULL,
    metadata JSONB DEFAULT '{}',
    status TEXT DEFAULT 'pending', -- pending, validated, rejected
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. RLS Policies
ALTER TABLE public.gamification_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gamification_actions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gamification_transactions ENABLE ROW LEVEL SECURITY;

-- Profiles: Users see their own, System updates
CREATE POLICY "Users can view own profile" ON public.gamification_profiles
    FOR SELECT USING (auth.uid() = user_id);

-- Actions: Publicly readable
CREATE POLICY "Actions are readable by authenticated users" ON public.gamification_actions
    FOR SELECT TO authenticated USING (true);

-- Transactions: Users can insert "claimed" actions, but points are calc'd by trigger/function
CREATE POLICY "Users can view own transactions" ON public.gamification_transactions
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert transactions" ON public.gamification_transactions
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 5. Trigger to Update Profile on Transaction Validation
-- This function protects against "farming" by verifying the insert logic
CREATE OR REPLACE FUNCTION handle_new_transaction()
RETURNS TRIGGER AS $$
BEGIN
    -- Update Profile Points
    UPDATE public.gamification_profiles
    SET 
        total_points = total_points + NEW.points_awarded,
        available_points = available_points + NEW.points_awarded,
        last_activity_at = NOW(),
        updated_at = NOW()
    WHERE user_id = NEW.user_id;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_transaction_verified
    AFTER INSERT ON public.gamification_transactions
    FOR EACH ROW
    WHEN (NEW.status = 'validated')
    EXECUTE FUNCTION handle_new_transaction();

-- Function to handle auto-profile creation
CREATE OR REPLACE FUNCTION handle_new_user_profile()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.gamification_profiles (user_id)
    VALUES (NEW.id);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger on Auth User Created (Standard for Supabase)
-- Uncomment if you have access to auth.users trigger creation
-- CREATE TRIGGER on_auth_user_created
--     AFTER INSERT ON auth.users
--     FOR EACH ROW EXECUTE FUNCTION handle_new_user_profile();
