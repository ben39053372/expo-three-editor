import React from "react"
import { View, StyleSheet } from "react-native"

interface Props {
  children: React.ReactNode
}

const UIView = (props: Props) => {
  return <View style={styles.UIView}>{props.children}</View>
}

const styles = StyleSheet.create({
  UIView: {
    flex: 1,
    padding: 10
  }
})

export default UIView
