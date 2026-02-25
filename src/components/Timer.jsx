import { useEffect, useState, useRef } from "react"
import clockIcon from "../images/clock.webp"

const Timer = ({ totalTime, onTimeUp, onTick, initialTime }) => {
  const [timeLeft, setTimeLeft] = useState(initialTime ?? totalTime)
  const intervalRef = useRef(null)

  useEffect(() => {
    setTimeLeft(initialTime ?? totalTime) // reset when starting value changes
  }, [totalTime, initialTime])

  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)

    intervalRef.current = setInterval(() => {
      setTimeLeft(prev => {
        const newTime = prev - 1

        if (onTick) onTick(newTime)

        if (newTime <= 0) {
          clearInterval(intervalRef.current)
          if (onTimeUp) onTimeUp(0)
          return 0
        }

        return newTime
      })
    }, 1000)

    return () => clearInterval(intervalRef.current)
  }, [onTimeUp, onTick])

  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0")
  const seconds = String(timeLeft % 60).padStart(2, "0")

  return (
    <div className="flex items-center justify-between gap-2 text-gray-900 dark:text-gray-100 font-medium">
      <img className="size-6 dark:filter dark:brightness-200" src={clockIcon} alt="clock" />
      <span>{minutes}:{seconds}</span>
    </div>
  )
}

export default Timer