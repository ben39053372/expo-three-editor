import { THREE } from "expo-three"

interface UserData {
  isObjectBase: boolean
  name: string
  [key: string]: any
}

abstract class ObjectBase extends THREE.Group {
  constructor(children?: THREE.Object3D[]) {
    super()
    this.name = "ObjectBase"
    if (children) this.add(...children)
    this.traverse((obj) => (obj.userData.isObject = true))
    // this.init()
    this.setUserData()
  }

  userData: UserData = {
    isObjectBase: true,
    name: "objectBase"
  }

  abstract setUserData(): void

  setVisible(visible: boolean) {
    console.log("use func to set visible")
    this.visible = visible
  }

  abstract init(): void

  abstract update(): void
}

export default ObjectBase
