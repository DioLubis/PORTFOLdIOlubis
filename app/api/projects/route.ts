import { NextResponse } from "next/server";
import { projects as fallbackProjects } from "@/lib/portfolio-data";
import { createSupabaseApiClient } from "@/lib/supabase/api-client";
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
  const { client } = createSupabaseApiClient();

  if (!client) {
    return NextResponse.json({
      projects: fallbackProjects,
      source: "fallback",
      message: "Supabase is not configured."
    });
  }

  const { data, error } = await client
    .from("projects")
    .select("title, role, stack, problem, solution, result")
    .eq("is_published", true)
    .order("sort_order", { ascending: true });

  if (error || !data?.length) {
    return NextResponse.json({
      projects: fallbackProjects,
      source: "fallback",
      message: error?.message ?? "No live projects found."
    });
  }

  return NextResponse.json({
    projects: data.map((project) => toProject(project as ProjectRow)),
    source: "supabase"
  });
}
