import { EventEmitter, payload } from "./EventManager.d"
import EventType from "./types"
import Logger from "../Logger"

class EventManager extends EventEmitter<EventType> {
  logger: Logger

  constructor(logger: Logger) {
    super()
    this.logger = logger
    this.setMaxListeners(0)
  }

  emit(event: EventType, payload?: payload | undefined, ...args: any[]) {
    this.logger.push({ action: "event_emit", event, payload })
    return super.emit(event, payload, [...args])
  }

  on(
    event: EventType,
    listener: (payload?: payload | undefined, ...args: any[]) => void
  ) {
    this.logger.push({ action: "evnet_on", event })
    return super.on(event, listener)
  }
}

const logger = new Logger()

const eventManager = new EventManager(logger)

export default eventManager
