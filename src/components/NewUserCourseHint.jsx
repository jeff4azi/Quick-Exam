import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { IoLibraryOutline } from "react-icons/io5";

const HINT_KEY = "quizbolt_new_user_hint_dismissed";

export const isNewUserHintVisible = (isNew) => {
  if (!isNew) return false;
  try {
    return localStorage.getItem(HINT_KEY) !== "1";
  } catch {
    return true;
  }
};

const NewUserCourseHint = ({ variant = "mobile", isNew, onDismiss }) => {
  const location = useLocation();

  const [visible, setVisible] = useState(() => {
    if (!isNew) return false;
    try {
      return localStorage.getItem(HINT_KEY) !== "1";
    } catch {
      return true;
    }
  });

  useEffect(() => {
    if (location.pathname === "/choose-course") {
      dismiss();
    }
  }, [location.pathname]);

  const dismiss = () => {
    setVisible(false);
    try {
      localStorage.setItem(HINT_KEY, "1");
    } catch {
      // ignore
    }
    onDismiss?.();
  };

  if (!visible || !isNew) return null;

  if (variant === "mobile") {
    return (
      <div className="mx-4 mb-2 pointer-events-auto">
        <div className="relative flex items-center gap-3 rounded-xl border border-blue-200 bg-blue-50 px-3 py-2.5 dark:border-blue-500/30 dark:bg-blue-950/40">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-white">
            <IoLibraryOutline size={16} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-bold text-blue-900 dark:text-blue-100">
              Start your first test
            </p>
            <p className="text-[11px] text-blue-700/80 dark:text-blue-300/80">
              Tap Courses below to pick a subject
            </p>
          </div>
          <button
            type="button"
            onClick={dismiss}
            aria-label="Dismiss hint"
            className="shrink-0 rounded-md px-2 py-1 text-[10px] font-semibold text-blue-600 hover:bg-blue-100 dark:text-blue-300 dark:hover:bg-blue-900/40"
          >
            Dismiss
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pointer-events-auto mx-1 mt-1.5 mb-2">
      <div className="relative rounded-xl border border-blue-200 bg-blue-50 px-3 py-2.5 dark:border-blue-500/30 dark:bg-blue-950/40">
        <p className="text-[11px] font-bold uppercase tracking-wide text-blue-700 dark:text-blue-300">
          Get started
        </p>
        <p className="mt-0.5 text-xs font-semibold text-blue-900 dark:text-blue-100">
          Select a course to begin your first test
        </p>
        <button
          type="button"
          onClick={dismiss}
          aria-label="Dismiss hint"
          className="mt-2 text-[10px] font-semibold text-blue-600 hover:underline dark:text-blue-300"
        >
          Dismiss
        </button>
      </div>
    </div>
  );
};

export default NewUserCourseHint;
