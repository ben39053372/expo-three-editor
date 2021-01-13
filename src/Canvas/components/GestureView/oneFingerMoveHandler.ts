import { PanResponderGestureState, Dimensions } from "react-native"
import { THREE } from "expo-three"
import WebGl from "@Canvas/WebGL"

const minPolarAngle = 0
const maxPolarAngle = Math.PI
const PI_2 = Math.PI / 2
const euler = new THREE.Euler(0, 0, 0, "YXZ")

const oneFingerMoveHandler = (
  gestureState: PanResponderGestureState,
  webgl: WebGl
) => {
  // ref: https://github.com/mrdoob/three.js/blob/dev/examples/js/controls/PointerLockControls.js
  const camera = webgl.camera

  const { width, height } = Dimensions.get("window")

  euler.setFromQuaternion(camera.quaternion)

<<<<<<< HEAD:src/components/GestureView/OneFingerMoveHandler.ts
  const { width, height } = Dimensions.get("window")

  euler.y += gestureState.vx / (height / 7)
  euler.x += gestureState.vy / (width / 7)
=======
  euler.y += (gestureState.vx / width) * 10
  euler.x += (gestureState.vy / height) * 10
>>>>>>> 3a9bba75a8bbda19d62721206ea8b08350780666:src/Canvas/components/GestureView/oneFingerMoveHandler.ts

  euler.x = Math.max(
    PI_2 - maxPolarAngle,
    Math.min(PI_2 - minPolarAngle, euler.x)
  )
  camera.quaternion.setFromEuler(euler)
}

export default oneFingerMoveHandler
