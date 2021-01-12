import eventManager from "@EventManager"

export default class Logger {
  max: number = 10
  logs: any[] = []

  constructor() {
    this.mountEvent()
  }

  push(log: any) {
    this.logs.push({ log, createDate: new Date() })
    // console.log(this.logs.length)
    while (this.logs.length >= this.max) {
      this.logs.shift()
    }
  }

  showLogs() {
    console.log(this.logs.reverse())
  }

  mountEvent() {
    console.log(eventManager)
    // eslint-disable-next-line no-undef
    const loopCB = () => {
      if (eventManager) {
        clearInterval(loop)
        eventManager.on("L_DOWN", () => this.showLogs())
      }
    }
    const loop = setInterval(loopCB, 2000)
  }
}
