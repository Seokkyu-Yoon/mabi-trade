import { v4 as uuidv4 } from 'uuid'

export interface PopupMsg {
  id: ReturnType<typeof uuidv4>
  title?: string
  msgs: string[]
}
export class PopupListener {
  private static instance: PopupListener | null = null
  private callbacks: Set<(msgs: PopupMsg) => void> = new Set()

  private constructor() {
    PopupListener.instance = this
  }

  static getInstance() {
    if (PopupListener.instance === null) return new PopupListener()
    return PopupListener.instance
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
