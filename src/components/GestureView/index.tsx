import React, { useRef } from "react"
import {
  GestureResponderEvent,
  PanResponder,
  Platform,
  View,
  ViewProps
} from "react-native"
import WebGl from "@Canvas/WebGL"
import oneFingerHandler from "./OneFingerMoveHandler"
import cursorHandler from "./cusorHandler"

interface props extends ViewProps {
  children: React.ReactNode
  webGL: WebGl
}

const GestureView = (props: props) => {
  let isPan: boolean = false
  let originState = useRef<GestureResponderEvent>().current

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
        evt.preventDefault()
      },
      // on Move
      onPanResponderMove: (evt, gestureState) => {
        if (!isPan && gestureState.dx > 10 && gestureState.dy > 10) isPan = true
        // one finger
        if (gestureState.numberActiveTouches === 1)
          oneFingerHandler(gestureState, props.webGL)

        // more than one finger
        if (gestureState.numberActiveTouches > 1) {
          if (!originState) return
          if (
            originState?.nativeEvent.touches.length !== 2 &&
            originState.nativeEvent.touches.length > 2
          ) {
            originState = evt
          }
          // multiFingerHandler(
          //   evt,
          //   gestureState,
          //   originState,
          //   blueprints
          // );
        }
      }
    })
  ).current

  return (
    <View style={{ flex: 1 }} {...panResponder.panHandlers}>
      {props.children}
    </View>
  )
}

export default GestureView
