import { THREE } from "expo-three"
import Plane from "./Plane"

class Cursor extends THREE.Mesh {
  rayCaster: THREE.Raycaster
  camera: THREE.Camera
  plane: Plane
  constructor(camera: THREE.Camera, plane: Plane) {
    const geometry = new THREE.ConeGeometry(0.1, 0.5, 5)
    const material = new THREE.MeshBasicMaterial({
      color: 0xffff00,
      opacity: 0.3,
      transparent: true
    })
    super(geometry, material)
    this.rayCaster = new THREE.Raycaster()
    this.camera = camera
    this.plane = plane
  }

  init() {
    this.name = "cursor"
    this.rotateX(Math.PI)
  }

  onMouseMove(mouse: THREE.Vector2) {
    this.rayCaster.setFromCamera(mouse, this.camera)

    const intersects = this.rayCaster.intersectObject(this.plane)
    this.position.set(
      intersects[0]?.point.x || 0,
      0,
      intersects[0]?.point.z || 0
    )
  }
}

export default Cursor
