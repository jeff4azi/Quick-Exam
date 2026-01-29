import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { RenderMathText } from "../utils/RenderMathText"

const BookMark = ({ bookmarks, courses, setBookmarks }) => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const allQuestions = courses.flatMap(course => course.questions);
  const bookmarkedQuestions = allQuestions.filter(q => bookmarks.includes(q.id));

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
    const updated = bookmarks.filter(b => b !== id);
    setBookmarks(updated);
    localStorage.setItem("bookmarkedQuestions", JSON.stringify(updated));
  };

  if (!bookmarkedQuestions || bookmarkedQuestions.length === 0) {
    return (
      <>
        <div className="flex items-center gap-5 mb-6 mx-5 mt-5">
          <button
            className="bg-gray-100 dark:bg-gray-700 p-2 rounded-xl shadow-sm active:scale-95 hover:scale-105 duration-200"
            onClick={() => navigate(-1)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
          </button>
          <h1 className="text-2xl font-semibold dark:text-white">Bookmarked Questions</h1>
        </div>
        <div className="flex items-center justify-center text-gray-500 dark:text-gray-400 min-h-[calc(100vh-100px)]">
          No bookmarked questions.
        </div>
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-6">

      {/* Header */}
      <div
        className={`flex items-center gap-5 px-5 pt-6 pb-2 sticky top-0 right-0 left-0 bg-gray-50 dark:bg-gray-900 z-50 transition-shadow duration-200 ${isScrolled ? "shadow-sm dark:shadow-black/40 pb-6" : "shadow-none"
          }`}
      >
        <button
          className="bg-gray-100 dark:bg-gray-700 p-2 rounded-xl shadow-sm active:scale-95 hover:scale-105 duration-200"
          onClick={() => navigate(-1)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
        </button>
        <h1 className="text-2xl font-semibold dark:text-white">Bookmarked Questions</h1>
      </div>

      {/* Bookmarked Questions */}
      <div className="space-y-6 px-5 mt-4">
        {bookmarkedQuestions.map((question, index) => (
          <div
            key={question.id || index}
            className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 dark:border-gray-700"
          >
            <div className="flex justify-between items-start mb-3">
              {/* Course Code */}
              <div className="text-gray-400 dark:text-gray-300 text-sm font-medium">
                {getCourseFromId(question.id)}
              </div>

              {/* Delete Bookmark */}
              <button
                onClick={() => handleDeleteBookmark(question.id)}
                className="p-2 rounded-full bg-red-100 dark:bg-red-700 text-red-600 dark:text-red-200 hover:bg-red-200 dark:hover:bg-red-600 transition-colors active:scale-95"
                title="Remove Bookmark"
              >
                <FaTrash size={14} />
              </button>
            </div>

            {/* Question */}
            <div className="font-semibold text-gray-800 dark:text-gray-100 text-lg mb-3">
              {index + 1}. <RenderMathText text={question.question} />
            </div>

            {/* Answer */}
            <div className="mb-2 flex items-center gap-2">
              <span className="font-medium text-gray-700 dark:text-gray-200">Answer:</span>
              <span className="font-semibold text-blue-600 dark:text-blue-400">
                <RenderMathText text={question.correct} />
              </span>
            </div>

            {/* Reason */}
            {question.reason && (
              <div className="mt-3 bg-gray-50 dark:bg-gray-700 border-l-4 border-blue-500 dark:border-blue-400 p-4 rounded-lg">
                <div className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">
                  Reason
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  <RenderMathText text={question.reason} />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookMark;