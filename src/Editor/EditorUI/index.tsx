import React from "react"
import { View } from "react-native"
import styles from "./style"
import EditorHeader from "./EditorHeader"
import EditorContent from "./EditorContent"
import EditorFooter from "./EditorFooter"

const EditorUI = (props: EditorUIProps) => {
  return (
    <View style={styles.container}>
      <EditorHeader />
      <EditorContent {...props} />
      <EditorFooter />
    </View>
  )
}

export default EditorUI

export interface EditorUIProps {
  children: React.ReactNode
}
