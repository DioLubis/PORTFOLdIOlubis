import { NextResponse } from "next/server";
import { projects as fallbackProjects } from "@/src/data/projects";
import { getSupabaseApiConfig } from "@/lib/supabase/api-client";
import { withTimeout } from "@/lib/timeout";
import type { ProjectCaseStudy } from "@/lib/types";

type ProjectRow = {
  slug?: string | null;
  title: string;
  role: string;
  year?: string | null;
  description?: string | null;
  stack: string[] | null;
  problem: string;
  solution: string;
  key_features?: string[] | null;
  technical_contribution?: string[] | null;
  result: string;
  case_study_url?: string | null;
  github_url?: string | null;
  demo_url?: string | null;
};

function toProject(row: ProjectRow): ProjectCaseStudy {
  const slug = row.slug ?? row.title.toLowerCase().replaceAll(" ", "-").replaceAll(".", "");

  return {
    slug,
    title: row.title,
    role: row.role,
    year: row.year ?? "Recent",
    description: row.description ?? row.problem,
    stack: row.stack ?? [],
    problem: row.problem,
    solution: row.solution,
    keyFeatures: row.key_features ?? [],
    technicalContribution: row.technical_contribution ?? [],
    result: row.result,
    caseStudyUrl: row.case_study_url ?? `/projects/${slug}`,
    githubUrl: row.github_url ?? undefined,
    demoUrl: row.demo_url ?? undefined
  };
}

export async function GET() {
  const { supabaseUrl, supabaseKey } = getSupabaseApiConfig();

  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json({
      projects: fallbackProjects,
      source: "fallback",
      message: "Supabase is not configured."
    });
  }

  const query =
    "select=slug,title,role,year,description,stack,problem,solution,key_features,technical_contribution,result,case_study_url,github_url,demo_url&is_published=eq.true&order=sort_order.asc";
  const response = await withTimeout(
    fetch(`${supabaseUrl}/rest/v1/projects?${query}`, {
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`
      },
      signal: AbortSignal.timeout(3000)
    }),
    3000
  ).catch((error: Error) => error);

  if (response instanceof Error) {
    return NextResponse.json({
      projects: fallbackProjects,
      source: "fallback",
      message: response.message
    });
  }

  if (!response.ok) {
    const payload = await response.json().catch(() => null);
    return NextResponse.json({
      projects: fallbackProjects,
      source: "fallback",
      message: payload?.message ?? "Live projects could not be loaded."
    });
  }

  const data = (await response.json()) as ProjectRow[];

  if (!data.length) {
    return NextResponse.json({
      projects: fallbackProjects,
      source: "fallback",
      message: "No live projects found."
    });
  }

  return NextResponse.json({
    projects: data.map((project) => toProject(project as ProjectRow)),
    source: "supabase"
  });
}
