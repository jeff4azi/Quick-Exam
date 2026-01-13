import { useEffect, useState } from "react"
import clockIcon from "../images/clock.webp"

const Timer = ({ totalTime, onTimeUp, onTick }) => {
  const [timeLeft, setTimeLeft] = useState(totalTime)

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 0) {
          clearInterval(interval)
          onTimeUp(0) // pass 0 if time runs out
          return 0
        }

        const newTime = prev - 1
        onTick(newTime) // notify parent of latest time
        return newTime
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [onTimeUp, onTick])

  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0")
  const seconds = String(timeLeft % 60).padStart(2, "0")

  return (
    <div className="flex items-center justify-between gap-2 bg-white w-[100px] h-[35px] font-medium rounded-full px-3 shadow-sm">
      <img className="size-6" src={clockIcon} alt="clock" />
      <span>{minutes}:{seconds}</span>
    </div>
  )
}

export default Timer