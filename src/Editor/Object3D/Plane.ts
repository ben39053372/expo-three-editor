import { THREE } from "expo-three"
class Plane extends THREE.Mesh {
  constructor() {
    const geometry = new THREE.PlaneBufferGeometry(9999, 9999)
    const material = new THREE.MeshPhongMaterial({
      color: "#fff"
    })
    super(geometry, material)
    this.init()
  }

  private init() {
    this.name = "plane"
    this.rotateX(-Math.PI / 2)
    this.position.y = -0.1
    this.receiveShadow = true
  }
}

export default Plane
