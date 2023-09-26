import { TradeItem, TradeItemCollection, TradeItemName } from './trade.item'

const tradeItemCollection = TradeItemCollection.getInstance()

const oasis = '오아시스'
const karuForest = '카루 숲'
const kalidaLake = '칼리다 호수'
const peraVolcano = '페라 화산'

export type TradeCenterName =
  | typeof oasis
  | typeof karuForest
  | typeof kalidaLake
  | typeof peraVolcano

export class TradeCenter {
  name: TradeCenterName
  tradeItems: Map<TradeItemName, TradeItem>

  private constructor(
    name: TradeCenterName,
    tradeItem: Map<TradeItemName, TradeItem>,
  ) {
    this.name = name
    this.tradeItems = tradeItem
  }

  getTradeItems(): TradeItem[] {
    return Array.from(this.tradeItems.values())
  }

  static Builder(name: TradeCenterName) {
    class B {
      private name: TradeCenterName = name
      private tradeItem: Map<TradeItemName, TradeItem> = new Map()

      addTradeItem(tradeItem: TradeItem) {
        this.tradeItem.set(tradeItem.name, tradeItem)
        return this
      }
      build() {
        return new TradeCenter(this.name, this.tradeItem)
      }
    }
    return new B()
  }
}

export class TradeCenterCollection {
  tradeCenters: Map<TradeCenterName, TradeCenter> = new Map()
  private static instance: TradeCenterCollection | null = null

  private constructor() {
    TradeCenterCollection.instance = this
  }

  static getInstance(): TradeCenterCollection {
    if (TradeCenterCollection.instance === null)
      return new TradeCenterCollection()
    return TradeCenterCollection.instance
  }

  get(name: TradeCenterName) {
    const tradeCenter = this.tradeCenters.get(name) || null
    if (tradeCenter === null) throw new Error("can't find trade cetner")
    return tradeCenter
  }

  add(tradeCenter: TradeCenter) {
    const name = tradeCenter.name
    if (this.tradeCenters.has(name))
      throw new Error('already assigned trade center')
    this.tradeCenters.set(name, tradeCenter)
    return this
  }

  getTradeCenters(): TradeCenter[] {
    return Array.from(this.tradeCenters.values())
  }
}

const tradeCenterOasis = TradeCenter.Builder('오아시스')
  .addTradeItem(tradeItemCollection.get('고운 모래'))
  .addTradeItem(tradeItemCollection.get('프리즌 고스트의 날개'))
  .addTradeItem(tradeItemCollection.get('오아시스 그림'))
  .addTradeItem(tradeItemCollection.get('선인장 꽃'))
  .addTradeItem(tradeItemCollection.get('거대 송곳니 화석'))
  .build()

const tradeCenterKaruForest = TradeCenter.Builder('카루 숲')
  .addTradeItem(tradeItemCollection.get('우드 테이블'))
  .addTradeItem(tradeItemCollection.get('목공예품'))
  .addTradeItem(tradeItemCollection.get('스톤 홀스 조각상'))
  .addTradeItem(tradeItemCollection.get('카루 표고 버섯'))
  .addTradeItem(tradeItemCollection.get('조개 껍질 화석'))
  .build()

const tradeCenterKalidaLake = TradeCenter.Builder('칼리다 호수')
  .addTradeItem(tradeItemCollection.get('맥반석 계란'))
  .addTradeItem(tradeItemCollection.get('칼리다 연어'))
  .addTradeItem(tradeItemCollection.get('온천 입욕제'))
  .addTradeItem(tradeItemCollection.get('대형 캠핑 텐트'))
  .addTradeItem(tradeItemCollection.get('핑크 솔트'))
  .build()

const tradeCenterPeraVolcano = TradeCenter.Builder('페라 화산')
  .addTradeItem(tradeItemCollection.get('화산 머드팩'))
  .addTradeItem(tradeItemCollection.get('마그마 스톤'))
  .addTradeItem(tradeItemCollection.get('익시온의 뿔'))
  .addTradeItem(tradeItemCollection.get('화산 도마뱀의 알'))
  .addTradeItem(tradeItemCollection.get('라스파 흑표범의 가죽'))
  .build()

TradeCenterCollection.getInstance()
  .add(tradeCenterOasis)
  .add(tradeCenterKaruForest)
  .add(tradeCenterKalidaLake)
  .add(tradeCenterPeraVolcano)
