import ObjectBase from "./ObjectBase"
import { THREE } from "expo-three"
import { ConvexGeometry } from "three/examples/jsm/geometries/ConvexGeometry.js"

export default class Wall extends ObjectBase {
  constructor(parameters?: THREE.MeshPhysicalMaterialParameters) {
    super(
      new THREE.Mesh(
        new ConvexGeometry([
          new THREE.Vector3(0, 0, 0),
          new THREE.Vector3(5, 0, 0),
          new THREE.Vector3(7, 0, 5),
          new THREE.Vector3(2, 0, 5),
          new THREE.Vector3(0, 5, 0),
          new THREE.Vector3(5, 5, 0),
          new THREE.Vector3(7, 5, 5),
          new THREE.Vector3(2, 5, 5)
        ]),
        new THREE.MeshPhysicalMaterial(parameters || {})
      )
    )
    const hole = new THREE.Mesh(new THREE.BoxBufferGeometry(1, 1, 1))
  }
}
