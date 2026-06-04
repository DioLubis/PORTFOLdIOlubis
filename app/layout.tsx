import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import "./globals.css";

const navigation = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/skills", label: "Skills" },
  { href: "/contact", label: "Contact" }
];

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter"
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://portfolio-dio.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Dio Febriansyah Lubis | Full-Stack Developer",
    template: "%s | Dio Febriansyah Lubis"
  },
  description:
    "Portfolio Dio Febriansyah Lubis, Full-Stack Developer focused on responsive web apps, backend APIs, and Supabase/PostgreSQL integrations.",
  applicationName: "Dio Febriansyah Lubis Portfolio",
  authors: [{ name: "Dio Febriansyah Lubis" }],
  creator: "Dio Febriansyah Lubis",
  keywords: [
    "Dio Febriansyah Lubis",
    "Full-Stack Developer",
    "Next.js Developer",
    "TypeScript",
    "Supabase",
    "PostgreSQL",
    "Portfolio"
  ],
  alternates: {
    canonical: "/"
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Dio Febriansyah Lubis Portfolio",
    title: "Dio Febriansyah Lubis | Full-Stack Developer",
    description:
      "Responsive personal portfolio for a Full-Stack Developer, including projects, skills, and contact form integration."
  },
  twitter: {
    card: "summary_large_image",
    title: "Dio Febriansyah Lubis | Full-Stack Developer",
    description:
      "Responsive personal portfolio for a Full-Stack Developer, including projects, skills, and contact form integration."
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.variable}>
        <ThemeProvider>
          <header className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-6 sm:flex-row sm:items-center sm:justify-between">
            <Link
              className="text-base font-bold text-foreground"
              href="/"
              aria-label="Dio Febriansyah Lubis home"
            >
              Dio Febriansyah Lubis
            </Link>
            <div className="flex flex-wrap items-center gap-2">
              <nav className="flex flex-wrap gap-2" aria-label="Main navigation">
                {navigation.map((item) => (
                  <Link
                    className="rounded-md px-3 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                    key={item.href}
                    href={item.href}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
              <ThemeToggle />
            </div>
          </header>

          <main className="mx-auto min-h-[calc(100vh-168px)] w-full max-w-6xl px-4 py-8">
            {children}
          </main>

          <footer className="mx-auto w-full max-w-6xl border-t px-4 py-6 text-sm text-muted-foreground">
            <p>Full-Stack Developer Portfolio</p>
          </footer>
          <script
            type="application/ld+json"
            suppressHydrationWarning
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Person",
                name: "Dio Febriansyah Lubis",
                jobTitle: "Full-Stack Developer",
                url: siteUrl,
                knowsAbout: ["Next.js", "TypeScript", "Supabase", "PostgreSQL", "React"]
              })
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
