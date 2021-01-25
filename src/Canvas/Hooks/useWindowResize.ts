import WebGL from "@Canvas/WebGL"
import { useEffect } from "react"
import { useWindowDimensions } from "react-native"

const useWindowResize = (webGl: WebGL) => {
  const { height, width, scale } = useWindowDimensions()
  useEffect(() => {
    webGl.onWindowResize(width, height, scale)
  }, [height, width, scale])
}

export default useWindowResize
