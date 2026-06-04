"use client";

import { FormEvent, useState } from "react";
import { Send } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

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
        message: formData.get("message")
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
          Start a Conversation
        </h1>
        <p className="max-w-xl text-muted-foreground">
          Simple form wired to a Supabase insert endpoint for future message handling.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Contact Form</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="grid gap-4" onSubmit={handleSubmit}>
              <div className="grid gap-2">
                <label className="text-sm font-semibold" htmlFor="name">
                  Name
                </label>
                <Input id="name" name="name" placeholder="Your name" required />
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-semibold" htmlFor="email">
                  Email
                </label>
                <Input id="email" name="email" placeholder="you@example.com" required type="email" />
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-semibold" htmlFor="message">
                  Message
                </label>
                <Textarea id="message" name="message" placeholder="Write your message" required />
              </div>
              <Button className="w-full sm:w-fit" disabled={status === "submitting"} type="submit">
                {status === "submitting" ? "Sending..." : "Send Message"}
                <Send className="h-4 w-4" />
              </Button>
              {message ? (
                <p
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
