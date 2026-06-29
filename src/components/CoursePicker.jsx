import { FiSearch, FiChevronLeft } from "react-icons/fi";
import { useState } from "react";

const CoursePicker = ({ 
  courses, 
  loading, 
  onSelect, 
  onBack, 
  title = "Study", 
  subtitle = "Pick a course to study",
  mode = "flashcard",
  rightButton
}) => {
  const [query, setQuery] = useState("");

  // Define color schemes based on mode
  const colors = {
    flashcard: {
      border: "hover:border-violet-300 dark:hover:border-violet-600",
      badgeBg: "bg-violet-50 dark:bg-violet-900/30",
      badgeText: "text-violet-600 dark:text-violet-400",
      searchFocus: "focus:border-violet-400 dark:focus:border-violet-500"
    },
    test: {
      border: "hover:border-blue-300 dark:hover:border-blue-600",
      badgeBg: "bg-blue-50 dark:bg-blue-900/30",
      badgeText: "text-blue-600 dark:text-blue-400",
      searchFocus: "focus:border-blue-400 dark:focus:border-blue-500"
    },
    match: {
      border: "hover:border-green-300 dark:hover:border-green-600",
      badgeBg: "bg-green-50 dark:bg-green-900/30",
      badgeText: "text-green-600 dark:text-green-400",
      searchFocus: "focus:border-green-400 dark:focus:border-green-500"
    }
  };

  const currentColors = colors[mode] || colors.flashcard;

  const filtered = (courses || []).filter(
    (c) =>
      c?.name?.toLowerCase().includes(query.toLowerCase()) ||
      c?.title?.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-[100dvh] bg-gray-50 dark:bg-slate-900 flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-gray-50/90 dark:bg-slate-900/90 backdrop-blur-md px-6 pt-6 pb-4 border-b border-gray-100 dark:border-slate-800">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-3">
              <button
                onClick={onBack}
                className="p-2.5 rounded-2xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 shadow-sm active:scale-90 transition-all"
              >
                <FiChevronLeft className="size-5 text-slate-600 dark:text-slate-300" />
              </button>
              <div>
                <h1 className="text-xl font-black text-slate-900 dark:text-white">{title}</h1>
                <p className="text-xs text-slate-500 dark:text-slate-400">{subtitle}</p>
              </div>
            </div>
            {rightButton}
          </div>

          {/* Search */}
          <div className="relative">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 size-4" />
            <input
              type="text"
              placeholder="Search courses..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className={`w-full pl-10 pr-4 py-3 rounded-2xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none ${currentColors.searchFocus} transition-colors`}
            />
          </div>
        </div>
      </div>

      {/* Course list */}
      <div className="flex-1 px-6 py-4 overflow-y-auto">
        <div className="max-w-2xl mx-auto space-y-3">
          {loading ? (
            [...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-20 rounded-2xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 animate-pulse"
              />
            ))
          ) : filtered.length === 0 ? (
            <p className="text-center text-sm text-slate-400 py-12">No courses found.</p>
          ) : (
            filtered.map((course) => (
              <button
                key={course.id}
                type="button"
                onClick={() => onSelect(course)}
                className={`w-full text-left p-5 rounded-2xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 ${currentColors.border} hover:shadow-md transition-all active:scale-[0.98] group`}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-black text-slate-900 dark:text-white text-base truncate">
                      {course.name}
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400 truncate mt-0.5">
                      {course.title}
                    </p>
                  </div>
                  <span className={`shrink-0 px-3 py-1 rounded-full ${currentColors.badgeBg} ${currentColors.badgeText} text-[10px] font-bold tracking-wider`}>
                    {(course.questionCount || 0) + (course.theoryQuestionCount || 0) + (course.fibQuestionCount || 0)} Qs
                  </span>
                </div>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CoursePicker;
