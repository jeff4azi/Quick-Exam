import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../apiConfig";
import CoursePicker from "../components/CoursePicker";
import FlashCard from "../components/FlashCard";
import {
  FiChevronLeft,
  FiChevronRight,
  FiShuffle,
  FiRotateCcw,
} from "react-icons/fi";

// ─── helpers ────────────────────────────────────────────────────────────────

const shuffle = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const RATING_LABELS = [
  { key: "again", label: "Again", color: "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 border-red-200 dark:border-red-800" },
  { key: "good",  label: "Good",  color: "bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-800" },
  { key: "easy",  label: "Easy",  color: "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 border-green-200 dark:border-green-800" },
];

// ─── component ──────────────────────────────────────────────────────────────

const FlashcardsScreen = ({ courses, coursesLoading, isPremium }) => {
  const navigate = useNavigate();

  // ── phase: "pick" | "study" ──
  const [phase, setPhase] = useState("pick");
  const [selectedCourse, setSelectedCourse] = useState(null);

  // ── questions ──
  const [questions, setQuestions] = useState([]);
  const [loadingQ, setLoadingQ] = useState(false);
  const [errorQ, setErrorQ] = useState(null);

  // ── session state ──
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [stats, setStats] = useState({}); // { [questionId]: { seen, correct, wrong } }

  // ── fetch questions when a course is selected ──
  // Fetches both objective and theory questions and merges them.
  const fetchQuestions = useCallback(async (course) => {
    setLoadingQ(true);
    setErrorQ(null);
    try {
      const endpoint = course.questionsEndpoint || `/courses/${course.id}/questions`;
      const baseUrl = `${API_BASE_URL}${endpoint}`;

      const [objRes, thyRes] = await Promise.all([
        fetch(baseUrl),
        fetch(`${baseUrl}?type=theory`),
      ]);

      const [objData, thyData] = await Promise.all([
        objRes.json(),
        thyRes.json(),
      ]);

      const objective = objRes.ok && Array.isArray(objData) ? objData : [];
      // tag theory questions so FlashCard knows to use modal_answer
      const theory = thyRes.ok && Array.isArray(thyData)
        ? thyData.map((q) => ({ ...q, type: "theory" }))
        : [];

      const all = [...objective, ...theory];
      if (all.length === 0) throw new Error("No questions found for this course.");

      setQuestions(all);
      setStats({});
      setCurrentIndex(0);
      setIsFlipped(false);
    } catch (err) {
      setErrorQ(err.message);
      setQuestions([]);
    } finally {
      setLoadingQ(false);
    }
  }, []);

  const handleSelectCourse = (course) => {
    setSelectedCourse(course);
    setPhase("study");
    fetchQuestions(course);
  };

  // ── navigation ──
  const goTo = (index) => {
    setIsFlipped(false);
    // small delay so the card flips back before sliding
    setTimeout(() => setCurrentIndex(index), isFlipped ? 150 : 0);
  };

  const handlePrev = () => goTo(Math.max(0, currentIndex - 1));
  const handleNext = () => goTo(Math.min(questions.length - 1, currentIndex + 1));

  const handleShuffle = () => {
    setQuestions((prev) => shuffle(prev));
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setIsFlipped(false);
    setStats({});
  };

  // ── rating ──
  const handleRate = (key) => {
    const q = questions[currentIndex];
    if (!q) return;
    setStats((prev) => {
      const entry = prev[q.id] || { seen: 0, correct: 0, wrong: 0 };
      return {
        ...prev,
        [q.id]: {
          seen: entry.seen + 1,
          correct: entry.correct + (key === "easy" || key === "good" ? 1 : 0),
          wrong: entry.wrong + (key === "again" ? 1 : 0),
        },
      };
    });
    // auto-advance after rating
    if (currentIndex < questions.length - 1) {
      goTo(currentIndex + 1);
    }
  };

  // ── keyboard shortcuts ──
  useEffect(() => {
    if (phase !== "study") return;
    const handler = (e) => {
      if (e.key === "ArrowRight") handleNext();
      else if (e.key === "ArrowLeft") handlePrev();
      else if (e.key === " ") { e.preventDefault(); setIsFlipped((f) => !f); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  });

  // ── progress ──
  const progress = questions.length ? ((currentIndex + 1) / questions.length) * 100 : 0;
  const masteredCount = Object.values(stats).filter((s) => s.correct > 0).length;

  // ─────────────────────────────────────────────────────────────────────────
  // RENDER: course picker
  // ─────────────────────────────────────────────────────────────────────────
  if (phase === "pick") {
    return (
      <CoursePicker
        courses={courses}
        loading={coursesLoading}
        onSelect={handleSelectCourse}
        onBack={() => navigate("/")}
      />
    );
  }

  // ─────────────────────────────────────────────────────────────────────────
  // RENDER: loading / error
  // ─────────────────────────────────────────────────────────────────────────
  if (loadingQ) {
    return (
      <div className="min-h-[100dvh] bg-gray-50 dark:bg-slate-900 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="size-14 rounded-2xl bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center animate-pulse">
            <span className="text-2xl">🃏</span>
          </div>
          <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">
            Loading flashcards...
          </p>
        </div>
      </div>
    );
  }

  if (errorQ) {
    return (
      <div className="min-h-[100dvh] bg-gray-50 dark:bg-slate-900 flex items-center justify-center px-6">
        <div className="text-center space-y-4">
          <p className="text-slate-500 dark:text-slate-400 text-sm">{errorQ}</p>
          <button
            onClick={() => setPhase("pick")}
            className="px-5 py-2.5 rounded-2xl bg-violet-600 text-white text-sm font-bold"
          >
            Go back
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];

  // ─────────────────────────────────────────────────────────────────────────
  // RENDER: study mode
  // ─────────────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-[100dvh] bg-gray-50 dark:bg-slate-900 flex flex-col transition-colors duration-500">

      {/* ── Header ── */}
      <div className="sticky top-0 z-20 bg-gray-50/90 dark:bg-slate-900/90 backdrop-blur-md px-5 pt-5 pb-3 border-b border-gray-100 dark:border-slate-800">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-3">
            <button
              onClick={() => setPhase("pick")}
              className="p-2.5 rounded-2xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 shadow-sm active:scale-90 transition-all"
            >
              <FiChevronLeft className="size-5 text-slate-600 dark:text-slate-300" />
            </button>

            <div className="text-center">
              <p className="text-xs font-black uppercase tracking-widest text-violet-500">
                {selectedCourse?.name}
              </p>
              <p className="text-sm font-bold text-slate-900 dark:text-white">
                {currentIndex + 1}{" "}
                <span className="text-slate-400 font-medium">/ {questions.length}</span>
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleShuffle}
                title="Shuffle"
                className="p-2.5 rounded-2xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 shadow-sm active:scale-90 transition-all text-slate-500 dark:text-slate-400"
              >
                <FiShuffle className="size-4" />
              </button>
              <button
                onClick={handleRestart}
                title="Restart"
                className="p-2.5 rounded-2xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 shadow-sm active:scale-90 transition-all text-slate-500 dark:text-slate-400"
              >
                <FiRotateCcw className="size-4" />
              </button>
            </div>
          </div>

          {/* Progress bar */}
          <div className="h-1.5 rounded-full bg-gray-200 dark:bg-slate-700 overflow-hidden">
            <div
              className="h-full rounded-full bg-violet-500 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Mastered count */}
          {Object.keys(stats).length > 0 && (
            <p className="text-[10px] text-slate-400 mt-1.5 text-right">
              {masteredCount} / {questions.length} mastered
            </p>
          )}
        </div>
      </div>

      {/* ── Card area ── */}
      <div className="flex-1 flex flex-col items-center justify-center px-5 py-8 pb-36">
        <div className="w-full max-w-[600px]">
          {currentQuestion ? (
            <FlashCard
              question={currentQuestion}
              courseId={selectedCourse?.id}
              isFlipped={isFlipped}
              onFlip={() => setIsFlipped((f) => !f)}
            />
          ) : (
            <div className="text-center text-slate-400 text-sm py-20">
              No questions available.
            </div>
          )}
        </div>

        {/* Rating buttons — only show when flipped */}
        {isFlipped && currentQuestion && (
          <div className="mt-6 flex gap-3 w-full max-w-[600px] animate-in fade-in slide-in-from-bottom-2 duration-300">
            {RATING_LABELS.map(({ key, label, color }) => (
              <button
                key={key}
                onClick={() => handleRate(key)}
                className={`flex-1 py-3 rounded-2xl border text-sm font-black transition-all active:scale-95 ${color}`}
              >
                {label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ── Bottom nav ── */}
      <div className="fixed bottom-0 inset-x-0 px-5 pb-5 z-30 lg:pl-64">
        <div className="max-w-2xl mx-auto bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-white/20 dark:border-slate-700/50 p-3 rounded-[2.5rem] shadow-2xl flex items-center justify-between gap-3">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="size-14 rounded-full flex items-center justify-center bg-gray-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 disabled:opacity-20 transition-all active:scale-90"
          >
            <FiChevronLeft size={24} />
          </button>

          <button
            onClick={() => setIsFlipped((f) => !f)}
            className="flex-1 h-14 rounded-[1.8rem] bg-violet-600 hover:bg-violet-700 text-white font-black shadow-lg shadow-violet-200 dark:shadow-none transition-all active:scale-95"
          >
            {isFlipped ? "Show Question" : "Reveal Answer"}
          </button>

          <button
            onClick={handleNext}
            disabled={currentIndex === questions.length - 1}
            className="size-14 rounded-full flex items-center justify-center bg-gray-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 disabled:opacity-20 transition-all active:scale-90"
          >
            <FiChevronRight size={24} />
          </button>
        </div>
      </div>

    </div>
  );
};

export default FlashcardsScreen;
