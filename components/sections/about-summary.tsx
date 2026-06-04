import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { education, profile, skills } from "@/lib/portfolio-data";

export function AboutSummary() {
  return (
    <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
      <div className="space-y-6">
        <div className="space-y-4">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-primary">About</p>
          <h1 className="text-4xl font-bold leading-tight tracking-normal sm:text-5xl">
            Building practical products with full-stack ownership.
          </h1>
          <p className="max-w-2xl leading-7 text-muted-foreground">{profile.summary}</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Contact</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-2 text-sm text-muted-foreground">
            <p>{profile.location}</p>
            <a className="font-medium text-foreground hover:text-primary" href={`mailto:${profile.email}`}>
              {profile.email}
            </a>
            <a className="font-medium text-foreground hover:text-primary" href={`tel:${profile.phone.replaceAll(" ", "")}`}>
              {profile.phone}
            </a>
            <a
              className="font-medium text-foreground hover:text-primary"
              href={`https://${profile.github}`}
              rel="noreferrer"
              target="_blank"
            >
              {profile.github}
            </a>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Skill Summary</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <Badge key={skill}>{skill}</Badge>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Education</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            {education.map((item) => (
              <div className="rounded-md border p-4" key={item.institution}>
                <h2 className="font-semibold">{item.institution}</h2>
                <p className="text-sm text-muted-foreground">{item.program}</p>
                <p className="mt-1 text-sm font-medium text-primary">{item.period}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
