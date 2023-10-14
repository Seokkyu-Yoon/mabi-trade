const stamina500 = '스태미나 500 포션'
const knotString = '매듭끈'
const cottonForCusion = '쿠션용 솜'
const finestSilk = '최고급 실크'
const finestLeatherString = '최고급 가죽끈'
const toughThread = '질긴 실'
const liqueurOfSprit = '정령의 리큐르'
const silverBoard = '은판'
const highFabric = '고급 옷감'
const petPlaySet = '펫 놀이세트'
const hayStack = '건초 더미'
const magicalFirewood = '마력이 깃든 장작'

const shrimpSteamedBait = '새우 조련 미끼'
const silien = '실리엔'
const magicalParchment = '마법의 양피지'
const toughString = '질긴 끈'
const hillwenAlloy = '힐웬 합금'
const flour = '밀가루'
const spinGear = '스핀 기어'
const intermediateFireWood = '중급 나무장작'
const highSilk = '고급 실크'
const energyAmplifier = '에너지 증폭장치'
const strongRing = '튼튼한 고리'
const magicalFeatherPen = '마법의 깃털펜'

const mana500 = '마나 500 포션'
const highFirewood = '고급 나무장작'
const energyConverter = '에너지 컨버터'
const purifiedRabbitFeet = '정화된 토끼의 발'
const stickyGrass = '끈끈이 풀'
const finestVanillaCandle = '최고급 바닐라 향초'
const artificialGrass = '인조 잔디'
const emeraldFuse = '에메랄드 퓨즈'
const highLeatherString = '고급 가죽끈'
const mithrilNail = '미스릴 대못'
const poisonedWyvernBoltForBallista = '발리스타용 독 묻은 와이번 볼트'
const finestFirewood = '최고급 나무장작'

const bronzeBoard = '동판'
const mysteriousHerbPowder = '신비한 허브가루'
const mithrilBoard = '미스릴판'
const barleyFlour = '보릿가루'
const marionet500 = '마리오네트 500 포션'
const goldBoard = '금판'
const twinklePaper = '빤짝이 종이'
const finestFabric = '최고급 옷감'
const life500 = '생명력 500 포션'
const mutant = '뮤턴트'
const cosmosPerfumeOfArtificialFlowers = '조화의 코스모스 퍼퓸'
const specialFirewood = '특급 나무장작'

export type ItemName =
  | typeof stamina500
  | typeof knotString
  | typeof cottonForCusion
  | typeof finestSilk
  | typeof finestLeatherString
  | typeof toughThread
  | typeof liqueurOfSprit
  | typeof silverBoard
  | typeof highFabric
  | typeof petPlaySet
  | typeof hayStack
  | typeof magicalFirewood
  | typeof shrimpSteamedBait
  | typeof silien
  | typeof magicalParchment
  | typeof toughString
  | typeof hillwenAlloy
  | typeof flour
  | typeof spinGear
  | typeof intermediateFireWood
  | typeof highSilk
  | typeof energyAmplifier
  | typeof strongRing
  | typeof magicalFeatherPen
  | typeof mana500
  | typeof highFirewood
  | typeof energyConverter
  | typeof purifiedRabbitFeet
  | typeof stickyGrass
  | typeof finestVanillaCandle
  | typeof artificialGrass
  | typeof emeraldFuse
  | typeof highLeatherString
  | typeof mithrilNail
  | typeof poisonedWyvernBoltForBallista
  | typeof finestFirewood
  | typeof bronzeBoard
  | typeof mysteriousHerbPowder
  | typeof mithrilBoard
  | typeof barleyFlour
  | typeof marionet500
  | typeof goldBoard
  | typeof twinklePaper
  | typeof finestFabric
  | typeof life500
  | typeof mutant
  | typeof cosmosPerfumeOfArtificialFlowers
  | typeof specialFirewood

export class Item {
  name: ItemName
  descriptions: string[]
  children: Set<Item>

  private constructor(
    name: ItemName,
    descriptions: string[],
    children: Set<Item>,
  ) {
    this.name = name
    this.descriptions = descriptions.length === 0 ? ['이하 생략'] : descriptions
    this.children = children
  }

