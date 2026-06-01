import { useNavigate } from "react-router-dom";
import { FiArrowLeft, FiHome } from "react-icons/fi";

const RouteStateFallback = ({
  title = "Nothing to show yet",
  message = "Start from the dashboard to choose a course and begin an exam.",
  primaryLabel = "Go home",
  secondaryLabel = "Back",
}) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[100dvh] bg-gray-50 dark:bg-slate-900 px-5 py-8 flex items-center justify-center transition-colors duration-300">
      <section className="w-full max-w-sm text-center">
        <div className="mx-auto mb-6 size-16 rounded-3xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 shadow-sm flex items-center justify-center">
          <FiHome className="size-7 text-blue-600 dark:text-blue-400" />
        </div>

        <h1 className="text-2xl font-black tracking-tight text-slate-950 dark:text-white">
          {title}
        </h1>
        <p className="mt-3 text-sm font-medium leading-6 text-slate-500 dark:text-slate-400">
          {message}
        </p>

        <div className="mt-8 grid grid-cols-1 gap-3">
          <button
            type="button"
            onClick={() => navigate("/", { replace: true })}
            className="w-full rounded-2xl bg-blue-600 px-5 py-4 text-sm font-black text-white shadow-lg shadow-blue-200/70 transition-all hover:bg-blue-700 active:scale-[0.98] dark:shadow-none"
          >
            {primaryLabel}
          </button>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="w-full rounded-2xl border border-gray-200 bg-white px-5 py-4 text-sm font-black text-slate-600 transition-all hover:bg-gray-50 active:scale-[0.98] dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 flex items-center justify-center gap-2"
          >
            <FiArrowLeft className="size-4" />
            {secondaryLabel}
          </button>
        </div>
      </section>
    </div>
  );
};

export default RouteStateFallback;
