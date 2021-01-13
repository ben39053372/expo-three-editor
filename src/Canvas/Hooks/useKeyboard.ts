import eventManager from "@EventManager"
import EventType from "EventManager/types"
import { useEffect } from "react"

const MS = 15

// eslint-disable-next-line no-undef
const intervals: { [key: string]: NodeJS.Timeout | null } = {}

const useKeyboard = () => {
  console.log("useKeyboard")
  const keyDownEv = (e: KeyboardEvent) => {
    if (intervals[e.key]) return
    intervals[e.key] = setInterval(() => {
      eventManager.emit(`${e.key}_DOWN`.toUpperCase() as EventType, { e })
    }, MS)
  }
  const keyUpEv = (e: KeyboardEvent) => {
    clearInterval(intervals[e.key]!)
    intervals[e.key] = null
    // eventManager.emit(`${e.key}_UP`.toUpperCase() as EventType, { e })
  }

  useEffect(() => {
    window.addEventListener("keydown", keyDownEv)
    window.addEventListener("keyup", keyUpEv)

    return () => {
      window.removeEventListener("keydown", keyDownEv)
      window.removeEventListener("keyup", keyUpEv)
    }
  }, [])
}

export default useKeyboard
