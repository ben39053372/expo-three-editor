import WebGl from "@Canvas/WebGL"
import React from "react"
import { View } from "react-native"
import styles from "./style"
import DebugView from "./DebugView"
// eslint-disable-next-line no-unused-vars
import ActionView from "./ActionView"
export interface UIViewProps {
  children?: React.ReactNode
  webGL: WebGl
}

const UIView = (props: UIViewProps) => {
  const webGL = props.webGL

  return (
    <View style={[styles.UIView]}>
      <ActionView webGL={webGL} />
      {false && <DebugView webGL={webGL} />}
      <View style={styles.canvas}>{props.children}</View>
    </View>
  )
}

export default UIView
