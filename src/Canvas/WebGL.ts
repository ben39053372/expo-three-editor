import { ExpoWebGLRenderingContext } from "expo-gl"
import { THREE } from "expo-three"
import Camera from "@Canvas/Camera"
import Renderer from "@Canvas/Renderer"
import Scene from "./Scene"
import CombinedCamera from "./CombineCamera"
import { ObjectBase } from "@Editor/index"

export default class WebGl {
  width = 0
  height = 0
  timeout = 0
  renderer!: Renderer
  camera!: Camera
  scene!: Scene
  jsonData: BlueprintJSON | undefined
  combinedCamera!: CombinedCamera

  public onGLContextCreate(gl: ExpoWebGLRenderingContext, customScene: Scene) {
    // THREE.Object3D.DefaultUp.set(0, 0, 1)
    this.initScene(customScene)
    this.initCamera(gl)
    this.initRenderer(gl)
    this.initObject()
    this.start()
  }

  public onWindowResize(width: number, height: number, scale: number) {
    if (this.camera === undefined) return
    this.camera.updateOnResize(width, height)
    this.renderer.setSize(width * scale, height * scale, false)
  }

  public start() {
    const render = () => {
      this.timeout = requestAnimationFrame(render)
      this.scene.traverseVisible((obj) => (obj as ObjectBase)?.update?.())
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

  private initRenderer(gl: ExpoWebGLRenderingContext) {
    const renderer = new Renderer({
      gl,
      antialias: true
    })
    this.renderer = renderer
  }

  changeToOCamera() {
    this.combinedCamera.changeToOCamera()
    this.camera = this.combinedCamera.camera
    this.camera.init()
  }

  changeToPCamera() {
    this.combinedCamera.changeToPCamera()
    this.camera = this.combinedCamera.camera
  }

  private initCamera(gl: ExpoWebGLRenderingContext) {
    this.combinedCamera = new CombinedCamera(gl)
    this.camera = this.combinedCamera.camera
    this.camera.init()
  }

  private initObject() {
    this.scene.genBasicObject(this.camera)
  }

  private initScene(customScene: Scene) {
    // const scene = new Scene()
    this.scene = customScene
    this.scene.init(this.jsonData)
  }
}
