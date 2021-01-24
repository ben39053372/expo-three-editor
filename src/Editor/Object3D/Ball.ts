import Objective from "./@Objective"
import { THREE } from "expo-three"

export default class Ball extends Objective {
  constructor(
    size: number = 1.5,
    parameters: THREE.MeshBasicMaterialParameters = { color: 0x0099ff }
  ) {
    super(
      new THREE.SphereBufferGeometry(size, 32, 32),
      new THREE.MeshBasicMaterial(parameters)
    )
  }

  setInfo() {
    this.name = "Ball"
    this.userData.isObject = true
  }
}
