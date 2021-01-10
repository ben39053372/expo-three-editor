import { THREE } from "expo-three"
import EventManager from "@EventManager"
import Objective from "./Object3D/@Objective"
import { Vector2 } from "three"

const minPolarAngle = 0
const maxPolarAngle = Math.PI
const PI_2 = Math.PI / 2

class camera extends THREE.PerspectiveCamera implements Objective {
  moveSpeed = 1
  rotateSpeed = 0.02

  raycaster = new THREE.Raycaster()

  constructor(width: number, height: number) {
    super(45, width / height, 1, 1000)
    this.mountEvent()
  }

  mountEvent() {
    EventManager.on("W_DOWN", () => this.move(new Vector2(0, -1)))
    EventManager.on("A_DOWN", () => this.move(new Vector2(-1, 0)))
    EventManager.on("S_DOWN", () => this.move(new Vector2(0, 1)))
    EventManager.on("D_DOWN", () => this.move(new Vector2(1, 0)))
  }

  init() {
    this.position.set(0, 20, 20)
    this.lookAt(0, 0, 0)
    EventManager.addListener("TEST", (e) => {
      console.log("camera got the event", e)
    })
  }

  setPosition(x: number, y: number, z: number) {
    this.position.set(x, y, z)
  }

  getLookAtVector() {
    console.log(this.quaternion)
    return new THREE.Vector3(0, 0, -1).applyQuaternion(this.quaternion)
  }

  move(axis2D?: THREE.Vector2, speed = this.moveSpeed) {
    this.translateOnAxis(new THREE.Vector3(axis2D?.x, 0, axis2D?.y), speed)
  }

  rotateLookAt(axis2D: THREE.Vector2) {
    const euler = new THREE.Euler(0, 0, 0, "YXZ")
    euler.setFromQuaternion(this.quaternion)

    euler.y -= axis2D.x * this.rotateSpeed
    euler.x -= axis2D.y * this.rotateSpeed

    euler.x = Math.max(
      PI_2 - maxPolarAngle,
      Math.min(PI_2 - minPolarAngle, euler.x)
    )
    this.quaternion.setFromEuler(euler)
  }

  panCamera(axis2D: THREE.Vector2, speed = this.moveSpeed) {
    const height = this.position.y
    const axis3D = new THREE.Vector3(axis2D.x, -axis2D.y, axis2D.y)
    this.translateOnAxis(axis3D, speed)
    this.position.y = height
  }

  shootRaycaster(coords: { x: number; y: number }) {
    this.raycaster.setFromCamera(coords, this)
  }

  getIntersectObject(object: THREE.Object3D) {
    this.raycaster.intersectObject(object)
  }
}

export default camera
