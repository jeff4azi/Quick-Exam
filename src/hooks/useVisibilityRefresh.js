import { useEffect, useRef } from "react";

/**
 * Calls `callback` whenever the browser tab becomes visible again after being
 * hidden (idle / tab switch / minimised window).
 *
 * Usage:
 *   useVisibilityRefresh(fetchHistory);   // re-runs fetchHistory on tab focus
 *
 * @param {() => void} callback  - The data-fetching function to re-invoke.
 * @param {number}     [delay=0] - Optional ms delay before invoking (useful to
 *                                 let the refreshed session propagate first).
 */
export const useVisibilityRefresh = (callback, delay = 300) => {
  // Keep a stable ref so we never need callback in the effect dep array
  const callbackRef = useRef(callback);
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    let timer;

    const handleVisibilityChange = () => {
      if (document.visibilityState !== "visible") return;
      // Small delay so AuthContext's session refresh fires first
      timer = setTimeout(() => {
        callbackRef.current?.();
      }, delay);
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      clearTimeout(timer);
    };
  }, [delay]);
};
