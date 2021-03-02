import OCamera from "./OCamera"
import PCamera from "./PCamera"

class CombineCamera {
  camera: PCamera | OCamera
  PCamera: PCamera
  OCamera: OCamera

  constructor(pCamera: PCamera, oCamera: OCamera) {
    this.camera = pCamera
    this.PCamera = pCamera
    this.OCamera = oCamera
  }

  changeToPCamera() {
    this.camera = this.PCamera
  }

  changeToOCamera() {
    this.camera = this.PCamera
  }
}

export default CombineCamera
