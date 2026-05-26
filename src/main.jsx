import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { StrictMode } from "react";

// gtag is initialised in index.html <head> — no setup needed here.

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
