import color from "@Style/color"
import { padding } from "@Style/spacing"
import React from "react"
import {
  GestureResponderEvent,
  StyleProp,
  StyleSheet,
  TouchableHighlight,
  ViewStyle
} from "react-native"

interface ButtonProp {
  children: React.ReactNode
  onPress: (event: GestureResponderEvent) => void
  style?: StyleProp<ViewStyle>
  color?: keyof typeof color
}

const Button = (props: ButtonProp) => {
  return (
    <TouchableHighlight
      style={[
        ButtonStyle.container,
        padding.xs,
        props.style,
        { backgroundColor: color[props.color || "primary"] }
      ]}
      onPress={props.onPress}
    >
      {props.children}
    </TouchableHighlight>
  )
}

const ButtonStyle = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: color.primary,
    borderRadius: 5
  }
})

export default Button
