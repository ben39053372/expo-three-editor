import React, { useRef } from "react"
import { PanResponder, Platform, View, ViewProps } from "react-native"
import WebGl from "@Canvas/WebGL"
import oneFingerHandler from "./oneFingerMoveHandler"
import cursorHandler from "./cusorHandler"
import clickHanlder from "./clickHandler"
import twoFingerMoveHandler from "./twoFingerHandler"

interface props extends ViewProps {
  children: React.ReactNode
  webGL: WebGl
}
interface touchPosition {
  x: number
  y: number
  id: string
}

const GestureView = (props: props) => {
  let isPan: boolean = false
  let touchStartPosition = useRef<touchPosition[]>().current

  Platform.OS === "web" && cursorHandler(props.webGL)

  const panResponder = React.useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onShouldBlockNativeResponder: () => true,

      // on start
      onPanResponderGrant: (evt) => {
        // isPan = false
        touchStartPosition = evt.nativeEvent.touches.map((touch) => {
          const touchPosition: touchPosition = {
            x: touch.locationX,
            y: touch.locationY,
            id: touch.identifier
          }
          return touchPosition
        })
        console.log(touchStartPosition)
      },
      // on Move
      onPanResponderMove: (evt, gestureState) => {
        if (!isPan && gestureState.dx > 10 && gestureState.dy > 10) isPan = true
        // one finger
        if (gestureState.numberActiveTouches === 1)
          oneFingerHandler(gestureState, props.webGL)

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
