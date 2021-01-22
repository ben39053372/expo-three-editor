import WebGL from "@Canvas/WebGL"
import keyboardControl from "@Editor/keyboardControl"
import { useEffect } from "react"

const delayBetweenEvent = 15

// eslint-disable-next-line no-undef
const intervals: { [key: string]: NodeJS.Timeout | null } = {}

const useKeyboard = (webGL: WebGL) => {
  console.log("useKeyboard")
  const keyDownEv = (e: KeyboardEvent) => {
    if (intervals[e.key]) return
    intervals[e.key] = setInterval(
      () => keyboardControl(e, webGL),
      delayBetweenEvent
    )
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
      console.log("useKeyBoard unMount")
      window.removeEventListener("keydown", keyDownEv)
      window.removeEventListener("keyup", keyUpEv)
    }
  }, [])
}

export default useKeyboard
