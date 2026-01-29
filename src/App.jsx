import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SpeedInsights } from "@vercel/speed-insights/react"
import RouteChangeTracker from "./components/RouteChangeTracker";
import { useState, useEffect } from "react";
import StartExam from "./pages/StartExam";
import ExamScreen from "./pages/ExamScreen";
import ResultScreen from "./pages/ResultScreen";
import AboutPage from "./pages/AboutPage";
import ChooseCourseScreen from "./pages/ChooseCourseScreen";
import HistoryScreen from "./pages/HistoryScreen.jsx"
import courses from "./courses.js"

import ReviewAnswers from "./pages/ReviewAnswers";
import BookMark from "./pages/BookMark";
import ReactGA from "react-ga4";
import ProtectedRoute from "./components/ProtectedRoutes";

import "katex/dist/katex.min.css";

import TestKaTeX from "./pages/test-katex.jsx";

function App() {
  function getRandom30(arr) {
    const copy = [...arr];

    for (let i = 0; i < 30; i++) {
      const j = i + Math.floor(Math.random() * (copy.length - i));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }

    return copy.slice(0, 30);
  }
  

  const [answers, setAnswers] = useState([])
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [questions, setQuestions] = useState([]);
  const [bookmarks, setBookmarks] = useState([])
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  });
  const [results, setResults] = useState({
    correct: 0,
    wrong: 0,
    answered: 0,
  })
  const [selectedQuestionCount, setSelectedQuestionCount] = useState(null);

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  useEffect(() => {
    ReactGA.initialize("G-93T0BGL64Y");
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [isDarkMode])

  useEffect(() => {
    if (selectedCourse && selectedQuestionCount) {
      let count =
        selectedQuestionCount === "All"
          ? selectedCourse.questions.length
          : selectedQuestionCount;

      // Shuffle & slice
      const shuffled = [...selectedCourse.questions].sort(() => 0.5 - Math.random());
      setQuestions(shuffled.slice(0, count));

      setAnswers([]);
    }
  }, [selectedCourse, selectedQuestionCount]);

  /* ---------------- LOAD BOOKMARKS ---------------- */
  useEffect(() => {
    const saved = localStorage.getItem("bookmarkedQuestions")
    if (saved) {
      setBookmarks(JSON.parse(saved))
    }
  }, [])

  const onSubmit = () => {
    let newCorrect = 0;
    let newWrong = 0;
    let newAnswered = 0;

    questions.forEach((question, index) => {
      const userAnswer = answers[index];

      if (userAnswer !== undefined) {
        newAnswered++;
        if (userAnswer === question.correct) {
          newCorrect++;
        } else {
          newWrong++;
        }
      }
    });

    setResults({
      correct: newCorrect,
      wrong: newWrong,
      answered: newAnswered,
    });
  };



  const props = {
    answers,
    setAnswers,
    questions,
    setQuestions,
    onSubmit,
    results,
    getRandom30,
    courses,
    selectedCourse,
    setSelectedCourse,
    bookmarks,
    setBookmarks,
    isDarkMode,
    toggleDarkMode,
    selectedQuestionCount,
    setSelectedQuestionCount,
  }

  return (
    <Router>
      <RouteChangeTracker />
      <Routes>
        <Route path="/" element={<StartExam {...props} />} />

        <Route
          path="/exam"
          element={
            <ProtectedRoute stateCheck={questions.length > 0 && selectedCourse}>
              <ExamScreen {...props} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/results"
          element={
            <ProtectedRoute stateCheck={results.answered > 0}>
              <ResultScreen {...props} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/review-answers"
          element={
            <ProtectedRoute stateCheck={answers.length > 0 && questions.length > 0}>
              <ReviewAnswers {...props} />
            </ProtectedRoute>
          }
        />

        <Route path="/bookmarks" element={<BookMark {...props} />} />
        <Route path="/about-page" element={<AboutPage {...props} />} />
        <Route path="/choose-course" element={<ChooseCourseScreen {...props} />} />
        <Route path="/history" element={<HistoryScreen {...props} />} />
        // In App.jsx, add a test route
        <Route path="/test-katex" element={<TestKaTeX />} />
      </Routes>
      <SpeedInsights />
    </Router>
  );
}

export default App;