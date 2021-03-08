import { THREE } from "expo-three"

abstract class ObjectBase extends THREE.Group {
  constructor(children?: THREE.Object3D[]) {
    super()
    this.name = "ObjectBase"
    if (children) this.add(...children)
    this.traverse((obj) => (obj.userData.isObject = true))
    this.setUserData()
  }

  userData: {
    isObjectBase: boolean
    myType?: string
    [key: string]: any
  } = {
    isObjectBase: true
  }

  abstract setUserData(): void

  setVisible(visible: boolean) {
    console.log("use func to set visible")
    this.visible = visible
  }

  abstract update(): void
}

export default ObjectBase
