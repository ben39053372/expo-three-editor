import ObjectBase from "./ObjectBase"
import { THREE } from "expo-three"

export default class PointLight extends ObjectBase implements THREE.PointLight {
  // #region getter setter

  get light() {
    return this.children[0] as THREE.PointLight
  }

  get helper() {
    return this.children[1] as THREE.PointLightHelper
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
    super([new THREE.PointLight(new THREE.Color(0xf8ece0))])
    this.attach(new THREE.PointLightHelper(this.light, 3, 0xffff00))
    this.position.set(10, 10, 10)
    this.light.power = 650
    this.light.decay = 1.4
    this.light.castShadow = true
    this.light.shadow.mapSize.width = 1500
    this.light.shadow.mapSize.height = 1500
    this.light.shadow.bias = 0.0009
  }

  setUserData(): void {
    this.userData.myType = "PointLight"
  }

  update(): void {
    // this.translateX(0.5)
    this.lookAt(0, 0, 0)
  }
}
