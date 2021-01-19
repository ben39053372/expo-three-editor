import WebGl from "@Canvas/WebGL"
import Cursor from "@Editor/Object3D/Cursor"
import { THREE } from "expo-three"
import { Platform } from "react-native"

const cursorHandler = (webGl: WebGl) => {
  const mouse = new THREE.Vector2()
  Platform.OS === "web" &&
    window.addEventListener(
      "mousemove",
      (event) => {
        event.preventDefault()
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
        const cursor = webGl.scene.objects.find(
          (obj) => obj instanceof Cursor
        ) as Cursor
        cursor.onMouseMove(mouse)
      },
      { passive: false }
    )
}

export default cursorHandler
