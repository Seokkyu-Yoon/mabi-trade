import { Place } from '@/vite-env'
import { Item, ItemCollection, ItemName } from './item'

const itemCollection = ItemCollection.getInstance()

const oasis1 = '고운 모래'
const oasis2 = '프리즌 고스트의 날개'
const oasis3 = '오아시스 그림'
const oasis4 = '선인장 꽃'
const oasis5 = '거대 송곳니 화석'

const karuForest1 = '우드 테이블'
const karuForest2 = '목공예품'
const karuForest3 = '스톤 홀스 조각상'
const karuForest4 = '카루 표고 버섯'
const karuForest5 = '조개 껍질 화석'

const kalidaLake1 = '맥반석 계란'
const kalidaLake2 = '칼리다 연어'
const kalidaLake3 = '온천 입욕제'
const kalidaLake4 = '대형 캠핑 텐트'
const kalidaLake5 = '핑크 솔트'

const peraVolcano1 = '화산 머드팩'
const peraVolcano2 = '마그마 스톤'
const peraVolcano3 = '익시온의 뿔'
const peraVolcano4 = '화산 도마뱀의 알'
const peraVolcano5 = '라스파 흑표범의 가죽'

export type TradeName =
  | typeof oasis1
  | typeof oasis2
  | typeof oasis3
  | typeof oasis4
  | typeof oasis5
  | typeof karuForest1
  | typeof karuForest2
  | typeof karuForest3
  | typeof karuForest4
  | typeof karuForest5
  | typeof kalidaLake1
  | typeof kalidaLake2
  | typeof kalidaLake3
  | typeof kalidaLake4
  | typeof kalidaLake5
  | typeof peraVolcano1
  | typeof peraVolcano2
  | typeof peraVolcano3
  | typeof peraVolcano4
  | typeof peraVolcano5

export class TradeCenter {
  place: Place
  tradeInfos: Map<TradeName, TradeInfo>

  private constructor(place: Place, tradeInfo: Map<TradeName, TradeInfo>) {
    this.place = place
    this.tradeInfos = tradeInfo
  }
  static Builder() {
    class B {
      private place!: Place
      private tradeInfo: Map<TradeName, TradeInfo> = new Map()

      setPlace(place: Place) {
        this.place = place
        return this
      }
      addTradeInfo(tradeInfo: TradeInfo) {
        this.tradeInfo.set(tradeInfo.name, tradeInfo)
        return this
      }
      build() {
        return new TradeCenter(this.place, this.tradeInfo)
      }
    }
    return new B()
  }
}

export class TradeInfo {
  name: TradeName
  weight: number
  slotCount: number
  weekendCount: number
  items: Map<ItemName, number>

  private constructor(
    name: TradeName,
    weight: number,
    slotCount: number,
    weekendCount: number,
    items: Map<ItemName, number>,
  ) {
    this.name = name
    this.weight = weight
    this.slotCount = slotCount
    this.weekendCount = weekendCount
    this.items = items
  }

  public static Builder() {
    class B {
      private name!: TradeName
      private weight!: number
      private slotCount!: number
      private weekendCount!: number
      private items: Map<ItemName, number> = new Map()

      setName(name: TradeName) {
        this.name = name
        return this
      }
      setWeight(weight: number) {
        this.weight = weight
        return this
      }
      setSlotCount(slotCount: number) {
        this.slotCount = slotCount
        return this
      }
      setWeekendCount(weekendCount: number) {
        this.weekendCount = weekendCount
        return this
      }
      addItem(item: Item, count: number) {
        this.items.set(item.name, count)
        return this
      }
      build(): TradeInfo {
        return new TradeInfo(
          this.name,
          this.weight,
          this.slotCount,
          this.weekendCount,
          this.items,
        )
      }
    }
    return new B()
  }
}

export class TradeCenterCollection {
  tradeCenters: Map<Place, TradeCenter> = new Map()
  private static instance: TradeCenterCollection | null = null

  private constructor() {
    TradeCenterCollection.instance = this
  }

  static getInstance(): TradeCenterCollection {
    if (TradeCenterCollection.instance === null)
      return new TradeCenterCollection()
    return TradeCenterCollection.instance
  }

