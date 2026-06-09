import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { StrictMode } from "react";

// gtag is initialised in index.html <head> — no setup needed here.

// Capture the beforeinstallprompt event as early as possible — before React
// mounts. On Android Chrome this fires very early (sometimes before the first
// paint) so a listener inside a useEffect always misses it.
window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  // Stash it globally so any component can pick it up later.
  window.__pwaInstallPrompt = e;
});

// Unregister any stale manually-registered service workers from old builds
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.getRegistrations().then((registrations) => {
    registrations.forEach((reg) => {
      if (reg.active?.scriptURL?.includes("/sw.js")) {
        reg.unregister();
      }
    });
  });
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
