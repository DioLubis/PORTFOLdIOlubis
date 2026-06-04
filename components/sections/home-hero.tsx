"use client";

import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";
import { motion } from "motion/react";
import { profile } from "@/lib/portfolio-data";
import { Button } from "@/components/ui/button";

export function HomeHero() {
  return (
    <section className="grid min-h-[calc(100vh-180px)] items-center gap-10 py-10 lg:grid-cols-[1.05fr_0.95fr]">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="space-y-7"
      >
        <div className="space-y-4">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-primary">
            {profile.role}
          </p>
          <h1 className="max-w-3xl text-5xl font-bold leading-none tracking-normal text-foreground sm:text-6xl lg:text-7xl">
            {profile.name}
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-muted-foreground">{profile.tagline}</p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg">
            <Link href="/projects">
              View Projects
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/contact">
              Contact
              <Download className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.12, duration: 0.45, ease: "easeOut" }}
        className="grid gap-4 rounded-lg border bg-card p-5 shadow-sm"
      >
        <div className="flex items-center justify-between border-b pb-4">
          <span className="text-sm font-semibold text-muted-foreground">Portfolio Status</span>
          <span className="rounded-md bg-primary/10 px-2.5 py-1 text-xs font-bold text-primary">
            Open
          </span>
        </div>
        <div className="grid gap-3">
          {["Frontend UI", "Backend API", "Database"].map((item, index) => (
            <div key={item} className="flex items-center justify-between rounded-md border p-4">
              <span className="font-medium">{item}</span>
              <span className="text-sm text-muted-foreground">0{index + 1}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
