import React, { useRef } from "react"
import { ExpoWebGLRenderingContext, GLView } from "expo-gl"
import WebGl from "./WebGL"
import { useWindowDimensions } from "react-native"
import GestureView from "../components/GestureView"

const Canvas = () => {
  const webGL = useRef(new WebGl()).current

  const { width, height, scale } = useWindowDimensions()

  return (
    <GestureView webGL={webGL}>
      <GLView
        style={{ flex: 1 }}
        onLayout={() => webGL.onWindowResize(width, height, scale)}
        onContextCreate={(gl: ExpoWebGLRenderingContext) =>
          webGL.onGLContextCreate(gl)
        }
      />
    </GestureView>
  )
}

export default Canvas
