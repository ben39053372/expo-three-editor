import EventManager from "@EventManager"
import { useEffect } from "react"
import { useWindowDimensions } from "react-native"

const useWindowResize = () => {
  const { height, width, scale } = useWindowDimensions()
  useEffect(() => {
    EventManager.emit("WINDOW_RESIZE", {
      height,
      width,
      scale
    })
  }, [height, width, scale])
}

export default useWindowResize
