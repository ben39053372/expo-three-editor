import { THREE } from "expo-three"

class Plane extends THREE.Mesh {
  constructor() {
    const geometry = new THREE.PlaneBufferGeometry(100, 100)
    const material = new THREE.MeshBasicMaterial({
      // color: 0xff99ff,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0
    })
    super(geometry, material)
    this.init()
  }

  private init() {
    this.name = "plane"
    this.rotateX(Math.PI / 2)
  }
}

export default Plane
