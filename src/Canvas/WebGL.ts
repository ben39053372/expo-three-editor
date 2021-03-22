import { ExpoWebGLRenderingContext } from "expo-gl"
import ExpoTHREE, { THREE } from "expo-three"
import Camera from "@Canvas/Camera"
import Renderer from "@Canvas/Renderer"
import Scene from "./Scene"
import CombinedCamera from "./CombineCamera"
import { Dimensions } from "react-native"
import { ObjectBase } from "@Editor/index"
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js"
import { OutlinePass } from "three/examples/jsm/postprocessing/OutlinePass.js"

import {
  createFXAAPass,
  createOutlinePass,
  createRenderPass,
  createSMAAPass,
  createSSAAPass
} from "./postProcessing"

export default class WebGl {
  width = 0
  height = 0
  timeout = 0
  boundary: number = 9999
  renderer!: Renderer
  scene!: Scene
  jsonData: BlueprintJSON | undefined
  combinedCamera!: CombinedCamera
  composer: EffectComposer | undefined
  private _camera!: Camera
  outlinePass: OutlinePass = null!
  isUsePostProcessing: boolean = true

  // #region getter setter

  get camera() {
    return this._camera
  }

  /**
   * reset pass when camera change
   */
  set camera(camera: Camera) {
    this._camera = camera
    this.resetPasses()
  }

  // #endregion

  public onGLContextCreate(gl: ExpoWebGLRenderingContext, customScene: Scene) {
    // THREE.Object3D.DefaultUp.set(0, 0, 1)
    this.width = Dimensions.get("window").width
    this.height = Dimensions.get("window").height
    this.initScene(customScene)
    this.initRenderer(gl)
    this.initCamera(gl)
    this.initComposer()
    this.initObject()
    this.start()
  }

  public onWindowResize(width: number, height: number, scale: number) {
    if (this.camera === undefined) return
    this.camera.updateOnResize(width, height)
    this.renderer.setSize(width * scale, height * scale, false)
    this.width = width
    this.height = height
  }

  public start() {
    const render = () => {
      this.timeout = requestAnimationFrame(render)
      this.update()
      this.isUsePostProcessing
        ? this.composer?.render()
        : this.renderer.render(this.scene, this.camera)

      this.renderer.__gl.endFrameEXP()
    }
    render()
  }

  public update() {
    this.scene.traverseVisible((obj) => (obj as ObjectBase)?.update?.())
    this.checkCameraBoundary()
  }

  public pause() {
    cancelAnimationFrame(this.timeout)
    this.timeout = -1
    console.log(this.timeout)
  }

  private checkCameraBoundary() {
    if (this.camera.position.x > this.boundary / 2)
      this.camera.position.x = (this.boundary / 2) * 0.95
    if (this.camera.position.x < -this.boundary / 2)
      this.camera.position.x = (-this.boundary / 2) * 0.95
    if (this.camera.position.y > this.boundary / 2)
      this.camera.position.y = (this.boundary / 2) * 0.95
    if (this.camera.position.y < -this.boundary / 2)
      this.camera.position.y = (-this.boundary / 2) * 0.95
  }

  private initRenderer(gl: ExpoWebGLRenderingContext) {
    const renderer = new Renderer({
      gl,
      antialias: false,
      stencil: false,
      powerPreference: "high-performance"
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

  resetPasses() {
    // render
    const renderPass = createRenderPass(this.scene, this.camera)
    // outline
    const outlinePass = createOutlinePass(
      this.width,
      this.height,
      this.scene,
      this.camera
    )
    this.outlinePass = outlinePass
    // FXAA
    const fxaaPass = createFXAAPass(this.renderer, this.width, this.height)
    // SSAA
    const ssaa = createSSAAPass(this.scene, this.camera)
    // SMAA
    const smaa = createSMAAPass(this.width, this.height)

    const passes = [renderPass, outlinePass, fxaaPass, smaa]

    passes.forEach((pass, i) => {
      this.composer?.removePass(this.composer.passes[i])
      this.composer?.insertPass(pass, i)
    })
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

  private initComposer() {
    this.composer = new EffectComposer(this.renderer)
    this.composer.renderer.shadowMap.enabled = true
    this.resetPasses()
  }
}
