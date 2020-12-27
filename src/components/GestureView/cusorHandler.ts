import { THREE } from "expo-three"
import WebGL from "@Canvas/WebGL"
import eventManager from "@EventManager"

const cursorHandler = () => {
  const raycaster = new THREE.Raycaster()
  const mouse = new THREE.Vector2()

  window.addEventListener(
    "mousemove",
    (event) => {
      event.preventDefault()
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1

      eventManager.send({
        type: "MOUSE_MOVE",
        payload: {
          mouse
        }
      })
    },
    { passive: false }
  )
}

export default cursorHandler