  static Builder(name: ItemName) {
    class B {
      name: ItemName = name
      descriptions: string[] = []
      children: Set<Item> = new Set()

      addChild(item: Item) {
        this.children.add(item)
        return this
      }
      addDescription(...descriptions: string[]) {
        this.descriptions.push(descriptions.join('\n'))
        return this
      }
      build() {
        return new Item(this.name, this.descriptions, this.children)
      }
    }
    return new B()
  }
}

export class ItemCollection {
  items: Map<ItemName, Item> = new Map()
  private static instance: ItemCollection | null = null

  private constructor() {
    ItemCollection.instance = this
  }

  static getInstance(): ItemCollection {
    if (ItemCollection.instance === null) return new ItemCollection()
    return ItemCollection.instance
  }

  get(name: ItemName) {
    const item = this.items.get(name) || null
    if (item === null) throw new Error("can't find item")
    return item
  }

  add(item: Item) {
    const name = item.name
    if (this.items.has(name)) throw new Error('already assigned item')
    this.items.set(name, item)
    return this
  }
}

const itemStamina500 = Item.Builder(stamina500)
  .addDescription('힐러집 아르바이트')
  .addDescription('포션조제: 스태미나 300포션(1), 물이 든 병(1), 네잎클로버(1)')
  .build()
const itemKnotString = Item.Builder(knotString)
  .addDescription('의류점 아르바이트')
  .addDescription('방직: 가는 실(1), 굵은 실(1)')
  .build()
const itemCottonForCusion = Item.Builder(cottonForCusion)
  .addDescription('핸디크래프트: 가는 실(5), 고급 양털(20)')
  .build()
const itemFinestSilk = Item.Builder(finestSilk)
  .addDescription('의류점 아르바이트')
  .addDescription('방직: 가는 실(6)')
  .build()
const itemFinestLeatherString = Item.Builder(finestLeatherString)
  .addDescription(
    '최고급 가죽',
    '- 타라: 그림자가 드리운 도시 고급/하드/엘리트',
  )
  .build()
const itemToughThread = Item.Builder(toughThread)
  .addDescription('인형공방 아르바이트')
  .addDescription('방직: 가는 실(5)')
  .build()
const itemLiqueurOfSprit = Item.Builder(liqueurOfSprit)
  .addDescription(
    '포션 조제: 화이트허브(1), 고대 정령의 화석 조각(1), 엘리멘탈 리무버(2)',
    '- 고대 정령의 화석 조각: 아이데른: 고대 정령의 화석 정련',
    '  - 고대 정령의 화석: 반호르 길모어가 판매하는 정령 던전',
    '- 엘리멘탈 리무버: 라사(티르코네일), 스튜어트(던바튼), 갈빈(이멘마하) / 알비 상급 스파이더 드랍',
  )
  .build()
const itemSilverBoard = Item.Builder(silverBoard)
  .addDescription('대장간 아르바이트')
  .addDescription('제련: 은괴(1)')
  .addDescription('금속변환: 동괴(4)')
  .build()
const itemHighFabric = Item.Builder(highFabric)
  .addDescription('의류점 아르바이트')
  .addDescription('방직: 굵은 실(5)')
  .build()
const itemPetPlaySet = Item.Builder(petPlaySet)
  .addDescription(
    '핀즈 크래프트: 펫이 좋아하는 잡동사니(1), 나무판(1)',
    '- 펫이 좋아하는 잡동사니: 금박 솔방울(20)',
    '- 나무판',
    '  - 등대 아르바이트',
    '  - 핸디 크래프트: 나무장작(5), 대못(5), 철봉(2), 질긴끈(2)',
  )
  .build()
const itemHayStack = Item.Builder(hayStack)
  .addDescription(
    '핸디 크래프트: 최고급 가죽끈(1), 못 쓰게 된 밀 이파리(20)',
    '- 최고급 가죽끈',
    '  - 방직: 최고급 가죽',
    '- 못 쓰게 된 밀 이파리',
    '  - 밀 추수',
  )
  .build()
const itemMagicalFirewood = Item.Builder(magicalFirewood)
  .addDescription(
    '매직 크래프트: 중급 나무장작(1), 실리엔(1), 힐웬(1)',
    '- 중급 나무장작: 두갈드 아일(벌목캠프) 아르바이트 / 모탕 벌목 / 목공',
    '- 실리엔: 매직 크래프트: 실리엔 결정(5)',
    '- 힐웬: 힐웬 공학: 힐웬 광석 조각(5)',
  )
  .build()

