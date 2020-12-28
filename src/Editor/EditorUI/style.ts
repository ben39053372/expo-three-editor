import { StyleSheet } from "react-native"
import { HEADER_HEIGHT } from "../EditorConst"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#777",
    color: "#09c"
  },
  header: {
    height: HEADER_HEIGHT
  },
  content: {
    flex: 1,
    flexDirection: "row"
  },
  glView: {
    flex: 5
  },
  settingPanel: {
    flex: 1
  }
})

export default styles
