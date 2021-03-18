import { useEffect } from "react"
import WebGL from "@Canvas/WebGL"
import mouseWheelControl from "@Editor/mouseWheelControl"

const useMouseWheel = (webGL: WebGL) => {
  const onMouseWheel = (e: WheelEvent) => {
    console.log(e.deltaY)
    mouseWheelControl(e, webGL)
  }
  useEffect(() => {
    window.addEventListener("wheel", onMouseWheel)
  })
  return () => {
    window.removeEventListener("wheel", onMouseWheel)
  }
}

export default useMouseWheel
