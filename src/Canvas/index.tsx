import React, { useRef } from "react"
import { ExpoWebGLRenderingContext, GLView } from "expo-gl"
import GestureView from "@Canvas/components/GestureView"
import WebGL from "./WebGL"
import UIView from "@Canvas/components/UIView"
import useWindowResize from "./Hooks/useWindowResize"
import useKeyboard from "./Hooks/useKeyboard"

export const webGLInstance = new WebGL()

export interface webGLProp {
  webGL: WebGL
}

export interface CanvasProps {
  jsonData?: object | undefined
}

const Canvas = (props: CanvasProps) => {
  const webGL = useRef<WebGL>(webGLInstance).current
  webGL.jsonData = props.jsonData as BlueprintJSON

  useWindowResize(webGL)
  useKeyboard(webGL)

  return (
    <UIView webGL={webGL}>
      <GestureView webGL={webGL}>
        <GLView
          style={{ flex: 1 }}
          onContextCreate={(gl: ExpoWebGLRenderingContext) => {
            webGL.onGLContextCreate(gl)
          }}
        />
      </GestureView>
    </UIView>
  )
}

export default Canvas
