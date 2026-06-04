create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  role text not null,
  stack text[] not null default '{}',
  problem text not null,
  solution text not null,
  result text not null,
  is_published boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.projects enable row level security;

drop policy if exists "Allow public project reads" on public.projects;

create policy "Allow public project reads"
on public.projects
for select
to anon
using (is_published = true);

insert into public.projects (title, role, stack, problem, solution, result, sort_order)
values
  (
    'Guestlist.id',
    'Full-Stack Developer',
    array['Next.js', 'TypeScript', 'Tailwind CSS', 'Supabase'],
    'Event teams need a faster way to manage guest data, invitations, and check-in flow.',
    'Built a structured guestlist workflow with responsive UI, data management, and form-driven operations.',
    'Prepared a scalable foundation for event guest management, validation, and future reporting features.',
    1
  ),
  (
    'Karierly',
    'Full-Stack Developer',
    array['Next.js', 'React', 'TypeScript', 'REST API'],
    'Career-focused users need a clear platform experience for browsing opportunities and managing profile information.',
    'Designed the application structure around searchable content, profile flows, and reusable interface components.',
    'Created a portfolio-ready case study base for explaining product flow, user journey, and technical decisions.',
    2
  ),
  (
    'RASATA',
    'Full-Stack Developer',
    array['React', 'Node.js', 'PostgreSQL', 'Cloud Deployment'],
    'Operational content and service data need to be organized into an accessible, maintainable web experience.',
    'Implemented a modular full-stack foundation with reusable sections, backend-ready data boundaries, and responsive pages.',
    'Established a cleaner structure for presenting service information and extending the product over time.',
    3
  ),
  (
    'Eaty-Eat',
    'Full-Stack Developer',
    array['Next.js', 'TypeScript', 'Tailwind CSS', 'API Integration'],
    'Food discovery and ordering experiences need fast navigation, clear menus, and mobile-friendly interaction.',
    'Built the UI foundation for browsing food content, organizing menu data, and supporting future transactional flows.',
    'Delivered a responsive case-study base that can be expanded with menu management, checkout, and analytics details.',
    4
  )
on conflict do nothing;
