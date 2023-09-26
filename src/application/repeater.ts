export class Repeater {
  private static MAX_DELAY = 150
  private static MIN_DELAY = 100
  private timeout: null | NodeJS.Timeout = null
  private callback: () => void

  constructor(callback: () => void) {
    this.callback = callback
  }
  run(delay = Repeater.MAX_DELAY) {
    const currDelay = Math.min(
      Math.max(delay, Repeater.MIN_DELAY),
      Repeater.MAX_DELAY,
    )
    this.callback()
    const newDelay = Math.max(currDelay - 10, Repeater.MIN_DELAY)
    this.timeout = setTimeout(() => {
      this.run(newDelay)
    }, currDelay)
  }
  stop() {
    if (this.timeout === null) return
    clearTimeout(this.timeout)
  }
}
