import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaTrashAlt, FaBookmark, FaLightbulb } from "react-icons/fa";
import { FiArrowLeft, FiTrash2 } from "react-icons/fi"; // Added FiTrash2
import { RenderMathText } from "../utils/RenderMathText";

const BookMark = ({ bookmarks, courses, setBookmarks }) => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const allQuestions = courses.flatMap((course) => course.questions);
  const bookmarkedQuestions = allQuestions.filter((q) => bookmarks.includes(q.id));

  const getCourseFromId = (id) => {
    if (!id) return "";
    const prefix = id.split("-")[0].toLowerCase();
    if (prefix === "revedu101") return "REVISION EDU 101";

    const match = prefix.match(/^([a-z]+)(\d+)$/i);
    if (!match) return prefix.toUpperCase();

    const [, code, number] = match;
    return `${code.toUpperCase()} ${number}`;
  };

  const handleDeleteBookmark = (id) => {
    const updated = bookmarks.filter((b) => b !== id);
    setBookmarks(updated);
    localStorage.setItem("bookmarkedQuestions", JSON.stringify(updated));
  };

  // --- NEW: CLEAR ALL LOGIC ---
  const handleClearAll = () => {
    if (window.confirm("Are you sure you want to clear all bookmarks?")) {
      setBookmarks([]);
      localStorage.setItem("bookmarkedQuestions", JSON.stringify([]));
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0F172A] text-slate-900 dark:text-slate-100 transition-colors duration-500">
      {/* Sleek Glass Header */}
      <header
        className={`sticky top-0 z-50 px-6 py-4 transition-all duration-300 ${
          isScrolled
            ? "bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-lg shadow-slate-200/50 dark:shadow-none border-b border-slate-100 dark:border-slate-800"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2.5 rounded-2xl bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700 active:scale-90 transition-all"
            >
              <FiArrowLeft size={20} />
            </button>
            <h1 className="text-xl font-black tracking-tight">Saved Items</h1>
          </div>

          <div className="flex items-center gap-2">
            {/* --- NEW: CLEAR ALL BUTTON --- */}
            {bookmarkedQuestions.length > 0 && (
              <button
                onClick={handleClearAll}
                className="p-2.5 rounded-2xl bg-red-50 dark:bg-red-500/10 text-red-500 border border-red-100 dark:border-red-500/20 active:scale-90 transition-all"
                title="Clear All"
              >
                <FiTrash2 size={20} />
              </button>
            )}
            
            <div className="bg-blue-50 dark:bg-blue-500/10 px-4 py-1.5 rounded-full border border-blue-100 dark:border-blue-500/20">
              <span className="text-xs font-black text-blue-600 dark:text-blue-400">
                {bookmarkedQuestions.length} TOTAL
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-6 pt-4 pb-20">
        {bookmarkedQuestions.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 text-center animate-in fade-in duration-700">
            <div className="size-24 bg-slate-100 dark:bg-slate-800 rounded-[2rem] flex items-center justify-center mb-6">
              <FaBookmark size={36} className="text-slate-300 dark:text-slate-600" />
            </div>
            <h3 className="text-xl font-black">Archive is empty</h3>
            <p className="text-slate-500 text-sm max-w-[240px] mt-2 leading-relaxed">
              Questions you bookmark during exams will appear here for review.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 ml-1">
              Bookmarked Questions
            </h3>

            <div className="space-y-5">
              {bookmarkedQuestions.map((question, index) => (
                <div
                  key={question.id || index}
                  className="group bg-white dark:bg-slate-800/50 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl hover:shadow-slate-200/40 dark:hover:shadow-none transition-all duration-300 relative"
                >
                  <div className="flex justify-between items-center mb-4">
                    <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-[10px] font-black tracking-wider text-slate-500 dark:text-slate-400">
                      {getCourseFromId(question.id)}
                    </span>
                    
                    {/* Individual Delete Button - Improved visibility for mobile/desktop */}
                    <button
                      onClick={() => handleDeleteBookmark(question.id)}
                      className="p-2.5 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300 opacity-100 lg:opacity-0 lg:group-hover:opacity-100"
                      title="Remove Bookmark"
                    >
                      <FaTrashAlt size={14} />
                    </button>
                  </div>

                  {/* Question Text */}
                  <div className="text-lg font-bold text-slate-800 dark:text-slate-100 leading-snug mb-4">
                    <div className="flex gap-2">
                      <span className="text-blue-500 shrink-0">{index + 1}.</span>
                      <div className="flex-1 break-words whitespace-normal">
                        <RenderMathText text={question.question} courseId={question.id} />
                      </div>
                    </div>
                  </div>

                  {/* Answer Section */}
                  <div className="flex items-center gap-3 bg-emerald-50/50 dark:bg-emerald-500/5 p-4 rounded-2xl border border-emerald-100/50 dark:border-emerald-500/10">
                    <div className="size-8 rounded-lg bg-emerald-500 flex items-center justify-center text-white shrink-0 shadow-sm shadow-emerald-200">
                      <span className="text-[10px] font-black">ANS</span>
                    </div>
                    <div className="text-emerald-700 dark:text-emerald-400 font-black">
                      <RenderMathText text={question.correct} courseId={question.id} />
                    </div>
                  </div>

                  {/* Explanation Section */}
                  {question.reason && (
                    <div className="mt-4 flex gap-3 p-4 rounded-2xl bg-blue-50/30 dark:bg-blue-500/5 border-l-4 border-blue-500">
                      <FaLightbulb className="text-blue-500 shrink-0 mt-0.5" size={16} />
                      <div className="space-y-1">
                        <p className="text-[11px] font-black uppercase tracking-wider text-blue-600 dark:text-blue-400">
                          Explanation
                        </p>
                        <div className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                          <RenderMathText text={question.reason} courseId={question.id} />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default BookMark;