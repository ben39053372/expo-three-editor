import React, { useEffect, useRef } from "react"
import { ExpoWebGLRenderingContext, GLView } from "expo-gl"
import WebGl from "./WebGL"
import { useWindowDimensions } from "react-native"
import GestureView from "../components/GestureView"
import EditorUI from "../Editor/EditorUI"

const Canvas = () => {
  const webGL = useRef(new WebGl()).current

  const { width, height, scale } = useWindowDimensions()

  useEffect(() => {
    webGL.onWindowResize(width, height, scale)
  }, [useWindowDimensions()])

  return (
    <EditorUI>
      <GestureView webGL={webGL}>
        <GLView
          style={{ flex: 1 }}
          onContextCreate={(gl: ExpoWebGLRenderingContext) =>
            webGL.onGLContextCreate(gl)
          }
        />
      </GestureView>
    </EditorUI>
  )
}

export default Canvas
