import type { Metadata } from "next";
import { ProjectsGrid } from "@/components/sections/projects-grid";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Selected projects by Dio Febriansyah Lubis, including Guestlist.id, Karierly, RASATA, and Eaty-Eat."
};

export default function ProjectsPage() {
  return <ProjectsGrid />;
}