const itemShrimpSteamedBait = Item.Builder(shrimpSteamedBait)
  .addDescription('요리(반죽): 새우(1), 설탕(1), 마늘(1)')
  .build()
const itemSilien = Item.Builder(silien)
  .addDescription('매직 크래프트: 실리엔 결정(5)')
  .build()
const itemMagicalParchment = Item.Builder(magicalParchment)
  .addDescription('서점 아르바이트')
  .addDescription(
    '필기구 크래프트: 부드러운 양피지(1), 마나 허브(10), 선라이트 허브(10)',
    '- 부드러운 양피지: 필기구 크래프트: 가죽류',
  )
  .build()
const itemToughString = Item.Builder(toughString)
  .addDescription('인형공방 아르바이트')
  .addDescription('방직: 굵은 실(5)')
  .build()
const itemHillwenAlloy = Item.Builder(hillwenAlloy)
  .addDescription('힐웬 공학: 무른 힐웬 광석 조각(15)')
  .build()
const itemFlour = Item.Builder(flour)
  .addDescription('식료품점 아르바이트')
  .addDescription('티르코네일 풍차: 밀(10)')
  .build()
const itemSpinGear = Item.Builder(spinGear)
  .addDescription(
    '힐웬 공학: 힐웬(2), 육각 볼트(40), 육각 너트(40)',
    '- 힐웬: 힐웬 공학: 힐웬 광석 조각(5)',
    '- 육각 볼트: 힐웬 공학: 힐웬 광석 조각(1)',
    '- 육각 너트: 힐웬 공학: 힐웬 광석 조각(1)',
  )
  .build()
const itemIntermediateFireWood = Item.Builder(intermediateFireWood)
  .addDescription('두갈드 아일(벌목캠프) 아르바이트')
  .addDescription('모탕 벌목')
  .addDescription('목공: 나무장작(3)')
  .build()
const itemHighSilk = Item.Builder(highSilk)
  .addDescription('의류점 아르바이트')
  .addDescription('방직: 가는 실(5)')
  .build()
const itemEnergyAmplifier = Item.Builder(energyAmplifier)
  .addDescription(
    '힐웬 공학: 에메랄드 코어(3), 에너지 컨버터(3)',
    '- 에메랄드 코어: 힐웬 광산 2층 에메랄드 바이슨 사냥',
    '- 에너지 컨버터: 힐웬 공학: 힐웬(1), 실리엔(1)',
    '  - 힐웬: 힐웬 공학: 힐웬 광석 조각(5)',
    '  - 실리엔: 매직 크래프트: 실리엔 결정(5)',
  )
  .build()
const itemStrongRing = Item.Builder(strongRing)
  .addDescription(
    '방직: 매듭끈(1), 어둠이 깃든 칼날 조각(1)',
    '- 매듭끈: 의류점 아르바이트 / 방직: 굵은 실(1), 가는 실(1)',
    '- 어둠이 깃든 칼날 조각: 벨테인 미션 보스몹 / 울라 하드 던전 / 그림자 엘리트 / 기사단',
  )
  .build()
const itemMagicalFeatherPen = Item.Builder(magicalFeatherPen)
  .addDescription('서점 아르바이트')
  .addDescription(
    '필기구 크래프트: 생기 있는 깃털(1), 마나 허브(10), 골드 허브(10)',
    '- 생기 있는 깃털: 잡화점(1000g)',
  )
  .build()

const itemMana500 = Item.Builder(mana500)
  .addDescription('힐러집 아르바이트')
  .addDescription('포션 조제: 마나 300 포션(1), 물이 든 병(1), 네잎클로버(1)')
  .build()
const itemHighFirewood = Item.Builder(highFirewood)
  .addDescription('두갈드 아일(벌목캠프) 아르바이트', '모탕 벌목', '목공')
  .build()
const itemEnergyConverter = Item.Builder(energyConverter)
  .addDescription(
    '힐웬 공학: 힐웬(1), 실리엔(1)',
    '  - 힐웬: 힐웬 공학: 힐웬 광석 조각(5)',
    '  - 실리엔: 매직 크래프트: 실리엔 결정(5)',
  )
  .build()
