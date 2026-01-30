-- PETHUB DATABASE SCHEMA V1.0
-- RODAR ISSO NO SQL EDITOR DO SUPABASE

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. PROFILES (Extends auth.users)
create table public.profiles (
  id uuid references auth.users not null primary key,
  email text,
  full_name text,
  avatar_url text,
  phone text,                           -- Added for payments/contact
  cpf text unique,                      -- Added for payments (PIX/Boleto)
  city text,
  state text,
  role text default 'tutor' check (role in ('tutor', 'vet', 'clinic')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- RLS: Profiles
alter table public.profiles enable row level security;
create policy "Public profiles are viewable by everyone." on public.profiles for select using (true);
create policy "Users can insert their own profile." on public.profiles for insert with check (auth.uid() = id);
create policy "Users can update own profile." on public.profiles for update using (auth.uid() = id);

-- 2. PETS
create table public.pets (
  id uuid default uuid_generate_v4() primary key,
  owner_id uuid references public.profiles(id) not null,
  name text not null,
  type text not null check (type in ('dog', 'cat')),
  breed text,
  birth_date date,
  gender text check (gender in ('male', 'female')),
  weight numeric,
  color text,
  avatar_url text,
  microchip text,
  neutered boolean default false,
  created_at timestamptz default now()
);

-- RLS: Pets
alter table public.pets enable row level security;
create policy "Users can view own pets" on public.pets for select using (auth.uid() = owner_id);
create policy "Users can insert own pets" on public.pets for insert with check (auth.uid() = owner_id);
create policy "Users can update own pets" on public.pets for update using (auth.uid() = owner_id);
create policy "Users can delete own pets" on public.pets for delete using (auth.uid() = owner_id);

-- 3. VACCINES (Carteirinha Digital)
create table public.vaccines (
  id uuid default uuid_generate_v4() primary key,
  pet_id uuid references public.pets(id) on delete cascade not null,
  name text not null,
  status text not null check (status in ('applied', 'upcoming', 'overdue')),
  date date not null,
  next_dose_date date,
  vet_name text,
  clinic_name text,
  batch_number text,
  notes text,
  created_at timestamptz default now()
);

-- RLS: Vaccines
alter table public.vaccines enable row level security;
-- Policy simple: User can read/write if they are authenticated (for simplicity in v1, ideally check ownership)
-- Robust ownership check:
create policy "Users can view vaccines of own pets" on public.vaccines for select using (
  exists (select 1 from public.pets where pets.id = vaccines.pet_id and pets.owner_id = auth.uid())
);
create policy "Users can insert vaccines for own pets" on public.vaccines for insert with check (
  exists (select 1 from public.pets where pets.id = vaccines.pet_id and pets.owner_id = auth.uid())
);
create policy "Users can update vaccines of own pets" on public.vaccines for update using (
  exists (select 1 from public.pets where pets.id = vaccines.pet_id and pets.owner_id = auth.uid())
);
create policy "Users can delete vaccines of own pets" on public.vaccines for delete using (
  exists (select 1 from public.pets where pets.id = vaccines.pet_id and pets.owner_id = auth.uid())
);

-- 4. GAMIFICATION STATS
create table public.gamification_stats (
  user_id uuid references public.profiles(id) primary key,
  points integer default 0,
  level integer default 1,
  current_streak integer default 0,
  last_activity_date date,
  total_xp integer default 0,
  updated_at timestamptz default now()
);

alter table public.gamification_stats enable row level security;
create policy "View own stats" on public.gamification_stats for select using (auth.uid() = user_id);
create policy "Update own stats" on public.gamification_stats for update using (auth.uid() = user_id);

-- 5. POINTS HISTORY
create table public.points_history (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) not null,
  action_type text not null,
  points_earned integer not null,
  description text,
  created_at timestamptz default now()
);

alter table public.points_history enable row level security;
create policy "View own history" on public.points_history for select using (auth.uid() = user_id);

-- TRIGGERS --

-- Auto-create Profile and Gamification Stats on Signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name, avatar_url, phone)
  values (
    new.id, 
    new.email, 
    new.raw_user_meta_data->>'full_name', 
    new.raw_user_meta_data->>'avatar_url',
    new.raw_user_meta_data->>'phone'
  );
  
  insert into public.gamification_stats (user_id) values (new.id);
  
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- STORAGE BUCKETS (If needed)
-- insert into storage.buckets (id, name) values ('avatars', 'avatars');
-- create policy "Avatar images are publicly accessible." on storage.objects for select using ( bucket_id = 'avatars' );
-- create policy "Anyone can upload an avatar." on storage.objects for insert with check ( bucket_id = 'avatars' );
