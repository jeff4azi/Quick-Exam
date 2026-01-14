import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SpeedInsights } from "@vercel/speed-insights/react"
import { Analytics } from "@vercel/analytics/react";
import { useState, useEffect } from "react";
import StartExam from "./pages/StartExam";
import ExamScreen from "./pages/ExamScreen";
import ResultScreen from "./pages/ResultScreen";

import { edu101Questions } from "./edu-101questions"
import { gns113Questions } from "./gns-113questions";
import { gst111Questions } from "./gst-111questions"
import ReviewAnswers from "./pages/ReviewAnswers";
import BookMark from "./pages/BookMark";

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
      questions: edu101Questions,
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
  ];

  const [answers, setAnswers] = useState([])
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [questions, setQuestions] = useState([]);
  const [bookmarks, setBookmarks] = useState([])
  const [results, setResults] = useState({
    correct: 0,
    wrong: 0,
    answered: 0,
  })
  
  useEffect(() => {
    if (selectedCourse) {
      setQuestions(getRandom30(selectedCourse.questions));
      setAnswers([]);
    }
  }, [selectedCourse]);

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
    edu101Questions,
    gst111Questions,
    gns113Questions,
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<StartExam {...props} />} />
        <Route path="/exam" element={<ExamScreen {...props} />} />
        <Route path="/results" element={<ResultScreen {...props} />} />
        <Route path="/review-answers" element={<ReviewAnswers {...props} />} />
        <Route path="/bookmarks" element={<BookMark {...props} />} />
      </Routes>
      <SpeedInsights />
      <Analytics />
    </Router>
  );
}

export default App;