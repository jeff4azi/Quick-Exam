import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import ConfirmOverlay from "../components/ConfirmOverlay";
import { RenderMathText } from "../utils/RenderMathText";
import ProgressBar from "../components/ProgressBar";
import Timer from "../components/Timer";
import {
  clearExamSession,
  loadExamSession,
  saveExamSession,
} from "../utils/examSessionStorage";
import {
  FiChevronLeft,
  FiBookmark,
  FiSend,
  FiChevronRight,
  FiLoader,
} from "react-icons/fi";
import { supabase } from "../supabaseClient";
import { withTimeout } from "../utils/withTimeout";
import { FaCrown } from "react-icons/fa";

const calculateTotalTime = (questionCount, isMath, isTheory) => {
  if (isTheory) return questionCount * 4.5 * 60; // 4m30s per theory question
  const timePer10 = isMath ? 6 * 60 : 3.33 * 60;
  return Math.ceil((questionCount / 10) * timePer10);
};

// Theory grading
const parseKeywords = (keywords) => {
  if (Array.isArray(keywords)) return keywords;
  if (typeof keywords === "string") {
    try {
      return JSON.parse(keywords);
    } catch {
      return [];
    }
  }
  return [];
};

const gradeTheoryAnswer = (userAnswer, rawKeywords) => {
  if (!userAnswer) return 0;
  const keywords = parseKeywords(rawKeywords);
  if (!Array.isArray(keywords) || keywords.length === 0) return 0;
  const lower = userAnswer.toLowerCase();
  const totalGroups = keywords.length;

  const matchedGroups = keywords.filter((group) => {
    if (!Array.isArray(group) || group.length === 0) return false;
    return group.some((kw) => lower.includes(kw.toLowerCase()));
  }).length;

  return matchedGroups / totalGroups; // 0 to 1
};

const isTheoryQuestion = (q) =>
  q?.type === "theory" || Array.isArray(q?.keywords);

const shuffleArray = (array) => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

const getTimeLeftFromEndsAtMs = (endsAtMs) => {
  if (!Number.isFinite(endsAtMs)) return null;
  return Math.max(0, Math.ceil((endsAtMs - Date.now()) / 1000));
};

const DEFAULT_PERSIST_INTERVAL_MS = 15000;

