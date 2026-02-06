import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import ConfirmOverlay from "../components/ConfirmOverlay"
import { RenderMathText } from "../utils/RenderMathText"
import ProgressBar from "../components/ProgressBar"
import Timer from "../components/Timer"
import { FiChevronLeft, FiBookmark, FiSend, FiChevronRight } from "react-icons/fi"

const calculateTotalTime = (questionCount, isMath) => {
  const timePer10 = isMath ? 6 * 60 : 3.33 * 60
  return Math.ceil((questionCount / 10) * timePer10)
}

const shuffleArray = (array) => {
  const arr = [...array]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
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
  const initialTotalTime = calculateTotalTime(totalQuestions, isMathCourse)

  const [currentIndex, setCurrentIndex] = useState(0)
  const [timeLeft, setTimeLeft] = useState(initialTotalTime)
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

  // NOTE: This only saves to localStorage for History tab. 
  // ResultScreen will NOT use this storage.
  const saveResultToHistory = (finalTime) => {
    if (hasSaved) return
    const correctCount = questions.reduce((acc, q, idx) => (answers[idx] === q.correct ? acc + 1 : acc), 0)
    const newResult = {
      id: Date.now(),
      course: selectedCourse.name,
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      score: correctCount,
      total: totalQuestions,
      timeTaken: finalTime
    }
    const existingHistory = JSON.parse(localStorage.getItem("examHistory")) || []
    localStorage.setItem("examHistory", JSON.stringify([...existingHistory, newResult]))
    setHasSaved(true)
  }

  // FIX: Ensure onSubmit() is called to update App.js state
  const handleSubmit = () => {
    saveResultToHistory(initialTotalTime - timeLeft)
    if (onSubmit) onSubmit() 
    navigate("/results")
  }

  const handleTimeUp = () => {
    saveResultToHistory(initialTotalTime - timeLeft)
    if (onSubmit) onSubmit()
    navigate("/results")
  }

  const progress = ((currentIndex + 1) / totalQuestions) * 100

  return (
    <div className="min-h-[100dvh] bg-gray-50 dark:bg-slate-900 transition-colors duration-500 flex flex-col">
      
      {/* HEADER SECTION */}
      <div className="sticky top-0 z-30 bg-gray-50/80 dark:bg-slate-900/80 backdrop-blur-md px-5 pt-6 pb-2">
        <div className="max-w-2xl mx-auto flex justify-between items-center mb-4">
          <button
            onClick={() => setExitOverlayOpen(true)}
            className="p-2.5 rounded-2xl bg-white dark:bg-slate-800 shadow-sm border border-gray-100 dark:border-slate-700 active:scale-90 transition-all"
          >
            <FiChevronLeft className="size-6 text-slate-600 dark:text-slate-300" />
          </button>

          <div className="flex flex-col items-center translate-x-1/2">
             <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400 mb-0.5">Progress</span>
             <div className="font-black text-slate-900 dark:text-white">
                {currentIndex + 1} <span className="text-slate-400 font-medium">/ {totalQuestions}</span>
             </div>
          </div>

          <div className="bg-white dark:bg-slate-800 px-4 py-2 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700">
            <Timer totalTime={initialTotalTime} onTick={setTimeLeft} onTimeUp={handleTimeUp} />
          </div>
        </div>
        
        <div className="max-w-2xl mx-auto">
          <ProgressBar progress={progress} />
        </div>
      </div>

      {/* QUESTION CONTENT */}
      <div className="flex-1 px-5 pb-32 pt-4 overflow-y-auto">
        <div className="max-w-2xl mx-auto">
          
          <div className="bg-white dark:bg-slate-800 rounded-[2.5rem] p-8 shadow-xl shadow-slate-200/50 dark:shadow-none border border-gray-50 dark:border-slate-800 animate-in fade-in slide-in-from-bottom-4 duration-500">
            
            <div className="flex justify-between items-start mb-6">
              <div className="bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest">
                {selectedCourse.name}
              </div>
              <button
                onClick={handleBookmarkClick}
                className={`p-2 rounded-xl transition-all ${isBookmarked ? "bg-yellow-100 text-yellow-600" : "bg-gray-50 dark:bg-slate-700 text-gray-400"}`}
              >
                <FiBookmark className={`size-5 ${isBookmarked ? "fill-current" : ""}`} />
              </button>
            </div>

            <div className="text-xl lg:text-2xl font-bold text-slate-800 dark:text-slate-100 leading-relaxed mb-10">
              <RenderMathText text={currentQuestion.question} courseId={selectedCourse?.id} />
            </div>

            <div className="space-y-4">
              {shuffledOptions.map((option, index) => {
                const isSelected = selectedOption === option;
                const label = String.fromCharCode(65 + index); // A, B, C, D

                return (
                  <button
                    key={index}
                    onClick={() => onOptionClick(option)}
                    className={`group w-full flex items-center gap-4 p-4 rounded-3xl border-2 transition-all duration-300 active:scale-[0.98] ${
                      isSelected 
                        ? "border-blue-600 bg-blue-50/50 dark:bg-blue-600/10" 
                        : "border-gray-100 dark:border-slate-700 hover:border-blue-200 dark:hover:border-slate-600"
                    }`}
                  >
                    <div className={`size-10 rounded-2xl flex items-center justify-center font-black transition-colors ${
                      isSelected 
                        ? "bg-blue-600 text-white" 
                        : "bg-gray-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400"
                    }`}>
                      {label}
                    </div>
                    <div className={`text-left font-semibold text-lg ${isSelected ? "text-blue-700 dark:text-blue-400" : "text-slate-600 dark:text-slate-300"}`}>
                      <RenderMathText text={option} courseId={selectedCourse?.id} />
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM NAVIGATION BAR */}
      <div className="fixed bottom-0 inset-x-0 p-6 z-40">
        <div className="max-w-2xl mx-auto bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-white/20 dark:border-slate-700/50 p-3 rounded-[2.5rem] shadow-2xl flex items-center justify-between gap-4">
          <button
            onClick={() => setCurrentIndex(prev => prev - 1)}
            disabled={currentIndex === 0}
            className="size-14 rounded-full flex items-center justify-center bg-gray-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 disabled:opacity-20 transition-all active:scale-90"
          >
            <FiChevronLeft size={24} />
          </button>

          {currentIndex === totalQuestions - 1 ? (
            <button
              onClick={() => setSubmitOverlayOpen(true)}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white h-14 rounded-[1.8rem] font-black text-lg shadow-lg shadow-green-200 dark:shadow-none transition-all active:scale-95 flex items-center justify-center gap-3"
            >
              <span>Submit Quiz</span>
              <FiSend />
            </button>
          ) : (
            <button
              onClick={() => setCurrentIndex(prev => prev + 1)}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white h-14 rounded-[1.8rem] font-black text-lg shadow-lg shadow-blue-200 dark:shadow-none transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <span>Next Question</span>
              <FiChevronRight />
            </button>
          )}
        </div>
      </div>

      <ConfirmOverlay
        isOpen={isSubmitOverlayOpen}
        onClose={() => setSubmitOverlayOpen(false)}
        onConfirm={handleSubmit}
        title="Submit Exam?"
        message="Review your answers before submitting. You cannot go back after this!"
        confirmText="Yes, Submit"
        cancelText="Review"
      />

      <ConfirmOverlay
        isOpen={isExitOverlayOpen}
        onClose={() => setExitOverlayOpen(false)}
        onConfirm={() => navigate("/")}
        title="Quit Exam?"
        message="Your current progress will be lost. Are you sure?"
        confirmText="Quit"
        cancelText="Stay"
        danger={true}
      />
    </div>
  )
}

export default ExamScreen