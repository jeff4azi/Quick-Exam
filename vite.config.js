import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: "auto",
      devOptions: { enabled: true },
      manifest: {
        name: "Quiz Bolt ⚡",
        short_name: "Quiz Bolt",
        description:
          "Boost your exam prep with fast, fun, and interactive quizzes. Practice past questions and track your progress.",
        start_url: "/",
        scope: "/",
        display: "standalone",
        orientation: "portrait",
        theme_color: "#1e293b",
        background_color: "#f1f5f9",
        categories: ["education", "productivity"],
        icons: [
          {
            src: "/android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any maskable",
          },
          {
            src: "/android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
          {
            src: "/apple-touch-icon.png",
            sizes: "180x180",
            type: "image/png",
          },
        ],
      },
      workbox: {
        // Cache app shell + static assets
        globPatterns: ["**/*.{js,css,html,ico,png,jpg,jpeg,webp,svg,woff2}"],
        // Skip Supabase and other external calls
        navigateFallback: "/index.html",
        navigateFallbackDenylist: [/^\/api/, /supabase/],
        runtimeCaching: [
          {
            // Supabase API — network only, never cache
            urlPattern: /supabase\.co/,
            handler: "NetworkOnly",
          },
          {
            // Images — cache first
            urlPattern: /\.(?:png|jpg|jpeg|webp|svg|ico)$/,
            handler: "CacheFirst",
            options: {
              cacheName: "quizbolt-images",
              expiration: { maxEntries: 60, maxAgeSeconds: 30 * 24 * 60 * 60 },
            },
          },
          {
            // JS/CSS — stale while revalidate
            urlPattern: /\.(?:js|css)$/,
            handler: "StaleWhileRevalidate",
            options: { cacheName: "quizbolt-assets" },
          },
        ],
      },
    }),
  ],
  server: {
    port: 5174,
  },
});
