import { useNavigate } from "react-router-dom";

const ReviewAnswers = ({ questions, answers }) => {
  const navigate = useNavigate();

  if (!questions || questions.length === 0) {
    return (
      <div className="h-screen flex items-center justify-center text-gray-500">
        No questions to review.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-5 py-6">
      {/* Header */}
      <div className="flex items-center gap-5 mb-6">

        {/* Back button */}
        <button className="bg-gray-100 p-2 rounded-xl shadow-sm active:scale-95 hover:scale-105 duration-200" onClick={() => navigate("/results")}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
        </button>
        <h1 className="text-2xl font-semibold">Review Answers</h1>
      </div>

      {/* Questions */}
      <div className="space-y-6">
        {questions.map((question, index) => {
          const userAnswer = answers[index];
          const correctAnswer = question.correct;

          const isCorrect = userAnswer === correctAnswer;
          const isAnswered = userAnswer !== undefined;

          return (
            <div
              key={index}
              className="bg-white p-5 rounded-xl shadow-sm"
            >
              {/* Question */}
              <div className="font-medium mb-3">
                {index + 1}. {question.question}
              </div>

              {/* User Answer */}
              <div className="mb-2">
                <span className="font-medium">Your answer: </span>
                {isAnswered ? (
                  <span
                    className={
                      isCorrect ? "text-green-600" : "text-red-600"
                    }
                  >
                    {userAnswer}
                  </span>
                ) : (
                  <span className="text-gray-400">Not answered</span>
                )}
              </div>

              {/* Correct Answer */}
              {!isCorrect && (
                <div>
                  <span className="font-medium">Correct answer: </span>
                  <span className="text-green-600">
                    {correctAnswer}
                  </span>
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