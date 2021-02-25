/* eslint-disable class-methods-use-this */
import ExpoTHREE, { THREE } from "expo-three"
import ModelsJSON from "../../models.json"
import Model from "./Model"
import ObjectBase from "./ObjectBase"

const SIZE: "raw" | "large" | "medium" | "small" = "small"

const modelsData = ModelsJSON as ModelJSON[]

export default class ModelFactory {
  async create(data: BlueprintFurnitureJSON) {
    try {
      if (!data) {
        throw new Error("missing data")
      }
      const modelJSON = modelsData.find(
        (model) => model.code === data?.ID.toString()
      )
      if (!modelJSON)
        throw new Error(`model ${data.ID} not exist in model JSON`)

      const model: THREE.Group = await ExpoTHREE.loadAsync(
        modelJSON.files.fbx.url
      )
      model.userData = {
        blueprintJSON: data,
        modelJSON,
        isObject: true
      }
      console.log(model.userData)
      const material = new THREE.MeshStandardMaterial()
      console.log(modelJSON.files.materialStyles)
      const defaultStyle = modelJSON.files.materialStyles[0].materials[0]
      if (!defaultStyle) return
      // albedo map
      if (defaultStyle.images.albedo[SIZE] !== undefined)
        material.map = await ExpoTHREE.loadAsync(
          defaultStyle.images.albedo[SIZE]
        )
      // normal map
      if (defaultStyle.images.normal[SIZE])
        material.normalMap = await ExpoTHREE.loadAsync(
          defaultStyle.images.normal[SIZE]
        )
      // metallic map
      if (defaultStyle.images.metallic[SIZE])
        material.metalnessMap = await ExpoTHREE.loadAsync(
          defaultStyle.images.metallic[SIZE]
        )
      // ambient map
      if (defaultStyle.images.ambient[SIZE])
        material.aoMap = await ExpoTHREE.loadAsync(
          defaultStyle.images.ambient[SIZE]
        )
      let i = 0
      model.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          i++
          console.log(i, obj)
        }
      })
      // model.material = material

      const { Position, Angle, Scale } = data.m_Tranform
      // set Position
      // console.log(Position, Scale)
      model.position.set(-Position.X * 10, Position.Y * 10, Position.Z * 10)
      // set Rotation
      const AngleRadians = degree2Radians(Angle)
      console.log(Angle, AngleRadians)
      model.setRotationFromEuler(
        new THREE.Euler(AngleRadians.X, -AngleRadians.Y, AngleRadians.Z)
      )
      // set Scale
      model.scale.set(Scale.X * 0.1, Scale.Y * 0.1, Scale.Z * 0.1)
      // super.create()
      const helper = new THREE.BoxHelper(model, 0xffff00)
      const group = new Model()
      group.add(model)
      group.name = data.Name
      // group.up.set(0, 0, 1)

      return group
    } catch (error) {
      console.error(error)
    }
  }
}

function degree2Radians(degree: Vector3D) {
  const result: Vector3D = {
    X: degree.X > 1 ? (degree.X * Math.PI) / 180 : 0,
    Y: degree.Y > 1 ? (degree.Y * Math.PI) / 180 : 0,
    Z: degree.Z > 1 ? (degree.Z * Math.PI) / 180 : 0
  }
  return result
}
