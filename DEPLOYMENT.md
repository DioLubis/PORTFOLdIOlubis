# Deploy to Vercel

## Prerequisites

- GitHub repository connected to the project.
- Supabase tables created from `supabase/contact_messages.sql` and `supabase/projects.sql`.
- Vercel account with access to the GitHub repository.

## Environment Variables

Add these in Vercel Project Settings > Environment Variables:

```bash
NEXT_PUBLIC_SITE_URL=https://your-vercel-domain.vercel.app
NEXT_PUBLIC_SUPABASE_URL=https://drlcmqdbcgzbinlfqrhv.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-publishable-key
```

Optional server-side variables:

```bash
SUPABASE_SERVICE_ROLE_KEY=replace-with-service-role-key
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your-database-password
```

## Build Settings

Vercel should detect Next.js automatically. If manual setup is needed:

```bash
Install Command: npm install
Build Command: npm run build
Output Directory: .next
```

## Deployment Steps

1. Push the latest code to GitHub.
2. Open Vercel and choose Add New > Project.
3. Import the GitHub repository.
4. Confirm the framework preset is Next.js.
5. Add the environment variables listed above.
6. Click Deploy.
7. After deploy, update `NEXT_PUBLIC_SITE_URL` to the final production URL.
8. Redeploy so metadata, sitemap, and robots use the final URL.
