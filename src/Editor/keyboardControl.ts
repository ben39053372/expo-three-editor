import WebGl from "@Canvas/WebGL"
import { THREE } from "expo-three"
import { Ball } from "./Object3D"

export default function keyboardControl(event: KeyboardEvent, webGL: WebGl) {
  /**
   * define Vector 2 direction
   *       +Y
   *        |
   * -X-----|-----+X
   *        |
   *       -Y
   * event key ref: https://keycode.info/
   */

  if (event.key === "w") webGL.camera.move(new THREE.Vector2(0, 1))
  if (event.key === "a") webGL.camera.move(new THREE.Vector2(-1, 0))
  if (event.key === "s") webGL.camera.move(new THREE.Vector2(0, -1))
  if (event.key === "d") webGL.camera.move(new THREE.Vector2(1, 0))
  if (event.key === "ArrowUp")
    webGL.camera.rotateByAxis2D(new THREE.Vector2(0, 0.1))
  if (event.key === "ArrowLeft")
    webGL.camera.rotateByAxis2D(new THREE.Vector2(0.1, 0))
  if (event.key === "ArrowRight")
    webGL.camera.rotateByAxis2D(new THREE.Vector2(-0.1, 0))
  if (event.key === "ArrowDown")
    webGL.camera.rotateByAxis2D(new THREE.Vector2(0, -0.1))
  if (event.key === " ") {
    console.log(webGL.scene.children)
    console.log(webGL.camera.updateLookAt(webGL))
    console.log(webGL.camera.cameraLookAt)
  }
}
