import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaBolt,
  FaHome,
  FaArrowLeft,
  FaGamepad,
} from "react-icons/fa";
import {
  FiCheckCircle,
  FiXCircle,
} from "react-icons/fi";
import Logo from "../images/Logo";

const NotFoundPage = () => {
  useDocumentTitle("Page Not Found | QuizBolt");
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [quizScore, setQuizScore] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  // Micro 404 Trivia Game State
  const sampleQuestion = {
    q: "You seem to have lost your way. What code status represents a 'Not Found' error?",
    options: ["200 OK", "403 Forbidden", "404 Not Found", "500 Server Error"],
    correct: 2,
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleAnswerClick = (option, idx) => {
    setSelectedAnswer(option);
    if (idx === sampleQuestion.correct) {
      setQuizScore("Correct! +10 Scholar Points ⚡️");
    } else {
      setQuizScore("Incorrect! Try studying the error logs.");
    }
  };

  // FeedbackBadge component (from TestModeScreen
  const FeedbackBadge = ({ result }) => {
    if (result === "correct")
      return (
        <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 font-black text-sm animate-in fade-in zoom-in-95 duration-300">
          <FiCheckCircle className="size-4" /> Correct!
        </div>
      );
    return (
      <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 font-black text-sm animate-in fade-in zoom-in-95 duration-300">
        <FiXCircle className="size-4" /> Wrong
      </div>
    );
  };

  const isAnswered = selectedAnswer !== null;
  const result = isAnswered
    ? (sampleQuestion.options.indexOf(selectedAnswer) === sampleQuestion.correct
      ? "correct"
      : "wrong")
    : null;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-gray-950 text-slate-900 dark:text-gray-100 selection:bg-blue-100 dark:selection:bg-blue-900/30 transition-colors duration-300 flex flex-col justify-between">
      {/* NAV (Matches Landing Page Layout) */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/80 dark:bg-gray-950/80 backdrop-blur-md shadow-sm border-b border-slate-100 dark:border-gray-800 py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <Logo className="w-8 h-8 text-blue-600" />
            <span className="text-xl font-black tracking-tighter text-slate-900 dark:text-white">
              QuizBolt
            </span>
          </div>
          <button
            onClick={() => navigate("/")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-2xl font-bold text-sm transition-all active:scale-95 shadow-lg shadow-blue-200 dark:shadow-none"
          >
            Back to Safety
          </button>
        </div>
      </nav>

      {/* MAIN 404 CONTENT HERO */}
      <section className="pt-40 pb-20 px-6 flex-grow flex items-center">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center w-full">
          {/* Left Text / Actions Area */}
          <div className="space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800/50 px-4 py-2 rounded-full">
              <FaBolt className="text-red-500 text-xs" />
              <span className="text-red-700 dark:text-red-400 text-[10px] font-black uppercase tracking-[0.2em]">
                Error 404 · Page Not Found
              </span>
            </div>

            <h1 className="text-6xl lg:text-8xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.1]">
              Lost in the <br />
              <span className="text-blue-600 dark:text-blue-400">
                Lecture Hall?
              </span>
            </h1>

            <p className="text-lg text-slate-500 dark:text-gray-400 font-medium max-w-xl mx-auto lg:mx-0 leading-relaxed">
              The page you are looking for doesn't exist, has been moved, or
              flunked out of its module requirements. Let's get you back on
              track.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button
                onClick={() => navigate("/")}
                className="flex items-center justify-center gap-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-8 py-4 rounded-2xl font-black text-lg hover:opacity-90 transition-all active:scale-95 shadow-xl"
              >
                <FaHome className="text-lg" /> Go to Dashboard
              </button>
              <button
                onClick={() => navigate(-1)}
                className="flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-black text-lg border-2 border-slate-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900 transition-all"
              >
                <FaArrowLeft className="text-sm" /> Previous Page
              </button>
            </div>
          </div>

          {/* Right Micro-Interactivity Card (Interactive Exam Card Mock) */}
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-tr from-blue-500/20 to-red-500/10 blur-3xl rounded-full" />

            <div className="relative bg-white dark:bg-slate-800 border border-gray-50 dark:border-slate-800 p-6 rounded-[2.5rem] shadow-xl shadow-slate-200/50 dark:shadow-none">
              {/* Card Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="size-10 bg-blue-100 dark:bg-blue-900/20 rounded-xl flex items-center justify-center text-blue-600">
                    <FaGamepad />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Pop Quiz Challenge
                    </p>
                    <p className="text-sm font-black text-slate-800 dark:text-white">
                      While You're Waiting
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-full uppercase tracking-tighter">
                    CBT Mode
                  </span>
                  {isAnswered && <FeedbackBadge result={result} />}
                </div>
              </div>

              {/* Question Context */}
              <div className="text-lg font-bold text-slate-800 dark:text-slate-100 leading-relaxed mb-5">
                {sampleQuestion.q}
              </div>

              {/* Answer area (Matching TestModeScreen objective UI */}
              <div className="space-y-3">
                {sampleQuestion.options.map((option, idx) => {
                  const label = String.fromCharCode(65 + idx);
                  const isSelected = selectedAnswer === option;
                  const isRight = isAnswered && idx === sampleQuestion.correct;
                  const isWrong = isAnswered && isSelected && idx !== sampleQuestion.correct;

                  return (
                    <button
                      key={idx}
                      disabled={isAnswered}
                      onClick={() => handleAnswerClick(option, idx)}
                      className={`group w-full flex items-center gap-2 p-2 rounded-3xl border-2 transition-all duration-300 active:scale-[0.98] disabled:cursor-default ${
                        isRight
                          ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                          : isWrong
                            ? "border-red-400 bg-red-50 dark:bg-red-900/20"
                            : isSelected
                              ? "border-blue-600 bg-blue-50/50 dark:bg-blue-600/10"
                              : "border-gray-100 dark:border-slate-700 hover:border-blue-200 dark:hover:border-slate-600"
                      }`}
                    >
                      <div
                        className={`size-10 shrink-0 rounded-2xl flex items-center justify-center font-black transition-colors ${
                          isRight
                            ? "bg-green-500 text-white"
                            : isWrong
                              ? "bg-red-400 text-white"
                              : isSelected
                                ? "bg-blue-600 text-white"
                                : "bg-gray-100 dark:bg-slate-700 text-slate-500"
                        }`}
                      >
                        {label}
                      </div>
                      <div
                        className={`min-w-0 flex-1 text-left font-semibold ${isRight ? "text-green-700 dark:text-green-400" : isWrong ? "text-red-600 dark:text-red-400" : isSelected ? "text-blue-700 dark:text-blue-400" : "text-slate-600 dark:text-slate-300"}`}
                      >
                        {option}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Score Answer Alert Banner */}
              {quizScore && (
                <div
                  className={`mt-4 p-4 rounded-2xl border-2 ${
                    result === "correct"
                      ? "border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20"
                      : "border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20"
                  }`}
                >
                  <p className="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-1">
                    {result === "correct" ? "Great Job!" : "Not Quite!"}
                  </p>
                  <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                    {quizScore}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* MINIMAL FOOTER */}
      <footer className="py-8 border-t border-gray-100 dark:border-gray-800 text-center">
        <p className="text-xs text-slate-400 font-medium">
          © {new Date().getFullYear()} QuizBolt. Lost, but still learning. Built
          with ❤️ for Nigerian university students.
        </p>
      </footer>
    </div>
  );
};

export default NotFoundPage;
import useDocumentTitle from "../hooks/useDocumentTitle";