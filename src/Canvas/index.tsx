import React, { useRef } from "react"
import { ExpoWebGLRenderingContext, GLView } from "expo-gl"
import WebGl from "./WebGL"
import { useWindowDimensions } from "react-native"
const Canvas = () => {
  const webGL = useRef(new WebGl()).current

  const { width, height, scale } = useWindowDimensions()

  return (
    <GLView
      style={{ flex: 1 }}
      onLayout={() => webGL.onWindowResize(width, height, scale)}
      onContextCreate={(gl: ExpoWebGLRenderingContext) =>
        webGL._onGLContextCreate(gl)
      }
    />
  )
}

export default Canvas
