import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StartExam from "./pages/StartExam";
import ExamScreen from "./pages/ExamScreen";
import ResultScreen from "./pages/ResultScreen";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StartExam />} />
        <Route path="/exam" element={<ExamScreen />} />
        <Route path="/results" element={<ResultScreen />} />
      </Routes>
    </Router>
  );
}

export default App;