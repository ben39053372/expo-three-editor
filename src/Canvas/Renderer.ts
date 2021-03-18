import { ExpoWebGLRenderingContext } from "expo-gl"
import { Renderer, THREE } from "expo-three"

declare type RendererProps = THREE.WebGLRendererParameters & {
  gl: ExpoWebGLRenderingContext
  canvas?: HTMLCanvasElement
  pixelRatio?: number
  clearColor?: THREE.Color | string | number
  width?: number
  height?: number
}

class EditorRenderer extends Renderer {
  __gl: ExpoWebGLRenderingContext
  constructor(props: RendererProps) {
    super(props)
    this.__gl = props.gl
    this.physicallyCorrectLights = true
    this.shadowMap.enabled = true
    this.shadowMap.type = THREE.PCFSoftShadowMap
  }
}

export default EditorRenderer
