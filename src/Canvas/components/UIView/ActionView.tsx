import { webGLProp } from "@Canvas/index"
import Button from "@Components/Button"
import Typography from "@Components/Typography"
import Ball from "@Editor/Object3D/Ball"
import Wall from "@Editor/Object3D/Wall"
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
    props.webGL.scene.add(ball)
  }

  const addWall = () => {
    const wall = new Wall({
      color: new THREE.Color(Math.random(), Math.random(), Math.random()),
      reflectivity: 1,
      clearcoat: 1,
      metalness: 0,
      emissive: "#000"
    })
    props.webGL.scene.add(wall)
  }

  const changePCamera = () => props.webGL.changeToPCamera()

  const changeOCamera = () => props.webGL.changeToOCamera()

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
      <Button onPress={addWall} color="secondary">
        <Typography style={font.body}>{t("add a Wall")}</Typography>
      </Button>
      <Button onPress={changeOCamera} color="info">
        <Typography>{t("change to OCamera")}</Typography>
      </Button>
      <Button onPress={changePCamera} color="info">
        <Typography>{t("change to PCamera")}</Typography>
      </Button>
    </View>
  )
}
