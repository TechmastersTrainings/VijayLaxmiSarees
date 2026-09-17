-- ============================================================
-- Sri Vijaylaxmi Silks — full schema with Row-Level Security
-- Corrected ordering: ALL tables first, then is_admin(),
-- then RLS policies (policies reference the function).
-- Paste into Supabase Dashboard -> SQL Editor -> Run.
-- ============================================================

-- UUID generation helper (idempotent)
create extension if not exists "pgcrypto";

-- ------------------------------------------------------------
-- TABLES
-- ------------------------------------------------------------

-- admins: which authenticated users may administer the store
create table if not exists public.admins (
  id uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);

-- orders: every checkout is recorded here
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  customer_name text not null,
  customer_phone text not null,
  address text,
  city text,
  pin text,
  notes text,
  items jsonb not null default '[]'::jsonb,
  subtotal integer not null default 0,
  item_count integer not null default 0,
  status text not null default 'new'
    check (status in ('new', 'confirmed', 'packed', 'shipped', 'delivered', 'cancelled')),
  source text not null default 'website'
);

create index if not exists orders_created_at_idx on public.orders (created_at desc);
create index if not exists orders_status_idx on public.orders (status);

-- enquiries: contact/lead messages from the site
create table if not exists public.enquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text,
  phone text,
  message text,
  product_id text,
  source text not null default 'website'
);

-- product_overrides: admin price / stock per catalogue item
create table if not exists public.product_overrides (
  product_id text primary key,
  price integer,
  in_stock boolean not null default true,
  note text,
  updated_at timestamptz not null default now()
);

-- ------------------------------------------------------------
-- ADMIN DETECTION FUNCTION (created AFTER tables exist)
-- ------------------------------------------------------------
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (select 1 from public.admins a where a.id = auth.uid());
$$;

-- ------------------------------------------------------------
-- ROW LEVEL SECURITY
-- ------------------------------------------------------------
alter table public.admins enable row level security;
alter table public.orders enable row level security;
alter table public.enquiries enable row level security;
alter table public.product_overrides enable row level security;

-- ------------------------------------------------------------
-- POLICIES
-- ------------------------------------------------------------
-- orders: admin can read/update; anyone may place an order.
-- Select is admin-only because orders hold customer details.
drop policy if exists orders_select_admin on public.orders;
create policy orders_select_admin on public.orders
  for select to authenticated
  using (public.is_admin());

drop policy if exists orders_insert_public on public.orders;
create policy orders_insert_public on public.orders
  for insert to anon, authenticated
  with check (true);

drop policy if exists orders_update_admin on public.orders;
create policy orders_update_admin on public.orders
  for update to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- enquiries: admin reads, anyone sends.
drop policy if exists enquiries_select_admin on public.enquiries;
create policy enquiries_select_admin on public.enquiries
  for select to authenticated
  using (public.is_admin());

drop policy if exists enquiries_insert_public on public.enquiries;
create policy enquiries_insert_public on public.enquiries
  for insert to anon, authenticated
  with check (true);

-- product_overrides: public reads price/stock, admin writes.
drop policy if exists overrides_select_public on public.product_overrides;
create policy overrides_select_public on public.product_overrides
  for select to anon, authenticated
  using (true);

drop policy if exists overrides_write_admin on public.product_overrides;
create policy overrides_write_admin on public.product_overrides
  for all to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- admins: only admins list admin users.
drop policy if exists admins_select_admin on public.admins;
create policy admins_select_admin on public.admins
  for select to authenticated
  using (public.is_admin());

-- ============================================================
-- OPTIONAL open fallback (testing only) — uncomment to let
-- everyone read orders/enquiries too. Remove before going live.
-- ============================================================
-- drop policy if exists orders_select_fallback on public.orders;
-- create policy orders_select_fallback on public.orders
--   for select to anon, authenticated using (true);
-- drop policy if exists enquiries_select_fallback on public.enquiries;
-- create policy enquiries_select_fallback on public.enquiries
--   for select to anon, authenticated using (true);

-- ============================================================
-- AFTER RUNNING: grant admin access.
--  1. Supabase -> Authentication -> Users -> Add user
--  2. Copy that user's UID and run:
--       insert into public.admins (id) values ('<PASTE-UID-HERE>');
-- ============================================================