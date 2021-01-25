import { THREE } from "expo-three"
import Plane from "./Plane"

class Cursor extends THREE.Mesh {
  raycaster: THREE.Raycaster
  camera: THREE.Camera
  plane: Plane
  constructor(camera: THREE.Camera, plane: Plane) {
    const geometry = new THREE.ConeGeometry(0.2, 1, 10)
    const material = new THREE.MeshBasicMaterial({ color: 0xffff00 })
    super(geometry, material)
    this.raycaster = new THREE.Raycaster()
    this.camera = camera
    this.plane = plane
    this.init()
  }

  private init() {
    this.name = "cursor"
    this.rotateX(Math.PI)
  }

  onMouseMove(mouse: THREE.Vector2) {
    this.raycaster.setFromCamera(mouse, this.camera)

    const intersects = this.raycaster.intersectObject(this.plane)
    this.position.set(
      intersects[0]?.point.x || 0,
      0,
      intersects[0]?.point.z || 0
    )
  }
}

export default Cursor
