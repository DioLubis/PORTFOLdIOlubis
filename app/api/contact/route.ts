import { NextResponse } from "next/server";
import { getSupabaseApiConfig } from "@/lib/supabase/api-client";
import { withTimeout } from "@/lib/timeout";

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  message?: unknown;
  website?: unknown;
};

const contactSubmissions = new Map<string, number>();

function isText(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  const payload = (await request.json().catch(() => null)) as ContactPayload | null;

  if (!payload || !isText(payload.name) || !isText(payload.email) || !isText(payload.message)) {
    return NextResponse.json({ error: "Name, email, and message are required." }, { status: 400 });
  }

  const name = payload.name.trim();
  const email = payload.email.trim();
  const message = payload.message.trim();
  const website = typeof payload.website === "string" ? payload.website.trim() : "";

  if (website) {
    return NextResponse.json({ ok: true });
  }

  if (!isEmail(email)) {
    return NextResponse.json({ error: "A valid email is required." }, { status: 400 });
  }

  if (name.length > 120 || email.length > 160 || message.length > 2000) {
    return NextResponse.json({ error: "Message content is too long." }, { status: 400 });
  }

  const clientIp =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "anonymous";
  const lastSubmission = contactSubmissions.get(clientIp) ?? 0;
  const now = Date.now();

  if (now - lastSubmission < 10000) {
    return NextResponse.json(
      { error: "Please wait a moment before sending another message." },
      { status: 429 }
    );
  }

  contactSubmissions.set(clientIp, now);

  const { supabaseUrl, supabaseKey, error: configError } = getSupabaseApiConfig();

  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json({ error: configError }, { status: 500 });
  }

  const response = await withTimeout(
    fetch(`${supabaseUrl}/rest/v1/contact_messages`, {
      method: "POST",
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal"
      },
      body: JSON.stringify({
        name,
        email,
        message
      }),
      signal: AbortSignal.timeout(3000)
    }),
    3000
  ).catch((error: Error) => error);

  if (response instanceof Error) {
    return NextResponse.json({ error: response.message }, { status: 500 });
  }

  if (!response.ok) {
    const payload = await response.json().catch(() => null);
    const isSchemaMissing =
      response.status === 404 &&
      typeof payload?.message === "string" &&
      payload.message.includes("contact_messages");

    return NextResponse.json(
      {
        error: isSchemaMissing
          ? "Contact storage is not ready yet. Please email directly for now."
          : "Contact message could not be stored."
      },
      { status: response.status }
    );
  }

  return NextResponse.json({ ok: true });
}
