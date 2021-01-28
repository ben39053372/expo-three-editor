import { DebugFont } from "@Components/Typography"
import React from "react"
import { ScrollView, View } from "react-native"
import styles from "./style"
import { THREE } from "expo-three"
import { UIViewProps } from "."
import useUpdate from "./useUpdate"
import Loading from "@Components/Loading"
import camera from "@Editor/Camera"

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
  const camera = webGL.camera
  const scene = webGL.scene

  return (
    <View
      nativeID="scrollView"
      pointerEvents="none"
      style={{
        backgroundColor: "rgba(0,0,0,0)",
        position: "absolute",
        width: "100%",
        height: "100%",
        zIndex: 2,
        overflow: "scroll"
      }}
    >
      {webGL.camera && webGL.scene ? (
        <View nativeID="dataView" style={[styles.dodgeStats, styles.horizList]}>
          <CameraInfoView camera={camera} />
          <SceneObjectView scene={scene} />
          {/* <EventQuene /> */}
        </View>
      ) : (
        <Loading isLoading={true} />
      )}
    </View>
  )
}

const CameraInfoView = (props: { camera: camera }) => {
  return (
    <View>
      <DebugFont>
        {`camera rotation: X: ${round(props.camera.rotation.x)}, Y: ${round(
          props.camera.rotation.y
        )}, Z: ${round(props.camera.rotation.z)}`}
      </DebugFont>
      <DebugFont>
        {`camera position: X: ${round(props.camera.position.x)}, Y: ${round(
          props.camera.position.y
        )}, Z: ${round(props.camera.position.z)}`}
      </DebugFont>
      <DebugFont>
        {`camera useForPanObject: X: ${round(
          props.camera.useForPanObj.position.x
        )}, Y: ${round(props.camera.useForPanObj.position.y)}, Z: ${round(
          props.camera.position.z
        )}`}
      </DebugFont>
    </View>
  )
}

const SceneObjectView = (props: { scene: THREE.Scene }) => {
  return (
    <View>
      {/* <Text>{JSON.stringify(webGL.scene.children)}</Text> */}
      {props.scene.children.map((child) => {
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
  )
}

export default DebugView
