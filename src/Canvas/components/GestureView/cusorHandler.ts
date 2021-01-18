import { THREE } from "expo-three"
import { Platform } from "react-native"

const cursorHandler = () => {
  const mouse = new THREE.Vector2()
  Platform.OS === "web" &&
    window.addEventListener(
      "mousemove",
      (event) => {
        event.preventDefault()
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
      },
      { passive: false }
    )
}

export default cursorHandler
