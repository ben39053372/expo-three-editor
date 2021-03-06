import { THREE } from "expo-three"
import { Platform } from "react-native"
import Cursor from "./Object3D/Cursor"
import ModelFactory from "./Object3D/ModelFactory"
import Plane from "./Object3D/Plane"
import Scene from "../Canvas/Scene"
import { PointLight } from "./Object3D"

export default class MyScene extends Scene {
  init(json?: BlueprintJSON) {
    this.createHelper?.()
    this.createEnv?.()
    this.applyJSONData(json)
  }

  protected createHelper() {
    this.add(new THREE.GridHelper(100, 100), new THREE.AxesHelper(10))
  }

  protected createEnv() {
    this.background = new THREE.Color(0x777777)
    this.fog = new THREE.FogExp2(0xffffff, 0.00015)

    const ambientLight = new THREE.AmbientLight(0x404040)
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
    const furnitures = allFurniture.map(async (furniture) => {
      const loadedModel = await modelFactory.create(furniture)
      if (loadedModel) this.add(loadedModel)
      return loadedModel
    })
    // furnitures.forEach((f) => f.create())
    console.log("All model: ", furnitures)
  }
}
