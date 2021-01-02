export default class Logger {
  max: number = 1000
  logs: any[] = []

  push(log: any) {
    this.logs.push(log)
    while (this.logs.length > this.max) {
      this.logs.shift()
    }
  }
}
