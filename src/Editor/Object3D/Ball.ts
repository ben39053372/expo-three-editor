import ObjectBase from "./ObjectBase"
import { THREE } from "expo-three"
import { Mesh } from "three"

export default class Ball extends ObjectBase {
  constructor(
    size: number = 1.5,
    parameters?: THREE.MeshPhysicalMaterialParameters
  ) {
    super([
      new Mesh(
        new THREE.SphereBufferGeometry(size, 32, 32),
        new THREE.MeshPhysicalMaterial(parameters || {})
      )
    ])
  }

  setUserData() {
    console.log(this.userData)
  }

  update() {
    console.log("I am updating", this.name)
  }
}
