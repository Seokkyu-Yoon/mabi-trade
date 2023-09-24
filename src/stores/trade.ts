import { TradeName } from '@/data/trade.center'
import { Place } from '@/vite-env'
import { defineStore } from 'pinia'

const ID = 'tradeStore'
const VERSION = 'v0.1'

class TradeData {
  version: string = VERSION
  records: Map<Place, Map<TradeName, number>> = new Map()

  constructor({
    version,
    records,
  }: {
    version: string
    records: [Place, [TradeName, number][]][]
  }) {
    if (version !== VERSION) {
      return new TradeData({ version: VERSION, records: [] })
    }
    this.records = new Map(
      records.map(([place, record]) => {
        const map: Map<TradeName, number> = new Map(record)
        return [place, map]
      }),
    )
  }

  toJson(): { version: string; records: [Place, [TradeName, number][]][] } {
    const records: [Place, [TradeName, number][]][] = []
    this.records.forEach((record, place) => {
      const arr: [TradeName, number][] = []
      record.forEach((count, tradeName) => {
        arr.push([tradeName, count])
      })
      records.push([place, arr])
    })
    return {
      version: this.version,
      records,
    }
  }
}

function loadFromStorage(): TradeData {
  const tradeData = new TradeData(
    JSON.parse(
      window.localStorage.getItem(ID) ||
        JSON.stringify(
          new TradeData({ version: VERSION, records: [] }).toJson(),
        ),
    ),
  )
  return tradeData
}
function saveToStorage(tradeData: TradeData) {
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
    get(place: Place, tradeName: TradeName): number {
      const record = this.records.get(place)
      return record?.get(tradeName) || 0
    },
    set(place: Place, tradeName: TradeName, count: number) {
      if (!this.records.has(place)) this.records.set(place, new Map())
      const record = this.records.get(place)
      record?.set(tradeName, count)

      const version = this.version
      const records: [Place, [TradeName, number][]][] = []
      this.records.forEach((record, place) => {
        const arr: [TradeName, number][] = []
        record.forEach((count, tradeName) => {
          arr.push([tradeName, count])
        })
        records.push([place, arr])
      })
      saveToStorage(new TradeData({ version, records }))
    },
  },
})
