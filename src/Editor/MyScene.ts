import { THREE } from "expo-three"
import { Platform } from "react-native"
import Cursor from "./Object3D/Cursor"
import ModelFactory from "./Object3D/ModelFactory"
import Plane from "./Object3D/Plane"
import Scene from "../Canvas/Scene"
import { PointLight } from "./Object3D"
import DirectionalLight from "./Object3D/DirectionalLight"

export default class MyScene extends Scene {
  init(json?: BlueprintJSON) {
    // this.createHelper?.()
    this.createEnv?.()
    this.applyJSONData(json)
  }

  protected createHelper() {
    this.add(new THREE.GridHelper(100, 100), new THREE.AxesHelper(10))
  }

  protected createEnv() {
    this.background = new THREE.Color(0xffffaf)
    // this.fog = new THREE.FogExp2(0xffff77, 0.005)

    const ambientLight = new THREE.AmbientLight(0xffffff)
    ambientLight.name = "ambientLight"
    this.add(ambientLight)

    this.add(new DirectionalLight())
  }

  genBasicObject(camera: THREE.Camera) {
    this.plane = new Plane()

    const cursor = new Cursor(camera, this.plane)

    const pLight = new PointLight()

    this.objects.push(cursor, this.plane)
    if (Platform.OS === "web") this.add(cursor)
    this.add(this.plane, pLight)
  }

  async applyJSONData(json?: BlueprintJSON) {
    if (!json) return
    console.log(this)
    console.log(json)
    const allFurniture = json.Save_Furniture.filter(
      (f) => !["9000", "9002", "9003"].includes(f.ID.toString())
    )
    const modelFactory = new ModelFactory()
    allFurniture.forEach(async (furniture) => {
      const loadedModel = await modelFactory.create(furniture)
      if (loadedModel) this.add(loadedModel)
    })
  }
}
