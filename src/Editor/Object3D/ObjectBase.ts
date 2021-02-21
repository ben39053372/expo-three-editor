import { THREE } from "expo-three"

abstract class ObjectBase extends THREE.Group {
  constructor(mesh?: THREE.Mesh) {
    super()
    this.name = "ObjectBase"
    if (mesh) this.add(mesh)
    this.traverse((obj) => (obj.userData.isObject = true))
  }

  add(...object: THREE.Object3D[]) {
    object.forEach((obj, i) => {
      console.log(i, obj)
      obj.userData.isObject = true
    })
    return super.add(...object)
  }

  create() {
    console.info(`created: ${this.uuid}, ${this.name}`)
  }

  delete() {
    console.log(`delete: ${this.uuid}, ${this.name}`)
  }

  hidden() {
    console.log(`hidden: ${this.uuid}, ${this.name}`)
  }

  show() {
    console.log(`show: ${this.uuid}, ${this.name}`)
  }
}

export default ObjectBase
