import ObjectBase from "./ObjectBase"
import { THREE } from "expo-three"

export default class Model extends ObjectBase {
  constructor(mesh: THREE.Object3D[], userData?: any) {
    super([...mesh])
    this.userData = {
      ...this.userData,
      ...userData
    }
  }

  setUserData() {
    this.userData.name = "Model"
  }

  // eslint-disable-next-line class-methods-use-this
  update() {}
}
