import { Plane } from "@Editor/index"
import { THREE } from "expo-three"
import Camera from "./Camera"

abstract class Scene extends THREE.Scene {
  objects: Array<THREE.Object3D | undefined> = []

  plane: Plane | undefined

  abstract init(json?: BlueprintJSON): void
  protected abstract createHelper(): void
  protected abstract createEnv(): void
  abstract genBasicObject(camera: Camera): void
}

export default Scene
