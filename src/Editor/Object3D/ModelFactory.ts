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

      const groupOfMesh: THREE.Group = await ExpoTHREE.loadAsync(
        modelJSON.files.fbx.url
      )

      const model = new Model(groupOfMesh.children)
      model.userData = {
        ...model.userData,
        blueprintJSON: data,
        modelJSON,
        isObjectBase: true
      }

      const { Position, Angle, Scale } = data.m_Tranform

      // set Position
      model.position.set(-Position.X * 10, Position.Y * 10, Position.Z * 10)

      // set Rotation
      const AngleRadians = degree2Radians(Angle)
      model.setRotationFromEuler(
        new THREE.Euler(AngleRadians.X, -AngleRadians.Y, AngleRadians.Z)
      )

      // set Scale
      model.scale.set(Scale.X * 0.1, Scale.Y * 0.1, Scale.Z * 0.1)

      return model
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
