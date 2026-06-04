create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  source text not null default 'portfolio_contact_form',
  created_at timestamptz not null default now()
);

alter table public.contact_messages enable row level security;

drop policy if exists "Allow contact inserts" on public.contact_messages;

create policy "Allow contact inserts"
on public.contact_messages
for insert
to anon
with check (true);
