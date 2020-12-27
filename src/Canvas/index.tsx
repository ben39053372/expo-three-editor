import React, { useEffect } from "react"
import { ExpoWebGLRenderingContext, GLView } from "expo-gl"
import { useWindowDimensions } from "react-native"
import GestureView from "@Components/GestureView"
import EventManager from "@EventManager"
import webGl from "./WebGL"

const Canvas = () => {
  const { width, height, scale } = useWindowDimensions()
  // eslint-disable-next-line no-new

  useEffect(() => {
    EventManager.send({
      type: "WINDOW_RESIZE",
      payload: {
        height,
        width,
        scale
      }
    })
  }, [width, height, scale])

  return (
    <GestureView webGL={webGl}>
      <GLView
        style={{ flex: 1 }}
        onContextCreate={(gl: ExpoWebGLRenderingContext) => {
          EventManager.send({
            type: "ON_CONTEXT_CREATE",
            payload: {
              gl
            }
          })
        }}
      />
    </GestureView>
  )
}

export default Canvas
