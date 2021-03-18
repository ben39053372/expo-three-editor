import { ExpoWebGLRenderingContext } from "expo-gl"
import ExpoTHREE, { THREE } from "expo-three"
import Camera from "@Canvas/Camera"
import Renderer from "@Canvas/Renderer"
import Scene from "./Scene"
import CombinedCamera from "./CombineCamera"
import { Dimensions } from "react-native"
import { ObjectBase } from "@Editor/index"
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js"
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js"
import { SSAOPass } from "three/examples/jsm/postprocessing/SSAOPass.js"
import { OutlinePass } from "three/examples/jsm/postprocessing/OutlinePass.js"
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js"
import { FXAAShader } from "three/examples/jsm/shaders/FXAAShader.js"
import { SSAARenderPass } from "three/examples/jsm/postprocessing/SSAARenderPass.js"
import { SMAAPass } from "three/examples/jsm/postprocessing/SMAAPass"

export default class WebGl {
  width = 0
  height = 0
  timeout = 0
  renderer!: Renderer
  private _camera!: Camera
  scene!: Scene
  jsonData: BlueprintJSON | undefined
  combinedCamera!: CombinedCamera
  composer: EffectComposer | undefined
  get outlinePass() {
    return this.composer?.passes.find((p) => p instanceof OutlinePass) as
      | OutlinePass
      | undefined
  }

  // #region getter setter
  get camera() {
    return this._camera
  }

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
    this.initPostProcessing()
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
      this.scene.traverseVisible((obj) => (obj as ObjectBase)?.update?.())
      // this.composer?.render()
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
    const renderPass = new RenderPass(this.scene, this.camera)

    // ssao
    const ssaoPass = new SSAOPass(this.scene, this.camera)
    ssaoPass.kernelRadius = 1

    // outline
    const outlinePass = new OutlinePass(
      new THREE.Vector2(this.width || 1920, this.height || 1080),
      this.scene,
      this.camera,
      []
    )

    // FXAA
    const fxaaPass = new ShaderPass(FXAAShader)
    const pixelRatio = this.renderer.getPixelRatio()
    fxaaPass.uniforms.resolution.value.set(
      1 / (this.width * pixelRatio),
      1 / (this.height * pixelRatio)
    )
    fxaaPass.material.uniforms.resolution.value.x =
      1 / (this.width * pixelRatio)
    fxaaPass.material.uniforms.resolution.value.y =
      1 / (this.height * pixelRatio)

    // msaa
    const ssaa = new SSAARenderPass(this.scene, this.camera, 0xffffff, 0)
    ssaa.sampleLevel = 4

    const smaa = new SMAAPass(this.width, this.height)

    const passes = [renderPass, ssaoPass, outlinePass, fxaaPass, smaa]

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

  private initPostProcessing() {
    this.composer = new EffectComposer(this.renderer)
    this.composer.renderer.shadowMap.enabled = true
    this.resetPasses()
  }
}
