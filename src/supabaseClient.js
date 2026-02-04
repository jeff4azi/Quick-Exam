import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://ujuvxzbywmsmprtvmvtk.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVqdXZ4emJ5d21zbXBydHZtdnRrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg5MzE2NzYsImV4cCI6MjA3NDUwNzY3Nn0.avK7pnRb7nyMSPmB9iU_PdXZJaBgxTjAL3OPSyCSYEM";

export const supabase = createClient(supabaseUrl, supabaseAnonKey)