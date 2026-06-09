/**
 * SectionLoader - Inline loading spinner for page content sections
 * Used in History, Saved, Leaderboard, and ChooseCourse screens
 * Sits inside the page (not full-screen) — fills the content area with py-24
 */
const SectionLoader = ({ text = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center py-24">
      <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-b-4 border-blue-500 mb-4" />
      <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
        {text}
      </p>
    </div>
  );
};

export default SectionLoader;
