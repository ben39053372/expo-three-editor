import { THREE } from "expo-three"
import { Platform } from "react-native"
import { GridHelper, Object3D } from "three"
import Cursor from "./Object3D/Cursor"
import Plane from "./Object3D/Plane"

export default class Scene extends THREE.Scene {
  objects: Array<Object3D | undefined> = []
  plane: Plane | undefined

  createHelper() {
    this.add(new GridHelper(100, 100), new THREE.AxesHelper(10))
  }

  createEnv() {
    this.background = new THREE.Color(0x777777)
    this.fog = new THREE.FogExp2(0xffffff, 0.00015)

    const ambientLight = new THREE.AmbientLight(0xffffff)
    ambientLight.name = "ambientLight"
    this.add(ambientLight)

    const dl = new THREE.DirectionalLight(0xffffff)
    dl.position.set(100, 100, 100)
    dl.lookAt(this.position)
    this.add(dl)

    const dlHelper = new THREE.DirectionalLightHelper(dl)
    this.add(dlHelper)
  }

  genBasicObject(camera: THREE.Camera) {
    this.plane = new Plane()

    const cursor = new Cursor(camera, this.plane)

    this.objects.push(cursor, this.plane)
    if (Platform.OS === "web") this.add(cursor)
    this.add(this.plane)
  }
}
