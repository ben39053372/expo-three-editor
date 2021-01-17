import { ExpoWebGLRenderingContext } from "expo-gl"
import Camera from "@Editor/Camera"
import Renderer from "@Editor/Renderer"
import Scene from "@Editor/Scene"
import EventManager from "../EventManager"

export default class WebGl {
  width = 0
  height = 0
  timeout = 0
  renderer!: Renderer
  camera!: Camera
  scene!: Scene

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
    const renderer = new Renderer({
      gl,
      antialias: true
    })
    this.renderer = renderer
  }

  private initCamera(gl: ExpoWebGLRenderingContext) {
    const camera = new Camera(gl.drawingBufferWidth, gl.drawingBufferHeight)
    this.camera = camera
    this.camera.init()
  }

  private initObject() {
    this.scene.genBasicObject(this.camera)
  }

  private initScene() {
    const scene = new Scene()
    this.scene = scene
    this.scene.createEnv()
    this.scene.createHelper()
  }
}
