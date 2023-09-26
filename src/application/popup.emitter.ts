import { v4 as uuidv4 } from 'uuid'

export interface PopupMsg {
  id: ReturnType<typeof uuidv4>
  title?: string
  msgs: string[]
}
export class Emitter<T> {
  private callbacks: Set<(msgs: T) => void> = new Set()

  on(callback: (popupMsg: T) => void) {
    this.callbacks.add(callback)
  }
  off(callback: (popupMsg: T) => void) {
    this.callbacks.delete(callback)
  }
  emit(popupMsg: T) {
    this.callbacks.forEach((callback) => callback(popupMsg))
  }
}

export const sidePopupListener = new Emitter<PopupMsg>()
export const simulatorPopupListener = new Emitter<string>()
