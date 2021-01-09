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
import eventManager from "@EventManager"

interface props extends ViewProps {
  children: React.ReactNode
  webGL: WebGl
}

const GestureView = (props: props) => {
  let isPan: boolean = false
  let originState = useRef<GestureResponderEvent>().current
  // eslint-disable-next-line no-undef
  let isClickTimeout: NodeJS.Timeout | null = null
  let isClicked: boolean = false

  Platform.OS === "web" && cursorHandler()

  const panResponder = React.useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onShouldBlockNativeResponder: () => true,

      // on start
      onPanResponderGrant: (evt) => {
        evt.preventDefault()
        evt.stopPropagation()
        // isPan = false
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
        }
      },
      onPanResponderEnd: (evt, gestureState) => {
        if (gestureState.dx < 10 && gestureState.dy < 10) {
          if (isClicked) {
            // double click
            eventManager.emit("MOUSE_DOUBLE_CLICK", {
              gestureState
            })
            isClicked = false
            clearTimeout(isClickTimeout!)
          } else {
            // click
            eventManager.emit("MOUSE_CLICK", {
              gestureState
            })
            isClickTimeout = setTimeout(() => {
              isClicked = false
              console.log("click")
            }, 350)
            isClicked = true
          }
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
