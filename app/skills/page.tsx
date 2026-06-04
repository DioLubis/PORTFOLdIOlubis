import type { Metadata } from "next";
import { SkillsOverview } from "@/components/sections/skills-overview";

export const metadata: Metadata = {
  title: "Skills",
  description:
    "Technical stack and development capabilities for Dio Febriansyah Lubis."
};

export default function SkillsPage() {
  return <SkillsOverview />;
}
