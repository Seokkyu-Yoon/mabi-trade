import { TradeItemName } from '@/data/trade.item'
import { defineStore } from 'pinia'

const ID = 'tradeStore'
const VERSION = 'v0.2'

type Record = [TradeItemName, number]
interface StoreParams {
  version: string
  records: Record[]
}
class StoreData {
  version: string = VERSION
  records: Map<TradeItemName, number> = new Map()

  constructor(params?: StoreParams) {
    this.version = params?.version || VERSION
    this.records = new Map(params?.records || [])
  }

  toJson(): {
    version: string
    records: Record[]
  } {
    const records: Record[] = Array.from(this.records.entries())
    return {
      version: this.version,
      records,
    }
  }
}

function loadFromStorage(): StoreData {
  const strTradeData = window.localStorage.getItem(ID)
  if (strTradeData === null) {
    return new StoreData()
  }
  const tradeData: StoreData = new StoreData(JSON.parse(strTradeData))
  if (tradeData.version !== VERSION) {
    return new StoreData()
  }
  return tradeData
}
function saveToStorage(tradeData: StoreData) {
  window.localStorage.setItem(ID, JSON.stringify(tradeData.toJson()))
}
function removeFromStorage() {
  window.localStorage.removeItem(ID)
}

export const useTradeStore = defineStore(ID, {
  state: () => {
    const tradeData = loadFromStorage()
    saveToStorage(tradeData)
    return {
      version: tradeData.version,
      records: tradeData.records,
    }
  },
  actions: {
    reset() {
      removeFromStorage()
      Object.assign(this, loadFromStorage())
    },
    get(tradeItemName: TradeItemName): number {
      return this.records.get(tradeItemName) || 0
    },
    set(tradeItemName: TradeItemName, count: number) {
      this.records.set(tradeItemName, count)

      const version = this.version
      const records: Record[] = Array.from(this.records.entries())
      saveToStorage(new StoreData({ version, records }))
    },
  },
})
