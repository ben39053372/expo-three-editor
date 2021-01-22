import WebGl from "@Canvas/WebGL"
import React from "react"
import { Button, View } from "react-native"
import styles from "./style"
import DebugView from "./DebugView"
import Box from "@Editor/Object3D/Box"

export interface UIViewProps {
  children?: React.ReactNode
  webGL: WebGl
}

const UIView = (props: UIViewProps) => {
  const webGL = props.webGL

  const addBox = () => {
    const box = new Box(5, 5, 5)
    webGL.scene.add(box)
    // box.position.set(Math.random(), Math.random(), Math.random())
  }

  return (
    <View style={[styles.UIView]}>
      <Button title="add a Box" onPress={addBox} />
      <Button title="add a Ball" onPress={addBox} />
      <DebugView webGL={webGL} />
      <View style={styles.canvas}>{props.children}</View>
    </View>
  )
}

export default UIView
