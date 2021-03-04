import ObjectBase from "./ObjectBase"
import { THREE } from "expo-three"

export default class Ball extends ObjectBase {
  constructor(
    size: number = 1.5,
    parameters?: THREE.MeshPhysicalMaterialParameters
  ) {
    super([
      new THREE.Mesh(
        new THREE.SphereBufferGeometry(size, 32, 32),
        new THREE.MeshPhysicalMaterial(parameters || {})
      )
    ])
  }

  setUserData() {
    console.log(this.userData)
  }

  // eslint-disable-next-line class-methods-use-this
  update() {}
}
