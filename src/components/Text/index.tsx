import React from "react"
import { StyleProp, Text as Text_, TextStyle } from "react-native"

function Text(props: TextProps) {
  return <Text_ style={props.style}>{props.children}</Text_>
}

export default Text

export interface TextProps {
  children: React.ReactNode
  style?: StyleProp<TextStyle>
}
