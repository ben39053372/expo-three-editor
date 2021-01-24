import { THREE } from "expo-three"

abstract class Objective extends THREE.Mesh {
  abstract setInfo(): void
}

export default Objective
