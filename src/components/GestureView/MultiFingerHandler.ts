import Blueprint from "Blueprint"
import { GestureResponderEvent, PanResponderGestureState } from "react-native"
import { THREE } from "expo-three"
import { getDistance } from "./utils"

const getFingerDistance = (originState: GestureResponderEvent) => {
  const finger1 = {
    x: originState.nativeEvent.touches[0]?.locationX,
    y: originState.nativeEvent.touches[0]?.locationY
  }
  const finger2 = {
    x: originState.nativeEvent.touches[1]?.locationX,
    y: originState.nativeEvent.touches[1]?.locationY
  }
  return getDistance(finger1, finger2)
}

const multiFingerMoveHandler = (
  evt: GestureResponderEvent,
  gestureState: PanResponderGestureState,
  originState: OriginState,
  blueprints: Blueprint[]
) => {
  if (gestureState.numberActiveTouches === 2) {
    // const originDistance = getFingerDistance(originState.evt)
    // const currDistance = getFingerDistance(evt)
    // pitch
    // const scale = (currDistance - originDistance) / originDistance
    // console.log({ scale })
    blueprints[0].camera?.translateZ(-scale)

    // pan
    blueprints[0].camera?.panCamera(
      new THREE.Vector2(-gestureState.vx, -gestureState.vy)
    )
  }
}

export default multiFingerMoveHandler
