export default class Logger {
  max: number = 10
  logs: any[] = []

  constructor() {
    console.log("new logger")
  }

  push(log: any) {
    this.logs.push(JSON.stringify({ log, createDate: new Date() }))
    // console.log(this.logs.length)
    while (this.logs.length >= this.max) {
      this.logs.shift()
    }
  }

  showLogs() {
    console.log(this.logs.map((log) => JSON.parse(log)).reverse())
  }
}
