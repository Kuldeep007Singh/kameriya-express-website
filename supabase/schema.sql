-- KAMERIYA EXPRESS — Supabase schema
-- Run this in your Supabase project's SQL Editor (Project > SQL Editor > New query)

-- 1. PARCELS TABLE
create table if not exists parcels (
  id uuid primary key default gen_random_uuid(),
  tracking_id text unique not null,
  sender_name text,
  sender_city text,
  receiver_name text,
  receiver_city text,
  origin text,
  destination text,
  current_status text not null default 'Forwarded',
  created_at timestamptz not null default now(),
  created_by uuid references auth.users(id)
);

-- 2. TRACKING EVENTS TABLE (one parcel -> many checkpoint events)
create table if not exists tracking_events (
  id uuid primary key default gen_random_uuid(),
  parcel_id uuid not null references parcels(id) on delete cascade,
  status text not null,          -- Forwarded | In Transit | Out for Delivery | Delivered
  location text,                 -- e.g. "Hyderabad"
  note text,                     -- optional free text, e.g. "Delayed due to weather"
  event_time timestamptz not null default now(),
  created_by uuid references auth.users(id)
);

create index if not exists idx_tracking_events_parcel_id on tracking_events(parcel_id);
create index if not exists idx_parcels_tracking_id on parcels(tracking_id);

-- 3. ROW LEVEL SECURITY
-- Public (anonymous) visitors can only READ parcels/events (for tracking lookup).
-- Only authenticated staff (logged into the admin panel) can INSERT/UPDATE.

alter table parcels enable row level security;
alter table tracking_events enable row level security;

-- Public read access (needed for the Track Parcel page — no login required to check status)
create policy "Public can read parcels"
  on parcels for select
  using (true);

create policy "Public can read tracking events"
  on tracking_events for select
  using (true);

-- Only logged-in staff can create/update parcels and events
create policy "Authenticated staff can insert parcels"
  on parcels for insert
  to authenticated
  with check (true);

create policy "Authenticated staff can update parcels"
  on parcels for update
  to authenticated
  using (true);

create policy "Authenticated staff can insert tracking events"
  on tracking_events for insert
  to authenticated
  with check (true);

-- 4. AUTO-UPDATE current_status ON PARCELS WHEN A NEW EVENT IS ADDED
create or replace function update_parcel_status()
returns trigger as $$
begin
  update parcels
  set current_status = new.status
  where id = new.parcel_id;
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists trg_update_parcel_status on tracking_events;
create trigger trg_update_parcel_status
  after insert on tracking_events
  for each row
  execute function update_parcel_status();

-- 5. STAFF ACCOUNTS
-- Create staff logins from your Supabase Dashboard:
-- Authentication > Users > Add user (set email + password for yourself and each staff member).
-- No extra "roles" table is needed for now — anyone who can log in is treated as staff/admin.
-- If you later want different permission levels per branch, add a `profiles` table
-- keyed on auth.users(id) with a `role` column and adjust the RLS policies above.
