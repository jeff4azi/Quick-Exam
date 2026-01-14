import { useNavigate } from "react-router-dom";

const BookMark = ({ bookmarks, edu101Questions, gns113Questions, gst111Questions, edu101revisionQuestions, setBookmarks }) => {
  const navigate = useNavigate();

  // Combine all questions
  const allQuestions = [...edu101Questions, ...gst111Questions, ...gns113Questions, ...edu101revisionQuestions];

  // Filter questions that are bookmarked
  const bookmarkedQuestions = allQuestions.filter(q => bookmarks.includes(q.id));

  // Function to get course code from question id
  const getCourseFromId = (id) => {
    if (!id) return "";

    const prefix = id.split("-")[0].toLowerCase();

    // Handle revision EDU 101
    if (prefix === "revedu101") {
      return "REVISION EDU 101";
    }

    // Normal courses (edu101, gst111, gns113)
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
            className="bg-gray-100 p-2 rounded-xl shadow-sm active:scale-95 hover:scale-105 duration-200"
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
          <h1 className="text-2xl font-semibold">Bookmarked Questions</h1>
        </div>
        <div className="flex items-center justify-center text-gray-500 min-h-[calc(100vh-100px)]">
          No bookmarked questions.
        </div>
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-5 py-6">
      {/* Header */}
      <div className="flex items-center gap-5 mb-6">
        <button
          className="bg-gray-100 p-2 rounded-xl shadow-sm active:scale-95 hover:scale-105 duration-200"
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
        <h1 className="text-2xl font-semibold">Bookmarked Questions</h1>
      </div>

      {/* Bookmarked Questions */}
      <div className="space-y-6">
        {bookmarkedQuestions.map((question, index) => (
          <div
            key={question.id || index}
            className="bg-white p-5 rounded-xl shadow-sm"
          >
            <div className="flex justify-between items-center mb-2">
              {/* Dynamic Course Code */}
              <div className="text-gray-400 text-sm">{getCourseFromId(question.id)}</div>
              {/* Delete Bookmark */}
              <button
                onClick={() => handleDeleteBookmark(question.id)}
                className="bg-red-500 p-2 rounded-sm text-white hover:bg-red-600 transition"
                title="Remove Bookmark"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="size-5" viewBox="0 0 16 16">
                  <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
                </svg>
              </button>
            </div>

            {/* Question */}
            <div className="font-medium mb-3">
              {index + 1}. {question.question}
            </div>

            {/* Answer */}
            <div className="mb-2">
              <span>Answer: </span>
              <span className="font-medium text-blue-600">{question.correct}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookMark;