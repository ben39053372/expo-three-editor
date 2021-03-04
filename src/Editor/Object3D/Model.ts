import ObjectBase from "./ObjectBase"
import { THREE } from "expo-three"

export default class Model extends ObjectBase {
  constructor(mesh: THREE.Object3D[]) {
    super([...mesh])
  }

  setUserData() {
    this.userData.name = "Model"
  }

  update() {}
}
