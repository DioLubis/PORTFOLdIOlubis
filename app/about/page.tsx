import type { Metadata } from "next";
import { AboutSummary } from "@/components/sections/about-summary";

export const metadata: Metadata = {
  title: "About",
  description:
    "Profile and skill summary for Dio Febriansyah Lubis, Full-Stack Developer."
};

export default function AboutPage() {
  return <AboutSummary />;
}
