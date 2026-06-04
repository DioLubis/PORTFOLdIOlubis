import { NextResponse } from "next/server";
import { getSupabaseApiConfig } from "@/lib/supabase/api-client";
import { withTimeout } from "@/lib/timeout";

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  message?: unknown;
};

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

  if (!isEmail(email)) {
    return NextResponse.json({ error: "A valid email is required." }, { status: 400 });
  }

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
    return NextResponse.json(
      { error: payload?.message ?? "Contact message could not be stored." },
      { status: response.status }
    );
  }

  return NextResponse.json({ ok: true });
}
