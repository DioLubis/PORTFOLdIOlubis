import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  message?: unknown;
};

function isText(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

export async function POST(request: Request) {
  const payload = (await request.json().catch(() => null)) as ContactPayload | null;

  if (!payload || !isText(payload.name) || !isText(payload.email) || !isText(payload.message)) {
    return NextResponse.json({ error: "Name, email, and message are required." }, { status: 400 });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? process.env.SUPABASE_URL;
  const supabaseKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json(
      { error: "Supabase environment variables are not configured." },
      { status: 500 }
    );
  }

  const supabase = createClient(supabaseUrl, supabaseKey);
  const { error } = await supabase.from("contact_messages").insert({
    name: payload.name.trim(),
    email: payload.email.trim(),
    message: payload.message.trim()
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
