import { THREE } from "expo-three"

abstract class Camera extends THREE.Camera {
  abstract movementSpeed: number
  abstract rotateSpeed: number
  abstract useForPanObj: THREE.Object3D

  abstract raycaster: THREE.Raycaster

  abstract init(): void

  abstract move(axis2D: THREE.Vector2, speed?: number): void

  abstract rotateByAxis2D(axis2D: THREE.Vector2): void

  abstract panCamera(axis2D: THREE.Vector2, speed?: number): void

  abstract shootRaycaster(coords: { x: number; y: number }): void

  abstract getIntersectObject(object: THREE.Object3D): THREE.Intersection[]

  abstract getIntersectObjects(objects: THREE.Object3D[]): THREE.Intersection[]

  abstract updateOnResize(width: number, height: number): void
}

export default Camera
