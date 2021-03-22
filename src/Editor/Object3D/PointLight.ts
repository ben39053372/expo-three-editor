import ObjectBase from "./ObjectBase"
import { THREE } from "expo-three"

export default class PointLight extends ObjectBase implements THREE.PointLight {
  light: THREE.PointLight = null!
  helper: THREE.PointLightHelper = null!
  _add: boolean = true

  // #region getter setter
  get intensity() {
    return this.light.intensity
  }

  get distance() {
    return this.light.distance
  }

  get decay() {
    return this.light.decay
  }

  set decay(d) {
    this.light.decay = d
  }

  get shadow() {
    return this.light.shadow
  }

  get power() {
    return this.light.power
  }

  set power(p) {
    this.light.power = p
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
    super()
    this.light = new THREE.PointLight(new THREE.Color(0xf8ece0))
    this.helper = new THREE.PointLightHelper(this.light, 3, 0xffff00)
    this.add(this.light, this.helper)
    this.init()
  }

  // #region implement
  init() {
    this.light.position.set(10, 30, 10)
    this.light.power = 650
    this.light.decay = 1.4
    this.light.castShadow = true
    this.light.shadow.mapSize = new THREE.Vector2(500, 500)
    this.light.shadow.bias = 0.00003
    this.light.shadow.normalBias = 0.00001
  }

  setUserData(): void {
    this.name = "pointLight"
  }

  update(): void {
    // this.translateX(0.5)
    this.lookAt(0, 0, 0)
    if (this._add) {
      this.decay += 0.001
      if (this.decay > 1.4) this._add = false
    } else {
      this.decay -= 0.002
      if (this.decay < 1) this._add = true
    }
  }
  // #endregion
}
