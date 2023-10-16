export const SELLER_1 = '티르코네일'
export const SELLER_2 = '던바튼'
export const SELLER_3 = '반호르'
export const SELLER_4 = '이멘마하'
export const SELLER_5 = '탈틴'
export const SELLER_6 = '타라'
export const SELLER_7 = '카브'
export const SELLER_8 = '벨바스트'
export const SELLER_9 = '켈라'
export const SELLER_10 = '필리아'
export const SELLER_11 = '코르'
export const SELLER_12 = '발레스'

export type SellerName =
  | typeof SELLER_1
  | typeof SELLER_2
  | typeof SELLER_3
  | typeof SELLER_4
  | typeof SELLER_5
  | typeof SELLER_6
  | typeof SELLER_7
  | typeof SELLER_8
  | typeof SELLER_9
  | typeof SELLER_10
  | typeof SELLER_11
  | typeof SELLER_12

export const sellerNames: SellerName[] = [
  SELLER_1,
  SELLER_2,
  SELLER_3,
  SELLER_4,
  SELLER_5,
  SELLER_6,
  SELLER_7,
  SELLER_8,
  SELLER_9,
  SELLER_10,
  SELLER_11,
  SELLER_12,
]

export type ProfitInfo = Record<SellerName, number | undefined>
