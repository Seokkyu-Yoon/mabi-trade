import { TradeCenterName } from '@/data/trade.center'

const tabAll = '전체'
const tabTradeSimulation = '교역 시뮬레이션'
const tabProfitSimulation = '수익 시뮬레이션'

export type TabName =
  | typeof tabAll
  | typeof tabTradeSimulation
  | typeof tabProfitSimulation
  | TradeCenterName
