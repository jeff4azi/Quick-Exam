import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../apiConfig";
import CoursePicker from "../components/CoursePicker";
import MatchBox from "../components/MatchBox";
import { FiChevronLeft, FiRefreshCw, FiClock, FiZap } from "react-icons/fi";

// ─── constants ───────────────────────────────────────────────────────────────
const MATCH_COUNT = 6;

// ─── helpers ─────────────────────────────────────────────────────────────────
const shuffle = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const formatTime = (ms) => `${(ms / 1000).toFixed(2)}s`;

/**
 * Build game state from a pool of questions.
 * Returns { questionBoxes, answerBoxes } — each box: { id, text, pairId, state }
 */
const buildGame = (questions) => {
  const picked = shuffle(questions).slice(0, MATCH_COUNT);

  const questionBoxes = shuffle(
    picked.map((q, i) => ({
      id: `q-${i}`,
      text: q.question,
      pairId: i,
      state: "idle",
    }))
  );

  const answerBoxes = shuffle(
    picked.map((q, i) => ({
      id: `a-${i}`,
      text: q.correct,
      pairId: i,
      state: "idle",
    }))
  );

  return { questionBoxes, answerBoxes };
};

// ─── component ───────────────────────────────────────────────────────────────
const MatchScreen = ({ courses, coursesLoading, isPremium }) => {
  const navigate = useNavigate();

  // ── phase: "pick" | "play" | "done" ──
  const [phase, setPhase] = useState("pick");
  const [selectedCourse, setSelectedCourse] = useState(null);

  // ── questions pool ──
  const [allQuestions, setAllQuestions] = useState([]);
  const [loadingQ, setLoadingQ] = useState(false);
  const [errorQ, setErrorQ] = useState(null);

  // ── game state ──
  const [questionBoxes, setQuestionBoxes] = useState([]);
  const [answerBoxes, setAnswerBoxes] = useState([]);
  const [selectedQ, setSelectedQ] = useState(null); // box id
  const [wrongPair, setWrongPair] = useState(null);  // { qId, aId }
  const [correctCount, setCorrectCount] = useState(0);
  const [attempts, setAttempts] = useState(0);

  // ── timer ──
  const [elapsed, setElapsed] = useState(0);
  const timerRef = useRef(null);

  const startTimer = () => {
    if (timerRef.current) return;
    timerRef.current = setInterval(() => setElapsed((e) => e + 10), 10);
  };

  const stopTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = null;
  };

  const resetTimer = () => {
    stopTimer();
    setElapsed(0);
  };

  useEffect(() => () => stopTimer(), []);

  // ── fetch questions ──
  const fetchQuestions = useCallback(async (course) => {
    setLoadingQ(true);
    setErrorQ(null);
    try {
      const endpoint = course.questionsEndpoint || `/courses/${course.id}/questions`;
      const res = await fetch(`${API_BASE_URL}${endpoint}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data?.msg || "Failed to load questions");
      const valid = (Array.isArray(data) ? data : []).filter(
        (q) => q?.question && q?.correct
      );
      if (valid.length < MATCH_COUNT)
        throw new Error(`Need at least ${MATCH_COUNT} questions. Only ${valid.length} found.`);
      setAllQuestions(valid);
    } catch (err) {
      setErrorQ(err.message);
    } finally {
      setLoadingQ(false);
    }
  }, []);

  const handleSelectCourse = (course) => {
    setSelectedCourse(course);
    fetchQuestions(course);
    setPhase("play");
  };

  // ── start / restart game ──
  const startGame = useCallback(
    (questions) => {
      const { questionBoxes: qb, answerBoxes: ab } = buildGame(questions);
      setQuestionBoxes(qb);
      setAnswerBoxes(ab);
      setSelectedQ(null);
      setWrongPair(null);
      setCorrectCount(0);
      setAttempts(0);
      resetTimer();
      startTimer();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  // Start game once questions are loaded
  useEffect(() => {
    if (allQuestions.length >= MATCH_COUNT && phase === "play") {
      startGame(allQuestions);
    }
  }, [allQuestions, phase, startGame]);

  // ── check for completion ──
  useEffect(() => {
    if (correctCount === MATCH_COUNT && phase === "play") {
      stopTimer();
      setPhase("done");
    }
  }, [correctCount, phase]);

  // ── clear wrong highlight after 800ms ──
  useEffect(() => {
    if (!wrongPair) return;
    const t = setTimeout(() => {
      setWrongPair(null);
      setSelectedQ(null);
      // reset wrong boxes back to idle
      setQuestionBoxes((prev) =>
        prev.map((b) => (b.state === "wrong" ? { ...b, state: "idle" } : b))
      );
      setAnswerBoxes((prev) =>
        prev.map((b) => (b.state === "wrong" ? { ...b, state: "idle" } : b))
      );
    }, 800);
    return () => clearTimeout(t);
  }, [wrongPair]);

  // ── handle box clicks ──
  const handleQuestionClick = (box) => {
    if (box.state === "correct" || wrongPair) return;
    // deselect if clicking same
    if (selectedQ === box.id) {
      setSelectedQ(null);
      setQuestionBoxes((prev) =>
        prev.map((b) => (b.id === box.id ? { ...b, state: "idle" } : b))
      );
      return;
    }
    // deselect previous q
    setQuestionBoxes((prev) =>
      prev.map((b) =>
        b.id === selectedQ ? { ...b, state: "idle" } :
        b.id === box.id   ? { ...b, state: "selected" } : b
      )
    );
    setSelectedQ(box.id);
  };

  const handleAnswerClick = (box) => {
    if (box.state === "correct" || wrongPair) return;
    if (!selectedQ) return; // must pick a question first

    setAttempts((a) => a + 1);

    const qBox = questionBoxes.find((b) => b.id === selectedQ);
    const isMatch = qBox?.pairId === box.pairId;

    if (isMatch) {
      setQuestionBoxes((prev) =>
        prev.map((b) => (b.id === selectedQ ? { ...b, state: "correct" } : b))
      );
      setAnswerBoxes((prev) =>
        prev.map((b) => (b.id === box.id ? { ...b, state: "correct" } : b))
      );
      setSelectedQ(null);
      setCorrectCount((c) => c + 1);
    } else {
      setQuestionBoxes((prev) =>
        prev.map((b) => (b.id === selectedQ ? { ...b, state: "wrong" } : b))
      );
      setAnswerBoxes((prev) =>
        prev.map((b) => (b.id === box.id ? { ...b, state: "wrong" } : b))
      );
      setWrongPair({ qId: selectedQ, aId: box.id });
    }
  };

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
        title="Match Game"
        subtitle="Pick a course to play"
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
          <div className="size-14 rounded-2xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center animate-pulse">
            <span className="text-2xl">🧩</span>
          </div>
          <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">
            Setting up the game...
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
            onClick={() => { setPhase("pick"); setErrorQ(null); }}
            className="px-5 py-2.5 rounded-2xl bg-emerald-600 text-white text-sm font-bold"
          >
            Go back
          </button>
        </div>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────────────────
  // RENDER: game
  // ─────────────────────────────────────────────────────────────────────────
  return (
    <div className="h-[100dvh] bg-gray-50 dark:bg-slate-900 flex flex-col transition-colors duration-500 overflow-hidden">

      {/* ── Header ── */}
      <div className="sticky top-0 z-20 bg-gray-50/90 dark:bg-slate-900/90 backdrop-blur-md px-5 pt-5 pb-3 border-b border-gray-100 dark:border-slate-800">
        <div className="max-w-3xl mx-auto flex items-center justify-between gap-3 relative">
          <button
            onClick={() => { stopTimer(); setPhase("pick"); }}
            className="p-2.5 rounded-2xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 shadow-sm active:scale-90 transition-all"
          >
            <FiChevronLeft className="size-5 text-slate-600 dark:text-slate-300" />
          </button>

          <div className="text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <p className="text-xs font-black uppercase tracking-widest text-emerald-500">
              {selectedCourse?.name}
            </p>
            <p className="text-sm font-bold text-slate-900 dark:text-white">
              {correctCount} / {MATCH_COUNT} matched
            </p>
          </div>

          <div className="flex items-center gap-2">
            {/* Timer */}
            <div className="flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 shadow-sm">
              <FiClock className="size-3.5 text-emerald-500" />
              <span className="text-sm font-black text-slate-700 dark:text-slate-200 tabular-nums">
                {formatTime(elapsed)}
              </span>
            </div>
            {/* Restart */}
            <button
              onClick={() => startGame(allQuestions)}
              className="p-2.5 rounded-2xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 shadow-sm active:scale-90 transition-all text-slate-500 dark:text-slate-400"
              title="Restart"
            >
              <FiRefreshCw className="size-4" />
            </button>
          </div>
        </div>

        {/* Progress bar */}
        <div className="max-w-3xl mx-auto mt-3 h-1.5 rounded-full bg-gray-200 dark:bg-slate-700 overflow-hidden">
          <div
            className="h-full rounded-full bg-emerald-500 transition-all duration-500"
            style={{ width: `${(correctCount / MATCH_COUNT) * 100}%` }}
          />
        </div>
      </div>

      {/* ── Game grid ── */}
      <div className="flex-1 flex flex-col px-3 py-3 overflow-hidden">
        <div className="flex-1 grid grid-cols-3 lg:grid-cols-4 gap-2.5 lg:gap-3">
          {/* Interleave: q0 a0 q1 a1 ... so pairs are visually adjacent */}
          {questionBoxes.map((qBox, i) => {
            const aBox = answerBoxes[i];
            return [
              <MatchBox
                key={qBox.id}
                text={qBox.text}
                state={qBox.state}
                courseId={selectedCourse?.id}
                onClick={() => handleQuestionClick(qBox)}
              />,
              aBox && (
                <MatchBox
                  key={aBox.id}
                  text={aBox.text}
                  state={aBox.state}
                  courseId={selectedCourse?.id}
                  onClick={() => handleAnswerClick(aBox)}
                />
              ),
            ];
          })}
        </div>

        {/* Hint */}
        <p className={`text-center text-xs mt-2 font-semibold transition-colors ${
          selectedQ
            ? "text-emerald-500 animate-pulse"
            : "text-slate-400"
        }`}>
          {selectedQ ? "Now tap the matching answer →" : "Tap a question, then its matching answer"}
        </p>
      </div>

      {/* ── Completion modal ── */}
      {phase === "done" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" />
          <div className="relative bg-white dark:bg-slate-800 rounded-[2.5rem] shadow-2xl w-full max-w-sm p-8 text-center animate-in zoom-in-95 duration-300">
            <div className="size-16 mx-auto rounded-2xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mb-4">
              <FiZap className="size-8 text-emerald-500" />
            </div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">
              All matched!
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
              {selectedCourse?.name}
            </p>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="bg-gray-50 dark:bg-slate-700/50 rounded-2xl p-4">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Time</p>
                <p className="text-2xl font-black text-slate-900 dark:text-white tabular-nums">
                  {formatTime(elapsed)}
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-slate-700/50 rounded-2xl p-4">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Attempts</p>
                <p className="text-2xl font-black text-slate-900 dark:text-white tabular-nums">
                  {attempts}
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3">
              <button
                onClick={() => startGame(allQuestions)}
                className="w-full py-4 rounded-2xl bg-emerald-600 text-white font-black shadow-lg shadow-emerald-200 dark:shadow-none active:scale-95 transition-all"
              >
                Play Again
              </button>
              <button
                onClick={() => { setPhase("pick"); }}
                className="w-full py-3 rounded-2xl bg-gray-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 font-bold text-sm active:scale-95 transition-all"
              >
                Change Course
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MatchScreen;
