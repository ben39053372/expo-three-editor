import { PanResponderGestureState } from "react-native"
import { THREE } from "expo-three"
import WebGl from "@Canvas/WebGL"

const twoFingerMoveHandler = (
  gestureState: PanResponderGestureState,
  webgl: WebGl
) => {
  webgl.camera.panCamera(new THREE.Vector2(gestureState.vx, gestureState.vy))
}

export default twoFingerMoveHandler
