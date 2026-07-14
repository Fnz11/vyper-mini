export const TrenchType = {
  NEW: "NEW",
  LOCKED: "LOCKED",
  SPENT: "SPENT",
} as const

export type TrenchType = (typeof TrenchType)[keyof typeof TrenchType]

export type PoolStatus = "NEW" | "ACTIVE" | "INACTIVE"

export interface BaseToken {
  address: string
  name: string
  symbol: string
}

export type ApiUpdate = {
  updates?: Partial<Pool>[]
  newPools?: Pool[]
}

export type DexType = "UNISWAP" | "SUSHISWAP" | "AERODROME" | "ALIEN_BASE"

export interface Pool {
  id: string
  pairAddress: string
  baseToken: BaseToken
  quoteToken: BaseToken
  priceUsd: string
  liquidityUsd: string
  volumeUsd: string
  marketCapUsd: string
  holders: number
  isVerified: boolean
  isRenounced: boolean
  isLocked: boolean
  isHoneyPot: boolean
  taxBuy: number
  taxSell: number
  top10HolderPercent: number
  devAddress: string
  devPercent: number
  twitter?: string
  telegram?: string
  image?: string
  eventTimestamp: number
  status: PoolStatus
  dex: DexType
}
