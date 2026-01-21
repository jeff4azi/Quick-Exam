import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const BookMark = ({ bookmarks, courses, setBookmarks }) => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const allQuestions = courses.flatMap(course => course.questions);

  // Filter questions that are bookmarked
  const bookmarkedQuestions = allQuestions.filter(q => bookmarks.includes(q.id));

  // Get course code from question id
  const getCourseFromId = (id) => {
    if (!id) return "";
    const prefix = id.split("-")[0].toLowerCase();
    if (prefix === "revedu101") return "REVISION EDU 101";

    const match = prefix.match(/^([a-z]+)(\d+)$/i);
    if (!match) return prefix.toUpperCase();

    const [, code, number] = match;
    return `${code.toUpperCase()} ${number}`;
  };

  // Remove a question from bookmarks
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
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
              />
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
        className={`flex items-center gap-5 px-5 py-6 sticky top-0 right-0 left-0 bg-gray-50 dark:bg-gray-900 z-50 transition-shadow duration-200 ${isScrolled ? "shadow-sm dark:shadow-black/40" : "shadow-none"
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
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
            />
          </svg>
        </button>
        <h1 className="text-2xl font-semibold dark:text-white">Bookmarked Questions</h1>
      </div>

      {/* Bookmarked Questions */}
      <div className="space-y-6 px-5">
        {bookmarkedQuestions.map((question, index) => (
          <div
            key={question.id || index}
            className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex justify-between items-center mb-2">
              {/* Course Code */}
              <div className="text-gray-400 dark:text-gray-300 text-sm">{getCourseFromId(question.id)}</div>
              {/* Delete Bookmark */}
              <button
                onClick={() => handleDeleteBookmark(question.id)}
                className="bg-red-500 dark:bg-red-600 p-2 rounded-sm text-white hover:bg-red-600 dark:hover:bg-red-700 transition"
                title="Remove Bookmark"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="size-5" viewBox="0 0 16 16">
                  <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
                </svg>
              </button>
            </div>

            {/* Question */}
            <div className="font-medium mb-3 text-gray-900 dark:text-gray-100">
              {index + 1}. {question.question}
            </div>

            {/* Answer */}
            <div className="mb-2">
              <span className="text-gray-800 dark:text-gray-200">Answer: </span>
              <span className="font-medium text-blue-600 dark:text-blue-400">{question.correct}</span>
            </div>

            {/* Reason */}
            {question.reason && (
              <div className="mt-3 bg-gray-50 dark:bg-gray-700 border-l-4 border-blue-500 dark:border-blue-400 p-3 rounded">
                <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Reason:
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  {question.reason}
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