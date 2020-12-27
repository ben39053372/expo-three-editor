import { THREE } from "expo-three"
import EventType from "./EventType"

interface Event extends THREE.Event {
  payload?: {
    [key: string]: any
  }
}

interface EventFormat {
  type: EventType
  payload?: {
    [key: string]: any
  }
}

class EventManager {
  private instance = new THREE.EventDispatcher()

  public send(event: EventFormat) {
    // console.log(`[event manager]send: ${event}`)
    this.instance.dispatchEvent(event)
  }

  public addListener(type: EventType, listener: (event: Event) => void) {
    // console.log(`[event manager]add listener: ${type}`)
    this.instance.addEventListener(type, listener)
  }

  public checkListener(type: EventType, listener: (event: Event) => void) {
    this.instance.hasEventListener(type, listener)
  }

  public removeListener(type: EventType, listener: (event: Event) => void) {
    this.instance.removeEventListener(type, listener)
  }
}

const eventManager = new EventManager()

export default eventManager
