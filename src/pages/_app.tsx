import React from "react"
import { SafeAreaView, StyleSheet } from "react-native"
import { StatusBar } from "expo-status-bar"
import type { AppProps /*, AppContext */ } from "next/app"
import { Provider as ReduxProvider } from "react-redux"
import ThemeProvider from "../theme"
import store from "../store"
import themes from "../theme/themes"

const Application = ({ Component, pageProps }: AppProps) => {
  return (
    <ReduxProvider store={store}>
      <ThemeProvider themes={themes}>
        <SafeAreaView style={styles.container}>
          <Component {...pageProps} />
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

export default Application
