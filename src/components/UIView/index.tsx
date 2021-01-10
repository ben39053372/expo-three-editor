import WebGl from "@Canvas/WebGL"
import React from "react"
import { Text, View, StyleSheet, ScrollView } from "react-native"
import useUpdate from "./useUpdate"
import { THREE } from "expo-three"

interface Props {
  children: React.ReactNode
  webGL: WebGl
}

const round = (float: number) => {
  return float.toFixed(2)
}

const displayObj3D = (obj: THREE.Vector3) => {
  const result = Object.keys(obj).reduce((prev, key) => {
    return prev.concat(`${key}:${round(obj[key as "x" | "y" | "z"])}, `)
  }, "")
  return result
}

const UIView = (props: Props) => {
  // black magic
  useUpdate()

  const webGL = props.webGL

  const webGLRotation = webGL.camera?.rotation

  const webGLPosition = webGL.camera?.position

  return (
    <View style={styles.UIView}>
      {props.webGL.camera ? (
        <ScrollView
          nativeID="scrollView"
          pointerEvents="none"
          style={{
            backgroundColor: "rgba(0,0,0,0)",
            position: "absolute",
            width: "100%",
            height: "100%",
            zIndex: 2
          }}
          contentContainerStyle={{ flex: 1 }}
        >
          <View
            nativeID="dataView"
            style={[styles.dodgeStats, styles.horizList]}
          >
            <View>
              <Text>
                {`camera rotation: X: ${round(webGLRotation.x)}, Y: ${round(
                  webGLRotation.y
                )}, Z: ${round(webGLRotation.z)}`}
              </Text>
              <Text>
                {`camera position: X: ${round(webGLPosition.x)}, Y: ${round(
                  webGLPosition.y
                )}, Z: ${round(webGLPosition.z)}`}
              </Text>
            </View>
            <View>
              {/* <Text>{JSON.stringify(webGL.scene.children)}</Text> */}
              {webGL.scene.children.map((child) => {
                return (
                  <View key={child.uuid}>
                    <Text>
                      {child.id}-{child.name || child.type}: position:
                      {displayObj3D(child.position)}
                    </Text>
                  </View>
                )
              })}
            </View>
          </View>
        </ScrollView>
      ) : (
        <Text>{"Loading"}</Text>
      )}

      <View style={styles.canvas}>{props.children}</View>
    </View>
  )
}

const styles = StyleSheet.create({
  UIView: {
    flex: 1,
    fontSize: 8
  },
  dodgeStats: {
    marginLeft: 80
  },
  horizList: {
    backgroundColor: "rgba(0,0,0,0)",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  canvas: {
    flex: 1
  }
})

export default UIView
