import { useState } from "react"
import ChooseCourseOverlay from "../components/ChooseCourseOverlay"
import logo from "../images/BackgroundEraser_20260110_163141515.webp"
import whatsappFollow from "../images/whatsapp-follow.webp"

const StartExam = ({ setQuestions, getRandom30, courses, selectedCourse, setSelectedCourse }) => {
  const [showChooseCourseOverlay, setShowChooseCourseOverlay] = useState(false)

  return (
    <div className="relative h-[100dvh] max-h-screen flex items-center justify-center">
      <div>
        <img src={logo} alt="QuizBolt Logo" className="size-[250px] place-self-center mb-10" />
        <h1 className="text-6xl text-center font-semibold tracking-tight mb-3">Quiz Bolt</h1>
        <p className="text-center text-gray-600 max-w-md">TASUED past questions made simple</p>
      </div>

      <div className="absolute left-2 -top-5">
        <a href="https://whatsapp.com/channel/0029Vb6t7rnKrWQx4oL6m31f" target="_blank" rel="noopener noreferrer">
          <img src={whatsappFollow} alt="Follow Channel" className="w-[100px] lg:w-[130px]" />
        </a>
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