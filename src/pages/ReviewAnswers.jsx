import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { RenderMathText } from "../utils/RenderMathText"
import { FiLock, FiAlertTriangle, FiChevronLeft } from "react-icons/fi";

const ReviewAnswers = ({ questions, answers, selectedCourse, isPremium }) => {
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

  if (!isPremium) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] dark:bg-[#0F172A] px-6">
          <div className="max-w-sm w-full bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-lg border border-slate-100 dark:border-slate-700 text-center">
            <div className="text-4xl mb-4 flex justify-center items-center">
              <FiLock />
            </div>
  
            <h2 className="text-xl font-black mb-2">Premium Required</h2>
  
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
              Review Answers is a premium feature. Upgrade to unlock your saved
              questions.
            </p>
  
            <button
              onClick={() => navigate("/premium")}
              className="w-full py-3 rounded-2xl bg-blue-600 text-white font-bold hover:scale-[1.02] active:scale-[0.98] transition"
            >
              Get Premium
            </button>
  
            <span
              onClick={() => navigate(-1)}
              className="text-xs text-slate-500 dark:text-slate-400 mt-4 block cursor-pointer"
            >
              Go back
            </span>
          </div>
        </div>
      );
    }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-6">
      {/* Header */}
      <div
        className={`flex items-center gap-5 px-5 pt-6 pb-2 sticky top-0 right-0 left-0 bg-gray-50 dark:bg-gray-900 z-50 transition-shadow duration-200 ${
          isScrolled ? "shadow-sm dark:shadow-black/40 pb-6" : "shadow-none"
        }`}
      >
        <button
          className="p-2.5 rounded-2xl bg-white dark:bg-slate-800 shadow-sm border border-gray-100 dark:border-slate-700 active:scale-90 transition-all"
          onClick={() => navigate("/results")}
        >
          <FiChevronLeft className="-translate-x-1/18 size-6 text-slate-600 dark:text-slate-300" />
        </button>
        <h1 className="text-2xl font-semibold dark:text-gray-200">
          Review Answers
        </h1>
      </div>

      {/* Questions */}
      <div className="space-y-6 px-5 mt-5 max-w-4xl mx-auto">
        {questions.map((question, index) => {
          const userAnswer = answers[index];
          const isTheory =
            Array.isArray(question.keywords) || question.type === "theory";

          if (isTheory) {
            const matchedGroups = Array.isArray(question.keywords)
              ? question.keywords.filter(
                  (group) =>
                    Array.isArray(group) &&
                    group.some((kw) =>
                      (userAnswer || "")
                        .toLowerCase()
                        .includes(kw.toLowerCase()),
                    ),
                ).length
              : 0;
            const totalGroups = Array.isArray(question.keywords)
              ? question.keywords.length
              : 0;

            return (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="font-semibold text-gray-800 dark:text-gray-200 text-lg mb-4">
                  {index + 1}.{" "}
                  <RenderMathText
                    text={question.question}
                    courseId={selectedCourse.id}
                  />
                </div>
                <div className="mb-3">
                  <span className="font-medium text-gray-700 dark:text-gray-200">
                    Your answer:
                  </span>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-300 bg-gray-50 dark:bg-gray-700 rounded-xl p-3 whitespace-pre-wrap">
                    {userAnswer || (
                      <span className="italic text-gray-400">Not answered</span>
                    )}
                  </p>
                </div>
                <div className="flex items-center gap-2 text-sm font-bold text-blue-600 dark:text-blue-400">
                  Concepts matched: {matchedGroups} / {totalGroups}
                </div>
                {question.model_answer && (
                  <div className="mt-3 bg-gray-50 dark:bg-gray-700 border-l-4 border-green-500 p-4 rounded-lg">
                    <div className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">
                      Model Answer
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      {question.model_answer}
                    </div>
                  </div>
                )}
                <div className="mt-3 flex justify-end">
                  <a
                    href={`https://wa.me/2347015585397?text=${encodeURIComponent(`*Question Report*\n\n*ID:* ${question.id}\n\n*Question:* ${question.question}\n\n*User's Answer:* ${userAnswer || "Not answered"}\n\n*Model Answer:* ${question.model_answer || "N/A"}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 text-[11px] font-bold border border-amber-100 dark:border-amber-500/20 active:scale-95 transition-all"
                  >
                    <FiAlertTriangle size={12} />
                    Report Question
                  </a>
                </div>
              </div>
            );
          }

          const correctAnswer = question.correct;
          const isCorrect = userAnswer === correctAnswer;
          const isAnswered = userAnswer !== undefined;

          return (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 dark:border-gray-700"
            >
              {/* Question */}
              <div className="font-semibold text-gray-800 dark:text-gray-200 text-lg mb-4">
                {index + 1}.{" "}
                <RenderMathText
                  text={question.question}
                  courseId={selectedCourse.id}
                />
              </div>

              {/* User Answer */}
              <div className="mb-2 flex items-center gap-2">
                <span className="font-medium text-gray-700 dark:text-gray-200">
                  Your answer:
                </span>
                {isAnswered ? (
                  <span
                    className={`font-medium ${isCorrect ? "text-green-600" : "text-red-500"}`}
                  >
                    <RenderMathText
                      text={userAnswer}
                      courseId={selectedCourse.id}
                    />
                  </span>
                ) : (
                  <span className="text-gray-400 dark:text-gray-500 italic">
                    Not answered
                  </span>
                )}
              </div>

              {/* Correct Answer */}
              {!isCorrect && (
                <div className="mb-2 flex items-center gap-2">
                  <span className="font-medium text-gray-700 dark:text-gray-200">
                    Correct answer:
                  </span>
                  <span className="text-green-600 font-semibold">
                    <RenderMathText
                      text={correctAnswer}
                      courseId={selectedCourse.id}
                    />
                  </span>
                </div>
              )}

              {/* Explanation */}
              {!isCorrect && question.reason && (
                <div className="mt-3 bg-gray-50 dark:bg-gray-700 border-l-4 border-green-500 p-4 rounded-lg">
                  <div className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">
                    Explanation
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    <RenderMathText
                      text={question.reason}
                      courseId={selectedCourse.id}
                    />
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