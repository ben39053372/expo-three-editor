import ObjectBase from "./ObjectBase"
import { THREE } from "expo-three"

export default class PointLight extends ObjectBase implements THREE.PointLight {
  // #region getter setter

  get light() {
    return this.children[0] as THREE.PointLight
  }

  get intensity() {
    return this.light.intensity
  }

  get distance() {
    return this.light.distance
  }

  get decay() {
    return this.light.decay
  }

  get shadow() {
    return this.light.shadow
  }

  get power() {
    return this.light.power
  }

  get color() {
    return this.light.color
  }

  get isLight() {
    return this.light.isLight
  }

  get shadowCameraFov() {
    return this.light.shadow.camera.fov
  }

  get shadowCameraLeft() {
    return this.light.shadowCameraLeft
  }

  get shadowCameraRight() {
    return this.light.shadowCameraRight
  }

  get shadowCameraTop() {
    return this.light.shadowCameraTop
  }

  get shadowCameraBottom() {
    return this.light.shadowCameraBottom
  }

  get shadowCameraNear() {
    return this.light.shadowCameraNear
  }

  get shadowCameraFar() {
    return this.light.shadowCameraFar
  }

  get shadowBias() {
    return this.light.shadowBias
  }

  get shadowMapWidth() {
    return this.light.shadowMapWidth
  }

  get shadowMapHeight() {
    return this.light.shadowMapHeight
  }

  // #endregion

  constructor() {
    super([new THREE.PointLight()])
    this.add(new THREE.PointLightHelper(this.light))
    this.position.set(10, 0, 10)
  }

  setUserData(): void {
    this.userData.myType = "PointLight"
  }

  update(): void {
    this.translateX(1)
    this.lookAt(0, 0, 0)
  }
}
