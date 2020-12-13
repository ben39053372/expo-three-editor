import { THREE } from "expo-three"
import { GridHelper } from "three"

export default class Scene extends THREE.Scene {
  init() {
    this.add(new GridHelper(10, 10))
    this.background = new THREE.Color(0)
    this.fog = new THREE.FogExp2(0xffffff, 0.00015)
    this.add(new THREE.AxesHelper(10))
  }
}
