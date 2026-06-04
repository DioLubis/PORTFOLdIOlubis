import { NextResponse } from "next/server";
import { projects as fallbackProjects } from "@/lib/portfolio-data";
import { getSupabaseApiConfig } from "@/lib/supabase/api-client";
import { withTimeout } from "@/lib/timeout";
import type { ProjectCaseStudy } from "@/lib/types";

type ProjectRow = {
  title: string;
  role: string;
  stack: string[] | null;
  problem: string;
  solution: string;
  result: string;
};

function toProject(row: ProjectRow): ProjectCaseStudy {
  return {
    title: row.title,
    role: row.role,
    stack: row.stack ?? [],
    problem: row.problem,
    solution: row.solution,
    result: row.result
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
    "select=title,role,stack,problem,solution,result&is_published=eq.true&order=sort_order.asc";
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
