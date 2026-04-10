import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../apiConfig";
import { supabase } from "../supabaseClient";
import CoursePicker from "../components/CoursePicker";
import { RenderMathText } from "../utils/RenderMathText";
import ProgressBar from "../components/ProgressBar";
import {
  FiChevronLeft, FiChevronRight, FiSend, FiLoader, FiCheckCircle, FiXCircle, FiX,
} from "react-icons/fi";
import { FaCrown } from "react-icons/fa";
import { withTimeout } from "../utils/withTimeout";

const FREE_QUESTION_LIMIT = 5;

// ─── Premium gate overlay ─────────────────────────────────────────────────────
const PremiumGateOverlay = ({ onUpgrade, onQuit }) => (
  <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4">
    <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-300" />
    <div className="relative bg-white dark:bg-slate-800 rounded-[2.5rem] shadow-2xl w-full max-w-sm p-8 animate-in zoom-in-95 slide-in-from-bottom-8 duration-300 ease-out">
      <div className="flex flex-col items-center text-center">
        <div className="mb-5 size-20 rounded-3xl bg-amber-50 dark:bg-amber-900/30 flex items-center justify-center">
          <FaCrown className="text-amber-500" size={36} />
        </div>
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">
          Free limit reached
        </h2>
        <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed mb-8 px-2">
          You&apos;ve answered {FREE_QUESTION_LIMIT} questions. Upgrade to Premium for unlimited tests and full access.
        </p>
        <div className="flex flex-col w-full gap-3">
          <button
            onClick={onUpgrade}
            className="w-full py-4 rounded-2xl font-bold text-white bg-amber-500 hover:bg-amber-600 shadow-lg shadow-amber-200 dark:shadow-none transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            <FaCrown size={14} /> Go Premium
          </button>
          <button
            onClick={onQuit}
            className="w-full py-4 rounded-2xl font-bold text-slate-500 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors flex items-center justify-center gap-2"
          >
            <FiX size={14} /> Quit Test
          </button>
        </div>
      </div>
    </div>
  </div>
);

// ─── helpers ─────────────────────────────────────────────────────────────────
const shuffle = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const parseKeywords = (kw) => {
  if (Array.isArray(kw)) return kw;
  if (typeof kw === "string") { try { return JSON.parse(kw); } catch { return []; } }
  return [];
};

const gradeTheory = (userAnswer, rawKw) => {
  if (!userAnswer) return 0;
  const kws = parseKeywords(rawKw);
  if (!kws.length) return 0;
  const lower = userAnswer.toLowerCase();
  const matched = kws.filter((g) => Array.isArray(g) && g.some((k) => lower.includes(k.toLowerCase()))).length;
  return matched / kws.length;
};

const gradeFib = (userBlanks, answerGroups) => {
  if (!Array.isArray(answerGroups) || !Array.isArray(userBlanks)) return 0;
  let correct = 0;
  for (let i = 0; i < answerGroups.length; i++) {
    const typed = (userBlanks[i] || "").trim().toLowerCase();
    if (Array.isArray(answerGroups[i]) && answerGroups[i].some((v) => v.toLowerCase() === typed)) correct++;
  }
  return correct / answerGroups.length;
};

const isTheory = (q) => q?.type === "theory" || Array.isArray(q?.keywords);
const isFib = (q) => q?.type === "fib" || Array.isArray(q?.answers);
const splitFib = (text) => text.split(/_{2,}/g);

const gradeQuestion = (q, answer) => {
  if (isTheory(q)) return gradeTheory(answer, q.keywords);
  if (isFib(q)) return gradeFib(answer, q.answers);
  return answer === q.correct ? 1 : 0;
};

const getResult = (q, answer) => {
  const grade = gradeQuestion(q, answer);
  if (grade >= 1) return "correct";
  if (grade > 0) return "partial";
  return "wrong";
};

const QUESTION_COUNTS = [10, 20, 30, 50];

