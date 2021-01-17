import React from "react"
import { View } from "react-native"
import { EditorUIProps } from "."
import styles from "./style"

const EditorContent = (props: EditorContentProps) => {
  return (
    <View style={styles.content}>
      <View style={styles.glView}>{props.children}</View>
      <View style={styles.settingPanel}>setting</View>
    </View>
  )
}

export default EditorContent

export interface EditorContentProps extends EditorUIProps {}
