import type { Metadata } from "next";
import { HomeHero } from "@/components/sections/home-hero";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Portfolio home page for Dio Febriansyah Lubis, Full-Stack Developer building responsive web applications."
};

export default function HomePage() {
  return <HomeHero />;
}
