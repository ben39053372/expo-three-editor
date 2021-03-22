import { THREE, Renderer } from "expo-three"
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js"
import { SSAOPass } from "three/examples/jsm/postprocessing/SSAOPass.js"
import { OutlinePass } from "three/examples/jsm/postprocessing/OutlinePass.js"
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js"
import { FXAAShader } from "three/examples/jsm/shaders/FXAAShader.js"
import { SSAARenderPass } from "three/examples/jsm/postprocessing/SSAARenderPass.js"
import { SMAAPass } from "three/examples/jsm/postprocessing/SMAAPass"

export const createRenderPass = (scene: THREE.Scene, camera: THREE.Camera) => {
  return new RenderPass(scene, camera)
}

export const createSSAOPass = (scene: THREE.Scene, camera: THREE.Camera) => {
  const ssaoPass = new SSAOPass(scene, camera)
  ssaoPass.kernelRadius = 1
}

export const createOutlinePass = (
  width: number,
  height: number,
  scene: THREE.Scene,
  camera: THREE.Camera
) => {
  const outlinePass = new OutlinePass(
    new THREE.Vector2(width || 1920, height || 1080),
    scene,
    camera,
    []
  )
  outlinePass.visibleEdgeColor = new THREE.Color(0xffff00)
  outlinePass.hiddenEdgeColor = new THREE.Color(0xff0000)
  return outlinePass
}

export const createFXAAPass = (
  renderer: Renderer,
  width: number,
  height: number
) => {
  const fxaaPass = new ShaderPass(FXAAShader)
  const pixelRatio = renderer.getPixelRatio()
  fxaaPass.uniforms.resolution.value.set(
    1 / (width * pixelRatio),
    1 / (height * pixelRatio)
  )
  fxaaPass.material.uniforms.resolution.value.x = 1 / (width * pixelRatio)
  fxaaPass.material.uniforms.resolution.value.y = 1 / (height * pixelRatio)

  return fxaaPass
}

export const createSSAAPass = (scene: THREE.Scene, camera: THREE.Camera) => {
  const ssaaPass = new SSAARenderPass(scene, camera, 0xffffff, 0)
  ssaaPass.sampleLevel = 3
  return ssaaPass
}

export const createSMAAPass = (width: number, height: number) => {
  return new SMAAPass(width, height)
}
