import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { profile, skills } from "@/lib/portfolio-data";

export function AboutSummary() {
  return (
    <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
      <div className="space-y-4">
        <p className="text-sm font-bold uppercase tracking-[0.16em] text-primary">About</p>
        <h1 className="text-4xl font-bold leading-tight tracking-normal sm:text-5xl">Profile</h1>
        <p className="max-w-2xl text-muted-foreground">{profile.summary}</p>
      </div>

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
    </section>
  );
}
