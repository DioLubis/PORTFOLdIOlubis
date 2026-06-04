import type { Metadata } from "next";
import { ContactForm } from "@/components/sections/contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Dio Febriansyah Lubis through a Supabase-backed portfolio contact form."
};

export default function ContactPage() {
  return <ContactForm />;
}
