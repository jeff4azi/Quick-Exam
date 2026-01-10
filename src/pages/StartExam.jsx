import { useState } from "react"
import ChooseCourseOverlay from "../components/ChooseCourseOverlay"

const StartExam = ({ setQuestions, getRandom30, courses, selectedCourse, setSelectedCourse }) => {
  const [showChooseCourseOverlay, setShowChooseCourseOverlay] = useState(false)
  
  return (
    <div className="relative h-[100dvh] max-h-screen flex items-center justify-center">
      <div> 
        <h1 className="text-6xl text-center font-semibold tracking-tight mb-3">Quick Exam</h1>
        <p className="text-center text-gray-600 max-w-md">Practice past questions and get instant results</p>
      </div>

      <button
        onClick={() => setShowChooseCourseOverlay(true)} className="absolute bottom-10 bg-[#2563EB] py-5 px-7 rounded-full font-medium text-white text-2xl hover:scale-105 duration-200 ease-out active:scale-95 focus:outline-none focus:ring-4 focus:ring-blue-300 focus:scale-105">Start Exam</button>
      
      {showChooseCourseOverlay &&
        <ChooseCourseOverlay setShowChooseCourseOverlay={setShowChooseCourseOverlay} setQuestions={setQuestions} getRandom30={getRandom30} courses={courses} selectedCourse={selectedCourse} setSelectedCourse={setSelectedCourse} />
      }
    </div>
  )
}

export default StartExam