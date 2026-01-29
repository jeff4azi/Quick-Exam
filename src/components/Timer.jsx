import { useEffect, useState, useRef } from "react"
import clockIcon from "../images/clock.webp"

const Timer = ({ totalTime, onTimeUp, onTick }) => {
  const [timeLeft, setTimeLeft] = useState(totalTime)
  const intervalRef = useRef(null)

  useEffect(() => {
    // Clear any existing interval
    if (intervalRef.current) clearInterval(intervalRef.current)

    intervalRef.current = setInterval(() => {
      setTimeLeft(prev => {
        const newTime = prev - 1

        // Don't call onTick here inside setState callback
        return newTime
      })
    }, 1000)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [totalTime]) // Remove onTimeUp and onTick from dependencies

  // Separate useEffect to handle timeLeft changes
  useEffect(() => {
    if (timeLeft <= 0) {
      if (intervalRef.current) clearInterval(intervalRef.current)
      onTimeUp(0)
    } else {
      // Call onTick here, outside of setState callback
      onTick(timeLeft)
    }
  }, [timeLeft, onTimeUp, onTick])

  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0")
  const seconds = String(timeLeft % 60).padStart(2, "0")

  return (
    <div className="flex items-center justify-between gap-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 w-[100px] h-[35px] font-medium rounded-full px-3 shadow-sm">
      <img className="size-6 dark:filter dark:brightness-200" src={clockIcon} alt="clock" />
      <span>{minutes}:{seconds}</span>
    </div>
  )
}

export default Timer