import { RenderMathText } from "../utils/RenderMathText";

/**
 * A single box in the match game.
 * state: "idle" | "selected" | "correct" | "wrong"
 */
const MatchBox = ({ text, state, onClick, courseId }) => {
  const base =
    "relative flex items-center justify-center rounded-2xl p-3 text-center text-xs font-semibold leading-snug cursor-pointer select-none transition-all duration-200 shadow-sm w-full h-full min-h-[80px]";

  const styles = {
    idle:
      "bg-white dark:bg-slate-800 border-2 border-gray-100 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:shadow-md hover:-translate-y-0.5 hover:border-sky-300 dark:hover:border-sky-600",
    selected:
      "bg-sky-50 dark:bg-sky-900/30 border-2 border-sky-500 text-sky-700 dark:text-sky-300 shadow-md -translate-y-0.5",
    correct:
      "bg-green-50 dark:bg-green-900/20 border-2 border-green-400 dark:border-green-600 text-green-700 dark:text-green-300 cursor-default opacity-80",
    wrong:
      "bg-red-50 dark:bg-red-900/20 border-2 border-red-400 dark:border-red-500 text-red-600 dark:text-red-400 animate-pulse",
  };

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={state === "correct"}
      className={`${base} ${styles[state] ?? styles.idle}`}
    >
      <span className="line-clamp-4 overflow-hidden">
        <RenderMathText text={text ?? ""} courseId={courseId} />
      </span>
    </button>
  );
};

export default MatchBox;
