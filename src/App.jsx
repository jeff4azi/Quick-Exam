import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SpeedInsights } from "@vercel/speed-insights/react"
import RouteChangeTracker from "./components/RouteChangeTracker";
import { useState, useEffect } from "react";
import StartExam from "./pages/StartExam";
import ExamScreen from "./pages/ExamScreen";
import ResultScreen from "./pages/ResultScreen";
import AboutPage from "./pages/AboutPage";
import ChooseCourseScreen from "./pages/ChooseCourseScreen";

import { edu101Questions } from "./edu-101questions"
import { gns113Questions } from "./gns-113questions";
import { gst111Questions } from "./gst-111questions";
import { csc111Questions } from "./csc-111questions";
import { vos116Questions } from "./vos-116questions";
import { vos117Questions } from "./vos-117questions";
import { edu101revisionQuestions } from "./edu101revisionQuestions"
import ReviewAnswers from "./pages/ReviewAnswers";
import BookMark from "./pages/BookMark";
import ReactGA from "react-ga4";

function App() {
  function getRandom30(arr) {
    const copy = [...arr];

    for (let i = 0; i < 30; i++) {
      const j = i + Math.floor(Math.random() * (copy.length - i));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }

    return copy.slice(0, 30);
  }
  const courses = [
    {
      id: "EDU101",
      name: "EDU 101",
      questions: [...edu101Questions, ...edu101revisionQuestions],
    },
    {
      id: "GST111",
      name: "GST 111",
      questions: gst111Questions,
    },
    {
      id: "GNS113",
      name: "GNS 113",
      questions: gns113Questions,
    },
    {
      id: "CSC111",
      name: "CSC 111",
      questions: csc111Questions,
    },
    {
      id: "VOS116",
      name: "VOS 116",
      questions: vos116Questions,
    },
    {
      id: "VOS117",
      name: "VOS 117",
      questions: vos117Questions,
    },
  ];

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
        <Route path="/exam" element={<ExamScreen {...props} />} />
        <Route path="/results" element={<ResultScreen {...props} />} />
        <Route path="/review-answers" element={<ReviewAnswers {...props} />} />
        <Route path="/bookmarks" element={<BookMark {...props} />} />
        <Route path="/about-page" element={<AboutPage {...props} />} />
        <Route path="/choose-course" element={<ChooseCourseScreen {...props} />} />
      </Routes>
      <SpeedInsights />
    </Router>
  );
}

export default App;