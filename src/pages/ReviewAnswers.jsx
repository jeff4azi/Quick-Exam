import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const ReviewAnswers = ({ questions, answers }) => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!questions || questions.length === 0) {
    return (
      <div className="h-screen flex items-center justify-center text-gray-500 dark:text-gray-400 dark:bg-gray-900">
        No questions to review.
      </div>
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
          onClick={() => navigate("/results")}
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
        <h1 className="text-2xl font-semibold dark:text-gray-200">
          Review Answers
        </h1>
      </div>

      {/* Questions */}
      <div className="space-y-6 px-5 mt-5">
        {questions.map((question, index) => {
          const userAnswer = answers[index];
          const correctAnswer = question.correct;

          const isCorrect = userAnswer === correctAnswer;
          const isAnswered = userAnswer !== undefined;

          return (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm"
            >
              {/* Question */}
              <div className="font-medium mb-3 dark:text-gray-200">
                {index + 1}. {question.question}
              </div>

              {/* User Answer */}
              <div className="mb-2">
                <span className="font-medium dark:text-gray-200">Your answer: </span>
                {isAnswered ? (
                  <span className={isCorrect ? "text-green-600" : "text-red-600"}>
                    {userAnswer}
                  </span>
                ) : (
                  <span className="text-gray-400 dark:text-gray-500">Not answered</span>
                )}
              </div>

              {/* Correct Answer */}
              {!isCorrect && (
                <div>
                  <span className="font-medium dark:text-gray-200">Correct answer: </span>
                  <span className="text-green-600">{correctAnswer}</span>
                </div>
              )}

              {/* Reason / Explanation */}
              {!isCorrect && question.reason && (
                <div className="mt-3 bg-gray-50 dark:bg-gray-700 border-l-4 border-green-500 p-3 rounded">
                  <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Explanation:
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    {question.reason}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ReviewAnswers;