import { THREE } from "expo-three"
import WebGl from "./WebGL"
interface Camera extends THREE.Camera {
  movementSpeed: number
  rotateSpeed: number
  useForPanObj: THREE.Object3D
  lookAtRaycaster: THREE.Raycaster
  cameraLookAt: THREE.Vector3
  raycaster: THREE.Raycaster
  init(): void
  move(axis2D: THREE.Vector2, speed?: number): void
  rotateByAxis2D(axis2D: THREE.Vector2): void
  panCamera(axis2D: THREE.Vector2, speed?: number): void
  shootRaycaster(coords: { x: number; y: number }): void
  getIntersectObject(object: THREE.Object3D): THREE.Intersection[]
  getIntersectObjects(objects: THREE.Object3D[]): THREE.Intersection[]
  updateOnResize(width: number, height: number): void
  updateLookAt(webGL: WebGl): void
}

export default Camera
