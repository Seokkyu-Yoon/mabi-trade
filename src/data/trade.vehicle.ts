const back = '등짐'
const barrow = '손수레'
const carriage = '마차'
const alpacaCarriage = '알파카 마차'
const elephant = '코끼리'
const dogSledding = '개썰매'
const camel = '낙타'
const floatingShip = '부유선'
const flyingVessel = '비행범선'

export type TradeVehicleName =
  | typeof back
  | typeof barrow
  | typeof carriage
  | typeof alpacaCarriage
  | typeof elephant
  | typeof dogSledding
  | typeof camel
  | typeof floatingShip
  | typeof flyingVessel

export class TradeVehicle {
  name: TradeVehicleName
  slot: number
  weight: number
  enablePartner: boolean

  private constructor(
    name: TradeVehicleName,
    slot: number,
    weight: number,
    enablePartner: boolean,
  ) {
    this.name = name
    this.slot = slot
    this.weight = weight
    this.enablePartner = enablePartner
  }

  static Builder(name: TradeVehicleName) {
    class B {
      name: TradeVehicleName = name
      slot!: number
      weight!: number
      enablePartner: boolean = true

      setSlot(slot: number) {
        this.slot = slot
        return this
      }
      setWeight(weight: number) {
        this.weight = weight
        return this
      }
      setEnablePartner(enablePartner: boolean) {
        this.enablePartner = enablePartner
        return this
      }
      build() {
        return new TradeVehicle(
          this.name,
          this.slot,
          this.weight,
          this.enablePartner,
        )
      }
    }
    return new B()
  }
}

export class TradeVehicleCollection {
  vehicles: Map<TradeVehicleName, TradeVehicle> = new Map()
  private static instance: TradeVehicleCollection | null = null

  private constructor() {
    TradeVehicleCollection.instance = this
  }

  static getInstance(): TradeVehicleCollection {
    if (TradeVehicleCollection.instance === null)
      return new TradeVehicleCollection()
    return TradeVehicleCollection.instance
  }

  get(name: TradeVehicleName) {
    const partner = this.vehicles.get(name) || null
    if (partner === null) throw new Error("can't find partner")
    return partner
  }

  add(tradeVehicle: TradeVehicle) {
    const name = tradeVehicle.name
    if (this.vehicles.has(name)) throw new Error('already assigned partner')
    this.vehicles.set(name, tradeVehicle)
    return this
  }

  getVehicles(): TradeVehicle[] {
    return Array.from(this.vehicles.values())
  }
}

const tradeVehicleBack = TradeVehicle.Builder('등짐')
  .setSlot(4)
  .setWeight(400)
  .build()
const tradeVehicleBarrow = TradeVehicle.Builder('손수레')
  .setSlot(6)
  .setWeight(800)
  .build()
const tradeVehicleCarriage = TradeVehicle.Builder('마차')
  .setSlot(8)
  .setWeight(900)
  .build()
const tradeVehicleAlphacaCarriage = TradeVehicle.Builder('알파카 마차')
  .setSlot(10)
  .setWeight(1100)
  .setEnablePartner(false)
  .build()
const tradeVehicleElephant = TradeVehicle.Builder('코끼리')
  .setSlot(7)
  .setWeight(1700)
  .build()
const tradeVehicleDogSledding = TradeVehicle.Builder('개썰매')
  .setSlot(11)
  .setWeight(700)
  .build()
const tradeVehicleCamel = TradeVehicle.Builder('낙타')
  .setSlot(7)
  .setWeight(1400)
  .build()
const tradeVehicleFloatingShip = TradeVehicle.Builder('부유선')
  .setSlot(8)
  .setWeight(1200)
  .build()
const tradeVehicleFlyingVessel = TradeVehicle.Builder('비행범선')
  .setSlot(25)
  .setWeight(2500)
  .build()

TradeVehicleCollection.getInstance()
  .add(tradeVehicleBack)
  .add(tradeVehicleBarrow)
  .add(tradeVehicleCarriage)
  .add(tradeVehicleAlphacaCarriage)
  .add(tradeVehicleElephant)
  .add(tradeVehicleDogSledding)
  .add(tradeVehicleCamel)
  .add(tradeVehicleFloatingShip)
  .add(tradeVehicleFlyingVessel)
