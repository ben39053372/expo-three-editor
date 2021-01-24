import { PanResponderGestureState, Dimensions } from "react-native"
import WebGl from "@Canvas/WebGL"
import { Scene, Vector2 } from "three"
import { extraData } from "."
import { THREE } from "expo-three"

const oneFingerMoveHandler = (
  gestureState: PanResponderGestureState,
  webgl: WebGl,
  extraData: extraData
) => {
  const { width, height } = Dimensions.get("screen")
  const targetObject = extraData.intersects.filter(
    (intersect) => intersect.object.userData.isObject === true
  )[0]?.object

  if (targetObject) {
    webgl.camera.shootRaycaster({
      x: (gestureState.x0 / width) * 2 - 1,
      y: -(gestureState.y0 / height) * 2 + 1
    })
    const moveTo = webgl.camera.getIntersectObject(
      (webgl.scene.plane as THREE.Object3D) || webgl.scene.children
    )[0].point

    console.log(moveTo)

    targetObject.position.set(moveTo.x, moveTo.y, moveTo.z)
  } else {
    webgl.camera.rotateByAxis2D(
      new Vector2(gestureState.vx / width, gestureState.vy / height)
    )
  }
}

export default oneFingerMoveHandler
