import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { StrictMode, useCallback, useEffect } from "react";
import { useRegisterSW } from "virtual:pwa-register/react";

// gtag is initialised in index.html <head> — no setup needed here.

// Capture the beforeinstallprompt event as early as possible — before React
// mounts. On Android Chrome this fires very early (sometimes before the first
// paint) so a listener inside a useEffect always misses it.
window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  // Stash it globally so any component can pick it up later.
  window.__pwaInstallPrompt = e;
});

function PWAUpdater() {
  const {
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    immediate: true,
    onRegistered(r) {
      console.log("SW Registered:", r);
    },
    onRegisterError(error) {
      console.log("SW registration error", error);
    },
  });

  const close = useCallback(() => {
    setNeedRefresh(false);
  }, [setNeedRefresh]);

  useEffect(() => {
    if (needRefresh) {
      // Auto-update when a new version is available
      updateServiceWorker(true);
    }
  }, [needRefresh, updateServiceWorker]);

  return null;
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <PWAUpdater />
    <App />
  </StrictMode>,
);
