import { PanResponderGestureState } from "react-native"

let isClicked: boolean = false
// eslint-disable-next-line no-undef
let isClickTimeout: NodeJS.Timeout

const CLICK_TIMEOUT_MS = 350

const clickHanlder = (gestureState: PanResponderGestureState) => {
  if (isClicked) {
    // double click
    isClicked = false
    clearTimeout(isClickTimeout!)
  } else {
    // click
    isClickTimeout = setTimeout(() => {
      isClicked = false
    }, CLICK_TIMEOUT_MS)
    isClicked = true
  }
}

export default clickHanlder
