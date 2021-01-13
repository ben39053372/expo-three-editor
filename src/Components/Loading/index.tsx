import React from "react"
import { ActivityIndicator, View } from "react-native"

export interface LoadingProps {
  isLoading: boolean
}

const Loading = (props: LoadingProps) => {
  return (
    <View
      style={{
        backgroundColor: "rgba(0,0,0,0)",
        position: "relative",
        left: 0,
        top: 0
      }}
    >
      {props.isLoading && <ActivityIndicator color="#000" />}
    </View>
  )
}

export default Loading
