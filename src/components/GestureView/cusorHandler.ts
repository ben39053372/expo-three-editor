import { THREE } from "expo-three"
import WebGL from "../../Canvas/WebGL"
import eventManager from "../../EventManager"

const cursorHandler = (webGL: WebGL) => {
  const raycaster = new THREE.Raycaster()
  const mouse = new THREE.Vector2()

  window.addEventListener(
    "mousemove",
    (event) => {
      event.preventDefault()
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1

      raycaster.setFromCamera(mouse, webGL.camera)

      const plane = webGL.scene?.getObjectByName("plane")
      const cursor = webGL.scene?.getObjectByName("cursor")
      eventManager.send({ type: "test", payload: {} })

      if (plane && cursor) {
        const intersects = raycaster.intersectObject(plane)
        cursor.position.set(
          intersects[0]?.point.x || 0,
          1,
          intersects[0]?.point.z || 0
        )
      }
    },
    { passive: false }
  )
}

export default cursorHandler
