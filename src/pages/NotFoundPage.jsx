import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaBolt,
  FaHome,
  FaArrowLeft,
  FaGamepad,
  FaBrain,
} from "react-icons/fa";
import Logo from "../images/Logo";

const NotFoundPage = () => {
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

  const handleAnswerClick = (index) => {
    setSelectedAnswer(index);
    if (index === sampleQuestion.correct) {
      setQuizScore("Correct! +10 Scholar Points ⚡️");
    } else {
      setQuizScore("Incorrect! Try studying the error logs.");
    }
  };

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
                className="flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-black text-lg border-2 border-slate-200 dark:border-gray-800 hover:bg-slate-50 dark:hover:bg-gray-900 transition-all"
              >
                <FaArrowLeft className="text-sm" /> Previous Page
              </button>
            </div>
          </div>

          {/* Right Micro-Interactivity Card (Interactive Exam Card Mock) */}
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-tr from-blue-500/20 to-red-500/10 blur-3xl rounded-full" />

            <div className="relative bg-white dark:bg-gray-900 border border-slate-100 dark:border-gray-800 p-8 rounded-[2.5rem] shadow-2xl transition-transform duration-500">
              {/* Card Header */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100 dark:border-gray-800">
                <div className="flex items-center gap-3">
                  <div className="size-10 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center text-blue-600">
                    <FaGamepad />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Pop Quiz Challenge
                    </p>
                    <p className="text-sm font-black text-slate-800 dark:text-white">
                      While You're Waiting
                    </p>
                  </div>
                </div>
                <span className="text-xs font-black bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-full uppercase tracking-tighter">
                  CBT Mode
                </span>
              </div>

              {/* Question Context */}
              <p className="text-base font-bold text-slate-800 dark:text-slate-200 mb-6 leading-relaxed">
                {sampleQuestion.q}
              </p>

              {/* Multiple Choice Blocks */}
              <div className="space-y-3">
                {sampleQuestion.options.map((option, idx) => {
                  let btnStyle =
                    "border-slate-100 dark:border-gray-800 bg-slate-50 dark:bg-gray-800/40 hover:bg-blue-50 dark:hover:bg-blue-900/10";
                  if (selectedAnswer !== null) {
                    if (idx === sampleQuestion.correct) {
                      btnStyle =
                        "border-green-500 bg-green-50 dark:bg-green-900/20 text-green-600";
                    } else if (selectedAnswer === idx) {
                      btnStyle =
                        "border-red-500 bg-red-50 dark:bg-red-900/20 text-red-600";
                    }
                  }

                  return (
                    <button
                      key={idx}
                      disabled={selectedAnswer !== null}
                      onClick={() => handleAnswerClick(idx)}
                      className={`w-full text-left px-5 py-3.5 rounded-2xl font-bold text-sm border transition-all flex items-center justify-between ${btnStyle}`}
                    >
                      <span>{option}</span>
                      {selectedAnswer === idx &&
                        idx === sampleQuestion.correct && (
                          <span className="text-xs">⚡️</span>
                        )}
                    </button>
                  );
                })}
              </div>

              {/* Score Answer Alert Banner */}
              {quizScore && (
                <div
                  className={`mt-6 p-4 rounded-xl text-center text-sm font-black border ${
                    selectedAnswer === sampleQuestion.correct
                      ? "bg-green-50 text-green-700 border-green-200 dark:bg-green-900/10 dark:text-green-400 dark:border-green-900/30"
                      : "bg-red-50 text-red-700 border-red-200 dark:bg-red-900/10 dark:text-red-400 dark:border-red-900/30"
                  }`}
                >
                  {quizScore}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* MINIMAL FOOTER */}
      <footer className="py-8 border-t border-slate-100 dark:border-gray-800 text-center">
        <p className="text-xs text-slate-400 font-medium">
          © {new Date().getFullYear()} QuizBolt. Lost, but still learning. Built
          with ❤️ for Nigerian university students.
        </p>
      </footer>
    </div>
  );
};

export default NotFoundPage;
