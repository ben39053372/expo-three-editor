import React from "react"
import { StatusBar } from "expo-status-bar"
import { Platform, StyleSheet, View } from "react-native"
import FPSStats from "react-fps-stats"
import Canvas from "./src/Canvas"

export default function App() {
  return (
    <View style={styles.container}>
      {Platform.OS === "web" && <FPSStats />}
      <Canvas />
      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    overflow: "hidden"
  }
})
