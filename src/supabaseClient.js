import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
      // Explicit localStorage binding ensures session survives tab switches and idle periods
      storage: window.localStorage,
      storageKey: "quizbolt-auth-token",
    },
  }
);