import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const BookmarkPage = ({ questions }) => {
  const navigate = useNavigate();
  const [bookmarkedQuestions, setBookmarkedQuestions] = useState([]);

  // Load bookmarked question IDs from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("bookmarkedQuestions");
    if (saved) {
      const ids = JSON.parse(saved);
      // Filter questions to only bookmarked ones
      const filtered = questions.filter(q => ids.includes(q.id));
      setBookmarkedQuestions(filtered);
    }
  }, [questions]);

  if (!bookmarkedQuestions || bookmarkedQuestions.length === 0) {
    return (
      <div className="h-screen flex items-center justify-center text-gray-500">
        No bookmarked questions.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-5 py-6">
      {/* Header */}
      <div className="flex items-center gap-5 mb-6">
        <button
          className="bg-gray-100 p-2 rounded-xl shadow-sm active:scale-95 hover:scale-105 duration-200"
          onClick={() => navigate(-1)} // go back
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
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
          <div key={index} className="bg-white p-5 rounded-xl shadow-sm">
            {/* Question */}
            <div className="font-medium mb-3">
              {index + 1}. {question.question}
            </div>

            {/* Correct Answer */}
            <div>
              <span className="font-medium">Correct answer: </span>
              <span className="text-green-600">{question.answer}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookmarkPage;