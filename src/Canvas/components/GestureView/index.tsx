import React, { useRef } from "react"
import {
  PanResponder,
  Platform,
  useWindowDimensions,
  View,
  ViewProps
} from "react-native"
import WebGl from "@Canvas/WebGL"
import oneFingerHandler from "./oneFingerMoveHandler"
import cursorHandler from "./cusorHandler"
import clickHanlder from "./clickHandler"
import twoFingerMoveHandler from "./twoFingerHandler"
import { THREE } from "expo-three"

interface props extends ViewProps {
  children: React.ReactNode
  webGL: WebGl
}
interface touchPosition {
  x: number
  y: number
  id: string
}

export interface extraData {
  touchStartPosition: touchPosition[] | undefined
  intersects: THREE.Intersection[]
}

const GestureView = (props: props) => {
  let isPan: boolean = false
  let touchStartPosition = useRef<touchPosition[]>().current
  let intersects = useRef<THREE.Intersection[]>([]).current
  const { width, height } = useWindowDimensions()

  Platform.OS === "web" && cursorHandler(props.webGL)

  const panResponder = React.useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onShouldBlockNativeResponder: () => true,

      // on start
      onPanResponderGrant: (evt, gestureState) => {
        // isPan = false
        touchStartPosition = evt.nativeEvent.touches.map((touch) => {
          const touchPosition: touchPosition = {
            x: touch.locationX,
            y: touch.locationY,
            id: touch.identifier
          }
          return touchPosition
        })
        if (gestureState.numberActiveTouches === 1) {
          props.webGL.camera.shootRaycaster({
            x: (gestureState.x0 / width) * 2 - 1,
            y: -(gestureState.y0 / height) * 2 + 1
          })
          intersects = props.webGL.camera.getIntersectObjects(
            props.webGL.scene.children
          )
        }
      },
      // on Move
      onPanResponderMove: (evt, gestureState) => {
        if (!isPan && gestureState.dx > 10 && gestureState.dy > 10) isPan = true
        // one finger
        if (gestureState.numberActiveTouches === 1)
          oneFingerHandler(gestureState, props.webGL, {
            touchStartPosition,
            intersects
          })

        // more than one finger
        if (gestureState.numberActiveTouches === 2) {
          twoFingerMoveHandler(gestureState, props.webGL)
        }
      },
      onPanResponderEnd: (evt, gestureState) => {
        if (gestureState.dx < 10 && gestureState.dy < 10) {
          clickHanlder(gestureState)
        }
      },
      onPanResponderTerminationRequest: () => false
    })
  ).current

  return (
    <View style={{ flex: 1 }} {...panResponder.panHandlers}>
      {props.children}
    </View>
  )
}

export default GestureView
