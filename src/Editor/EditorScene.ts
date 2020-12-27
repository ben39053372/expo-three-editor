import EventManager from "@EventManager"
import { THREE } from "expo-three"
import { GridHelper } from "three"
import Cursor from "./Object3D/Cursor"
import Plane from "./Object3D/Plane"

export default class Scene extends THREE.Scene {
  init() {
    EventManager.addListener("WINDOW_RESIZE", () => {
      console.log("resize")
    })

    this.add(new GridHelper(100, 100))

    this.background = new THREE.Color(0x777777)

    this.fog = new THREE.FogExp2(0xffffff, 0.00015)

    this.add(new THREE.AxesHelper(10))

    const cursor = new Cursor()
    cursor.init()
    this.add(cursor)

    const plane = new Plane()
    plane.init()
    this.add(plane)

    const ambientLight = new THREE.AmbientLight(0x404040)
    ambientLight.name = "ambientLight"
    this.add(ambientLight)
  }
}
