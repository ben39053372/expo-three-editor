import { webGLProp } from "@Canvas/index"
import Button from "@Components/Button"
import Typography from "@Components/Typography"
import Ball from "@Editor/Object3D/Ball"
import Box from "@Editor/Object3D/Box"
import font from "@Style/font"
import { padding } from "@Style/spacing"
import { ThemeContext } from "@Theme/index"
import React, { useContext } from "react"
import { useTranslation } from "react-i18next"
import { View } from "react-native"
import { actionStyle } from "./style"
import { THREE } from "expo-three"

interface ActionViewProps extends webGLProp {}

export default function ActionView(props: ActionViewProps) {
  const { t } = useTranslation()
  const { theme } = useContext(ThemeContext)
  const addBall = () => {
    const ball = new Ball(Math.random() * 2, {
      color: new THREE.Color(Math.random(), Math.random(), Math.random()),
      reflectivity: 1,
      clearcoat: 1,
      metalness: 0,
      emissive: "#000"
    })
    ball.setInfo()
    props.webGL.scene.add(ball)
  }

  const addBox = () => {
    const box = new Box(5, 5, 5, {
      color: new THREE.Color(Math.random(), Math.random(), Math.random())
    })
    box.setInfo()
    props.webGL.scene.add(box)
  }
  return (
    <View
      style={[
        actionStyle.container,
        padding.sm,
        { backgroundColor: theme.color?.primary.main }
      ]}
    >
      <Button onPress={addBall} color="secondary">
        <Typography style={font.body}>{t("add a ball")}</Typography>
      </Button>
      <Button onPress={addBox} color="secondary">
        <Typography style={font.body}>{t("add a box")}</Typography>
      </Button>
    </View>
  )
}