import WebGl from "@Canvas/WebGL"
import React from "react"
import { Platform, View } from "react-native"
import styles from "./style"
import DebugView from "./DebugView"
// eslint-disable-next-line no-unused-vars
import FPSStats from "react-fps-stats"
import ActionView from "./ActionView"
export interface UIViewProps {
  children?: React.ReactNode
  webGL: WebGl
}

const UIView = (props: UIViewProps) => {
  const webGL = props.webGL

  return (
    <View style={[styles.UIView]}>
      {Platform.OS === "web" && <FPSStats />}
      <ActionView webGL={webGL} />
      {true && <DebugView webGL={webGL} />}
      <DebugView webGL={webGL} />
      <View style={styles.canvas}>{props.children}</View>
    </View>
  )
}

export default UIView
