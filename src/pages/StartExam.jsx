import { useState } from "react"
import ChooseCourseOverlay from "../components/ChooseCourseOverlay"

const StartExam = () => {
  const [showChooseCourseOverlay, setShowChooseCourseOverlay] = useState(true)

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <div> 
        <h1 className="text-6xl text-center font-semibold tracking-tight mb-3">Quick Exam</h1>
        <p className="text-center text-gray-600 max-w-md">Practice past questions and get instant results</p>
      </div>

      <button
        onClick={() => setShowChooseCourseOverlay(true)} className="absolute bottom-10 bg-[#2563EB] py-5 px-7 rounded-full font-medium text-white text-2xl hover:scale-105 duration-200 ease-out active:scale-95 focus:outline-none focus:ring-4 focus:ring-blue-300 focus:scale-105">Start Exam</button>
      
      {showChooseCourseOverlay &&
        <ChooseCourseOverlay />
      }
    </div>
  )
}

export default StartExam