const itemPurifiedRabbitFeet = Item.Builder(purifiedRabbitFeet)
  .addDescription(
    '매직 크래프트: 돌연변이 토끼의 발(1), 실리엔(1)',
    '- 돌연변이 토끼의 발: 실리엔 지구 돌연변이 토끼 처치',
    '- 실리엔: 매직 크래프트: 실리엔 결정(5)',
  )
  .build()
const itemStickyGrass = Item.Builder(stickyGrass)
  .addDescription(
    '매직 크래프트: 돌연변이 식물의 점액(1), 실리엔(1)',
    '- 돌연변이 식물의 점액: 실리엔 지구 돌연변이 식물 처치',
    '- 실리엔: 매직 크래프트: 실리엔 결정(5)',
  )
  .build()
const itemFinestVanillaCandle = Item.Builder(finestVanillaCandle)
  .addDescription(
    '핸디 크래프트: 정제된 촉매제(1), 고급 바닐라 향초(1)',
    '- 정제된 촉매제: 울라 던전',
    '- 고급 바닐라 향초: 핸디 크래프트: 미니 바닐라 향초(1), 밀랍(1)',
    '  - 미니 바닐라 향초: 힐러집 구매(10000g)',
    '  - 밀랍: 마창대회 아르바이트 / 벌집 사용',
    '    - 벌집: 코리브 계곡 벌통있는 나무 가격',
  )
  .build()
const itemArtificialGrass = Item.Builder(artificialGrass)
  .addDescription(
    '핸디 크래프트: 싱싱한 풀(20), 꽃뭉치(5)',
    '- 싱싱한 풀 / 꽃뭉치: 꽃집 아르바이트',
  )
  .build()
const itemEmeraldFuse = Item.Builder(emeraldFuse)
  .addDescription('힐웬 공학: 에메랄드 코어(1)')
  .addDescription('- 에메랄드 코어: 힐웬 광산 2층 에메랄드 바이슨 처치')
  .build()
const itemHighLeatherString = Item.Builder(highLeatherString)
  .addDescription('방직: 고급 가죽')
  .build()
const itemMithrilNail = Item.Builder(mithrilNail)
  .addDescription('미스릴 괴(20)')
  .build()
const itemPoisonedWyvernBoltForBallista = Item.Builder(
  poisonedWyvernBoltForBallista,
)
  .addDescription(
    '핸디 크래프트: 나무장작(1), 와이번의 발톱(1), 포이즌 포션(1)',
    '- 와이번의 발톱: 칼리다 호수 켈피의 열기구 큰 별 9개 구간 보상',
    '- 포이즌 포션: 포션 조제: 포이즌 허브(1), 베이스 허브(1), 물이 든 병(1)',
  )
  .build()
const itemFinestFirewood = Item.Builder(finestFirewood)
  .addDescription(
    '두갈드 아일(벌목캠프) 아르바이트 / 목공: 고급 나무장작(3)',
    '- 고급 나무장작: 모탕 벌목 / 중급 나무장작(3)',
    '- 중급 나무장작: 모탕 벌목 / 나무장작(3)',
  )
  .build()

const itemBronzeBoard = Item.Builder(bronzeBoard)
  .addDescription('대장간 아르바이트')
  .addDescription('제련: 동괴(1)')
  .build()
const itemMysteriousHerbPowder = Item.Builder(mysteriousHerbPowder)
  .addDescription('매직 크래프트: 블러디 허브(1), 마나 허브(1), 포이즌 허브(1)')
  .build()
const itemMithrilBoard = Item.Builder(mithrilBoard)
  .addDescription('대장간 아르바이트')
  .addDescription('제련: 미스릴 괴(1)')
  .build()
const itemBarleyFlour = Item.Builder(barleyFlour)
  .addDescription('식료품점 아르바이트')
  .addDescription('티르코네일 풍차: 보리(10)')
  .build()
const itemMarionet500 = Item.Builder(marionet500)
  .addDescription('인형공방 아르바이트')
  .addDescription(
    '포션 조제: 골드허브(1), 베이스 포션(1), 주석광석 조각(1), 아연광석 조각(1), 니켈광석 조각(1)',
  )
  .build()
