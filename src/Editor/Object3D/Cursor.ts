import webGL from "@Canvas/WebGL"
import eventManager from "@EventManager"
import { THREE } from "expo-three"

class cursor extends THREE.Mesh {
  raycaster: THREE.Raycaster
  constructor() {
    const geometry = new THREE.ConeGeometry(0.2, 1, 3)
    const material = new THREE.MeshBasicMaterial({ color: 0xffff00 })
    super(geometry, material)
    this.raycaster = new THREE.Raycaster()
    eventManager.addListener("MOUSE_MOVE", (e) => {
      this.onMouseMove(e.payload?.mouse)
    })
  }

  init() {
    this.name = "cursor"
    this.rotateX(Math.PI)
  }

  onMouseMove(mouse: THREE.Vector2) {
    this.raycaster.setFromCamera(mouse, webGL.camera)

    const plane = webGL.scene?.getObjectByName("plane")

    if (plane && cursor) {
      const intersects = this.raycaster.intersectObject(plane)
      this.position.set(
        intersects[0]?.point.x || 0,
        1,
        intersects[0]?.point.z || 0
      )
    }
  }
}

export default cursor
