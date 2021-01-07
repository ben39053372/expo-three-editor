import React, { useEffect, useRef } from "react"
import { ExpoWebGLRenderingContext, GLView } from "expo-gl"
import { useWindowDimensions } from "react-native"
import GestureView from "@Components/GestureView"
import EventManager from "@EventManager"
import WebGL from "./WebGL"

const webGLInstance = new WebGL()

const Canvas = () => {
  const { width, height, scale } = useWindowDimensions()
  const webGL = useRef<WebGL>(webGLInstance).current

  useEffect(() => {
    EventManager.emit("WINDOW_RESIZE", {
      height,
      width,
      scale
    })
  }, [width, height, scale])

  return (
    <GestureView webGL={webGL}>
      <GLView
        style={{ flex: 1 }}
        onContextCreate={(gl: ExpoWebGLRenderingContext) => {
          EventManager.emit("ON_CONTEXT_CREATE", {
            gl
          })
        }}
      />
    </GestureView>
  )
}

export default Canvas
