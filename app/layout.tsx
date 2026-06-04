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
  description: "Personal portfolio skeleton for Dio Febriansyah Lubis."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <header className="site-header">
          <Link className="brand" href="/" aria-label="Dio Febriansyah Lubis home">
            Dio Febriansyah Lubis
          </Link>
          <nav className="site-nav" aria-label="Main navigation">
            {navigation.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </nav>
        </header>

        <main className="site-main">{children}</main>

        <footer className="site-footer">
          <p>Full-Stack Developer Portfolio</p>
        </footer>
      </body>
    </html>
  );
}
