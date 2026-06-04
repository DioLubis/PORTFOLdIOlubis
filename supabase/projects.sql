create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  role text not null,
  year text not null,
  description text not null,
  stack text[] not null default '{}',
  problem text not null,
  solution text not null,
  key_features text[] not null default '{}',
  technical_contribution text[] not null default '{}',
  result text not null,
  case_study_url text not null,
  github_url text,
  demo_url text,
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

insert into public.projects (
  slug,
  title,
  role,
  year,
  description,
  stack,
  problem,
  solution,
  key_features,
  technical_contribution,
  result,
  case_study_url,
  sort_order
)
values
  (
    'guestlist-id',
    'Guestlist.id',
    'Full-stack Web & Mobile Apps Development',
    '2024 - Present',
    'A full-stack hospitality platform for guest list reservations, table bookings, event management, and customer management.',
    array['React.js', 'Next.js', 'TypeScript', 'Golang', 'PostgreSQL', 'Supabase', 'Expo', 'Firebase'],
    'Hospitality teams need a reliable system to manage reservations, guest lists, table bookings, events, and customer data across web and mobile workflows.',
    'Developed and maintained web and mobile features, integrated backend services, and improved frontend-backend communication for smoother operational workflows.',
    array['Guest list reservation flows', 'Table booking management', 'Event management workflows', 'Customer management processes', 'Web and mobile application features'],
    array['Built React.js and Next.js frontend features with TypeScript', 'Integrated Golang backend services with PostgreSQL and Supabase', 'Supported mobile development with Expo and Firebase', 'Collaborated with UI/UX and product teams to refine feature delivery'],
    'Improved the platform foundation for hospitality operations by connecting reservation, booking, event, and customer workflows in a scalable product experience.',
    '/projects/guestlist-id',
    1
  ),
  (
    'karierly',
    'Karierly',
    'Full-stack Web Developer',
    '2024 - Present',
    'An Applicant Tracking System with multi-tenant recruitment workflows and AI-powered candidate screening.',
    array['ReactJS', 'Golang', 'PostgreSQL', 'Firebase Auth', 'Google Gemini API'],
    'Recruitment teams need a structured way to manage jobs, candidates, pipelines, career pages, and screening decisions across multiple tenants.',
    'Developed an ATS platform with job management, candidate pipeline, recruitment workflow, career page features, and AI-powered screening using Google Gemini API.',
    array['Multi-tenant architecture', 'Job management', 'Candidate pipeline', 'Career page', 'AI-powered candidate screening'],
    array['Built ReactJS web interfaces for recruitment workflows', 'Developed Golang backend services and REST API integrations', 'Managed PostgreSQL data models for jobs, candidates, and pipelines', 'Integrated Firebase Auth and Google Gemini API for authentication and AI workflows'],
    'Delivered a scalable recruitment management platform foundation that supports structured hiring workflows and AI-assisted candidate evaluation.',
    '/projects/karierly',
    2
  ),
  (
    'rasata',
    'RASATA',
    'Full-stack Android Developer',
    '2025',
    'An Android-based application developed as part of LPPM-InnoPitch Innoverse 2025 through the RASATA project.',
    array['Kotlin', 'Android Studio'],
    'The project required a mobile application that could support scalable feature implementation and demonstrate reliable Android performance.',
    'Developed Android application features with Kotlin, implemented core app flows, and tested performance during the RASATA project development process.',
    array['Native Android application', 'Scalable app feature structure', 'Core mobile user flows', 'Performance testing'],
    array['Implemented Android features using Kotlin', 'Built and tested the app in Android Studio', 'Participated in LPPM-InnoPitch Innoverse 2025 project development', 'Reviewed performance behavior during app testing'],
    'Contributed to a functional Android project prepared for the RASATA initiative and competition-stage validation.',
    '/projects/rasata',
    3
  ),
  (
    'eaty-eat',
    'Eaty-Eat',
    'Full-stack Web Developer',
    '2023',
    'A food ordering application with backend and frontend systems, API integrations, and database functionality.',
    array['PHP', 'Laravel', 'MySQL'],
    'Food ordering workflows need reliable frontend screens, backend logic, API integrations, and database operations to support ordering activity.',
    'Developed backend and frontend systems with Laravel, built API integrations, and managed MySQL database functionality for core application flows.',
    array['Food ordering workflows', 'Backend order handling', 'Frontend application screens', 'API integrations', 'Database management'],
    array['Developed Laravel backend functionality', 'Built frontend features for the ordering experience', 'Managed MySQL database operations', 'Implemented API integrations for application flows'],
    'Built a functional full-stack foundation for a food ordering application with connected frontend, backend, API, and database layers.',
    '/projects/eaty-eat',
    4
  )
on conflict (slug) do update set
  title = excluded.title,
  role = excluded.role,
  year = excluded.year,
  description = excluded.description,
  stack = excluded.stack,
  problem = excluded.problem,
  solution = excluded.solution,
  key_features = excluded.key_features,
  technical_contribution = excluded.technical_contribution,
  result = excluded.result,
  case_study_url = excluded.case_study_url,
  sort_order = excluded.sort_order,
  updated_at = now();
