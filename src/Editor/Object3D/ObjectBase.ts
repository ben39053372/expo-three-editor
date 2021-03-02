import { THREE } from "expo-three"

abstract class ObjectBase extends THREE.Group {
  constructor(mesh?: THREE.Mesh[]) {
    super()
    this.name = "ObjectBase"
    if (mesh) this.add(...mesh)
    this.traverse((obj) => (obj.userData.isObject = true))
  }

  userData: {
    isObjectBase: boolean
    [key: string]: number | string | boolean
  } = {
    isObjectBase: true
  }

  abstract setUserData(): void

  add(...object: THREE.Mesh[]) {
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