  get(place: Place) {
    const tradeCenter = this.tradeCenters.get(place) || null
    if (tradeCenter === null) throw new Error("can't find trade cetner")
    return tradeCenter
  }

  add(tradeCenter: TradeCenter) {
    const place = tradeCenter.place
    if (this.tradeCenters.has(place))
      throw new Error('already assigned trade center')
    this.tradeCenters.set(place, tradeCenter)
    return this
  }
}

const tradeCenterOasis = TradeCenter.Builder()
  .setPlace('oasis')
  .addTradeInfo(
    TradeInfo.Builder()
      .setName(oasis1)
      .setWeekendCount(25)
      .setSlotCount(10)
      .setWeight(15)
      .addItem(itemCollection.get('스태미나 500 포션'), 3)
      .addItem(itemCollection.get('매듭끈'), 2)
      .build(),
  )
  .addTradeInfo(
    TradeInfo.Builder()
      .setName(oasis2)
      .setWeekendCount(15)
      .setSlotCount(7)
      .setWeight(15)
      .addItem(itemCollection.get('쿠션용 솜'), 1)
      .addItem(itemCollection.get('최고급 실크'), 2)
      .build(),
  )
  .addTradeInfo(
    TradeInfo.Builder()
      .setName(oasis3)
      .setWeekendCount(10)
      .setSlotCount(7)
      .setWeight(20)
      .addItem(itemCollection.get('최고급 가죽끈'), 1)
      .addItem(itemCollection.get('질긴 실'), 2)
      .build(),
  )
  .addTradeInfo(
    TradeInfo.Builder()
      .setName(oasis4)
      .setWeekendCount(8)
      .setSlotCount(7)
      .setWeight(25)
      .addItem(itemCollection.get('정령의 리큐르'), 1)
      .addItem(itemCollection.get('은판'), 2)
      .addItem(itemCollection.get('고급 옷감'), 4)
      .build(),
  )
  .addTradeInfo(
    TradeInfo.Builder()
      .setName(oasis5)
      .setWeekendCount(3)
      .setSlotCount(5)
      .setWeight(30)
      .addItem(itemCollection.get('펫 놀이세트'), 1)
      .addItem(itemCollection.get('건초 더미'), 3)
      .addItem(itemCollection.get('마력이 깃든 장작'), 5)
      .build(),
  )
  .build()

const tradeCenterKaruForest = TradeCenter.Builder()
  .setPlace('karuForest')
  .addTradeInfo(
    TradeInfo.Builder()
      .setName(karuForest1)
      .setWeekendCount(25)
      .setSlotCount(10)
      .setWeight(15)
      .addItem(itemCollection.get('새우 조련 미끼'), 4)
      .addItem(itemCollection.get('실리엔'), 2)
      .build(),
  )
  .addTradeInfo(
    TradeInfo.Builder()
      .setName(karuForest2)
      .setWeekendCount(15)
      .setSlotCount(7)
      .setWeight(15)
      .addItem(itemCollection.get('마법의 양피지'), 1)
      .addItem(itemCollection.get('질긴 끈'), 2)
      .build(),
  )
  .addTradeInfo(
    TradeInfo.Builder()
      .setName(karuForest3)
      .setWeekendCount(10)
      .setSlotCount(7)
      .setWeight(20)
      .addItem(itemCollection.get('힐웬 합금'), 2)
      .addItem(itemCollection.get('밀가루'), 5)
      .build(),
  )
  .addTradeInfo(
    TradeInfo.Builder()
      .setName(karuForest4)
      .setWeekendCount(8)
      .setSlotCount(7)
      .setWeight(25)
      .addItem(itemCollection.get('스핀 기어'), 1)
      .addItem(itemCollection.get('중급 나무장작'), 5)
      .addItem(itemCollection.get('고급 실크'), 4)
      .build(),
  )
  .addTradeInfo(
    TradeInfo.Builder()
      .setName(karuForest5)
      .setWeekendCount(3)
      .setSlotCount(5)
      .setWeight(30)
      .addItem(itemCollection.get('에너지 증폭장치'), 2)
      .addItem(itemCollection.get('튼튼한 고리'), 1)
      .addItem(itemCollection.get('마법의 깃털펜'), 5)
      .build(),
  )
  .build()

