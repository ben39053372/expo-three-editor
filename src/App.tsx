import React from "react"
import { StatusBar } from "expo-status-bar"
import "./i18n"
import { SafeAreaView, StyleSheet, View } from "react-native"
import Canvas from "./Canvas"
import { Provider as ReduxProvider } from "react-redux"
import store from "./store"
import ThemeProvider from "./theme"
import themes from "./theme/themes"

export default function App() {
  return (
    <ReduxProvider store={store}>
      <ThemeProvider themes={themes}>
        <SafeAreaView style={styles.container}>
          <Canvas />
          <StatusBar style="auto" />
        </SafeAreaView>
      </ThemeProvider>
    </ReduxProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    overflow: "hidden"
  }
})
