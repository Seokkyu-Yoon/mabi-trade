import { TradeItem, TradeItemName } from '@/data/trade.item'
import { useTradeStore } from '@/stores/trade'
import { simulatorPopupListener } from './popup.emitter'

export class TradeSimulator {
  tradeItems: Map<TradeItemName, number> = new Map()
  weight: number = 0
  slot: number = 0
  totalWeight: number = 0
  totalSlot: number = 0
  tradeStore = useTradeStore()

  setTotalWeight(totalWeight: number) {
    this.totalWeight = totalWeight
  }
  setTotalSlot(totalSlot: number) {
    this.totalSlot = totalSlot
  }
  getCount(tradeItemName: TradeItemName) {
    return this.tradeItems.get(tradeItemName) || 0
  }
  getTradeItems() {
    return Array.from(this.tradeItems.entries())
  }
  save() {
    this.tradeItems.forEach((count, tradeItemName) => {
      const savedCount = this.tradeStore.get(tradeItemName)
      this.tradeStore.set(tradeItemName, savedCount + count)
    })
    this.reset()
  }
  reset() {
    this.tradeItems = new Map()
    this.weight = 0
    this.slot = 0
  }
  overflowCount(tradeItem: TradeItem, newPocketCount: number) {
    return (
      newPocketCount + this.tradeStore.get(tradeItem.name) >
      tradeItem.weekendCount
    )
  }
  overflowWeight(tradeItem: TradeItem) {
    return this.weight + tradeItem.weight > this.totalWeight
  }
  overflowSlot(slotDiff: number) {
    return this.slot + slotDiff > this.totalSlot
  }

  addTradeItem(tradeItem: TradeItem) {
    const pocketCount = this.getCount(tradeItem.name)
    const newPocketCount = pocketCount + 1
    const slotDiff =
      Math.ceil(newPocketCount / tradeItem.slotCount) -
      Math.ceil(pocketCount / tradeItem.slotCount)
    if (this.overflowCount(tradeItem, newPocketCount)) {
      simulatorPopupListener.emit('주간 구매 횟수 초과')
      return
    }
    if (this.overflowWeight(tradeItem)) {
      simulatorPopupListener.emit('무게 초과')
      return
    }
    if (this.overflowSlot(slotDiff)) {
      simulatorPopupListener.emit('슬롯 초과')
      return
    }
    this.weight += tradeItem.weight
    this.slot += slotDiff
    this.tradeItems.set(tradeItem.name, newPocketCount)
  }
  subTradeItem(tradeItem: TradeItem) {
    const pocketCount = this.getCount(tradeItem.name)
    const newPocketCount = pocketCount - 1
    const slotDiff =
      Math.ceil(newPocketCount / tradeItem.slotCount) -
      Math.ceil(pocketCount / tradeItem.slotCount)
    if (newPocketCount < 0) return
    this.weight -= tradeItem.weight
    this.slot += slotDiff

    if (newPocketCount === 0) {
      this.tradeItems.delete(tradeItem.name)
    } else {
      this.tradeItems.set(tradeItem.name, newPocketCount)
    }
  }
}
