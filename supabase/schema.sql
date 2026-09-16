-- ============================================================
-- Sri Vijaylaxmi Silks — backend schema (Supabase / Postgres)
-- Run this once in Supabase Dashboard -> SQL Editor -> New query.
--
-- Access model:
--   * Anonymous visitors may CREATE orders (but never read them).
--   * Login-ed admins (listed in public.admins) may READ/UPDATE orders.
--   * Product price/stock overrides are public to read, admin-only to write.
-- ============================================================

-- Orders placed through the website checkout (also sent to WhatsApp).
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

-- Admin-controlled price / stock overrides for the public catalogue.
create table if not exists public.product_overrides (
  product_id text primary key,
  price integer,
  in_stock boolean not null default true,
  note text,
  updated_at timestamptz not null default now()
);

-- Maps Supabase Auth users allowed to administer the store.
create table if not exists public.admins (
  id uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);

-- Helper used by RLS policies. SECURITY DEFINER so it can read public.admins.
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
-- Row-Level Security
-- ------------------------------------------------------------
alter table public.orders enable row level security;
alter table public.product_overrides enable row level security;
alter table public.admins enable row level security;

-- Orders: anyone can place one, only admins can read or change them.
drop policy if exists orders_insert_public on public.orders;
create policy orders_insert_public on public.orders
  for insert to anon, authenticated
  with check (true);

drop policy if exists orders_admin_read on public.orders;
create policy orders_admin_read on public.orders
  for select to authenticated
  using (public.is_admin());

drop policy if exists orders_admin_update on public.orders;
create policy orders_admin_update on public.orders
  for update to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- Product overrides: public read (the storefront needs them), admin write.
drop policy if exists overrides_read_all on public.product_overrides;
create policy overrides_read_all on public.product_overrides
  for select to anon, authenticated
  using (true);

drop policy if exists overrides_admin_write on public.product_overrides;
create policy overrides_admin_write on public.product_overrides
  for all to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- Admins list: only admins may read it. Rows are added manually (see below).
drop policy if exists admins_admin_read on public.admins;
create policy admins_admin_read on public.admins
  for select to authenticated
  using (public.is_admin());

-- ============================================================
-- AFTER RUNNING THIS:
--   1. Dashboard -> Authentication -> Users -> "Add user"
--      create the admin login (email + password).
--   2. Copy that user's UID and run:
--        insert into public.admins (id) values ('<PASTE-UID-HERE>');
-- ============================================================