// ─── FeedbackBadge shown after answering ─────────────────────────────────────
const FeedbackBadge = ({ result }) => {
  if (result === "correct") return (
    <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 font-black text-sm animate-in fade-in zoom-in-95 duration-300">
      <FiCheckCircle className="size-4" /> Correct!
    </div>
  );
  if (result === "partial") return (
    <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 font-black text-sm animate-in fade-in zoom-in-95 duration-300">
      <FiCheckCircle className="size-4" /> Partial
    </div>
  );
  return (
    <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 font-black text-sm animate-in fade-in zoom-in-95 duration-300">
      <FiXCircle className="size-4" /> Wrong
    </div>
  );
};

// ─── QuestionCountPicker ──────────────────────────────────────────────────────
const QuestionCountPicker = ({ isPremium, onSelect, onBack, courseName }) => (
  <div className="min-h-[100dvh] bg-gray-50 dark:bg-slate-900 flex flex-col">
    <div className="sticky top-0 z-10 bg-gray-50/90 dark:bg-slate-900/90 backdrop-blur-md px-5 pt-6 pb-4 border-b border-gray-100 dark:border-slate-800">
      <div className="max-w-lg mx-auto flex items-center gap-3">
        <button onClick={onBack} className="p-2.5 rounded-2xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 shadow-sm active:scale-90 transition-all">
          <FiChevronLeft className="size-5 text-slate-600 dark:text-slate-300" />
        </button>
        <div>
          <h1 className="text-xl font-black text-slate-900 dark:text-white">Test Mode</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">{courseName} · How many questions?</p>
        </div>
      </div>
    </div>
    <div className="flex-1 px-5 py-8 flex flex-col items-center justify-center">
      <div className="w-full max-w-lg space-y-3">
        {QUESTION_COUNTS.map((count) => {
          const locked = !isPremium && count > 10;
          return (
            <button
              key={count}
              onClick={() => locked ? null : onSelect(count)}
              className={`w-full flex items-center justify-between px-6 py-5 rounded-[1.8rem] border-2 transition-all active:scale-[0.98] ${locked
                ? "border-gray-100 dark:border-slate-700 bg-white dark:bg-slate-800 opacity-60 cursor-not-allowed"
                : "border-gray-100 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-blue-300 dark:hover:border-blue-600 shadow-sm"
                }`}
            >
              <span className="text-lg font-black text-slate-900 dark:text-white">{count} Questions</span>
              {locked ? (
                <span className="flex items-center gap-1 text-xs font-black text-amber-500 bg-amber-50 dark:bg-amber-900/30 px-2.5 py-1 rounded-full">
                  <FaCrown size={10} /> PRO
                </span>
              ) : (
                <FiChevronRight className="size-5 text-slate-400" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  </div>
);

// ─── Main component ───────────────────────────────────────────────────────────
const TestModeScreen = ({ courses, coursesLoading, isPremium, userProfile }) => {
  const navigate = useNavigate();

  // phase: "pick" | "count" | "test" | "done"
  const [phase, setPhase] = useState("pick");
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [questionCount, setQuestionCount] = useState(null); // eslint-disable-line no-unused-vars

  const [questions, setQuestions] = useState([]);
  const [loadingQ, setLoadingQ] = useState(false);
  const [errorQ, setErrorQ] = useState(null);

  // answers[i] = the user's answer for question i (undefined = unanswered)
  const [answers, setAnswers] = useState([]);
  // answered[i] = true once the user has submitted an answer for question i
  const [answered, setAnswered] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentInput, setCurrentInput] = useState(undefined);

  const isSubmittingRef = useRef(false);
  const [showPremiumGate, setShowPremiumGate] = useState(false);
  const [kbHeight, setKbHeight] = useState(0);

  useEffect(() => {
    const vv = window.visualViewport;
    if (!vv) return;
    const handler = () => {
      const height = Math.max(0, window.innerHeight - vv.height - vv.offsetTop);
      setKbHeight(height);
    };
    vv.addEventListener("resize", handler);
    vv.addEventListener("scroll", handler);
    return () => {
      vv.removeEventListener("resize", handler);
      vv.removeEventListener("scroll", handler);
    };
  }, []);

  // ── fetch questions ──
  const fetchQuestions = useCallback(async (course, count) => {
    setLoadingQ(true);
    setErrorQ(null);
    try {
      const base = `${API_BASE_URL}${course.questionsEndpoint || `/courses/${course.id}/questions`}`;
      const [objRes, thyRes, fibRes] = await Promise.all([
        fetch(base),
        fetch(`${base}?type=theory`),
        fetch(`${base}?type=fib`),
      ]);
      const [objData, thyData, fibData] = await Promise.all([
        objRes.json(), thyRes.json(), fibRes.json(),
      ]);
      const objective = objRes.ok && Array.isArray(objData) ? objData : [];
      const theory = thyRes.ok && Array.isArray(thyData) ? thyData.map((q) => ({ ...q, type: "theory" })) : [];
      const fib = fibRes.ok && Array.isArray(fibData) ? fibData.map((q) => ({ ...q, type: "fib" })) : [];
      const all = shuffle([...objective, ...theory, ...fib]);
      if (all.length === 0) throw new Error("No questions found for this course.");
      const picked = all.slice(0, count).map((q) => ({
        ...q,
        options: Array.isArray(q.options) ? shuffle([...q.options]) : undefined,
      }));
      setQuestions(picked);
      setAnswers(new Array(picked.length).fill(undefined));
      setAnswered(new Array(picked.length).fill(false));
      setCurrentIndex(0);
      setCurrentInput(undefined);
    } catch (err) {
      setErrorQ(err.message || "Failed to load questions.");
    } finally {
      setLoadingQ(false);
    }
  }, []);

  const handleCourseSelect = (course) => {
    setSelectedCourse(course);
    setPhase("count");
  };

  const handleCountSelect = (count) => {
    setQuestionCount(count);
    setPhase("test");
    fetchQuestions(selectedCourse, count);
  };

  // ── answer submission for current question ──
  const handleAnswerSubmit = () => {
    if (answered[currentIndex]) return;
    const ans = currentInput;
    setAnswers((prev) => { const n = [...prev]; n[currentIndex] = ans; return n; });
    setAnswered((prev) => {
      const n = [...prev]; n[currentIndex] = true;
      // trigger premium gate for free users after FREE_QUESTION_LIMIT answers
      if (!isPremium) {
        const newCount = n.filter(Boolean).length;
        if (newCount >= FREE_QUESTION_LIMIT) setShowPremiumGate(true);
      }
      return n;
    });
  };

  // When navigating to a question, restore its input
  useEffect(() => {
    if (answered[currentIndex]) {
      setCurrentInput(answers[currentIndex]);
    } else {
      setCurrentInput(undefined);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]);

  const currentQuestion = questions[currentIndex];
  const isAnswered = answered[currentIndex];
  const totalQuestions = questions.length;
  const progress = totalQuestions ? ((currentIndex + 1) / totalQuestions) * 100 : 0;
  const allAnswered = answered.every(Boolean);

  // ── save result and navigate ──
  const handleFinish = async () => {
    if (isSubmittingRef.current) return;
    isSubmittingRef.current = true;

    const score = questions.reduce((acc, q, i) => acc + gradeQuestion(q, answers[i]), 0);

    try {
      let { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        const { data } = await supabase.auth.refreshSession();
        session = data.session;
      }
      const user = session?.user;
      if (user) {
        const { error } = await withTimeout(
          supabase.from("test_attempts").insert({
            user_id: user.id,
            course_id: selectedCourse.id,
            score: parseFloat(score.toFixed(2)),
            total_questions: totalQuestions,
            university: userProfile?.university || null,
          }),
          15000,
          "Saving result took too long."
        );
        if (error?.message?.toLowerCase().includes("jwt")) {
          const { data: rd } = await supabase.auth.refreshSession();
          await supabase.from("test_attempts").insert({
            user_id: rd.session.user.id,
            course_id: selectedCourse.id,
            score: parseFloat(score.toFixed(2)),
            total_questions: totalQuestions,
            university: userProfile?.university || null,
          });
        }
      }
    } catch (err) {
      console.error("Failed to save test attempt:", err);
    }

    navigate("/test-result", {
      state: {
        score: parseFloat(questions.reduce((acc, q, i) => acc + gradeQuestion(q, answers[i]), 0).toFixed(2)),
        totalQuestions,
        courseId: selectedCourse.id,
        courseName: selectedCourse.name,
        answers,
        questions,
        university: userProfile?.university || null,
      },
    });
  };

  // ── phase: pick ──
  if (phase === "pick") {
    return (
      <CoursePicker
        courses={courses}
        loading={coursesLoading}
        onSelect={handleCourseSelect}
        onBack={() => navigate("/")}
        title="Test Mode"
        subtitle="Pick a course to test yourself"
      />
    );
  }

  // ── phase: count ──
  if (phase === "count") {
    return (
      <QuestionCountPicker
        isPremium={isPremium}
        onSelect={handleCountSelect}
        onBack={() => setPhase("pick")}
        courseName={selectedCourse?.name}
      />
    );
  }

  // ── loading ──
  if (loadingQ || (!currentQuestion && !errorQ)) {
    return (
      <div className="min-h-[100dvh] bg-gray-50 dark:bg-slate-900 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-blue-500/10 animate-ping" />
            <div className="relative size-16 rounded-3xl bg-white dark:bg-slate-800 border border-blue-100 dark:border-slate-700 flex items-center justify-center shadow-lg">
              <FiLoader className="size-8 text-blue-600 animate-spin" />
            </div>
          </div>
          <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">Preparing your test...</p>
        </div>
      </div>
    );
  }

  // ── error ──
  if (errorQ) {
    return (
      <div className="min-h-[100dvh] bg-gray-50 dark:bg-slate-900 flex items-center justify-center px-5">
        <div className="text-center space-y-4">
          <p className="text-slate-500 dark:text-slate-400">{errorQ}</p>
          <button onClick={() => setPhase("pick")} className="px-6 py-3 rounded-2xl bg-blue-600 text-white font-bold">Go Back</button>
        </div>
      </div>
    );
  }

  // ── phase: test ──
  const isObjQ = !isTheory(currentQuestion) && !isFib(currentQuestion);
  const isThyQ = isTheory(currentQuestion);
  const isFibQ = isFib(currentQuestion);
  const result = isAnswered ? getResult(currentQuestion, answers[currentIndex]) : null;

  // For FIB, currentInput is an array
  const fibBlanks = isFibQ ? (Array.isArray(currentInput) ? currentInput : []) : [];
  const fibParts = isFibQ ? splitFib(currentQuestion.question) : [];

  const canSubmit = isAnswered
    ? false
    : isObjQ
      ? currentInput !== undefined
      : isThyQ
        ? typeof currentInput === "string" && currentInput.trim().length > 0
        : fibBlanks.some((b) => (b || "").trim().length > 0);

  return (
    <div className="min-h-[100dvh] bg-gray-50 dark:bg-slate-900 flex flex-col transition-colors duration-500">
      {/* Premium gate overlay */}
      {showPremiumGate && (
        <PremiumGateOverlay
          onUpgrade={() => navigate("/premium")}
          onQuit={() => { setShowPremiumGate(false); setPhase("pick"); }}
        />
      )}
      {/* Header */}
      <div className="sticky top-0 z-30 bg-gray-50/80 dark:bg-slate-900/80 backdrop-blur-md px-5 pt-6 pb-2">
        <div className="max-w-2xl mx-auto flex justify-between items-center mb-4">
          <button
            onClick={() => setPhase("pick")}
            className="p-2.5 rounded-2xl bg-white dark:bg-slate-800 shadow-sm border border-gray-100 dark:border-slate-700 active:scale-90 transition-all"
          >
            <FiChevronLeft className="size-6 text-slate-600 dark:text-slate-300" />
          </button>
          <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400 mb-0.5">Progress</span>
            <div className="font-black text-slate-900 dark:text-white">
              {currentIndex + 1} <span className="text-slate-400 font-medium">/ {totalQuestions}</span>
            </div>
          </div>
          <div className="bg-white dark:bg-slate-800 px-4 py-2 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 text-sm font-black text-slate-700 dark:text-slate-200">
            {answered.filter(Boolean).length}/{totalQuestions}
          </div>
        </div>
        <div className="max-w-2xl mx-auto">
          <ProgressBar progress={progress} />
        </div>
      </div>

      {/* Question */}
      <div className="flex-1 px-5 pb-32 pt-4 overflow-y-auto">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white dark:bg-slate-800 rounded-[2.5rem] p-6 shadow-xl shadow-slate-200/50 dark:shadow-none border border-gray-50 dark:border-slate-800 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center mb-4">
              <div className="bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest">
                {selectedCourse?.name}{isThyQ ? " · Theory" : isFibQ ? " · FIB" : ""}
              </div>
              {isAnswered && <FeedbackBadge result={result} />}
            </div>

            {/* Question text */}
            <div className="lg:text-xl font-bold text-slate-800 dark:text-slate-100 leading-relaxed mb-5">
              {isFibQ ? (
                <span className="leading-[2.4]">
                  {fibParts.map((part, i, arr) => (
                    <span key={i}>
                      {part}
                      {i < arr.length - 1 && (
                        <input
                          type="text"
                          value={fibBlanks[i] ?? ""}
                          disabled={isAnswered}
                          size={Math.max(6, (fibBlanks[i] ?? "").length + 2)}
                          onChange={(e) => {
                            const val = e.target.value;
                            setCurrentInput((prev) => {
                              const cur = Array.isArray(prev) ? [...prev] : [];
                              cur[i] = val;
                              return cur;
                            });
                          }}
                          className="inline mx-1 bg-transparent border-b-2 border-blue-500 dark:border-blue-400 text-blue-700 dark:text-blue-300 font-bold text-base focus:outline-none focus:border-blue-700 transition-colors text-center disabled:opacity-70"
                        />
                      )}
                    </span>
                  ))}
                </span>
              ) : (
                <RenderMathText text={currentQuestion?.question ?? ""} courseId={selectedCourse?.id} />
              )}
            </div>

            {/* Answer area */}
            <div className="space-y-3">
              {isThyQ ? (
                <textarea
                  value={typeof currentInput === "string" ? currentInput : ""}
                  disabled={isAnswered}
                  onChange={(e) => setCurrentInput(e.target.value)}
                  placeholder="Type your answer here..."
                  rows={5}
                  className="w-full rounded-2xl border-2 border-gray-100 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 font-medium p-4 text-sm resize-none focus:outline-none focus:border-blue-500 transition-colors disabled:opacity-70"
                />
              ) : isObjQ ? (
                (currentQuestion?.options ?? []).map((option, idx) => {
                  const label = String.fromCharCode(65 + idx);
                  const isSelected = currentInput === option || (isAnswered && answers[currentIndex] === option);
                  const isRight = isAnswered && option === currentQuestion.correct;
                  const isWrong = isAnswered && isSelected && option !== currentQuestion.correct;

                  return (
                    <button
                      key={idx}
                      disabled={isAnswered}
                      onClick={() => !isAnswered && setCurrentInput(option)}
                      className={`group w-full flex items-center gap-2 p-2 rounded-3xl border-2 transition-all duration-300 active:scale-[0.98] disabled:cursor-default ${isRight
                        ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                        : isWrong
                          ? "border-red-400 bg-red-50 dark:bg-red-900/20"
                          : isSelected
                            ? "border-blue-600 bg-blue-50/50 dark:bg-blue-600/10"
                            : "border-gray-100 dark:border-slate-700 hover:border-blue-200 dark:hover:border-slate-600"
                        }`}
                    >
                      <div className={`size-10 rounded-2xl flex items-center justify-center font-black transition-colors ${isRight ? "bg-green-500 text-white" : isWrong ? "bg-red-400 text-white" : isSelected ? "bg-blue-600 text-white" : "bg-gray-100 dark:bg-slate-700 text-slate-500"
                        }`}>
                        {label}
                      </div>
                      <div className={`text-left font-semibold ${isRight ? "text-green-700 dark:text-green-400" : isWrong ? "text-red-600 dark:text-red-400" : isSelected ? "text-blue-700 dark:text-blue-400" : "text-slate-600 dark:text-slate-300"}`}>
                        <RenderMathText text={option} courseId={selectedCourse?.id} />
                      </div>
                    </button>
                  );
                })
              ) : null}
            </div>

            {/* Theory/FIB correct answer reveal */}
            {isAnswered && (isThyQ || isFibQ) && (
              <div className={`mt-4 p-4 rounded-2xl border-2 ${result === "correct" ? "border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20" : result === "partial" ? "border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/20" : "border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20"}`}>
                <p className="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-1">Correct Answer</p>
                {isThyQ ? (
                  <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                    {currentQuestion.model_answer
                      || currentQuestion.explanation
                      || `Key points: ${parseKeywords(currentQuestion.keywords)
                        .map((group) => (Array.isArray(group) ? group[0] : group))
                        .join(", ")}`}
                  </p>
                ) : (
                  <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                    {(currentQuestion.answers || []).map((g) => Array.isArray(g) ? g[0] : g).join(" / ")}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom nav */}
      <div
        className="fixed bottom-0 inset-x-0 px-6 lg:pl-64 py-2 z-40 transition-all duration-200"
        style={{ bottom: kbHeight }}
      >
        <div className="max-w-2xl mx-auto bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-white/20 dark:border-slate-700/50 p-3 rounded-[2.5rem] shadow-2xl flex items-center justify-between gap-3">
          <button
            onClick={() => { setCurrentIndex((p) => Math.max(0, p - 1)); }}
            disabled={currentIndex === 0}
            className="size-14 rounded-full flex items-center justify-center bg-gray-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 disabled:opacity-20 transition-all active:scale-90"
          >
            <FiChevronLeft size={24} />
          </button>

          {!isAnswered ? (
            <button
              onClick={handleAnswerSubmit}
              disabled={!canSubmit}
              className="flex-1 bg-blue-600 disabled:opacity-40 text-white h-14 rounded-[1.8rem] font-black shadow-lg shadow-blue-200 dark:shadow-none transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              Submit Answer
            </button>
          ) : allAnswered && currentIndex === totalQuestions - 1 ? (
            <button
              onClick={handleFinish}
              className="flex-1 bg-green-600 text-white h-14 rounded-[1.8rem] font-black shadow-lg shadow-green-200 dark:shadow-none transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <span>See Results</span>
              <FiSend />
            </button>
          ) : (
            <button
              onClick={() => {
                if (currentIndex < totalQuestions - 1) setCurrentIndex((p) => p + 1);
                else if (allAnswered) handleFinish();
              }}
              className="flex-1 bg-blue-600 text-white h-14 rounded-[1.8rem] font-black shadow-lg shadow-blue-200 dark:shadow-none transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              {currentIndex === totalQuestions - 1 && allAnswered ? (
                <><span>See Results</span><FiSend /></>
              ) : (
                <><span>Next</span><FiChevronRight /></>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestModeScreen;
