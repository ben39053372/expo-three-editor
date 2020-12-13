import { THREE } from "expo-three"

class cursor extends THREE.Mesh {
  constructor() {
    const geometry = new THREE.ConeGeometry(0.2, 1, 3)
    const material = new THREE.MeshBasicMaterial({ color: 0xffff00 })
    // const cone = new THREE.Mesh(geometry, material)
    super(geometry, material)
  }

  init() {
    this.name = "cursor"
    this.rotateX(Math.PI)
  }
}

export default cursor
