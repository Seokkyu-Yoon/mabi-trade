export class Listener<T> {
  private callbacks: Set<(msgs: T) => void> = new Set()

  on(callback: (popupMsg: T) => void | Promise<void>): void {
    this.callbacks.add(callback)
  }
  off(callback: (popupMsg: T) => void | Promise<void>): void {
    this.callbacks.delete(callback)
  }
  emit(popupMsg: T): void {
    this.callbacks.forEach((callback) => callback(popupMsg))
  }
}
