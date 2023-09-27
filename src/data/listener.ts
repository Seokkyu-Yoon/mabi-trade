import { v4 as uuidv4 } from 'uuid'

import { Listener } from '@/application/listener'

export interface PopupMsg {
  id: ReturnType<typeof uuidv4>
  title?: string
  msgs: string[]
}

export const sidePopupListener = new Listener<PopupMsg>()
export const simulatorPopupListener = new Listener<string>()
