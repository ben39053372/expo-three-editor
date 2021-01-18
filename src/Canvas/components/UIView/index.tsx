import WebGl from "@Canvas/WebGL"
import React, { useEffect } from "react"
import { View } from "react-native"
import styles from "./style"
import DebugView from "./DebugView"
import { getBreakpoint } from "@Style/breakpoint"

export interface UIViewProps {
  children?: React.ReactNode
  webGL: WebGl
}

const UIView = (props: UIViewProps) => {
  const webGL = props.webGL

  useEffect(() => {
    console.log(getBreakpoint(12000))
  }, [])

  return (
    <View style={[styles.UIView]}>
      <DebugView webGL={webGL} />
      <View></View>
      <View style={styles.canvas}>{props.children}</View>
    </View>
  )
}

export default UIView
