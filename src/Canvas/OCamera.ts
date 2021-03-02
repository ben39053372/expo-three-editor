import Camera from "./Camera"
import { THREE } from "expo-three"

class OCamera extends THREE.OrthographicCamera implements Camera {
  raycaster = new THREE.Raycaster()

  movementSpeed = 1
  rotateSpeed = 0.4
  useForPanObj = new THREE.Object3D()

  init() {
    this.up.set(0, 1, 0)
    this.position.set(0, 0, 0)
    this.lookAt(0, 0, 0)
  }

  getLookAtVector() {}

  move(axis2D: THREE.Vector2, speed = this.movementSpeed) {
    this.translateOnAxis(new THREE.Vector3(axis2D.x, 0, -axis2D.y), speed)
  }

  rotateByAxis2D() {}

  panCamera() {}

  shootRaycaster() {}

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
}

export default OCamera
