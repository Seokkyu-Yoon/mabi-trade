import { v4 as uuidv4 } from 'uuid'

export interface PopupMsg {
  id: ReturnType<typeof uuidv4>
  title?: string
  msgs: string[]
}
export class SidePopupListener {
  private static instance: SidePopupListener | null = null
  private callbacks: Set<(msgs: PopupMsg) => void> = new Set()

  private constructor() {
    SidePopupListener.instance = this
  }

  static getInstance() {
    if (SidePopupListener.instance === null) return new SidePopupListener()
    return SidePopupListener.instance
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
