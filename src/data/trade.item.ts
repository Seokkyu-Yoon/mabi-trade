import { Item, ItemCollection, ItemName } from './item'

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

export type TradeItemName =
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

export class TradeItem {
  name: TradeItemName
  weight: number
  slotCount: number
  weekendCount: number
  items: Map<ItemName, number>

  private constructor(
    name: TradeItemName,
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

  public static Builder(name: TradeItemName) {
    class B {
      private name: TradeItemName = name
      private weight!: number
      private slotCount!: number
      private weekendCount!: number
      private items: Map<ItemName, number> = new Map()

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
      build(): TradeItem {
        return new TradeItem(
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

export class TradeItemCollection {
  tradeItems: Map<TradeItemName, TradeItem> = new Map()
  private static instance: TradeItemCollection | null = null

  private constructor() {
    TradeItemCollection.instance = this
  }

  static getInstance(): TradeItemCollection {
    if (TradeItemCollection.instance === null) return new TradeItemCollection()
    return TradeItemCollection.instance
  }

  get(name: TradeItemName) {
    const tradeItem = this.tradeItems.get(name) || null
    if (tradeItem === null) throw new Error("can't find trade item")
    return tradeItem
  }

  add(tradeItem: TradeItem) {
    const name = tradeItem.name
    if (this.tradeItems.has(name)) throw new Error('already assigned item')
    this.tradeItems.set(name, tradeItem)
    return this
  }

  getTradeItems(): TradeItem[] {
    return Array.from(this.tradeItems.values())
  }
}

const itemCollection = ItemCollection.getInstance()

const tradeItemOasis1 = TradeItem.Builder('고운 모래')
  .setWeekendCount(25)
  .setSlotCount(10)
  .setWeight(15)
  .addItem(itemCollection.get('스태미나 500 포션'), 3)
  .addItem(itemCollection.get('매듭끈'), 2)
  .build()
const tradeItemOasis2 = TradeItem.Builder('프리즌 고스트의 날개')
  .setWeekendCount(15)
  .setSlotCount(7)
  .setWeight(15)
  .addItem(itemCollection.get('쿠션용 솜'), 1)
  .addItem(itemCollection.get('최고급 실크'), 2)
  .build()
const tradeItemOasis3 = TradeItem.Builder('오아시스 그림')
  .setWeekendCount(10)
  .setSlotCount(7)
  .setWeight(20)
  .addItem(itemCollection.get('최고급 가죽끈'), 1)
  .addItem(itemCollection.get('질긴 실'), 2)
  .build()
const tradeItemOasis4 = TradeItem.Builder('선인장 꽃')
  .setWeekendCount(8)
  .setSlotCount(7)
  .setWeight(25)
  .addItem(itemCollection.get('정령의 리큐르'), 1)
  .addItem(itemCollection.get('은판'), 2)
  .addItem(itemCollection.get('고급 옷감'), 4)
  .build()
const tradeItemOasis5 = TradeItem.Builder('거대 송곳니 화석')
  .setWeekendCount(3)
  .setSlotCount(5)
  .setWeight(30)
  .addItem(itemCollection.get('펫 놀이세트'), 1)
  .addItem(itemCollection.get('건초 더미'), 3)
  .addItem(itemCollection.get('마력이 깃든 장작'), 5)
  .build()

const tradeItemKaruForest1 = TradeItem.Builder('우드 테이블')
  .setWeekendCount(25)
  .setSlotCount(10)
  .setWeight(15)
  .addItem(itemCollection.get('새우 조련 미끼'), 4)
  .addItem(itemCollection.get('실리엔'), 2)
  .build()
const tradeItemKaruForest2 = TradeItem.Builder('목공예품')
  .setWeekendCount(15)
  .setSlotCount(7)
  .setWeight(15)
  .addItem(itemCollection.get('마법의 양피지'), 1)
  .addItem(itemCollection.get('질긴 끈'), 2)
  .build()
const tradeItemKaruForest3 = TradeItem.Builder('스톤 홀스 조각상')
  .setWeekendCount(10)
  .setSlotCount(7)
  .setWeight(20)
  .addItem(itemCollection.get('힐웬 합금'), 2)
  .addItem(itemCollection.get('밀가루'), 5)
  .build()
const tradeItemKaruForest4 = TradeItem.Builder('카루 표고 버섯')
  .setWeekendCount(8)
  .setSlotCount(7)
  .setWeight(25)
  .addItem(itemCollection.get('스핀 기어'), 1)
  .addItem(itemCollection.get('중급 나무장작'), 5)
  .addItem(itemCollection.get('고급 실크'), 4)
  .build()
const tradeItemKaruForest5 = TradeItem.Builder('조개 껍질 화석')
  .setWeekendCount(3)
  .setSlotCount(5)
  .setWeight(30)
  .addItem(itemCollection.get('에너지 증폭장치'), 2)
  .addItem(itemCollection.get('튼튼한 고리'), 1)
  .addItem(itemCollection.get('마법의 깃털펜'), 5)
  .build()

const tradeItemKalidaLake1 = TradeItem.Builder('맥반석 계란')
  .setWeekendCount(25)
  .setSlotCount(10)
  .setWeight(15)
  .addItem(itemCollection.get('마나 500 포션'), 1)
  .addItem(itemCollection.get('고급 나무장작'), 2)
  .build()
const tradeItemKalidaLake2 = TradeItem.Builder('칼리다 연어')
  .setWeekendCount(15)
  .setSlotCount(7)
  .setWeight(15)
  .addItem(itemCollection.get('에너지 컨버터'), 1)
  .addItem(itemCollection.get('정화된 토끼의 발'), 1)
  .build()
const tradeItemKalidaLake3 = TradeItem.Builder('온천 입욕제')
  .setWeekendCount(10)
  .setSlotCount(7)
  .setWeight(20)
  .addItem(itemCollection.get('끈끈이 풀'), 3)
  .addItem(itemCollection.get('최고급 바닐라 향초'), 2)
  .build()
const tradeItemKalidaLake4 = TradeItem.Builder('대형 캠핑 텐트')
  .setWeekendCount(8)
  .setSlotCount(7)
  .setWeight(25)
  .addItem(itemCollection.get('인조 잔디'), 1)
  .addItem(itemCollection.get('에메랄드 퓨즈'), 1)
  .addItem(itemCollection.get('고급 가죽끈'), 5)
  .build()
const tradeItemKalidaLake5 = TradeItem.Builder('핑크 솔트')
  .setWeekendCount(3)
  .setSlotCount(5)
  .setWeight(30)
  .addItem(itemCollection.get('미스릴 대못'), 3)
  .addItem(itemCollection.get('발리스타용 독 묻은 와이번 볼트'), 3)
  .addItem(itemCollection.get('최고급 나무장작'), 3)
  .build()

const tradeItemPeraVolcano1 = TradeItem.Builder('화산 머드팩')
  .setWeekendCount(25)
  .setSlotCount(10)
  .setWeight(15)
  .addItem(itemCollection.get('동판'), 2)
  .addItem(itemCollection.get('신비한 허브가루'), 3)
  .build()
const tradeItemPeraVolcano2 = TradeItem.Builder('마그마 스톤')
  .setWeekendCount(15)
  .setSlotCount(7)
  .setWeight(15)
  .addItem(itemCollection.get('미스릴판'), 2)
  .addItem(itemCollection.get('보릿가루'), 3)
  .build()
const tradeItemPeraVolcano3 = TradeItem.Builder('익시온의 뿔')
  .setWeekendCount(10)
  .setSlotCount(7)
  .setWeight(20)
  .addItem(itemCollection.get('마리오네트 500 포션'), 3)
  .addItem(itemCollection.get('금판'), 5)
  .build()
const tradeItemPeraVolcano4 = TradeItem.Builder('화산 도마뱀의 알')
  .setWeekendCount(8)
  .setSlotCount(7)
  .setWeight(25)
  .addItem(itemCollection.get('빤짝이 종이'), 5)
  .addItem(itemCollection.get('최고급 옷감'), 5)
  .addItem(itemCollection.get('생명력 500 포션'), 2)
  .build()
const tradeItemPeraVolcano5 = TradeItem.Builder('라스파 흑표범의 가죽')
  .setWeekendCount(3)
  .setSlotCount(5)
  .setWeight(30)
  .addItem(itemCollection.get('뮤턴트'), 1)
  .addItem(itemCollection.get('조화의 코스모스 퍼퓸'), 2)
  .addItem(itemCollection.get('특급 나무장작'), 3)
  .build()

TradeItemCollection.getInstance()
  .add(tradeItemOasis1)
  .add(tradeItemOasis2)
  .add(tradeItemOasis3)
  .add(tradeItemOasis4)
  .add(tradeItemOasis5)

  .add(tradeItemKaruForest1)
  .add(tradeItemKaruForest2)
  .add(tradeItemKaruForest3)
  .add(tradeItemKaruForest4)
  .add(tradeItemKaruForest5)

  .add(tradeItemKalidaLake1)
  .add(tradeItemKalidaLake2)
  .add(tradeItemKalidaLake3)
  .add(tradeItemKalidaLake4)
  .add(tradeItemKalidaLake5)

  .add(tradeItemPeraVolcano1)
  .add(tradeItemPeraVolcano2)
  .add(tradeItemPeraVolcano3)
  .add(tradeItemPeraVolcano4)
  .add(tradeItemPeraVolcano5)
