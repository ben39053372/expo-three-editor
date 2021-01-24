import { useEffect } from "react"

const MS = 15

// eslint-disable-next-line no-undef
const intervals: { [key: string]: NodeJS.Timeout | null } = {}

const useKeyboard = () => {
  const keyDownEv = (e: KeyboardEvent) => {
    if (intervals[e.key]) return
    intervals[e.key] = setInterval(() => {
      /**
       * @TODO implement keydown
       */
    }, MS)
  }
  const keyUpEv = (e: KeyboardEvent) => {
    clearInterval(intervals[e.key]!)
    intervals[e.key] = null
  }

  useEffect(() => {
    console.log("useKeyBoard mount")
    window.addEventListener("keydown", keyDownEv)
    window.addEventListener("keyup", keyUpEv)

    return () => {
      console.log("useKeyBoard unmount")
      window.removeEventListener("keydown", keyDownEv)
      window.removeEventListener("keyup", keyUpEv)
    }
  }, [])
}

export default useKeyboard
