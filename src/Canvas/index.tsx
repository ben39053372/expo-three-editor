import React, { useRef } from "react"
import WebGL from "./WebGL"
import UIView from "./components/UIView"
import useKeyboard from "./Hooks/useKeyboard"
import useWindowResize from "./Hooks/useWindowResize"
import { GestureView } from "./components"
import { ExpoWebGLRenderingContext, GLView } from "expo-gl"
import MyScene from "@Editor/MyScene"
import FPSStats from "react-fps-stats"
import { Platform } from "react-native"
import useMouseWheel from "./Hooks/useMouseWheel"

export const webGLInstance = new WebGL()

export * from "./components"

export interface webGLProp {
  webGL: WebGL
}

export interface CanvasProps {
  jsonData?: object | undefined
}

const Canvas = (props: CanvasProps) => {
  const webGL = useRef<WebGL>(webGLInstance).current
  webGL.jsonData = props.jsonData as BlueprintJSON

  const scene = new MyScene()

  useWindowResize(webGL)
  useKeyboard(webGL)
  useMouseWheel(webGL)

  return (
    <UIView webGL={webGL}>
      <GestureView webGL={webGL}>
        {Platform.OS === "web" && <FPSStats top={50} />}
        <GLView
          style={{ flex: 1 }}
          onContextCreate={(gl: ExpoWebGLRenderingContext) => {
            webGL.onGLContextCreate(gl, scene)
          }}
        />
      </GestureView>
    </UIView>
  )
}

export default Canvas
