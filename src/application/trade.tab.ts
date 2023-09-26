import { TradeCenterName } from '@/data/trade.center'
const tabAll = '전체'
const tabSimulation = '시뮬레이션'
export type TabName = typeof tabAll | typeof tabSimulation | TradeCenterName
