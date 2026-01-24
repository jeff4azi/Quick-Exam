import { useLocation, useNavigate } from "react-router-dom"
import WhatsAppCard from "../components/WhatsAppCard"
import { useEffect } from "react"
import ReactGA from "react-ga4"
import WhatsappFollowButton from "../images/whatsapp-follow"

const ResultScreen = ({ questions, results, setAnswers, selectedCourse }) => {
  const navigate = useNavigate()
  const formatNum = (num) => String(num).padStart(2, '0');

  const { state } = useLocation()
  const timeTaken = state?.timeTaken ?? 0

  const minutes = String(Math.floor(timeTaken / 60)).padStart(2, "0")
  const seconds = String(timeTaken % 60).padStart(2, "0")

  useEffect(() => {
    ReactGA.event({
      category: "Exam",
      action: "View Results",
      label: selectedCourse.id,
    });
  }, [selectedCourse.id]);

  return (
    <div className='h-[100dvh] max-h-screen p-7 flex flex-col justify-between lg:max-w-2xl mx-auto dark:bg-gray-900 dark:text-gray-200'>
      {/* WhatsApp Follow */}
      <div className="absolute left-5 top-7">
        <WhatsappFollowButton />
      </div>

      {/* WhatsApp Card */}
      <div className="absolute z-100">
        <WhatsAppCard />
      </div>

      {/* Timer */}
      <div className="absolute right-5 top-6 bg-gray-50 dark:bg-gray-800 py-2 px-3 rounded-xl shadow-sm active:scale-95 hover:scale-105 duration-200 space-x-1">
        <span className="text-gray-700 dark:text-gray-300 text-sm">Duration:</span>
        <span className="font-medium text-[#2563EB] dark:text-[#22D3EE] text-lg">{minutes}:{seconds}</span>
      </div>

      {/* Score Circle */}
      <div className='pt-7 relative bg-white dark:bg-gray-800 flex flex-col justify-center items-center size-[220px] rounded-full place-self-center m-15 text-[#2563EB] dark:text-[#22D3EE] border-2 shadow-sm active:scale-95 hover:scale-105 durations-200'>
        <span className='text-6xl font-semibold -translate-y-2'>
          {Math.round((results.correct / questions.length) * 100)}
          <span className='text-3xl font-bold'>%</span>
        </span>
        <div className="text-xl font-medium text-gray-400 dark:text-gray-300">{selectedCourse.name}</div>
      </div>

      {/* Extra Result Details */}
      <div className='bg-white dark:bg-gray-800 w-full p-7 grid grid-cols-2 gap-5 rounded-2xl shadow-sm'>
        <div className='flex gap-2'>
          <div className='size-[7px] rounded-full bg-[#2563EB] translate-y-3'></div>
          <div className='flex flex-col text-sm'>
            <span className='text-lg font-medium text-[#2563EB] dark:text-[#22D3EE]'>{formatNum(results.answered)}</span>
            Answered Questions
          </div>
        </div>

        <div className='flex gap-2'>
          <div className='size-[7px] rounded-full bg-[#2563EB] translate-y-3'></div>
          <div className='flex flex-col text-sm'>
            <span className='text-lg font-medium text-[#2563EB] dark:text-[#22D3EE]'>{formatNum(questions.length)}</span>
            Total Questions
          </div>
        </div>

        <div className='flex gap-2'>
          <div className='size-[7px] rounded-full bg-green-500 translate-y-3'></div>
          <div className='flex flex-col text-sm'>
            <span className='text-lg font-medium text-green-500 dark:text-green-400'>{formatNum(results.correct)}</span>
            Correct
          </div>
        </div>

        <div className='flex gap-2'>
          <div className='size-[7px] rounded-full bg-red-500 translate-y-3'></div>
          <div className='flex flex-col text-sm'>
            <span className='text-lg font-medium text-red-500 dark:text-red-400'>{formatNum(results.wrong)}</span>
            Wrong
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className='flex justify-between px-7 py-5 text-gray-600 dark:text-gray-300'>
        <div className='text-xs flex flex-col items-center justify-center gap-2'>
          <div>
            <button className='p-2 bg-amber-400 dark:bg-amber-600 rounded-full text-white shadow-sm hover:scale-105 active:scale-95 duration-200' onClick={() => {
              navigate("/exam")
              setAnswers([])
              ReactGA.event({
                category: "Exam",
                action: "Retake Test",
                label: selectedCourse.id,
              });
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
              </svg>
            </button>
          </div>
          Retake Test
        </div>

        <div className='text-xs flex flex-col items-center justify-center gap-2'>
          <div>
            <button className='p-2 bg-red-400 dark:bg-red-600 rounded-full text-white shadow-sm active:scale-95 hover:scale-105 durations-200' onClick={() => {
              navigate("/review-answers")
              ReactGA.event({
                category: "Exam",
                action: "Review Answers",
                label: selectedCourse.id,
              });
            }} >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              </svg>
            </button>
          </div>
          Review Answers
        </div>

        <div className='text-xs flex flex-col items-center justify-center gap-2'>
          <div>
            <button className='p-2 bg-purple-400 dark:bg-purple-600 rounded-full text-white shadow-sm active:scale-95 hover:scale-105 durations-200' onClick={() => navigate("/")}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
              </svg>

            </button>
          </div>
          Go Home
        </div>
      </div>
    </div>
  )
}

export default ResultScreen