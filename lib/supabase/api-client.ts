import { createClient } from "@supabase/supabase-js";

export function createSupabaseApiClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? process.env.SUPABASE_URL;
  const supabaseKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return {
      client: null,
      error: "Supabase environment variables are not configured."
    };
  }

  return {
    client: createClient(supabaseUrl, supabaseKey),
    error: null
  };
}
