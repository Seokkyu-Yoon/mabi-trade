import { v4 as uuidv4 } from 'uuid'

export interface PopupMsg {
  id: ReturnType<typeof uuidv4>
  title?: string
  msgs: string[]
}
export class PopupEmitter {
  private static instance: PopupEmitter | null = null
  private callbacks: Set<(msgs: PopupMsg) => void> = new Set()

  private constructor() {
    PopupEmitter.instance = this
  }

  static getInstance() {
    if (PopupEmitter.instance === null) return new PopupEmitter()
    return PopupEmitter.instance
  }

  on(callback: (popupMsg: PopupMsg) => void) {
    this.callbacks.add(callback)
  }
  off(callback: (popupMsg: PopupMsg) => void) {
    this.callbacks.delete(callback)
  }
  emit(popupMsg: PopupMsg) {
    this.callbacks.forEach((callback) => callback(popupMsg))
  }
}
