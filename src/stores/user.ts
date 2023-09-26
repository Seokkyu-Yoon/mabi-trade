import { TradePartnerType } from '@/data/trade.partner'
import { TradeVehicleName } from '@/data/trade.vehicle'
import { defineStore } from 'pinia'

const ID = 'user'
const VERSION = 'v0.2'

class Record {
  grandMasterMerchant: boolean = false
  tradePartnerType: TradePartnerType = '없음'
  tradeVehicleName: TradeVehicleName = '등짐'
}
interface StoreParams {
  version: string
  record: Record
}
class StoreData {
  version: string = VERSION
  record: Record = new Record()

  constructor(params?: StoreParams) {
    this.version = params?.version || VERSION
    this.record = params?.record || new Record()
  }

  toJson(): {
    version: string
    record: Record
  } {
    return {
      version: this.version,
      record: this.record,
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

export const useUserStore = defineStore(ID, {
  state() {
    const tradeData = loadFromStorage()
    saveToStorage(tradeData)
    return {
      version: tradeData.version,
      record: tradeData.record,
    }
  },
  actions: {
    reset() {
      removeFromStorage()
      Object.assign(this, loadFromStorage())
    },
    setGrandMasterMerchant(use: boolean) {
      this.record.grandMasterMerchant = use
      saveToStorage(new StoreData(this))
    },
    setTradePartnerType(tradePartnerType: TradePartnerType) {
      this.record.tradePartnerType = tradePartnerType
      saveToStorage(new StoreData(this))
    },
    setTradeVehicleName(tradeVehicleName: TradeVehicleName) {
      this.record.tradeVehicleName = tradeVehicleName
      saveToStorage(new StoreData(this))
    },
  },
})