const ExamScreen = ({
  answers,
  setAnswers,
  questions,
  onSubmit,
  selectedCourse,
  bookmarks,
  setBookmarks,
  hasRetaken,
  questionsLoading,
  isPremium,
  autoAdvance,
  userProfile,
  questionType,
}) => {
  const isMathCourse = selectedCourse?.id === "MTH101";
  const isTheoryExam = questionType === "theory";
  const navigate = useNavigate();

  const [shuffledQuestions, setShuffledQuestions] = useState([]);

  // Prefer the shuffled list length (restored from localStorage on refresh),
  // but fall back to the raw questions length.
  const totalQuestions = shuffledQuestions.length || questions.length;
  const totalTime = useMemo(
    () => calculateTotalTime(totalQuestions, isMathCourse, isTheoryExam),
    [totalQuestions, isMathCourse, isTheoryExam],
  );

  const savedSession = useMemo(() => loadExamSession(), []);

  const [currentIndex, setCurrentIndex] = useState(() => {
    const savedIndex = savedSession?.currentIndex;
    if (typeof savedIndex === "number" && savedIndex >= 0) return savedIndex;
    return 0;
  });

  const [endsAtMs, setEndsAtMs] = useState(() => {
    const v = savedSession?.endsAtMs;
    return Number.isFinite(v) ? v : null;
  });

  const [timeLeft, setTimeLeft] = useState(() => {
    const fromEnds = getTimeLeftFromEndsAtMs(savedSession?.endsAtMs);
    if (typeof fromEnds === "number") return fromEnds;

    const savedTimeLeft = savedSession?.timeLeft;
    if (typeof savedTimeLeft === "number" && savedTimeLeft > 0) {
      return savedTimeLeft;
    }

    return totalTime;
  });
  const timeLeftRef = useRef(timeLeft);
  useEffect(() => {
    timeLeftRef.current = timeLeft;
  }, [timeLeft]);

  const [hasSaved, setHasSaved] = useState(false);
  const [isSubmitOverlayOpen, setSubmitOverlayOpen] = useState(false);
  const [isExitOverlayOpen, setExitOverlayOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isSubmittingRef = useRef(false);
  const [isPremiumOverlayOpen, setPremiumOverlayOpen] = useState(false);

  const currentQuestion = shuffledQuestions[currentIndex];
  const selectedOption = answers[currentIndex];
  const isBookmarked = bookmarks.includes(currentQuestion?.id);
  const isBookmarkLocked = !isPremium;

  useEffect(() => {
    // 1. Try to restore an in-progress exam from localStorage
    if (
      Array.isArray(savedSession?.questions) &&
      savedSession.questions.length
    ) {
      // ✅ VALIDATE: Only restore if course AND question type match
      const savedCourseId = savedSession?.selectedCourse?.id;
      const currentCourseId = selectedCourse?.id;
      const savedType = savedSession?.questions?.[0]?.type ?? "objective";
      const currentType = questionType === "theory" ? "theory" : "objective";
      const sessionMatches =
        savedCourseId === currentCourseId && savedType === currentType;

      if (sessionMatches) {
        setShuffledQuestions(savedSession.questions);
        setCurrentIndex(
          typeof savedSession.currentIndex === "number" &&
            savedSession.currentIndex >= 0
            ? savedSession.currentIndex
            : 0,
        );

        if (Array.isArray(savedSession.answers)) {
          setAnswers(savedSession.answers);
        }

        if (!Number.isFinite(savedSession.endsAtMs)) {
          const legacyTimeLeft =
            typeof savedSession.timeLeft === "number" &&
            savedSession.timeLeft > 0
              ? savedSession.timeLeft
              : null;
          if (legacyTimeLeft != null) {
            const nextEndsAt = Date.now() + legacyTimeLeft * 1000;
            setEndsAtMs(nextEndsAt);
            setTimeLeft(legacyTimeLeft);
          }
        }

        return; // session is valid, skip fresh exam setup
      }

      // ❌ Session is stale (different course or type) — discard it
      clearExamSession();
    }

    // 2. Fresh exam – shuffle options and start a new session
    if (questions.length > 0 && shuffledQuestions.length === 0) {
      const shuffled = questions.map((q) => ({
        ...q,
        options: Array.isArray(q.options)
          ? shuffleArray([...q.options])
          : undefined,
      }));
      setShuffledQuestions(shuffled);
    }
  }, [
    questions,
    savedSession,
    setAnswers,
    shuffledQuestions.length,
    selectedCourse?.id,
    questionType,
  ]);

  // Ensure we always have an endsAtMs when exam starts/resumes.
  useEffect(() => {
    if (!totalQuestions) return;
    if (Number.isFinite(endsAtMs)) return;

    const baseTimeLeft =
      typeof timeLeft === "number" && timeLeft > 0 ? timeLeft : totalTime;
    const nextEndsAt = Date.now() + baseTimeLeft * 1000;
    setEndsAtMs(nextEndsAt);
    setTimeLeft(baseTimeLeft);
  }, [endsAtMs, timeLeft, totalQuestions, totalTime]);

  const persistMetaRef = useRef({ lastWriteMs: 0 });

  const buildSessionPayload = useCallback(() => {
    const effectiveTimeLeft =
      getTimeLeftFromEndsAtMs(endsAtMs) ??
      (typeof timeLeftRef.current === "number" ? timeLeftRef.current : 0);

    return {
      version: 2,
      selectedCourse,
      questions: shuffledQuestions.length ? shuffledQuestions : questions,
      answers,
      currentIndex,
      endsAtMs,
      timeLeft: effectiveTimeLeft, // snapshot for quick restore + legacy consumers
    };
  }, [
    answers,
    currentIndex,
    endsAtMs,
    questions,
    selectedCourse,
    shuffledQuestions,
  ]);

  const persistExamSessionThrottled = useCallback(
    ({ force = false } = {}) => {
      if (!totalQuestions) return;
      const now = Date.now();
      const { lastWriteMs } = persistMetaRef.current;
      if (!force && now - lastWriteMs < DEFAULT_PERSIST_INTERVAL_MS) return;

      persistMetaRef.current.lastWriteMs = now;
      saveExamSession(buildSessionPayload());
    },
    [buildSessionPayload, totalQuestions],
  );

  // Persist immediately on key progress changes (but without per-second writes).
  useEffect(() => {
    persistExamSessionThrottled({ force: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [answers, currentIndex, shuffledQuestions, selectedCourse]);

  // Persist time periodically + on page hide/unload (reliable refresh resume, minimal drift).
  useEffect(() => {
    if (!totalQuestions || !Number.isFinite(endsAtMs)) return;

    const id = setInterval(() => {
      persistExamSessionThrottled();
    }, DEFAULT_PERSIST_INTERVAL_MS);

    const onVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        persistExamSessionThrottled({ force: true });
      }
    };

    const onBeforeUnload = () => {
      persistExamSessionThrottled({ force: true });
    };

    document.addEventListener("visibilitychange", onVisibilityChange);
    window.addEventListener("beforeunload", onBeforeUnload);

    return () => {
      clearInterval(id);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("beforeunload", onBeforeUnload);
    };
  }, [endsAtMs, persistExamSessionThrottled, totalQuestions]);

  const saveResultToSupabase = async (finalTime, correctCount) => {
    try {
      // 🔥 STEP 1: ALWAYS get fresh session
      let {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();

      if (sessionError) throw sessionError;

      // 🔥 STEP 2: If session is missing/expired → refresh it
      if (!session) {
        console.warn("Session missing. Attempting refresh...");
        const { data, error } = await supabase.auth.refreshSession();

        if (error) throw error;
        session = data.session;
      }

      const user = session?.user;
      if (!user) throw new Error("User not authenticated");

      // 🔥 STEP 4: Insert with retry logic
      let { error } = await supabase.from("exam_attempts").insert({
        user_id: user.id,
        course_id: selectedCourse.id,
        score: correctCount,
        total_questions: totalQuestions,
        time_taken: finalTime,
        is_retake: hasRetaken,
        university: userProfile?.university || null,
        type: isTheoryExam ? "THY" : "OBJ",
      });

      // 🔥 STEP 5: If JWT expired during insert → retry ONCE
      if (error?.message?.toLowerCase().includes("jwt")) {
        console.warn("JWT expired during insert. Retrying...");

        const { data: refreshData, error: refreshError } =
          await supabase.auth.refreshSession();

        if (refreshError) throw refreshError;

        const retryUser = refreshData.session?.user;
        if (!retryUser) throw new Error("Retry failed: no user");

        const retry = await supabase.from("exam_attempts").insert({
          user_id: retryUser.id,
          course_id: selectedCourse.id,
          score: correctCount,
          total_questions: totalQuestions,
          time_taken: finalTime,
          is_retake: hasRetaken,
          university: userProfile?.university || null,
          type: isTheoryExam ? "THY" : "OBJ",
        });

        if (retry.error) throw retry.error;
      } else if (error) {
        throw error;
      }

      console.log("Saved to Supabase ✅");
    } catch (error) {
      console.error("SAVE RESULT FAILED:", error.message);
    }
  };

  const handleBookmarkClick = () => {
    if (!currentQuestion?.id) return;
    setBookmarks((prev) => {
      const updated = prev.includes(currentQuestion.id)
        ? prev.filter((id) => id !== currentQuestion.id)
        : [...prev, currentQuestion.id];
      localStorage.setItem("bookmarkedQuestions", JSON.stringify(updated));
      return updated;
    });
  };

  const onOptionClick = (option) => {
    setAnswers((prev) => {
      const next = Array.isArray(prev) ? [...prev] : [];
      next[currentIndex] = option;
      return next;
    });

    // Only auto-advance if the preference is enabled
    if (autoAdvance) {
      setTimeout(() => {
        setCurrentIndex((prev) => {
          if (prev < totalQuestions - 1) return prev + 1;
          setSubmitOverlayOpen(true);
          return prev;
        });
      }, 200); // small delay for UX smoothness
    }
  };

  const saveResultToHistory = (finalTime, correctCount) => {
    if (hasSaved) return;

    const newResult = {
      id: Date.now(),
      course: selectedCourse.name,
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      score: correctCount,
      total: totalQuestions,
      timeTaken: finalTime,
    };
    const existingHistory =
      JSON.parse(localStorage.getItem("examHistory")) || [];
    localStorage.setItem(
      "examHistory",
      JSON.stringify([...existingHistory, newResult]),
    );
    setHasSaved(true);

    // Exam is complete – clear any persisted in‑progress state
    clearExamSession();
  };

  const handleSubmit = async () => {
    if (isSubmittingRef.current) return;
    isSubmittingRef.current = true;
    setSubmitOverlayOpen(false);
    setIsSubmitting(true);

    const finalTime = totalTime - timeLeft;

    const correctCount = shuffledQuestions.reduce((acc, q, idx) => {
      if (isTheoryQuestion(q)) {
        return acc + gradeTheoryAnswer(answers[idx], q.keywords); // fractional 0–1
      }
      return acc + (answers[idx] === q.correct ? 1 : 0);
    }, 0);

    saveResultToHistory(finalTime, correctCount);

    try {
      await withTimeout(
        saveResultToSupabase(finalTime, correctCount),
        15000,
        "Saving results took too long. They may not have been stored online.",
      );
    } catch (err) {
      console.error("Error while saving to Supabase:", err);
    }

    if (onSubmit) onSubmit(correctCount, shuffledQuestions.length);
    clearExamSession();
    navigate("/results");
  };

  const handleTimeUp = async () => {
    if (isSubmittingRef.current) return;
    isSubmittingRef.current = true;
    setIsSubmitting(true);
    const finalTime = totalTime - timeLeft;

    const correctCount = shuffledQuestions.reduce((acc, q, idx) => {
      if (isTheoryQuestion(q)) {
        return acc + gradeTheoryAnswer(answers[idx], q.keywords); // fractional 0–1
      }
      return acc + (answers[idx] === q.correct ? 1 : 0);
    }, 0);

    saveResultToHistory(finalTime, correctCount);

    try {
      await saveResultToSupabase(finalTime, correctCount);
    } catch (err) {
      console.error("Error while saving to Supabase on timeout:", err);
    }

    if (onSubmit) onSubmit(correctCount, shuffledQuestions.length);
    clearExamSession();
    navigate("/results");
  };

  const progress = ((currentIndex + 1) / totalQuestions) * 100;

  // Show a loading screen while questions are being fetched or prepared
  if (questionsLoading || shuffledQuestions.length === 0 || !currentQuestion) {
    return (
      <div className="min-h-[100dvh] bg-gray-50 dark:bg-slate-900 transition-colors duration-500 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-blue-500/10 animate-ping" />
            <div className="relative size-16 rounded-3xl bg-white dark:bg-slate-800 border border-blue-100 dark:border-slate-700 flex items-center justify-center shadow-lg shadow-blue-200/60 dark:shadow-none">
              <FiLoader className="size-8 text-blue-600 dark:text-blue-400 animate-spin" />
            </div>
          </div>
          <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">
            Preparing your questions...
          </p>
        </div>
      </div>
    );
  }

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
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400 mb-0.5">
              Progress
            </span>
            <div className="font-black text-slate-900 dark:text-white">
              {currentIndex + 1}{" "}
              <span className="text-slate-400 font-medium">
                / {totalQuestions}
              </span>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 px-4 py-2 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700">
            <Timer
              endsAtMs={endsAtMs}
              timeLeft={timeLeft}
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
                onClick={
                  isBookmarkLocked
                    ? () => setPremiumOverlayOpen(true)
                    : handleBookmarkClick
                }
                className={`relative p-2 rounded-xl transition-all ${isBookmarked ? "bg-yellow-100 text-yellow-600" : "bg-gray-50 dark:bg-slate-700 text-gray-400"} ${isBookmarkLocked ? "opacity-60 cursor-not-allowed" : ""}`}
              >
                <FiBookmark
                  className={`size-5 ${isBookmarked ? "fill-current" : ""}`}
                />
                {isBookmarkLocked && (
                  <div className="absolute -top-1 -right-1 bg-amber-400 dark:bg-yellow-500 rounded-full p-1 border-2 border-gray-50 dark:border-slate-900 shadow-sm flex items-center justify-center">
                    <FaCrown className="text-[8px] text-white" />
                  </div>
                )}
              </button>
            </div>

            <div className="lg:text-xl font-bold text-slate-800 dark:text-slate-100 leading-relaxed mb-5">
              <RenderMathText
                text={currentQuestion?.question ?? ""}
                courseId={selectedCourse?.id}
              />
            </div>

            <div className="space-y-4">
              {isTheoryQuestion(currentQuestion) ? (
                <textarea
                  value={selectedOption ?? ""}
                  onChange={(e) => {
                    const val = e.target.value;
                    setAnswers((prev) => {
                      const next = Array.isArray(prev) ? [...prev] : [];
                      next[currentIndex] = val;
                      return next;
                    });
                  }}
                  placeholder="Type your answer here..."
                  rows={6}
                  className="w-full rounded-2xl border-2 border-gray-100 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 font-medium p-4 text-sm resize-none focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 transition-colors"
                />
              ) : (
                currentQuestion?.options.map((option, index) => {
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
                      <div
                        className={`size-10 rounded-2xl flex items-center justify-center font-black transition-colors ${
                          isSelected
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400"
                        }`}
                      >
                        {label}
                      </div>
                      <div
                        className={`text-left font-semibold ${isSelected ? "text-blue-700 dark:text-blue-400" : "text-slate-600 dark:text-slate-300"}`}
                      >
                        <RenderMathText
                          text={option}
                          courseId={selectedCourse?.id}
                        />
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM NAVIGATION BAR */}
      <div className="fixed bottom-0 inset-x-0 px-6 py-2 z-40">
        <div className="max-w-2xl mx-auto bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-white/20 dark:border-slate-700/50 p-3 rounded-[2.5rem] shadow-2xl flex items-center justify-between gap-3">
          <button
            onClick={() => {
              setCurrentIndex((prev) => Math.max(0, prev - 1));
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
                setCurrentIndex((prev) =>
                  Math.min(totalQuestions - 1, prev + 1),
                );
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
          clearExamSession();
          navigate("/");
        }}
        title="Quit Exam?"
        message="Your current progress will be lost. Are you sure?"
        confirmText="Quit"
        cancelText="Stay"
        danger={true}
      />

      <ConfirmOverlay
        isOpen={isPremiumOverlayOpen}
        onClose={() => setPremiumOverlayOpen(false)}
        onConfirm={() => navigate("/premium")}
        title="Bookmark with Premium"
        message="Upgrade to Premium to bookmark questions during exams and review them later from your Saved list."
        confirmText="Upgrade to Premium"
        cancelText="Not now"
      />
    </div>
  );
};

export default ExamScreen;
