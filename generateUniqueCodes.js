import { createClient } from "@supabase/supabase-js";
import crypto from "crypto";

const supabaseUrl = "https://ujuvxzbywmsmprtvmvtk.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVqdXZ4emJ5d21zbXBydHZtdnRrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1ODkzMTY3NiwiZXhwIjoyMDc0NTA3Njc2fQ.YNJCD2Tu6SuCU1Eh41_0PGqsNMV7C5mtA0PxEfz8LIg";
const supabase = createClient(supabaseUrl, supabaseKey);

function generateCode(length = 10) {
  const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";
  for (let i = 0; i < length; i++) {
    const randIndex = crypto.randomInt(0, charset.length);
    code += charset[randIndex];
  }
  return code;
}

// <-- UPDATED count from 30 to 100 -->
function generateUniqueCodes(count = 10, length = 10) {
  const codes = new Set();
  while (codes.size < count) {
    codes.add(generateCode(length));
  }
  return Array.from(codes);
}

async function insertCodes(codes) {
  const { data, error, status, statusText } = await supabase
    .from("premium_codes")
    .insert(codes.map((code) => ({ code })), { returning: "representation" });

  if (error) console.error("Insert error:", error);
  else console.log("Inserted codes:", data);

  console.log("Status:", status, "StatusText:", statusText);
}

// generate 100 codes
const codes = generateUniqueCodes();
insertCodes(codes);
