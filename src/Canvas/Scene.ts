import { THREE } from "expo-three"
import Camera from "./Camera"

abstract class Scene extends THREE.Scene {
  abstract init(): void
  protected abstract createHelper(): void
  protected abstract createEnv(): void
  abstract genBasicObject(camera: Camera): void
}

export default Scene
