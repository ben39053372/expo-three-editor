import React, { useRef } from "react"
import { ExpoWebGLRenderingContext, GLView } from "expo-gl"
import GestureView from "@Canvas/components/GestureView"
import EventManager from "@EventManager"
import WebGL from "./WebGL"
import UIView from "@Canvas/components/UIView"
import useWindowResize from "./Hooks/useWindowResize"
import useKeyboard from "./Hooks/useKeyboard"

export const webGLInstance = new WebGL()

const Canvas = () => {
  const webGL = useRef<WebGL>(webGLInstance).current

  useWindowResize()
  useKeyboard()

  return (
    <UIView webGL={webGL}>
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
    </UIView>
  )
}

export default Canvas
