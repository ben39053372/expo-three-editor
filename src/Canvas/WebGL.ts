import { ExpoWebGLRenderingContext } from "expo-gl"
import EditorCamera from "./Editor/EditorCamera"
import EditorRenderer from "./Editor/EditorRenderer"
import EditorScene from "./Editor/EditorScene"

class WebGl {
  width = 0
  height = 0
  timeout = 0
  renderer: EditorRenderer
  camera: EditorCamera
  scene: EditorScene

  onWindowResize(width: number, height: number, scale: number) {
    this.camera.aspect = width / height
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(width * scale, height * scale, false)
  }

  _onGLContextCreate(gl: ExpoWebGLRenderingContext) {
    const scene = new EditorScene()
    this.scene = scene
    this.scene.init()
    const camera = new EditorCamera(
      gl.drawingBufferWidth,
      gl.drawingBufferHeight
    )
    this.camera = camera
    this.camera.init()
    const renderer = new EditorRenderer({
      gl,
      antialias: true
    })

    this.renderer = renderer

    this.start()
    // this.pause()
  }

  start() {
    const render = () => {
      console.log("render")

      this.timeout = requestAnimationFrame(render)
      this.renderer.render(this.scene, this.camera)
      this.renderer.__gl.endFrameEXP()
    }
    render()
  }

  pause() {
    cancelAnimationFrame(this.timeout)
  }
}

export default WebGl
