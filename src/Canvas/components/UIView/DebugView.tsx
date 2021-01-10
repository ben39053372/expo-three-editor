import { DebugFont } from "@Components/Typography"
import React from "react"
import { ScrollView, View } from "react-native"
import styles from "./style"
import { THREE } from "expo-three"
import { UIViewProps } from "."
import useUpdate from "./useUpdate"
import Loading from "@Components/Loading"

const round = (float: number) => {
  return float.toFixed(2)
}

const displayObj3D = (obj: THREE.Vector3) => {
  const result = Object.keys(obj).reduce((prev, key) => {
    return prev.concat(`${key}:${round(obj[key as "x" | "y" | "z"])}, `)
  }, "")
  return result
}

const DebugView = (props: UIViewProps) => {
  useUpdate()

  const webGL = props.webGL

  const webGLRotation = webGL.camera?.rotation

  const webGLPosition = webGL.camera?.position

  return (
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
      {webGL.camera && webGL.scene ? (
        <View nativeID="dataView" style={[styles.dodgeStats, styles.horizList]}>
          <View>
            <DebugFont>
              {`camera rotation: X: ${round(webGLRotation.x)}, Y: ${round(
                webGLRotation.y
              )}, Z: ${round(webGLRotation.z)}`}
            </DebugFont>
            <DebugFont>
              {`camera position: X: ${round(webGLPosition.x)}, Y: ${round(
                webGLPosition.y
              )}, Z: ${round(webGLPosition.z)}`}
            </DebugFont>
          </View>
          <View>
            {/* <Text>{JSON.stringify(webGL.scene.children)}</Text> */}
            {webGL.scene.children.map((child) => {
              return (
                <View key={child.uuid}>
                  <DebugFont>
                    {child.id}-{child.name || child.type}: position:
                    {displayObj3D(child.position)}
                  </DebugFont>
                </View>
              )
            })}
          </View>
        </View>
      ) : (
        <Loading isLoading={true} />
      )}
    </ScrollView>
  )
}

export default DebugView
