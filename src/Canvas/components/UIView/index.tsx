import WebGl from "@Canvas/WebGL"
import React from "react"
import { View } from "react-native"
import styles from "./style"
import DebugView from "./DebugView"

export interface UIViewProps {
  children?: React.ReactNode
  webGL: WebGl
}

const UIView = (props: UIViewProps) => {
  const webGL = props.webGL

  return (
    <View style={[styles.UIView]}>
      <DebugView webGL={webGL} />

      <View style={styles.canvas}>{props.children}</View>
    </View>
  )
}

export default UIView
