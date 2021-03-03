import { THREE } from "expo-three"

abstract class ObjectBase extends THREE.Group {
  constructor(mesh?: THREE.Object3D[]) {
    super()
    this.name = "ObjectBase"
    if (mesh) this.add(...mesh)
    this.traverse((obj) => (obj.userData.isObject = true))
    this.setUserData()
  }

  userData: {
    isObjectBase: boolean
    [key: string]: any
  } = {
    isObjectBase: true
  }

  abstract setUserData(): void

  add(...object: THREE.Object3D[]) {
    console.log("super", this.visible, super.visible)
    object.forEach((obj, i) => {
      console.log(i, obj)
      obj.userData.isObject = true
    })
    return super.add(...object)
  }

  setVisible(visible: boolean) {
    console.log("use func to set visible")
    this.visible = visible
  }

  abstract update(): void

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
