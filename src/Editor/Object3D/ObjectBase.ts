import { THREE } from "expo-three"

abstract class Objective extends THREE.Mesh {
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

export default Objective
