import { BriefcaseBusiness, Code, Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { profile } from "@/lib/portfolio-data";

const contactItems = [
  {
    label: "Email",
    value: profile.email,
    href: `mailto:${profile.email}`,
    icon: Mail
  },
  {
    label: "Phone",
    value: profile.phone,
    href: `tel:${profile.phone.replaceAll(" ", "")}`,
    icon: Phone
  },
  {
    label: "GitHub",
    value: profile.github,
    href: `https://${profile.github}`,
    icon: Code
  },
  {
    label: "LinkedIn",
    value: profile.linkedin,
    href: `https://${profile.linkedin}`,
    icon: BriefcaseBusiness
  }
];

export function ContactSection() {
  return (
    <section className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
      <div className="space-y-5">
        <p className="text-sm font-bold uppercase tracking-[0.16em] text-primary">Contact</p>
        <h1 className="text-4xl font-bold leading-tight tracking-normal sm:text-5xl">
          Let&apos;s build something focused and useful.
        </h1>
        <p className="max-w-xl text-muted-foreground">
          Reach out for full-stack web development, mobile product work, backend APIs, or AI-powered product workflows.
        </p>
        <div className="inline-flex items-center gap-2 rounded-md border bg-card px-3 py-2 text-sm font-medium text-muted-foreground">
          <MapPin className="h-4 w-4 text-primary" />
          {profile.location}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {contactItems.map((item) => {
          const Icon = item.icon;

          return (
            <Card className="transition-colors hover:border-primary/60" key={item.label}>
              <CardHeader>
                <div className="flex h-11 w-11 items-center justify-center rounded-md bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <CardTitle className="text-lg">{item.label}</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                <p className="break-words text-sm text-muted-foreground">{item.value}</p>
                <Button asChild size="sm" variant="outline">
                  <a
                    href={item.href}
                    rel="noreferrer"
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                  >
                    Open {item.label}
                  </a>
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