const itemGoldBoard = Item.Builder(goldBoard)
  .addDescription('대장간 아르바이트')
  .addDescription('제련: 금괴(1)')
  .build()
const itemTwinklePaper = Item.Builder(twinklePaper)
  .addDescription(
    '합성: 종이(10), 작은 녹색구슬(1), 작은 파란구슬(1), 작은 빨간구슬(1), 작은 은색구슬(1)',
    '- 한 번에 10개씩 제작',
  )
  .build()
const itemFinestFabric = Item.Builder(finestFabric)
  .addDescription('의류점 아르바이트')
  .addDescription('방직: 굵은실(6)')
  .build()
const itemLife500 = Item.Builder(life500)
  .addDescription('힐러집 아르바이트')
  .addDescription('포션 조제: 생명력 300포션(1), 물이 든 병(1), 네잎클로버(1)')
  .build()
const itemMutant = Item.Builder(mutant)
  .addDescription(
    '매직 크래프트: 돌연변이 토끼의 발(10), 돌연변이 식물의 점액질(5), 사스콰치의 심장(3)',
    '- 실리엔 지구 돌연변이 토끼 / 돌연변이 식물 / 사스콰치 처치',
  )
  .build()
const itemCosmosPerfumeOfArtificialFlowers = Item.Builder(
  cosmosPerfumeOfArtificialFlowers,
)
  .addDescription(
    '핀즈 크래프트: 코스모스 추출액(1), 빈 병(1), 마법가루(10), 베이스 허브(10)',
    '- 코스모스 추출액: 금박 솔방울(10)',
  )
  .build()
const itemSpecialFirewood = Item.Builder(specialFirewood)
  .addDescription(
    '목공: 최고급 나무장작(1), 순도 높은 강화제(1)',
    '- 최고급 나무장작: 두갈드 아일(벌목캠프) 아르바이트 / 목공: 고급 나무장작(3)',
    '  - 고급 나무장작: 두갈드 아일(벌목캠프) 아르바이트 / 모탕 벌목 / 목공: 중급 나무장작(3)',
    '    - 중급 나무장작: 두갈드 아일(벌목캠프) 아르바이트 / 모탕 벌목 / 목공: 나무장작(3)',
    '- 순도 높은 강화제: 분해 (산산조각난 검은 금속, 균열된 검은 금속, 등)',
  )
  .build()

ItemCollection.getInstance()
  .add(itemStamina500)
  .add(itemKnotString)
  .add(itemCottonForCusion)
  .add(itemFinestSilk)
  .add(itemFinestLeatherString)
  .add(itemToughThread)
  .add(itemLiqueurOfSprit)
  .add(itemSilverBoard)
  .add(itemHighFabric)
  .add(itemPetPlaySet)
  .add(itemHayStack)
  .add(itemMagicalFirewood)

  .add(itemShrimpSteamedBait)
  .add(itemSilien)
  .add(itemMagicalParchment)
  .add(itemToughString)
  .add(itemHillwenAlloy)
  .add(itemFlour)
  .add(itemSpinGear)
  .add(itemIntermediateFireWood)
  .add(itemHighSilk)
  .add(itemEnergyAmplifier)
  .add(itemStrongRing)
  .add(itemMagicalFeatherPen)

  .add(itemMana500)
  .add(itemHighFirewood)
  .add(itemEnergyConverter)
  .add(itemPurifiedRabbitFeet)
  .add(itemStickyGrass)
  .add(itemFinestVanillaCandle)
  .add(itemArtificialGrass)
  .add(itemEmeraldFuse)
  .add(itemHighLeatherString)
  .add(itemMithrilNail)
  .add(itemPoisonedWyvernBoltForBallista)
  .add(itemFinestFirewood)

  .add(itemBronzeBoard)
  .add(itemMysteriousHerbPowder)
  .add(itemMithrilBoard)
  .add(itemBarleyFlour)
  .add(itemMarionet500)
  .add(itemGoldBoard)
  .add(itemTwinklePaper)
  .add(itemFinestFabric)
  .add(itemLife500)
  .add(itemMutant)
  .add(itemCosmosPerfumeOfArtificialFlowers)
  .add(itemSpecialFirewood)
