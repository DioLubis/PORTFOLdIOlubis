import type { Metadata } from "next";
import { ContactSection } from "@/components/sections/contact-section";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Dio Febriansyah Lubis through email, phone, GitHub, or LinkedIn for full-stack web, mobile, backend, and AI-powered product development."
};

export default function ContactPage() {
  return <ContactSection />;
}
