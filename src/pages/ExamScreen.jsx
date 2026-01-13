import { useState } from "react"
import { useNavigate } from "react-router-dom"

import ProgressBar from "../components/ProgressBar"
import Timer from "../components/Timer"

const TOTAL_TIME = 10 * 60 // 10 minutes in seconds

const ExamScreen = ({ answers, setAnswers, questions, onSubmit, selectedCourse }) => {
  const navigate = useNavigate()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME)

  const currentQuestion = questions[currentIndex]
  const totalQuestions = questions.length
  const selectedOption = answers[currentIndex]

  const onOptionClick = (option) => {
    const newAnswers = [...answers]
    newAnswers[currentIndex] = option
    setAnswers(newAnswers)
  }

  const handleTimeUp = (finalTime) => {
    onSubmit()
    navigate("/results", {
      state: { timeTaken: TOTAL_TIME - finalTime } // elapsed time
    })
  }

  const nextQuestion = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex(prev => prev + 1)
    } else {
      // on final submit, pass elapsed time
      onSubmit()
      navigate("/results", { state: { timeTaken: TOTAL_TIME - timeLeft } })
    }
  }

  const prevQuestion = () => {
    if (currentIndex > 0) setCurrentIndex(prev => prev - 1)
  }

  const progress = ((currentIndex + 1) / totalQuestions) * 100

  return (
    <div className="lg:max-w-2xl mx-auto">
      {/* Top bar */}
      <div className="flex justify-between items-center my-7 mx-5">
        <button onClick={() => navigate("/")} className="bg-gray-100 p-2 rounded-xl shadow-sm active:scale-95 hover:scale-105 duration-200">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
        </button>

        <div className="font-medium absolute left-1/2 -translate-x-1/2">
          {currentIndex + 1} of {totalQuestions}
        </div>

        <Timer totalTime={TOTAL_TIME} onTick={setTimeLeft} onTimeUp={handleTimeUp} />
      </div>

      <div className="mx-5">
        <ProgressBar progress={progress} />
      </div>

      {/* Question Card */}
      <div className="bg-white mx-5 p-5 rounded-2xl my-7 shadow-sm">
        <div className="text-gray-400 mb-2">{selectedCourse.name}</div>
        <div className="text-xl font-medium mb-7">{currentQuestion.question}</div>
        <div className="space-y-4">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => onOptionClick(option)}
              className={`py-3 px-4 w-full rounded-xl ring-2 transition active:scale-95 hover:ring-[#2563EB]/40 duration-200 ${selectedOption === option ? "ring-[#2563EB]/60" : "ring-gray-300"
                }`}
            >
              <span className="text-lg font-medium">{option}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="mx-7 flex justify-between">
        <button
          onClick={prevQuestion}
          disabled={currentIndex === 0}
          className="bg-red-500 disabled:opacity-40 h-[50px] w-[150px] rounded-xl font-medium text-white shadow-sm active:scale-95 hover:scale-105 duration-200"
        >
          Previous
        </button>
        <button
          onClick={nextQuestion}
          className="bg-green-500 h-[50px] w-[150px] rounded-xl font-medium text-white shadow-sm active:scale-95 hover:scale-105 duration-200"
        >
          {currentIndex === totalQuestions - 1 ? "Submit" : "Next"}
        </button>
      </div>
    </div>
  )
}

export default ExamScreen