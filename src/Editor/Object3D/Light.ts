import ObjectBase from "./ObjectBase"
import { THREE } from "expo-three"

export default class Light extends ObjectBase {
  constructor() {
    super([new THREE.PointLight()])
  }

  setUserData() {
    console.log(this.userData)
  }

  update() {
    console.log("I am updating", this.name)
  }
}