const tradeCenterKalidaLake = TradeCenter.Builder()
  .setPlace('kalidaLake')
  .addTradeInfo(
    TradeInfo.Builder()
      .setName(kalidaLake1)
      .setWeekendCount(25)
      .setSlotCount(10)
      .setWeight(15)
      .addItem(itemCollection.get('마나 500 포션'), 1)
      .addItem(itemCollection.get('고급 나무장작'), 2)
      .build(),
  )
  .addTradeInfo(
    TradeInfo.Builder()
      .setName(kalidaLake2)
      .setWeekendCount(15)
      .setSlotCount(7)
      .setWeight(15)
      .addItem(itemCollection.get('에너지 컨버터'), 1)
      .addItem(itemCollection.get('정화된 토끼의 발'), 1)
      .build(),
  )
  .addTradeInfo(
    TradeInfo.Builder()
      .setName(kalidaLake3)
      .setWeekendCount(10)
      .setSlotCount(7)
      .setWeight(20)
      .addItem(itemCollection.get('에너지 컨버터'), 1)
      .addItem(itemCollection.get('정화된 토끼의 발'), 1)
      .build(),
  )
  .addTradeInfo(
    TradeInfo.Builder()
      .setName(kalidaLake4)
      .setWeekendCount(8)
      .setSlotCount(7)
      .setWeight(25)
      .addItem(itemCollection.get('인조 잔디'), 1)
      .addItem(itemCollection.get('에메랄드 퓨즈'), 1)
      .addItem(itemCollection.get('고급 가죽끈'), 5)
      .build(),
  )
  .addTradeInfo(
    TradeInfo.Builder()
      .setName(kalidaLake5)
      .setWeekendCount(3)
      .setSlotCount(5)
      .setWeight(30)
      .addItem(itemCollection.get('미스릴 대못'), 3)
      .addItem(itemCollection.get('발리스타용 독 묻은 와이번 볼트'), 3)
      .addItem(itemCollection.get('최고급 나무장작'), 3)
      .build(),
  )
  .build()

const tradeCenterPeraVolcano = TradeCenter.Builder()
  .setPlace('peraVolcano')
  .addTradeInfo(
    TradeInfo.Builder()
      .setName(peraVolcano1)
      .setWeekendCount(25)
      .setSlotCount(10)
      .setWeight(15)
      .addItem(itemCollection.get('동판'), 2)
      .addItem(itemCollection.get('신비한 허브가루'), 3)
      .build(),
  )
  .addTradeInfo(
    TradeInfo.Builder()
      .setName(peraVolcano2)
      .setWeekendCount(15)
      .setSlotCount(7)
      .setWeight(15)
      .addItem(itemCollection.get('미스릴판'), 2)
      .addItem(itemCollection.get('보릿가루'), 3)
      .build(),
  )
  .addTradeInfo(
    TradeInfo.Builder()
      .setName(peraVolcano3)
      .setWeekendCount(10)
      .setSlotCount(7)
      .setWeight(20)
      .addItem(itemCollection.get('마리오네트 500 포션'), 3)
      .addItem(itemCollection.get('금판'), 5)
      .build(),
  )
  .addTradeInfo(
    TradeInfo.Builder()
      .setName(peraVolcano4)
      .setWeekendCount(8)
      .setSlotCount(7)
      .setWeight(25)
      .addItem(itemCollection.get('빤짝이 종이'), 5)
      .addItem(itemCollection.get('최고급 옷감'), 5)
      .addItem(itemCollection.get('생명력 500 포션'), 2)
      .build(),
  )
  .addTradeInfo(
    TradeInfo.Builder()
      .setName(peraVolcano5)
      .setWeekendCount(3)
      .setSlotCount(5)
      .setWeight(30)
      .addItem(itemCollection.get('뮤턴트'), 1)
      .addItem(itemCollection.get('조화의 코스모스 퍼퓸'), 2)
      .addItem(itemCollection.get('특급 나무장작'), 3)
      .build(),
  )
  .build()

TradeCenterCollection.getInstance()
  .add(tradeCenterOasis)
  .add(tradeCenterKaruForest)
  .add(tradeCenterKalidaLake)
  .add(tradeCenterPeraVolcano)
