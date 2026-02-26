// Vite-style base URL, with a sensible fallback for safety
export const API_BASE_URL =
  (typeof import.meta !== "undefined" &&
    import.meta.env &&
    import.meta.env.VITE_API_BASE_URL) ||
  "https://quizbolt-ashy.vercel.app";

