import Camera from "@Canvas/Camera"
import PCamera from "@Canvas/PCamera"
import { THREE } from "expo-three"

const minPolarAngle = 0
const maxPolarAngle = Math.PI
const PI_2 = Math.PI / 2

class My3DCamera extends PCamera {
  movementSpeed = 1
  rotateSpeed = 0.4
  useForPanObj = new THREE.Object3D()

  raycaster = new THREE.Raycaster()

  init() {
    this.up.set(0, 1, 0)
    this.position.set(0, 80, -80)
    this.lookAt(0, 0, 0)
    this.attach(this.useForPanObj)
  }

  lookDown() {
    this.rotation.set(-(Math.PI / 2), 0, this.rotation.z)
  }

  setPosition(x: number, y: number, z: number) {
    this.position.set(x, y, z)
  }

  getLookAtVector() {
    console.log(this.quaternion)
    return new THREE.Vector3(0, 0, -1).applyQuaternion(this.quaternion)
  }

  move(axis2D: THREE.Vector2, speed = this.movementSpeed) {
    this.translateOnAxis(new THREE.Vector3(axis2D.x, 0, -axis2D.y), speed)
  }

  rotateByAxis2D(axis2D: THREE.Vector2) {
    const euler = new THREE.Euler(0, 0, 0, "YXZ")
    euler.setFromQuaternion(this.quaternion)

    euler.y += axis2D.x * this.rotateSpeed
    euler.x += axis2D.y * this.rotateSpeed

    euler.x = Math.max(
      PI_2 - maxPolarAngle,
      Math.min(PI_2 - minPolarAngle, euler.x)
    )
    this.quaternion.setFromEuler(euler)
  }

  panCamera(axis2D: THREE.Vector2, speed = this.movementSpeed) {
    this.useForPanObj.position.set(
      this.position.x,
      this.position.y,
      this.position.z
    )
    this.useForPanObj.setRotationFromEuler(
      new THREE.Euler(0, this.rotation.y, 0)
    )
    this.useForPanObj.translateOnAxis(
      new THREE.Vector3(axis2D.x, 0, -axis2D.y),
      speed
    )
    this.position.set(
      this.useForPanObj.position.x,
      this.position.y,
      this.useForPanObj.position.z
    )
    // this.translateOnAxis(axis3D, speed)
  }

  shootRaycaster(coords: { x: number; y: number }) {
    this.raycaster.setFromCamera(coords, this)
  }

  getIntersectObject(object: THREE.Object3D) {
    const result = this.raycaster.intersectObject(object)
    // console.log({ result })
    return result
  }

  getIntersectObjects(objects: THREE.Object3D[]) {
    const result = this.raycaster.intersectObjects(objects, true)
    console.log(result)
    return result
  }
}

export default My3DCamera
