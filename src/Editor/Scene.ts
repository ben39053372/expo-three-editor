import EventManager from "@EventManager"
import { THREE } from "expo-three"
import { Platform } from "react-native"
import { GridHelper } from "three"
import Cursor from "./Object3D/Cursor"
import Plane from "./Object3D/Plane"

export default class Scene extends THREE.Scene {
  constructor() {
    super()
    EventManager.addListener("WINDOW_RESIZE", () => {
      console.log("resize")
    })
  }

  createHelper() {
    this.add(new GridHelper(100, 100), new THREE.AxesHelper(10))
  }

  createEnv() {
    this.background = new THREE.Color(0x777777)
    this.fog = new THREE.FogExp2(0xffffff, 0.00015)

<<<<<<< HEAD:src/Editor/EditorScene.ts
    this.add(new THREE.AxesHelper(10))

    if (Platform.OS === "web") {
      const cursor = new Cursor()
      cursor.init()
      this.add(cursor)
    }

    const plane = new Plane()
    plane.init()
    this.add(plane)

=======
>>>>>>> 3a9bba75a8bbda19d62721206ea8b08350780666:src/Editor/Scene.ts
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
