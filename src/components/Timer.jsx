import { useEffect, useRef } from "react"
import clockIcon from "../images/clock.webp"

const clampToInt = (value) => {
  if (!Number.isFinite(value)) return 0
  return Math.max(0, Math.floor(value))
}

const computeTimeLeftSeconds = (endsAtMs) => {
  if (!Number.isFinite(endsAtMs)) return null
  const msLeft = endsAtMs - Date.now()
  return clampToInt(Math.ceil(msLeft / 1000))
}

const Timer = ({ endsAtMs, timeLeft, onTimeUp, onTick }) => {
  const intervalRef = useRef(null)

  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    if (!Number.isFinite(endsAtMs)) return

    const tick = () => {
      const next = computeTimeLeftSeconds(endsAtMs)
      if (next === null) return

      if (onTick) onTick(next)

      if (next <= 0) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
        if (onTimeUp) onTimeUp()
      }
    }

    tick()
    intervalRef.current = setInterval(tick, 1000)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [endsAtMs, onTick, onTimeUp])

  const safeTimeLeft = clampToInt(timeLeft)
  const minutes = String(Math.floor(safeTimeLeft / 60)).padStart(2, "0")
  const seconds = String(safeTimeLeft % 60).padStart(2, "0")

  return (
    <div className="flex items-center justify-between gap-2 text-gray-900 dark:text-gray-100 font-medium">
      <img className="size-6 dark:filter dark:brightness-200" src={clockIcon} alt="clock" />
      <span>{minutes}:{seconds}</span>
    </div>
  )
}

export default Timer