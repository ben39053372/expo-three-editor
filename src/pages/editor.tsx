import React from "react"
import { View, Text } from "react-native"
import Canvas from "../Canvas"
import JSONDATA from "../blueprint.json"

const Editor = () => {
  return <Canvas jsonData={JSONDATA} />
  // return (
  //   <View>
  //     <Text>HI Editor</Text>
  //   </View>
  // )
}

export default Editor
