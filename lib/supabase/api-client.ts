import { createClient } from "@supabase/supabase-js";

export function getSupabaseApiConfig() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? process.env.SUPABASE_URL;
  const supabaseKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return {
      supabaseUrl: null,
      supabaseKey: null,
      error: "Supabase environment variables are not configured."
    };
  }

  return {
    supabaseUrl,
    supabaseKey,
    error: null
  };
}

export function createSupabaseApiClient() {
  const { supabaseUrl, supabaseKey, error } = getSupabaseApiConfig();

  if (!supabaseUrl || !supabaseKey) {
    return {
      client: null,
      error
    };
  }

  return {
    client: createClient(supabaseUrl, supabaseKey),
    error: null
  };
}
