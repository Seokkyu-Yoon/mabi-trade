const none = '없음'
const common = '일반'
const william = '윌리엄'

export type TradePartnerType = typeof none | typeof common | typeof william

export class TradePartner {
  type: TradePartnerType
  slot: number
  weight: number

  private constructor(type: TradePartnerType, slot: number, weight: number) {
    this.type = type
    this.slot = slot
    this.weight = weight
  }

  static Builder(type: TradePartnerType) {
    class B {
      type: TradePartnerType = type
      slot!: number
      weight!: number

      setSlot(slot: number) {
        this.slot = slot
        return this
      }
      setWeight(weight: number) {
        this.weight = weight
        return this
      }
      build() {
        return new TradePartner(this.type, this.slot, this.weight)
      }
    }
    return new B()
  }
}

export class TradePartnerCollection {
  partners: Map<TradePartnerType, TradePartner> = new Map()
  private static instance: TradePartnerCollection | null = null

  private constructor() {
    TradePartnerCollection.instance = this
  }

  static getInstance(): TradePartnerCollection {
    if (TradePartnerCollection.instance === null)
      return new TradePartnerCollection()
    return TradePartnerCollection.instance
  }

  get(type: TradePartnerType) {
    const partner = this.partners.get(type) || null
    if (partner === null) throw new Error("can't find partner")
    return partner
  }

  add(partner: TradePartner) {
    const type = partner.type
    if (this.partners.has(type)) throw new Error('already assigned partner')
    this.partners.set(type, partner)
    return this
  }

  getPartners(): TradePartner[] {
    return Array.from(this.partners.values())
  }
}

const partnerNone = TradePartner.Builder('없음').setSlot(0).setWeight(0).build()
const partnerCommon = TradePartner.Builder('일반')
  .setSlot(1)
  .setWeight(100)
  .build()
const partnerWilliam = TradePartner.Builder('윌리엄')
  .setSlot(1)
  .setWeight(200)
  .build()

TradePartnerCollection.getInstance()
  .add(partnerNone)
  .add(partnerCommon)
  .add(partnerWilliam)
