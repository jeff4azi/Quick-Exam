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

  const scorePercentage = Math.round((results.correct / questions.length) * 100);
  const strokeDasharray = 2 * Math.PI * 90; // Circumference for r=90
  const strokeDashoffset = strokeDasharray - (scorePercentage / 100) * strokeDasharray;

  useEffect(() => {
    ReactGA.event({
      category: "Exam",
      action: "View Results",
      label: selectedCourse.id,
    });
  }, [selectedCourse.id]);

  return (
    <div className='min-h-[100dvh] bg-gray-50 dark:bg-gray-950 p-6 lg:p-10 flex flex-col lg:max-w-2xl mx-auto transition-colors duration-300'>

      {/* Header Section */}
      <header className="flex justify-between items-center mb-8">
        <WhatsappFollowButton />
        <div className="flex items-center gap-2 bg-white dark:bg-gray-900 py-2 px-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
          <span className="text-gray-400 dark:text-gray-500 text-xs uppercase tracking-wider font-bold">Time</span>
          <span className="font-mono text-[#2563EB] dark:text-[#22D3EE] font-bold text-lg">{minutes}:{seconds}</span>
        </div>
      </header>

      {/* Main Score Visual */}
      <main className="flex-grow flex flex-col items-center justify-center space-y-8">
        <div
          onClick={() => navigate("/history")}
          className="relative flex items-center justify-center cursor-pointer group"
        >
          {/* Progress Ring */}
          <svg className="size-56 transform -rotate-90">
            <circle
              cx="112" cy="112" r="90"
              className="stroke-gray-200 dark:stroke-gray-800"
              strokeWidth="12" fill="transparent"
            />
            <circle
              cx="112" cy="112" r="90"
              stroke="currentColor"
              strokeWidth="12"
              fill="transparent"
              strokeDasharray={strokeDasharray}
              style={{ strokeDashoffset, transition: 'stroke-dashoffset 1s ease-out' }}
              className="text-[#2563EB] dark:text-[#22D3EE] stroke-round"
            />
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center text-center group-hover:scale-105 transition-transform duration-300">
            <span className="text-5xl font-black text-gray-800 dark:text-white">
              {scorePercentage}<span className="text-2xl">%</span>
            </span>
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-1 uppercase tracking-widest">Score</span>
          </div>
        </div>

        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">{selectedCourse.name}</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Assessment Completed Successfully</p>
        </div>

        {/* Detailed Stats Grid */}
        <div className='bg-white dark:bg-gray-900 w-full p-6 grid grid-cols-2 gap-4 rounded-3xl shadow-xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-gray-800'>
          <StatItem label="Answered" value={formatNum(results.answered)} color="bg-blue-500" textColor="text-[#2563EB] dark:text-blue-400" />
          <StatItem label="Total" value={formatNum(questions.length)} color="bg-gray-400" textColor="text-gray-600 dark:text-gray-300" />
          <StatItem label="Correct" value={formatNum(results.correct)} color="bg-green-500" textColor="text-green-600 dark:text-green-400" />
          <StatItem label="Wrong" value={formatNum(results.wrong)} color="bg-red-500" textColor="text-red-600 dark:text-red-400" />
        </div>
      </main>

      {/* Footer Actions */}
      <footer className="mt-10 flex justify-around items-center bg-white dark:bg-gray-900 p-4 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm">
        <ActionButton
          label="Retake"
          color="bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400"
          onClick={() => {
            setAnswers([]);
            navigate("/exam");
          }}
          icon={<path d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />}
        />
        <ActionButton
          label="Review"
          color="bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
          onClick={() => navigate("/review-answers")}
          /* Wrap multiple paths in a fragment <> */
          icon={(
            <>
              <path d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
              <path d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            </>
          )}
        />

        <ActionButton
          label="Home"
          color="bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400"
          onClick={() => navigate("/")}
          icon={<path d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />}
        />
      </footer>

      {/* WhatsApp Card Overlay */}
      <div className="fixed bottom-24 right-6 pointer-events-auto">
        <WhatsAppCard />
      </div>
    </div>
  )
}

// Sub-components for cleaner code
const StatItem = ({ label, value, color, textColor }) => (
  <div className='flex items-center gap-3 p-2'>
    <div className={`size-2 rounded-full ${color}`}></div>
    <div className='flex flex-col'>
      <span className={`text-xl font-bold leading-none ${textColor}`}>{value}</span>
      <span className='text-[10px] uppercase tracking-wider text-gray-400 font-semibold mt-1'>{label}</span>
    </div>
  </div>
)

const ActionButton = ({ label, icon, onClick, color }) => (
  <button onClick={onClick} className="flex flex-col items-center gap-2 group">
    <div className={`p-3 rounded-2xl transition-all duration-200 group-hover:scale-110 group-active:scale-95 ${color}`}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="size-6">
        {icon}
      </svg>
    </div>
    <span className="text-[10px] font-bold uppercase tracking-tighter text-gray-500 dark:text-gray-400">{label}</span>
  </button>
)

export default ResultScreen
