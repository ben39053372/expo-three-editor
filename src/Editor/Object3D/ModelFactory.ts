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
      ).catch((err) => {
        throw new Error(data.Name + err)
      })

      model.userData = {
        blueprintJSON: data,
        modelJSON,
        isObject: true,
        materialSets: data.m_MaterialSet
      }

      // model.material = material
      const materials = await extractMaterial(modelJSON)

      model.children.forEach((obj3d, index) => {
        if (obj3d instanceof THREE.Mesh) {
          const mesh: THREE.Mesh = obj3d
          if (mesh.children.length > 0) {
            // console.log({ mesh })
          } else {
            if (materials.length > 0) {
              if (mesh.name === "FM_406")
                console.log(mesh, materials, data.m_MaterialSet)
              if (mesh.material instanceof Array) {
                mesh.material = materials.map((material) => {
                  const mat = material.material
                  mat.name = material.name
                  const color = data.m_MaterialSet[index].MaterialColor
                  mat.color = new THREE.Color(
                    `rgb(${(color.R * 255).toFixed(0)},${(
                      color.G * 255
                    ).toFixed(0)},${(color.B * 255).toFixed(0)})`
                  )
                  console.log(mat.color)
                  return mat
                })
              } else {
                mesh.material = materials[index].material
              }
            }
          }
          ;(mesh.material as THREE.MeshStandardMaterial).needsUpdate = true
        }
      })

      const { Position, Angle, Scale } = data.m_Tranform
      // set Position
      // console.log(Position, Scale)
      model.position.set(-Position.X * 10, Position.Y * 10, Position.Z * 10)
      // set Rotation
      const AngleRadians = degree2Radians(Angle)
      model.setRotationFromEuler(
        new THREE.Euler(AngleRadians.X, AngleRadians.Y, AngleRadians.Z)
      )
      // set Scale
      model.scale.set(Scale.X * 0.1, Scale.Y * 0.1, -Scale.Z * 0.1)
      // super.create()
      const helper = new THREE.BoxHelper(model, 0xffff00)
      const group = new Model()
      group.add(model)
      group.name = data.Name

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

async function extractMaterial(modelJSON: ModelJSON) {
  const materials = modelJSON.files.materialStyles[0].materials
  const materialSet = await Promise.all(
    materials.map(async (data) => {
      const material = new THREE.MeshStandardMaterial({
        map: data.images.albedo[SIZE]
          ? await ExpoTHREE.loadAsync(data.images.albedo[SIZE])
          : null,
        normalMap: data.images.normal[SIZE]
          ? await ExpoTHREE.loadAsync(data.images.normal[SIZE])
          : null,
        metalnessMap: data.images.metallic[SIZE]
          ? await ExpoTHREE.loadAsync(data.images.metallic[SIZE])
          : null,
        aoMap: data.images.ambient[SIZE]
          ? await ExpoTHREE.loadAsync(data.images.ambient[SIZE])
          : null
      })
      return {
        id: data._id,
        name: data.name,
        material,
        data: materials
      }
    })
  )
  return materialSet
}

async function createMaterial(json: ModelJSON) {
  const material = new THREE.MeshStandardMaterial()
  console.log(json.files.materialStyles)
  const defaultStyle = json.files.materialStyles[0].materials[0]
  if (!defaultStyle) return
  // albedo map
  if (defaultStyle.images.albedo?.[SIZE] !== undefined)
    material.map = await ExpoTHREE.loadAsync(defaultStyle.images.albedo[SIZE])
  // normal map
  if (defaultStyle.images.normal?.[SIZE])
    material.normalMap = await ExpoTHREE.loadAsync(
      defaultStyle.images.normal?.[SIZE]
    )
  // metallic map
  if (defaultStyle.images.metallic?.[SIZE])
    material.metalnessMap = await ExpoTHREE.loadAsync(
      defaultStyle.images.metallic[SIZE]
    )
  // ambient map
  if (defaultStyle.images.ambient?.[SIZE])
    material.aoMap = await ExpoTHREE.loadAsync(
      defaultStyle.images.ambient?.[SIZE]
    )
}
