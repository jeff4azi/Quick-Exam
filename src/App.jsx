import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import StartExam from "./pages/StartExam";
import ExamScreen from "./pages/ExamScreen";
import ResultScreen from "./pages/ResultScreen";
import { useNavigate } from "react-router-dom"

import { edu101Questions } from "./edu-101questions"

function App() {
  function getRandom30(arr) {
    const copy = [...arr];

    for (let i = 0; i < 30; i++) {
      const j = i + Math.floor(Math.random() * (copy.length - i));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }

    return copy.slice(0, 30);
  }

  let correctCount = 0
  let wrongCount = 0
  let answeredCount = 0

  const [answers, setAnswers] = useState([])
  const [shuffled30edu101Questions, _] = useState(getRandom30(edu101Questions))
  const navigate = useNavigate()

  const onSubmit = () => {
    shuffled30edu101Questions.forEach((question, index) => {
      const userAnswer = answers[index]

      if (userAnswer !== undefined) {
        answeredCount++

        if (userAnswer === question.correct) {
          correctCount++
        } else {
          wrongCount++
        }
      }
    })
    navigate("/results")
  }
  

  const props = {
    answers,
    setAnswers,
    shuffled30edu101Questions,
    onSubmit,
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<StartExam />} />
        <Route path="/exam" element={<ExamScreen {...props} />} />
        <Route path="/results" element={<ResultScreen />} />
      </Routes>
    </Router>
  );
}

export default App;