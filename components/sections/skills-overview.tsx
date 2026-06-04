import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { skillGroups } from "@/lib/portfolio-data";

export function SkillsOverview() {
  return (
    <section className="space-y-8">
      <div className="space-y-3">
        <p className="text-sm font-bold uppercase tracking-[0.16em] text-primary">Skills</p>
        <h1 className="text-4xl font-bold leading-tight tracking-normal sm:text-5xl">
          Technical Stack
        </h1>
        <p className="max-w-2xl text-muted-foreground">
          Technologies and working habits used to build web, mobile, backend, and database-driven products.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {skillGroups.map((group) => (
          <Card key={group.title}>
            <CardHeader>
              <CardTitle>{group.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <Badge key={item}>{item}</Badge>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
