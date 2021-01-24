import { THREE } from "expo-three"

abstract class Objective extends THREE.Mesh {
  abstract init(): void
  abstract move(axis2D: THREE.Vector2, speed: number): void
}

export default Objective
