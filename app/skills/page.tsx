import type { Metadata } from "next";
import { SkillsOverview } from "@/components/sections/skills-overview";

export const metadata: Metadata = {
  title: "Skills",
  description:
    "Technical skills across frontend, backend, mobile, database, infrastructure, and product development tools."
};

export default function SkillsPage() {
  return <SkillsOverview />;
}
