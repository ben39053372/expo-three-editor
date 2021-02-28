import WebGl from "@Canvas/WebGL"
import { Vector2 } from "three"

export default function keyboardControl(event: KeyboardEvent, webGL: WebGl) {
  /**
   * define Vector 2 direction
   *       +Y
   *        |
   * -X-----|-----+X
   *        |
   *       -Y
   */

  if (event.key === "w") webGL.camera.move(new Vector2(0, 1))
  if (event.key === "a") webGL.camera.move(new Vector2(-1, 0))
  if (event.key === "s") webGL.camera.move(new Vector2(0, -1))
  if (event.key === "d") webGL.camera.move(new Vector2(1, 0))
  if (event.key === "ArrowUp") webGL.camera.rotateByAxis2D(new Vector2(0, 0.1))
  if (event.key === "ArrowLeft")
    webGL.camera.rotateByAxis2D(new Vector2(0.1, 0))
  if (event.key === "ArrowRight")
    webGL.camera.rotateByAxis2D(new Vector2(-0.1, 0))
  if (event.key === "ArrowDown")
    webGL.camera.rotateByAxis2D(new Vector2(0, -0.1))
  if (event.key === " ") webGL.camera.position.y += 1
  if (event.key === "v") webGL.camera.position.y -= 1
}
