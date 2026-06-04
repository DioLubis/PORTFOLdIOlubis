import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ProjectCaseStudy as ProjectCaseStudyType } from "@/lib/types";

export function ProjectCaseStudy({ project }: { project: ProjectCaseStudyType }) {
  return (
    <article className="space-y-8">
      <div className="space-y-5">
        <Button asChild size="sm" variant="outline">
          <Link href="/projects">
            <ArrowLeft className="h-4 w-4" />
            Back to projects
          </Link>
        </Button>
        <div className="space-y-3">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-primary">
            {project.year} / {project.role}
          </p>
          <h1 className="text-4xl font-bold leading-tight tracking-normal sm:text-5xl">
            {project.title}
          </h1>
          <p className="max-w-3xl text-lg leading-8 text-muted-foreground">
            {project.description}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {project.stack.map((item) => (
            <Badge key={item}>{item}</Badge>
          ))}
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <CaseStudyCard title="Problem" body={project.problem} />
        <CaseStudyCard title="Solution" body={project.solution} />
        <CaseStudyList title="Key Features" items={project.keyFeatures} />
        <CaseStudyList title="Technical Contribution" items={project.technicalContribution} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Result</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="leading-7 text-muted-foreground">{project.result}</p>
        </CardContent>
      </Card>
    </article>
  );
}

function CaseStudyCard({ title, body }: { title: string; body: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="leading-7 text-muted-foreground">{body}</p>
      </CardContent>
    </Card>
  );
}

function CaseStudyList({ title, items }: { title: string; items: string[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="grid gap-2 text-muted-foreground">
          {items.map((item) => (
            <li key={item}>- {item}</li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
