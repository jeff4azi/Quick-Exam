import { useState } from "react";

const FEEDBOLT_URL = "https://feedbolt-beige.vercel.app/";
const STORAGE_KEY = "feedbolt_cta_dismissed";

const useDismissed = () => {
  const get = () => {
    try {
      return localStorage.getItem(STORAGE_KEY) === "true";
    } catch {
      return false;
    }
  };
  const set = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "true");
    } catch {}
  };
  return { get, set };
};

/** Home screen banner */
export const FeedBoltBanner = () => {
  const { get, set } = useDismissed();
  const [dismissed, setDismissed] = useState(get);

  if (dismissed) return null;

  const dismiss = (e) => {
    e.stopPropagation();
    set();
    setDismissed(true);
  };

  return (
    <a
      href={FEEDBOLT_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Visit FeedBolt — post, connect and interact with fellow scholars"
      className="group relative flex items-center justify-between gap-4 rounded-[2rem] p-5 overflow-hidden cursor-pointer active:scale-[0.98] transition-transform"
      style={{ background: "linear-gradient(135deg, #7C3AED, #6D28D9)" }}
    >
      {/* decorative blob */}
      <div className="absolute -right-8 -top-8 size-28 rounded-full bg-white/10 blur-2xl pointer-events-none" />

      <div className="relative z-10 flex items-center gap-3 min-w-0">
        <div className="shrink-0 size-10 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center text-lg">
          ⚡
        </div>
        <div className="min-w-0">
          <p className="text-white font-black text-base leading-tight">
            Discover FeedBolt
          </p>
          <p className="text-purple-200 text-[11px] font-medium mt-0.5 truncate">
            Post, connect &amp; interact with fellow scholars
          </p>
        </div>
      </div>

      <div className="relative z-10 shrink-0 flex items-center gap-2">
        <span className="text-white/90 text-xs font-semibold whitespace-nowrap">
          Visit →
        </span>
        <button
          type="button"
          onClick={dismiss}
          aria-label="Dismiss FeedBolt banner"
          className="size-[44px] flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white text-base transition-colors"
        >
          ×
        </button>
      </div>
    </a>
  );
};

/** Compact sidebar link for desktop */
export const FeedBoltSidebarLink = () => (
  <a
    href={FEEDBOLT_URL}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Open FeedBolt in a new tab"
    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors group"
  >
    <span className="size-8 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-base shrink-0">
      ⚡
    </span>
    <span className="flex-1">FeedBolt</span>
    <span className="text-[9px] font-black uppercase tracking-wider bg-purple-600 text-white px-1.5 py-0.5 rounded-md">
      NEW
    </span>
  </a>
);
