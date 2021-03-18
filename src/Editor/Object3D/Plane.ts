import { THREE } from "expo-three"
class Plane extends THREE.Mesh {
  constructor() {
    const geometry = new THREE.PlaneBufferGeometry(
      999999999999999,
      999999999999999
    )
    const material = new THREE.MeshPhongMaterial({
      // color: 0xff99ff,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 1
    })
    super(geometry, material)
    this.init()
  }

  private init() {
    this.name = "plane"
    this.rotateX(Math.PI / 2)
    this.receiveShadow = true
  }
}

export default Plane
