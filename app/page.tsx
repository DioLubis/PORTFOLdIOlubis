import type { Metadata } from "next";
import { HomeHero } from "@/components/sections/home-hero";

export const metadata: Metadata = {
  title: {
    absolute: "Dio Febriansyah Lubis | Full-Stack Developer"
  },
  description:
    "Portfolio of Dio Febriansyah Lubis, a Full-Stack Developer experienced in building scalable web, mobile, and AI-powered applications using React, Next.js, TypeScript, Golang, PostgreSQL, Supabase, Firebase, and REST APIs."
};

export default function HomePage() {
  return <HomeHero />;
}
