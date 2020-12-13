import { PanResponderGestureState } from "react-native"
import { THREE } from "expo-three"
import WebGL from "../../Canvas/WebGL"

const minPolarAngle = 0
const maxPolarAngle = Math.PI
const PI_2 = Math.PI / 2
const euler = new THREE.Euler(0, 0, 0, "YXZ")

const oneFingerMoveHandler = (
  gestureState: PanResponderGestureState,
  webgl: WebGL
) => {
  // ref: https://github.com/mrdoob/three.js/blob/dev/examples/js/controls/PointerLockControls.js
  const camera = webgl.camera

  euler.setFromQuaternion(camera.quaternion)

  euler.y += gestureState.vx * 0.001
  euler.x += gestureState.vy * 0.001

  euler.x = Math.max(
    PI_2 - maxPolarAngle,
    Math.min(PI_2 - minPolarAngle, euler.x)
  )
  camera.quaternion.setFromEuler(euler)
}

export default oneFingerMoveHandler
