import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import StartExam from "./pages/StartExam";
import ExamScreen from "./pages/ExamScreen";
import ResultScreen from "./pages/ResultScreen";

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

  const [answers, setAnswers] = useState([])
  const [shuffled30edu101Questions, _] = useState(getRandom30(edu101Questions))
  const [results, setResults] = useState({
    correct: 0,
    wrong: 0,
    answered: 0,
  })

const onSubmit = () => {
  let newCorrect = 0;
  let newWrong = 0;
  let newAnswered = 0;

  shuffled30edu101Questions.forEach((question, index) => {
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
    shuffled30edu101Questions,
    onSubmit,
    results
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<StartExam />} />
        <Route path="/exam" element={<ExamScreen {...props} />} />
        <Route path="/results" element={<ResultScreen {...props} />} />
      </Routes>
    </Router>
  );
}

export default App;