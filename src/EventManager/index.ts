import { THREE } from "expo-three"

interface Event {
  type: string
  payload: {
    [key: string]: any
  }
}

class EventManager {
  private instance = new THREE.EventDispatcher()
  public send(event: Event) {
    console.log(`[event manager]send: ${event}`)
    this.instance.dispatchEvent(event)
  }

  public addListener(type: string, listener: (event: THREE.Event) => void) {
    console.log(`[event manager]add listener: ${type}`)
    this.instance.addEventListener(type, listener)
  }
}

const eventManager = new EventManager()

export default eventManager
