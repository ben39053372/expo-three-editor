import WebGl from "@Canvas/WebGL"
import React, { useEffect } from "react"
import { Button, View } from "react-native"
import styles from "./style"
import DebugView from "./DebugView"
import { getBreakpoint } from "@Style/breakpoint"

export interface UIViewProps {
  children?: React.ReactNode
  webGL: WebGl
}

const UIView = (props: UIViewProps) => {
  const webGL = props.webGL

  const addBox = () => {
    const box = 
  }

  return (
    <View style={[styles.UIView]}>
      <Button title="add a box" onPress={addBox} />
      <DebugView webGL={webGL} />
      <View style={styles.canvas}>{props.children}</View>
    </View>
  )
}

export default UIView
