import Objective from "./ObjectBase"
import { THREE } from "expo-three"

export default class Ball extends Objective {
  constructor(
    size: number = 1.5,
    parameters?: THREE.MeshPhysicalMaterialParameters
  ) {
    super(
      new THREE.SphereBufferGeometry(size, 32, 32),
      new THREE.MeshPhysicalMaterial(parameters || {})
    )
  }
}
