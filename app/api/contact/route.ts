import { NextResponse } from "next/server";
import { createSupabaseApiClient } from "@/lib/supabase/api-client";

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

  const { client, error: configError } = createSupabaseApiClient();

  if (!client) {
    return NextResponse.json({ error: configError }, { status: 500 });
  }

  const { error } = await client.from("contact_messages").insert({
    name,
    email,
    message
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
