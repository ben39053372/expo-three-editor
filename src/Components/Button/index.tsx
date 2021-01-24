import { padding } from "@Style/spacing"
import React, { useContext } from "react"
import {
  GestureResponderEvent,
  StyleProp,
  StyleSheet,
  TouchableHighlight,
  ViewStyle
} from "react-native"
import { ColorType, ThemeContext } from "../../theme"

interface ButtonProp {
  children: React.ReactNode
  onPress: (event: GestureResponderEvent) => void
  style?: StyleProp<ViewStyle>
  color: ColorType
}

const Button = (props: ButtonProp) => {
  const { theme } = useContext(ThemeContext)
  return (
    <TouchableHighlight
      style={[
        ButtonStyle.container,
        padding.xs,
        props.style,
        {
          backgroundColor:
            theme.color?.[props.color].main || theme.color?.[props.color]
        }
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
    borderRadius: 5
  }
})

export default Button
