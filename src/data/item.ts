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

      setName(name: ItemName) {
        this.name = name
      }
      addChild(item: Item) {
        this.children.add(item)
        return this
      }
      addDescription(description: string) {
        this.descriptions.push(description)
      }
      build() {
        return new Item(this.name, this.descriptions, this.children)
      }
    }
    return new B()
  }

  addDescription(description: string) {
    this.descriptions.push(description)
  }

  addChild(item: Item) {
    this.children.add(item)
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

const itemStamina500 = Item.Builder(stamina500).build()
const itemKnotString = Item.Builder(knotString).build()
const itemCottonForCusion = Item.Builder(cottonForCusion).build()
const itemFinestSilk = Item.Builder(finestSilk).build()
const itemFinestLeatherString = Item.Builder(finestLeatherString).build()
const itemToughThread = Item.Builder(toughThread).build()
const itemLiqueurOfSprit = Item.Builder(liqueurOfSprit).build()
const itemSilverBoard = Item.Builder(silverBoard).build()
const itemHighFabric = Item.Builder(highFabric).build()
const itemPetPlaySet = Item.Builder(petPlaySet).build()
const itemHayStack = Item.Builder(hayStack).build()
const itemMagicalFirewood = Item.Builder(magicalFirewood).build()

const itemShrimpSteamedBait = Item.Builder(shrimpSteamedBait).build()
const itemSilien = Item.Builder(silien).build()
const itemMagicalParchment = Item.Builder(magicalParchment).build()
const itemToughString = Item.Builder(toughString).build()
const itemHillwenAlloy = Item.Builder(hillwenAlloy).build()
const itemFlour = Item.Builder(flour).build()
const itemSpinGear = Item.Builder(spinGear).build()
const itemIntermediateFireWood = Item.Builder(intermediateFireWood).build()
const itemHighSilk = Item.Builder(highSilk).build()
const itemEnergyAmplifier = Item.Builder(energyAmplifier).build()
const itemStrongRing = Item.Builder(strongRing).build()
const itemMagicalFeatherPen = Item.Builder(magicalFeatherPen).build()

const itemMana500 = Item.Builder(mana500).build()
const itemHighFirewood = Item.Builder(highFirewood).build()
const itemEnergyConverter = Item.Builder(energyConverter).build()
const itemPurifiedRabbitFeet = Item.Builder(purifiedRabbitFeet).build()
const itemStickyGrass = Item.Builder(stickyGrass).build()
const itemFinestVanillaCandle = Item.Builder(finestVanillaCandle).build()
const itemArtificialGrass = Item.Builder(artificialGrass).build()
const itemEmeraldFuse = Item.Builder(emeraldFuse).build()
const itemHighLeatherString = Item.Builder(highLeatherString).build()
const itemMithrilNail = Item.Builder(mithrilNail).build()
const itemPoisonedWyvernBoltForBallista = Item.Builder(
  poisonedWyvernBoltForBallista,
).build()
const itemFinestFirewood = Item.Builder(finestFirewood).build()

const itemBronzeBoard = Item.Builder(bronzeBoard).build()
const itemMysteriousHerbPowder = Item.Builder(mysteriousHerbPowder).build()
const itemMithrilBoard = Item.Builder(mithrilBoard).build()
const itemBarleyFlour = Item.Builder(barleyFlour).build()
const itemMarionet500 = Item.Builder(marionet500).build()
const itemGoldBoard = Item.Builder(goldBoard).build()
const itemTwinklePaper = Item.Builder(twinklePaper).build()
const itemFinestFabric = Item.Builder(finestFabric).build()
const itemLife500 = Item.Builder(life500).build()
const itemMutant = Item.Builder(mutant).build()
const itemCosmosPerfumeOfArtificialFlowers = Item.Builder(
  cosmosPerfumeOfArtificialFlowers,
).build()
const itemSpecialFirewood = Item.Builder(specialFirewood).build()

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
