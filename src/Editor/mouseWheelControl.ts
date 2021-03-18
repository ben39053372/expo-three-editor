import WebGl from "@Canvas/WebGL"

export default function mouseWheelControl(event: WheelEvent, webGL: WebGl) {
  if (event.deltaY > 0) {
    webGL.camera.translateZ(1)
  } else {
    webGL.camera.translateZ(-1)
  }
}
