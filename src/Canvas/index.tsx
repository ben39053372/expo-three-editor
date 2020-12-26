import React, { useRef } from "react"
import { ExpoWebGLRenderingContext, GLView } from "expo-gl"
import WebGl from "./WebGL"
import { useWindowDimensions } from "react-native"
import GestureView from "../components/GestureView"
import EventManager from "../EventManager"

const Canvas = () => {
  const webGL = useRef(new WebGl()).current

  const { width, height, scale } = useWindowDimensions()

  setInterval(() => {
    EventManager.send({ type: "test", payload: {} })
  }, 5000)

  return (
    <GestureView webGL={webGL}>
      <GLView
        style={{ flex: 1 }}
        onLayout={() => {
          webGL.onWindowResize(width, height, scale)
        }}
        onContextCreate={(gl: ExpoWebGLRenderingContext) =>
          webGL.onGLContextCreate(gl)
        }
      />
    </GestureView>
  )
}

export default Canvas
