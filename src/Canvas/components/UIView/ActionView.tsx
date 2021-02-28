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
import { saveAs } from "file-saver"

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

  const importData = () => {}

  const exportData = () => {
    const data = JSON.stringify(props.webGL.scene.toJSON())
    const jsonFile = new Blob([data], {
      type: "application/json"
    })
    saveAs(jsonFile, "scene.json")
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
      <Button onPress={addWall} color="secondary">
        <Typography style={font.body}>{t("add a Wall")}</Typography>
      </Button>
      <Button onPress={importData} color="secondary">
        <Typography style={font.body}>{t("import")}</Typography>
      </Button>
      <Button onPress={exportData} color="secondary">
        <Typography style={font.body}>{t("export")}</Typography>
      </Button>
    </View>
  )
}
