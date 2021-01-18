import { THREE } from "expo-three"
import { GridHelper } from "three"
import Cursor from "./Object3D/Cursor"
import Plane from "./Object3D/Plane"

export default class Scene extends THREE.Scene {
  createHelper() {
    this.add(new GridHelper(100, 100), new THREE.AxesHelper(10))
  }

  createEnv() {
    this.background = new THREE.Color(0x777777)
    this.fog = new THREE.FogExp2(0xffffff, 0.00015)

    const ambientLight = new THREE.AmbientLight(0x404040)
    ambientLight.name = "ambientLight"
    this.add(ambientLight)
  }

  genBasicObject(camera: THREE.Camera) {
    const plane = new Plane()

    const cursor = new Cursor(camera, plane)

    this.add(cursor, plane)
  }
}
