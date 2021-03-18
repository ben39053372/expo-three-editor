import Camera from "./Camera"
import { THREE } from "expo-three"

class OCamera extends THREE.OrthographicCamera implements Camera {
  raycaster = new THREE.Raycaster()

  movementSpeed = 2
  rotateSpeed = 0.4
  useForPanObj = new THREE.Object3D()

  init() {
    this.position.set(0, 20, 0)
    this.lookAt(0, 0, 0)
    this.zoom = 0.5
  }

  getLookAtVector() {}

  move(axis2D: THREE.Vector2, speed = this.movementSpeed) {
    this.position.add(
      new THREE.Vector3(axis2D.x, 0, -axis2D.y).multiplyScalar(speed)
    )
  }

  rotateByAxis2D() {}

  panCamera() {}

  shootRaycaster(coords: { x: number; y: number }) {
    this.raycaster.setFromCamera(coords, this)
  }

  getIntersectObject(object: THREE.Object3D) {
    const result = this.raycaster.intersectObject(object)
    // console.log({ result })
    return result
  }

  getIntersectObjects(objects: THREE.Object3D[]) {
    const result = this.raycaster.intersectObjects(objects, true)
    console.log(result)
    return result
  }

  updateOnResize() {
    this.updateProjectionMatrix()
  }

  translateZ(dis: number) {
    console.log("zoom")
    this.zoom += -dis / 10
    this.updateProjectionMatrix()
    return this
  }
}

export default OCamera
