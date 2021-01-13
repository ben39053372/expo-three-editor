import { EventEmitter as _EventEmitter } from "events"

export interface payload {
  [key: string]: any
}
export class EventEmitter<type> extends _EventEmitter {
  addListener(
    event: type,
    listener: (payload?: payload, ...args: any[]) => void
  ): this

  on(event: type, listener: (payload?: payload, ...args: any[]) => void): this
  once(event: type, listener: (payload?: payload, ...args: any[]) => void): this
  removeListener(
    event: type,
    listener: (payload?: payload, ...args: any[]) => void
  ): this

  removeAllListeners(event?: type): this
  setMaxListeners(n: number): this
  getMaxListeners(): number
  listeners(event: type): Function[]
  emit(event: type, payload?: payload, ...args: any[]): boolean
  listenerCount(type: type): number
  prependListener(
    event: type,
    listener: (payload?: payload, ...args: any[]) => void
  ): this

  prependOnceListener(
    event: type,
    listener: (payload?: payload, ...args: any[]) => void
  ): this

  eventNames(): type[]
}
