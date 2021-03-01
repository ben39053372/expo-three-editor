import { PanResponderGestureState, Dimensions } from "react-native"
import WebGl from "@Canvas/WebGL"
import { extraData } from "."
import { THREE } from "expo-three"

const oneFingerMoveHandler = (
  gestureState: PanResponderGestureState,
  webgl: WebGl,
  extraData: extraData
) => {
  const { width, height } = Dimensions.get("window")
  const targetObject = extraData.intersects.filter(
    (intersect) => intersect.object.userData.isObject === true
  )[0]?.object

  if (targetObject) {
    webgl.camera.shootRaycaster({
      x: (gestureState.moveX / width) * 2 - 1,
      y: -(gestureState.moveY / height) * 2 + 1
    })
    const intersects = webgl.camera.getIntersectObject(
      (webgl.scene.plane as THREE.Object3D) || webgl.scene.children
    )
    if (intersects[0]) {
      const moveTo = intersects[0]?.point
      targetObject.parent?.position.set(moveTo.x, 0, moveTo.z)
    }
  } else {
    webgl.camera.rotateByAxis2D(
      new THREE.Vector2(
        (gestureState.vx / width) * 100 * 0.2,
        (gestureState.vy / height) * 100 * 0.2
      )
    )
  }
}

export default oneFingerMoveHandler
