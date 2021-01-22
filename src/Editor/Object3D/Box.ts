import { THREE } from "expo-three"
import Objective from "./@Objective"
class Box extends Objective {
  constructor(
    x: number,
    y: number,
    z: number,
    parameters?: THREE.MeshBasicMaterialParameters | undefined
  ) {
    super(
      new THREE.BoxBufferGeometry(x, y, z),
      new THREE.MeshBasicMaterial(parameters)
    )
  }

  init() {
    ;(this.material as THREE.MeshBasicMaterial).color.set(
      new THREE.Color(Math.random(), Math.random(), Math.random())
    )
    this.position.set(
      (Math.random() - 0.5) * 20,
      (Math.random() - 0.5) * 20,
      (Math.random() - 0.5) * 20
    )
  }

  move() {}
}

export default Box
