import React from "react"
import { StyleProp, Text, TextStyle } from "react-native"
import font from "@Style/font"

interface TextProps {
  children: React.ReactNode
  style?: StyleProp<TextStyle>
}

const Typography = (props: TextProps) => {
  return <Text style={props.style}>{props.children}</Text>
}

export const DebugFont = (props: TextProps) => {
  return <Text style={[props.style, font.debugText]}>{props.children}</Text>
}

export default Typography
