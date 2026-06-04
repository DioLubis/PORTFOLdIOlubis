"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, ChevronDown, ChevronUp } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { projects } from "@/src/data/projects";
import type { ProjectCaseStudy } from "@/lib/types";

export function ProjectsGrid() {
  const [projectItems, setProjectItems] = useState<ProjectCaseStudy[]>(projects);
  const [expandedProject, setExpandedProject] = useState<string | null>(null);
  const [isLoadingLiveProjects, setIsLoadingLiveProjects] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadProjects() {
      const response = await fetch("/api/projects");

      if (!response.ok) {
        setIsLoadingLiveProjects(false);
        return;
      }

      const payload = (await response.json()) as {
        projects?: ProjectCaseStudy[];
      };

      if (isMounted && payload.projects?.length) {
        setProjectItems(payload.projects);
      }

      if (isMounted) {
        setIsLoadingLiveProjects(false);
      }
    }

    loadProjects()
      .catch(() => undefined)
      .finally(() => {
        if (isMounted) {
          setIsLoadingLiveProjects(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="space-y-8">
      <div className="space-y-3">
        <p className="text-sm font-bold uppercase tracking-[0.16em] text-primary">Projects</p>
        <h1 className="text-4xl font-bold leading-tight tracking-normal sm:text-5xl">
          Selected Work
        </h1>
        <p className="max-w-2xl text-muted-foreground">
          Four main projects across hospitality, recruitment, Android development, and food ordering systems.
        </p>
        <p aria-live="polite" className="text-sm text-muted-foreground">
          {isLoadingLiveProjects ? "Checking live project data..." : "Project data loaded."}
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {projectItems.map((project, index) => (
          <motion.article
            id={project.slug}
            key={project.slug}
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: index * 0.08 }}
            whileHover={{ y: -6 }}
          >
            <Card className="group h-full overflow-hidden transition-colors hover:border-primary/50">
              <CardHeader>
                <div className="mb-6 flex items-start justify-between gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <ArrowUpRight className="h-5 w-5" />
                  </div>
                  <Badge>{project.year}</Badge>
                </div>
                <CardTitle>{project.title}</CardTitle>
                <p className="text-sm font-semibold text-primary">{project.role}</p>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {project.stack.map((item) => (
                  <Badge key={item}>{item}</Badge>
                ))}
              </CardContent>
              <AnimatePresence initial={false}>
                {expandedProject === project.title ? (
                  <motion.div
                    id={`case-study-${project.slug}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="overflow-hidden"
                  >
                    <CardContent className="grid gap-4 border-t pt-5">
                      <CaseStudyItem label="Problem" value={project.problem} />
                      <CaseStudyItem label="Solution" value={project.solution} />
                      <CaseStudyList label="Key Features" values={project.keyFeatures} />
                      <CaseStudyList
                        label="Technical Contribution"
                        values={project.technicalContribution}
                      />
                      <CaseStudyItem label="Result" value={project.result} />
                      <div className="flex flex-wrap gap-2 pt-1">
                        <Button asChild size="sm">
                          <Link href={project.caseStudyUrl}>View case study</Link>
                        </Button>
                        {project.githubUrl ? (
                          <Button asChild size="sm" variant="outline">
                            <a href={project.githubUrl} rel="noreferrer" target="_blank">
                              GitHub
                            </a>
                          </Button>
                        ) : null}
                        {project.demoUrl ? (
                          <Button asChild size="sm" variant="outline">
                            <a href={project.demoUrl} rel="noreferrer" target="_blank">
                              Live demo
                            </a>
                          </Button>
                        ) : null}
                      </div>
                    </CardContent>
                  </motion.div>
                ) : null}
              </AnimatePresence>
              <CardFooter className="gap-2">
                <Button
                  aria-controls={`case-study-${project.slug}`}
                  aria-expanded={expandedProject === project.title}
                  className="w-full justify-between"
                  onClick={() =>
                    setExpandedProject((current) =>
                      current === project.title ? null : project.title
                    )
                  }
                  type="button"
                  variant="outline"
                >
                  {expandedProject === project.title ? "Collapse case study" : "Expand case study"}
                  {expandedProject === project.title ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </Button>
              </CardFooter>
            </Card>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

function CaseStudyItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid gap-1">
      <h3 className="text-sm font-bold text-foreground">{label}</h3>
      <p className="text-sm leading-6 text-muted-foreground">{value}</p>
    </div>
  );
}

function CaseStudyList({ label, values }: { label: string; values: string[] }) {
  return (
    <div className="grid gap-2">
      <h3 className="text-sm font-bold text-foreground">{label}</h3>
      <ul className="grid gap-1 text-sm leading-6 text-muted-foreground">
        {values.map((value) => (
          <li key={value}>- {value}</li>
        ))}
      </ul>
    </div>
  );
}
