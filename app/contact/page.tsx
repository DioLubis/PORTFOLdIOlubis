import type { Metadata } from "next";
import { ContactForm } from "@/components/sections/contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Dio Febriansyah Lubis for full-stack web, mobile, backend, and AI-powered product development."
};

export default function ContactPage() {
  return <ContactForm />;
}
