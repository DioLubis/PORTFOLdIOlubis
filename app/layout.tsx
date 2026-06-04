import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

const navigation = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/skills", label: "Skills" },
  { href: "/contact", label: "Contact" }
];

export const metadata: Metadata = {
  title: "Dio Febriansyah Lubis | Full-Stack Developer",
  description: "Personal portfolio for Dio Febriansyah Lubis, Full-Stack Developer."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <header className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-6 sm:flex-row sm:items-center sm:justify-between">
          <Link
            className="text-base font-bold text-foreground"
            href="/"
            aria-label="Dio Febriansyah Lubis home"
          >
            Dio Febriansyah Lubis
          </Link>
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
        </header>

        <main className="mx-auto min-h-[calc(100vh-168px)] w-full max-w-6xl px-4 py-8">
          {children}
        </main>

        <footer className="mx-auto w-full max-w-6xl border-t px-4 py-6 text-sm text-muted-foreground">
          <p>Full-Stack Developer Portfolio</p>
        </footer>
      </body>
    </html>
  );
}
