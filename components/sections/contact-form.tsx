"use client";

import { FormEvent, useState } from "react";
import { Code, Mail, Phone, Send } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { profile } from "@/lib/portfolio-data";

type FormStatus = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const response = await fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify({
        name: formData.get("name"),
        email: formData.get("email"),
        message: formData.get("message"),
        website: formData.get("website")
      }),
      headers: {
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) {
      const payload = await response.json().catch(() => null);
      setStatus("error");
      setMessage(payload?.error ?? "Message could not be sent.");
      return;
    }

    form.reset();
    setStatus("success");
    setMessage("Message sent.");
  }

  return (
    <section className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
      <div className="space-y-3">
        <p className="text-sm font-bold uppercase tracking-[0.16em] text-primary">Contact</p>
        <h1 className="text-4xl font-bold leading-tight tracking-normal sm:text-5xl">
          Let&apos;s discuss the product you want to build.
        </h1>
        <p className="max-w-xl text-muted-foreground">
          Available for full-stack web development, mobile product work, backend APIs, and AI-assisted workflows.
        </p>
        <div className="grid gap-3 pt-3 text-sm">
          <a className="inline-flex items-center gap-2 font-medium hover:text-primary" href={`mailto:${profile.email}`}>
            <Mail className="h-4 w-4 text-primary" />
            {profile.email}
          </a>
          <a className="inline-flex items-center gap-2 font-medium hover:text-primary" href={`tel:${profile.phone.replaceAll(" ", "")}`}>
            <Phone className="h-4 w-4 text-primary" />
            {profile.phone}
          </a>
          <a
            className="inline-flex items-center gap-2 font-medium hover:text-primary"
            href={`https://${profile.github}`}
            rel="noreferrer"
            target="_blank"
          >
            <Code className="h-4 w-4 text-primary" />
            {profile.github}
          </a>
        </div>
      </div>

      <motion.div
        initial={false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Contact Form</CardTitle>
          </CardHeader>
          <CardContent>
            <form
              aria-busy={status === "submitting"}
              aria-describedby={message ? "contact-form-status" : undefined}
              className="grid gap-4"
              onSubmit={handleSubmit}
            >
              <div className="hidden" aria-hidden="true">
                <label htmlFor="website">Website</label>
                <Input
                  autoComplete="off"
                  id="website"
                  name="website"
                  tabIndex={-1}
                  type="text"
                />
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-semibold" htmlFor="name">
                  Name
                </label>
                <Input
                  autoComplete="name"
                  disabled={status === "submitting"}
                  id="name"
                  maxLength={120}
                  name="name"
                  placeholder="Your name"
                  required
                />
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-semibold" htmlFor="email">
                  Email
                </label>
                <Input
                  autoComplete="email"
                  disabled={status === "submitting"}
                  id="email"
                  maxLength={160}
                  name="email"
                  placeholder="you@example.com"
                  required
                  type="email"
                />
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-semibold" htmlFor="message">
                  Message
                </label>
                <Textarea
                  disabled={status === "submitting"}
                  id="message"
                  maxLength={2000}
                  name="message"
                  placeholder="Write your message"
                  required
                />
              </div>
              <Button className="w-full sm:w-fit" disabled={status === "submitting"} type="submit">
                {status === "submitting" ? "Sending..." : "Send Message"}
                <Send className="h-4 w-4" />
              </Button>
              {message ? (
                <p
                  id="contact-form-status"
                  role="status"
                  aria-live="polite"
                  className={
                    status === "success"
                      ? "text-sm font-medium text-primary"
                      : "text-sm font-medium text-destructive"
                  }
                >
                  {message}
                </p>
              ) : null}
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </section>
  );
}
