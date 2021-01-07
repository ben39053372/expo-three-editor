import { ExpoWebGLRenderingContext } from "expo-gl"
import EditorCamera from "../Editor/EditorCamera"
import EditorRenderer from "../Editor/EditorRenderer"
import EditorScene from "../Editor/EditorScene"
import EventManager from "../EventManager"

export default class WebGl {
  width = 0
  height = 0
  timeout = 0
  renderer!: EditorRenderer
  camera!: EditorCamera
  scene!: EditorScene

  constructor() {
    this.mountEvent()
  }

  public onGLContextCreate(gl: ExpoWebGLRenderingContext) {
    this.initScene()
    this.initCamera(gl)
    this.initRenderer(gl)
    this.initObject()
    this.start()
  }

  public onWindowResize(width: number, height: number, scale: number) {
    if (this.camera === undefined) return
    this.camera.aspect = width / height
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(width * scale, height * scale, false)
  }

  public start() {
    const render = () => {
      this.timeout = requestAnimationFrame(render)
      this.renderer.render(this.scene, this.camera)
      this.renderer.__gl.endFrameEXP()
    }
    render()
  }

  public pause() {
    cancelAnimationFrame(this.timeout)
    this.timeout = -1
    console.log(this.timeout)
  }

  private mountEvent() {
    EventManager.on("ON_CONTEXT_CREATE", (payload) => {
      this.onGLContextCreate(payload?.gl)
    })
    EventManager.on("WINDOW_RESIZE", (payload) => {
      this.onWindowResize(payload?.width, payload?.height, payload?.scale)
    })
  }

  private initRenderer(gl: ExpoWebGLRenderingContext) {
    const renderer = new EditorRenderer({
      gl,
      antialias: true
    })
    this.renderer = renderer
  }

  private initCamera(gl: ExpoWebGLRenderingContext) {
    const camera = new EditorCamera(
      gl.drawingBufferWidth,
      gl.drawingBufferHeight
    )
    this.camera = camera
    this.camera.init()
  }

  private initObject() {
    this.scene.genBasicObject(this.camera)
  }

  private initScene() {
    const scene = new EditorScene()
    this.scene = scene
    this.scene.createEnv()
    this.scene.createHelper()
  }
}
