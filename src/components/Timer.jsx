import { useEffect, useState } from "react"
import clockIcon from "../images/clock.webp"
import { useNavigate } from "react-router-dom"

const Timer = ({ initialMinutes = 3, initialSeconds = 58, onSubmit }) => {
  const navigate = useNavigate()
  const [time, setTime] = useState(
    initialMinutes * 60 + initialSeconds
  )

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => {
        if (prev <= 1) {
          onSubmit()
          navigate("/results")
          clearInterval(interval)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [onSubmit, navigate])
  const minutes = String(Math.floor(time / 60)).padStart(2, "0")
  const seconds = String(time % 60).padStart(2, "0")

  return (
    <div className="flex items-center justify-between gap-2 bg-white w-[100px] h-[35px] font-medium rounded-full px-3 shadow-sm active:scale-95 hover:scale-105 duration-200 ">
      <img className="size-6" src={clockIcon} alt="clockIcon" />
      <span>{minutes}:{seconds}</span>
    </div>
  )
}

export default Timer