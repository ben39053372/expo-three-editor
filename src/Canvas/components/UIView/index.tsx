import WebGl from "@Canvas/WebGL"
import React from "react"
import { StyleSheet, View, Platform } from "react-native"
import Button from "@Components/Button"
import styles from "./style"
import DebugView from "./DebugView"
import Ball from "@Editor/Object3D/Ball"
import Typography from "@Components/Typography"
import font from "@Style/font"
import color from "@Style/color"
import { useTranslation } from "react-i18next"
import FPSStats from "react-fps-stats"

export interface UIViewProps {
  children?: React.ReactNode
  webGL: WebGl
}

const UIView = (props: UIViewProps) => {
  const { t } = useTranslation()
  const webGL = props.webGL

  const addBall = () => {
    const ball = new Ball(1, { color: 0x119977 })
    ball.position.set(0, 0, 0)
    webGL.scene.add(ball)
  }

  return (
    <View style={[styles.UIView]}>
      {Platform.OS === "web" && <FPSStats />}
      <View style={actionStyle.container}>
        <Button onPress={addBall} color="secondary">
          <Typography style={[font.body, { color: color.info }]}>
            {t("add a ball")}
          </Typography>
        </Button>
      </View>

      {false && <DebugView webGL={webGL} />}
      <View style={styles.canvas}>{props.children}</View>
    </View>
  )
}

const actionStyle = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: color.primary
  }
})

export default UIView
