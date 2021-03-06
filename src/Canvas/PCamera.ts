import { THREE } from "expo-three"
import Camera from "./Camera"

const minPolarAngle = 0
const maxPolarAngle = Math.PI
const PI_2 = Math.PI / 2

class PCamera extends THREE.PerspectiveCamera implements Camera {
  movementSpeed = 1
  rotateSpeed = 0.4
  useForPanObj = new THREE.Object3D()

  raycaster = new THREE.Raycaster()

  constructor(width: number, height: number) {
    super(45, width / height, 1, 1000)
  }

  init() {
    this.up.set(0, 1, 0)
    this.position.set(0, 80, -80)
    this.lookAt(0, 0, 0)
    this.attach(this.useForPanObj)
  }

  lookDown() {
    this.rotation.set(-(Math.PI / 2), 0, this.rotation.z)
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
    return result
  }

  getIntersectObjects(objects: THREE.Object3D[]) {
    const result = this.raycaster.intersectObjects(objects, true)
    const target = result.map((res) => res.object.parent)[0]
    console.log(target)
    target?.traverse((obj) => console.log(obj))

    return result
  }

  updateOnResize(width: number, height: number) {
    this.aspect = width / height
    this.updateProjectionMatrix()
  }
}

export default PCamera
