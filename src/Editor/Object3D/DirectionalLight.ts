import ObjectBase from "./ObjectBase"
import { THREE } from "expo-three"
import { Vector2 } from "three"
class DirectionalLight extends ObjectBase implements THREE.DirectionalLight {
  light: THREE.DirectionalLight = null!
  helper: THREE.DirectionalLightHelper = null!
  shadowHelper: THREE.CameraHelper = null!
  shadowSize: number = 80
  get target(): THREE.Object3D {
    return this.light
  }

  // #region implement DirectionalLight getter setter

  get intensity(): number {
    return this.light.intensity
  }

  get shadow(): THREE.DirectionalLightShadow {
    return this.light.shadow
  }

  get isDirectionalLight(): true {
    return this.light.isDirectionalLight
  }

  get color(): THREE.Color {
    return this.light.color
  }

  get isLight(): true {
    return this.light.isLight
  }

  get shadowCameraFov(): any {
    return this.light.shadowCameraFov
  }

  get shadowCameraLeft(): any {
    return this.light.shadowCameraLeft
  }

  get shadowCameraRight(): any {
    return this.light.shadowCameraRight
  }

  get shadowCameraTop(): any {
    return this.light.shadowCameraTop
  }

  get shadowCameraBottom(): any {
    return this.light.shadowCameraBottom
  }

  get shadowCameraNear(): any {
    return this.light.shadowCameraNear
  }

  get shadowCameraFar(): any {
    return this.light.shadowCameraFar
  }

  get shadowBias(): any {
    return this.light.shadowBias
  }

  get shadowMapWidth(): any {
    return this.light.shadowMapWidth
  }

  get shadowMapHeight(): any {
    return this.light.shadowMapHeight
  }

  // #endregion

  constructor() {
    super()
    this.light = new THREE.DirectionalLight(0xffffaf, 1)
    this.helper = new THREE.DirectionalLightHelper(
      this.light,
      3,
      this.light.color
    )
    this.shadowHelper = new THREE.CameraHelper(this.light.shadow.camera)
    this.add(this.light, this.helper, this.shadowHelper)
    this.init()
  }

  // #region implement objectBase
  setUserData() {
    this.name = "DirectionalLight"
  }

  init() {
    this.light.position.set(100, 70, 100)
    this.light.castShadow = true
    this.shadow.mapSize = new Vector2(2000, 2000)
    this.shadow.camera.left = -this.shadowSize
    this.shadow.camera.top = this.shadowSize
    this.shadow.camera.right = this.shadowSize
    this.shadow.camera.bottom = -this.shadowSize
    this.shadow.bias = 0.00002
  }

  update() {
    this.position.x += 0.0001
  }
  // #endregion
}

export default DirectionalLight
