import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import ConfirmOverlay from "../components/ConfirmOverlay"
import { RenderMathText } from "../utils/RenderMathText"
import ProgressBar from "../components/ProgressBar"
import Timer from "../components/Timer"
import { FiChevronLeft, FiBookmark, FiSend, FiChevronRight, FiLoader } from "react-icons/fi"
import { supabase } from "../supabaseClient"


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

const EXAM_SESSION_KEY = "currentExamSession";

const ExamScreen = ({
  answers,
  setAnswers,
  questions,
  onSubmit,
  selectedCourse,
  bookmarks,
  setBookmarks, hasRetaken,
}) => {
  const isMathCourse = selectedCourse?.id === "MTH101"
  const navigate = useNavigate()

  const [shuffledQuestions, setShuffledQuestions] = useState([]);

  // Prefer the shuffled list length (restored from localStorage on refresh),
  // but fall back to the raw questions length.
  const totalQuestions = shuffledQuestions.length || questions.length
  const initialTotalTime = calculateTotalTime(totalQuestions, isMathCourse)

  const [currentIndex, setCurrentIndex] = useState(() => {
    try {
      const savedRaw = localStorage.getItem(EXAM_SESSION_KEY);
      if (savedRaw) {
        const saved = JSON.parse(savedRaw);
        if (typeof saved.currentIndex === "number" && saved.currentIndex >= 0) {
          return saved.currentIndex;
        }
      }
    } catch (err) {
      console.error("Failed to restore currentIndex from storage:", err);
    }
    return 0;
  })

  const [timeLeft, setTimeLeft] = useState(() => {
    try {
      const savedRaw = localStorage.getItem(EXAM_SESSION_KEY);
      if (savedRaw) {
        const saved = JSON.parse(savedRaw);
        if (typeof saved.timeLeft === "number" && saved.timeLeft > 0) {
          return saved.timeLeft;
        }
      }
    } catch (err) {
      console.error("Failed to restore timeLeft from storage:", err);
    }
    return initialTotalTime;
  })
  const [hasSaved, setHasSaved] = useState(false)
  const [isSubmitOverlayOpen, setSubmitOverlayOpen] = useState(false)
  const [isExitOverlayOpen, setExitOverlayOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false);

  const buildSessionPayload = () => ({
    selectedCourse,
    questions: shuffledQuestions.length ? shuffledQuestions : questions,
    answers,
    currentIndex,
    timeLeft,
  });

  const currentQuestion = shuffledQuestions[currentIndex]
  const selectedOption = answers[currentIndex]
  const isBookmarked = bookmarks.includes(currentQuestion?.id)

  useEffect(() => {
    // 1. Try to restore an in‑progress exam from localStorage
    try {
      const savedRaw = localStorage.getItem(EXAM_SESSION_KEY);
      if (savedRaw) {
        const saved = JSON.parse(savedRaw);

        if (Array.isArray(saved?.questions) && saved.questions.length > 0) {
          setShuffledQuestions(saved.questions);
          setCurrentIndex(saved.currentIndex || 0);

          if (Array.isArray(saved.answers)) {
            setAnswers(saved.answers);
          }

          return;
        }
      }
    } catch (err) {
      console.error("Failed to restore exam session:", err);
    }

    // 2. Fresh exam – shuffle options and start a new session
    if (questions.length > 0 && shuffledQuestions.length === 0) {
      const shuffled = questions.map(q => ({
        ...q,
        options: shuffleArray([...q.options]),
      }));
      setShuffledQuestions(shuffled);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questions]);

  // Persist exam progress (answers, index, time) whenever they change
  useEffect(() => {
    if (!totalQuestions) return;
    try {
      localStorage.setItem(EXAM_SESSION_KEY, JSON.stringify(buildSessionPayload()));
    } catch (err) {
      console.error("Failed to persist exam session:", err);
    }
  }, [answers, currentIndex, timeLeft, shuffledQuestions, selectedCourse, totalQuestions, EXAM_SESSION_KEY]);

  const saveResultToSupabase = async (finalTime) => {
    try {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) return;

      // Calculate score
      const correctCount = shuffledQuestions.reduce(
        (acc, q, idx) => (answers[idx] === q.correct ? acc + 1 : acc),
        0
      );

      // Insert into Supabase
      await supabase.from("exam_attempts").insert({
        user_id: userData.user.id,
        course_id: selectedCourse.id,
        score: correctCount,
        total_questions: totalQuestions,
        time_taken: finalTime,
        is_retake: hasRetaken, // Track if this attempt is a retake
      });

      console.log("Saved to Supabase ✅");

    } catch (error) {
      console.error("Error saving attempt:", error.message);
    }
  };

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
    const newAnswers = [...answers];
    newAnswers[currentIndex] = option;
    setAnswers(newAnswers);

    setTimeout(() => {
      if (currentIndex < totalQuestions - 1) {
        const nextIndex = currentIndex + 1;
        setCurrentIndex(nextIndex);
      } else {
        setSubmitOverlayOpen(true);
      }
    }, 200); // small delay for UX smoothness
  };

  const saveResultToHistory = (finalTime) => {
    if (hasSaved) return
    const correctCount = shuffledQuestions.reduce(
      (acc, q, idx) => (answers[idx] === q.correct ? acc + 1 : acc),
      0
    );
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

    // Exam is complete – clear any persisted in‑progress state
    try {
      localStorage.removeItem(EXAM_SESSION_KEY);
    } catch (err) {
      console.error("Failed to clear exam session:", err);
    }
  }

  const handleSubmit = () => {
  setSubmitOverlayOpen(false);
  setIsSubmitting(true);

  const finalTime = initialTotalTime - timeLeft;

  saveResultToHistory(finalTime);

  // Fire-and-forget save (async won't block UI)
  saveResultToSupabase(finalTime).catch(err => console.error(err));

  // Navigate immediately
  setTimeout(() => {
    if (onSubmit) onSubmit();
    try {
      localStorage.removeItem(EXAM_SESSION_KEY);
    } catch (err) {
      console.error("Failed to clear exam session on submit:", err);
    }
    navigate("/results");
  }, 50);
}

  const handleTimeUp = () => {
  setIsSubmitting(true);
  const finalTime = initialTotalTime - timeLeft;

  saveResultToHistory(finalTime);

  saveResultToSupabase(finalTime).catch(err => console.error(err));

  setTimeout(() => {
    if (onSubmit) onSubmit();
    try {
      localStorage.removeItem(EXAM_SESSION_KEY);
    } catch (err) {
      console.error("Failed to clear exam session on timeout:", err);
    }
    navigate("/results");
  }, 1500);
}

  const progress = ((currentIndex + 1) / totalQuestions) * 100
  if (shuffledQuestions.length === 0) return null;
  
  return (
    <div className="min-h-[100dvh] bg-gray-50 dark:bg-slate-900 transition-colors duration-500 flex flex-col">

      {/* SUBMITTING LOADING OVERLAY */}
      {isSubmitting && (
        <div className="fixed inset-0 z-[100] bg-gray-50/80 dark:bg-slate-900/80 backdrop-blur-xl flex flex-col items-center justify-center animate-in fade-in duration-300">
          <div className="relative">
            {/* Outer Pulse effect */}
            <div className="absolute inset-0 rounded-full bg-blue-500/20 animate-ping" />

            {/* Center Icon Box */}
            <div className="relative size-20 bg-blue-600 rounded-[2rem] shadow-2xl shadow-blue-500/40 flex items-center justify-center">
              <FiLoader className="text-white size-10 animate-spin" />
            </div>
          </div>

          <h2 className="mt-8 text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            Processing Results
          </h2>
          <p className="mt-2 text-slate-500 dark:text-slate-400 font-medium animate-pulse">
            Calculating your score...
          </p>
        </div>
      )}
      
      {/* HEADER SECTION */}
      <div className="sticky top-0 z-30 bg-gray-50/80 dark:bg-slate-900/80 backdrop-blur-md px-5 pt-6 pb-2">
        <div className="max-w-2xl mx-auto flex justify-between items-center mb-4">
          <button
            onClick={() => setExitOverlayOpen(true)}
            className="p-2.5 rounded-2xl bg-white dark:bg-slate-800 shadow-sm border border-gray-100 dark:border-slate-700 active:scale-90 transition-all"
          >
            <FiChevronLeft className="-translate-x-1/18 size-6 text-slate-600 dark:text-slate-300" />
          </button>

          <div className="absolute left-1/2 flex flex-col items-center -translate-x-1/2">
             <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400 mb-0.5">Progress</span>
             <div className="font-black text-slate-900 dark:text-white">
                {currentIndex + 1} <span className="text-slate-400 font-medium">/ {totalQuestions}</span>
             </div>
          </div>

          <div className="bg-white dark:bg-slate-800 px-4 py-2 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700">
            <Timer
              totalTime={initialTotalTime}
              initialTime={timeLeft}
              onTick={setTimeLeft}
              onTimeUp={handleTimeUp}
            />
          </div>
        </div>
        
        <div className="max-w-2xl mx-auto">
          <ProgressBar progress={progress} />
        </div>
      </div>

      {/* QUESTION CONTENT */}
      <div className="flex-1 px-5 pb-32 pt-4 overflow-y-auto">
        <div className="max-w-2xl mx-auto">
          
          <div className="bg-white dark:bg-slate-800 rounded-[2.5rem] p-6 shadow-xl shadow-slate-200/50 dark:shadow-none border border-gray-50 dark:border-slate-800 animate-in fade-in slide-in-from-bottom-4 duration-500">
            
            <div className="flex justify-between items-center mb-4">
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

            <div className="lg:text-xl font-bold text-slate-800 dark:text-slate-100 leading-relaxed mb-5">
              <RenderMathText text={currentQuestion.question} courseId={selectedCourse?.id} />
            </div>

            <div className="space-y-4">
              {currentQuestion?.options.map((option, index) => {
                const isSelected = selectedOption === option;
                const label = String.fromCharCode(65 + index);

                return (
                  <button
                    key={index}
                    onClick={() => onOptionClick(option)}
                    className={`group w-full flex items-center gap-2 p-2 rounded-3xl border-2 transition-all duration-300 active:scale-[0.98] ${
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
                    <div className={`text-left font-semibold ${isSelected ? "text-blue-700 dark:text-blue-400" : "text-slate-600 dark:text-slate-300"}`}>
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
      <div className="fixed bottom-0 inset-x-0 px-6 py-2 z-40">
        <div className="max-w-2xl mx-auto bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-white/20 dark:border-slate-700/50 p-3 rounded-[2.5rem] shadow-2xl flex items-center justify-between gap-3">
          <button
            onClick={() => {
              const newIndex = currentIndex - 1;
              setCurrentIndex(newIndex);
            }}
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
              onClick={() => {
                const newIndex = currentIndex + 1;
                setCurrentIndex(newIndex);
              }}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white h-14 rounded-[1.8rem] font-black shadow-lg shadow-blue-200 dark:shadow-none transition-all active:scale-95 flex items-center justify-center gap-2"
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
        onConfirm={() => {
          try {
            localStorage.removeItem(EXAM_SESSION_KEY);
          } catch (err) {
            console.error("Failed to clear exam session on exit:", err);
          }
          navigate("/");
        }}
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