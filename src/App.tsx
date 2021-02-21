import "./i18n"
import React from "react"
import { SafeAreaView, StyleSheet } from "react-native"
import { Provider as ReduxProvider } from "react-redux"
import { StatusBar } from "expo-status-bar"
import Canvas from "./Canvas"
import store from "./store"
import ThemeProvider from "./theme"
import themes from "./theme/themes"

import JSONDATA from "./blueprint.json"

export default function App() {
  return (
    <ReduxProvider store={store}>
      <ThemeProvider themes={themes}>
        <SafeAreaView style={styles.container}>
          <Canvas jsonData={JSONDATA} />
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
