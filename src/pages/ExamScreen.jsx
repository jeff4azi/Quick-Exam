import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import ConfirmOverlay from "../components/ConfirmOverlay"
import { RenderMathText } from "../utils/RenderMathText"
import ProgressBar from "../components/ProgressBar"
import Timer from "../components/Timer"
import ReactGA from "react-ga4"

const calculateTotalTime = (questionCount, isMath) => {
  const timePer10 = isMath ? 6 * 60 : 3.33 * 60
  return Math.ceil((questionCount / 10) * timePer10)
}

const shuffleArray = (array) => {
  const arr = [...array]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    [arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

const ExamScreen = ({
  answers,
  setAnswers,
  questions,
  onSubmit,
  selectedCourse,
  bookmarks,
  setBookmarks
}) => {
  const isMathCourse = selectedCourse?.id === "MTH101"
  const navigate = useNavigate()
  const totalQuestions = questions.length

  // Calculate total time once
  const initialTotalTime = calculateTotalTime(totalQuestions, isMathCourse)

  const [currentIndex, setCurrentIndex] = useState(0)
  const [timeLeft, setTimeLeft] = useState(initialTotalTime)
  const [timeTaken, setTimeTaken] = useState(0) // NEW: Track actual time taken
  const [shuffledOptions, setShuffledOptions] = useState([])
  const [hasSaved, setHasSaved] = useState(false)
  const [isSubmitOverlayOpen, setSubmitOverlayOpen] = useState(false)
  const [isExitOverlayOpen, setExitOverlayOpen] = useState(false)

  const currentQuestion = questions[currentIndex]
  const selectedOption = answers[currentIndex]
  const isBookmarked = bookmarks.includes(currentQuestion?.id)

  useEffect(() => {
    if (currentQuestion) {
      setShuffledOptions(shuffleArray(currentQuestion.options))
    }
  }, [currentQuestion])

  const handleBookmarkClick = () => {
    setBookmarks(prev => {
      const updated = prev.includes(currentQuestion.id)
        ? prev.filter(id => id !== currentQuestion.id)
        : [...prev, currentQuestion.id]
      localStorage.setItem("bookmarkedQuestions", JSON.stringify(updated))
      return updated
    })
  }

  const onOptionClick = (option) => {
    const newAnswers = [...answers]
    newAnswers[currentIndex] = option
    setAnswers(newAnswers)
  }

  const calculateScore = () =>
    questions.reduce((acc, q, idx) => (answers[idx] === q.correct ? acc + 1 : acc), 0)

  const saveResult = () => {
    if (hasSaved) return

    const correctCount = calculateScore()

    const newResult = {
      id: Date.now(),
      course: selectedCourse.name,
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
      }),
      score: correctCount,
      total: totalQuestions,
      timeTaken: timeTaken // Use tracked time
    }

    const existingHistory = JSON.parse(localStorage.getItem("examHistory")) || []
    localStorage.setItem("examHistory", JSON.stringify([...existingHistory, newResult]))
    setHasSaved(true)

    ReactGA.event({
      category: "Exam",
      action: `Submit Exam ${selectedCourse.name}`,
      label: selectedCourse.id,
      value: correctCount
    })
  }

  const handleSubmit = () => {
    // Ensure we have the latest time before saving
    setTimeTaken(initialTotalTime - timeLeft)
    saveResult()
    onSubmit()
    setSubmitOverlayOpen(false)
    navigate("/results")
  }

  const handleTimeUp = () => {
    console.log("Time up! Final time:", timeLeft)
    // When time is up, set full time as taken
    setTimeTaken(initialTotalTime)
    saveResult()
    onSubmit()
    navigate("/results")
  }

  const nextQuestion = () => {
    if (currentIndex < totalQuestions - 1) setCurrentIndex(prev => prev + 1)
    else setSubmitOverlayOpen(true)
  }

  const prevQuestion = () => {
    if (currentIndex > 0) setCurrentIndex(prev => prev - 1)
  }

  const handleExit = () => {
    setExitOverlayOpen(false)
    navigate("/")
  }

  const progress = ((currentIndex + 1) / totalQuestions) * 100

  return (
    <div className="dark:bg-slate-900 relative">
      {/* TOP BAR */}
      <div className="flex justify-between items-center my-7 mx-5">
        <button
          onClick={() => setExitOverlayOpen(true)}
          className="bg-gray-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 p-2 rounded-xl shadow-sm active:scale-95 hover:scale-105 duration-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none"
            viewBox="0 0 24 24" strokeWidth="1.5"
            stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
        </button>

        <div className="font-medium absolute left-1/2 -translate-x-1/2 text-slate-900 dark:text-slate-100">
          {currentIndex + 1} of {totalQuestions}
        </div>

        <Timer
          totalTime={initialTotalTime}
          onTick={(newTimeLeft) => {
            setTimeLeft(newTimeLeft)
            // Calculate and store actual time taken on each tick
            setTimeTaken(initialTotalTime - newTimeLeft)
          }}
          onTimeUp={handleTimeUp}
        />
      </div>

      <div className="lg:max-w-2xl lg:mx-auto mx-5">
        <ProgressBar progress={progress} />
      </div>

      {/* QUESTION CARD */}
      <div className="lg:max-w-2xl lg:mx-auto bg-white dark:bg-slate-800 mx-5 p-5 rounded-2xl my-7 shadow-sm mb-[100px]">
        <div className="flex justify-between items-center mb-2">
          <div className="text-gray-400 dark:text-gray-300">{selectedCourse.name}</div>

          <button
            onClick={handleBookmarkClick}
            className={`${isBookmarked ? "text-blue-500 dark:text-yellow-500" : "text-gray-400 dark:text-gray-300"} hover:text-yellow-500/70 transition-colors -translate-y-1`}
            aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
              strokeWidth="1.5" className="size-7"
              stroke="currentColor" fill={isBookmarked ? "currentColor" : "none"}>
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
            </svg>
          </button>
        </div>

        <div className="text-xl font-medium mb-7 text-slate-900 dark:text-slate-100">
          <RenderMathText text={currentQuestion.question} courseId={selectedCourse?.id} />
        </div>

        <div className="space-y-4">
          {shuffledOptions.map((option, index) => (
            <button
              key={index}
              onClick={() => onOptionClick(option)}
              className={`py-3 px-4 w-full rounded-xl ring-2 transition active:scale-95 hover:ring-[#2563EB]/40 duration-200
                ${selectedOption === option ? "ring-[#2563EB]/60 dark:ring-[#60A5FA]/80" : "ring-gray-300 dark:ring-gray-600"}`}
            >
              <span className="text-lg font-medium text-slate-900 dark:text-slate-100">
                <RenderMathText text={option} courseId={selectedCourse?.id} />
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* NAVIGATION */}
      <div className="px-7 py-5 flex items-center justify-between fixed bottom-0 right-0 left-0 bg-gray-200 dark:bg-gray-900 border-t border-gray-300 dark:border-gray-800 lg:max-w-2xl mx-auto">
        <button
          onClick={prevQuestion}
          disabled={currentIndex === 0}
          className="bg-red-500 dark:bg-red-600 disabled:opacity-30 h-[48px] w-[130px] rounded-2xl font-semibold text-white shadow-md active:scale-95 hover:brightness-110 transition-all duration-200 ease-in-out"
        >
          Previous
        </button>

        <button
          onClick={nextQuestion}
          className="bg-green-500 dark:bg-green-600 rounded-2xl font-bold text-white shadow-lg active:scale-95 hover:brightness-110 hover:shadow-green-500/20 transition-all duration-300 ease-in-out h-[58px] w-[200px] text-lg"
        >
          {currentIndex === totalQuestions - 1 ? "Submit Quiz" : "Next"}
        </button>
      </div>

      <ConfirmOverlay
        isOpen={isSubmitOverlayOpen}
        onClose={() => setSubmitOverlayOpen(false)}
        onConfirm={handleSubmit}
        title="Submit Exam?"
        message="Are you sure you want to submit your exam?"
        confirmText="Submit"
        cancelText="Cancel"
      />

      <ConfirmOverlay
        isOpen={isExitOverlayOpen}
        onClose={() => setExitOverlayOpen(false)}
        onConfirm={handleExit}
        title="Exit Exam?"
        message="Are you sure you want to exit? Your progress will not be saved."
        confirmText="Exit"
        cancelText="Cancel"
        danger={true}
      />
    </div>
  )
}

export default ExamScreen