"use client";

import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { projects } from "@/lib/portfolio-data";

export function ProjectsGrid() {
  return (
    <section className="space-y-8">
      <div className="space-y-3">
        <p className="text-sm font-bold uppercase tracking-[0.16em] text-primary">Projects</p>
        <h1 className="text-4xl font-bold leading-tight tracking-normal sm:text-5xl">
          Selected Work
        </h1>
        <p className="max-w-2xl text-muted-foreground">
          Interactive cards are ready for detailed case studies, links, and screenshots.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project, index) => (
          <motion.article
            key={project.title}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: index * 0.08 }}
            whileHover={{ y: -6 }}
          >
            <Card className="group h-full overflow-hidden transition-colors hover:border-primary/50">
              <CardHeader>
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-md bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <ArrowUpRight className="h-5 w-5" />
                </div>
                <CardTitle>{project.title}</CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {project.stack.map((item) => (
                  <Badge key={item}>{item}</Badge>
                ))}
              </CardContent>
              <CardFooter>
                <span className="text-sm font-semibold text-primary">View details</span>
              </CardFooter>
            </Card>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
