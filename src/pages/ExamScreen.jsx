import { useState } from "react"
import { useNavigate } from "react-router-dom"

import ProgressBar from "../components/ProgressBar"
import Timer from "../components/Timer"


const ExamScreen = ({ answers, setAnswers, shuffled30edu101Questions, onSubmit }) => {
 function onOptionClick(option) {
    const newAnswers = [...answers]
    newAnswers[currentIndex] = option
    setAnswers(newAnswers)
  }

  const navigate = useNavigate()

  const [currentIndex, setCurrentIndex] = useState(0)
  
  const selectedOption = answers[currentIndex]

  const currentQuestion = shuffled30edu101Questions[currentIndex]
  const totalQuestions = shuffled30edu101Questions.length

  const goHome = () => navigate("/")

  const nextQuestion = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex(prev => prev + 1)
    } else {
      onSubmit()
      navigate("/results")
    }
  }

  

  const prevQuestion = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1)
    }
  }

  const progress = ((currentIndex + 1) / totalQuestions) * 100

  return (
    <div>
      {/* Top bar */}
      <div className="flex justify-between items-center my-7 mx-5">
        <button onClick={goHome} className="bg-gray-100 p-2 rounded-xl">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
        </button>

        <div className="font-medium absolute left-1/2 -translate-x-1/2">
          {currentIndex + 1} of {totalQuestions}
        </div>

        <Timer initialMinutes={15} initialSeconds={0} onSubmit={onSubmit} />
      </div>

      <div className="mx-5">
        <ProgressBar progress={progress} />
      </div>

      {/* Question Card */}
      <div className="bg-white mx-5 p-5 rounded-2xl my-7">
        <div className="text-gray-400 mb-2">EDU 101</div>

        <div className="text-xl font-medium mb-7">
          {currentQuestion.question}
        </div>

        <div className="space-y-4">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => onOptionClick(option)}
              className={`py-3 px-4 w-full rounded-xl ring-2 transition
                ${selectedOption === option
                  ? "ring-[#2563EB]/60"
                  : "ring-gray-300"
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
          className="bg-red-500 disabled:opacity-40 h-[50px] w-[150px] rounded-xl font-medium text-white"
        >
          Previous
        </button>

        <button
          onClick={nextQuestion}
          className="bg-green-500 h-[50px] w-[150px] rounded-xl font-medium text-white"
        >
          {currentIndex === totalQuestions - 1 ? "Submit" : "Next"}
        </button>
      </div>
    </div>
  )
}

export default ExamScreen