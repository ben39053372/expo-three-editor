import { ExpoWebGLRenderingContext } from "expo-gl"
import OCamera from "./OCamera"
import PCamera from "./PCamera"

class CombinedCamera {
  camera: PCamera | OCamera
  PCamera: PCamera
  OCamera: OCamera

  constructor(gl: ExpoWebGLRenderingContext) {
    this.PCamera = new PCamera(gl.drawingBufferWidth, gl.drawingBufferHeight)
    this.OCamera = new OCamera(
      gl.drawingBufferWidth / -10,
      gl.drawingBufferWidth / 10,
      gl.drawingBufferHeight / 10,
      gl.drawingBufferHeight / -10,
      0.1,
      1000
    )
    this.camera = this.PCamera
  }

  changeToPCamera() {
    this.camera = this.PCamera
  }

  changeToOCamera() {
    this.camera = this.OCamera
  }
}

export default CombinedCamera
