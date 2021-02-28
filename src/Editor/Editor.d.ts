// main Blueprint JSON
interface BlueprintJSON {
  IsMarinella: boolean
  JsonVersion: string
  floorplan: any[]
  Save_Furniture: BlueprintFurnitureJSON[]
  Save_CameraTrans: any[]
}

// Main Model JSON
interface ModelJSON {
  name: string
  files: {
    materialStyles: {
      name: string
      _id: string
      index: number
      materials: ModelMaterialJSON[]
    }[]
    fbx: MaterialJSONImagesFile
    prefab: MaterialJSONImagesFile
  }
  rootCategories: string[]
  categories: string[]
  colors: string[]
  keywords: string[]
  styles: string[]
  isSystem: boolean
  isPublice: boolean
  _id: string
  code: string
  organization: string
  createdBy: string
  sizes: ModelSizes[]
  preview3d: MaterialJSONImagesFile
  createdAt: string
  updatedAt: string
  __v: number
}

// Main Material JSON
interface MaterialJSON {
  name: string
  categories: string[]
  _id: string
  code: string
  organization: string
  createdBy: string
  preview2d: MaterialJSONImagesFile
  preview3d: MaterialJSONImagesFile
  assets: MaterialTypeJSON
  createdAt: string
  updatedAt: string
  __v: number
}

interface MaterialJSONImagesFile {
  file?: string
  raw?: string
  large?: string
  medium?: string
  small?: string
  url?: string
}

interface ModelMaterialJSON {
  colorable: boolean
  images: MaterialTypeJSON
  name: string
  _id: string
}

interface MaterialTypeJSON {
  albedo: MaterialJSONImagesFile
  normal: MaterialJSONImagesFile
  metallic: MaterialJSONImagesFile
  ambient: MaterialJSONImagesFile
  materialBall: MaterialJSONImagesFile
}

interface ModelSizes {
  name: string
  l: number
  w: number
  h: number
}

interface BlueprintFurnitureJSON {
  ID: number
  Name: string
  LayerName: string
  m_Tranform: {
    Position: Vector3D
    Angle: Vector3D
    Scale: Vector3D
  }
  m_ChildTranform: never[]
  m_MaterialSet: BlueprintFurnitureMaterialSetJSON[]
  m_ChildSet: any
  m_Lighting: {
    m_LightingType: number
    m_LightingColor: RGBA
    m_Intensity: number
    m_Range: number
    isLighting: boolean
  }
  m_ChildLighting: any[]
  Wrap_ChildmatSet: any[]
}

interface BlueprintFurnitureMaterialSetJSON {
  MaterialID: number
  MaterialColor: RGBA
  Smoothness: number
  Materillic: number
  Glossiness: number
  Normal: number
  Occlusion: number
  Tilling: Vector2D
  Rotate: number
}

interface RGBA {
  R: number
  G: number
  B: number
  A: number
}

interface Vector3D {
  X: number
  Y: number
  Z: number
}

interface Vector2D {
  X: number
  Y: number
}
