import { createAvatar } from "@dicebear/core"
import { glass } from "@dicebear/collection"
import type { Pool, BaseToken, DexType } from "@/app/trenches/_types/pool.types"
import { MAX_POOL_COUNT, BATCH_SIZE } from "@/app/trenches/_constants/trenches.constants"

const TOKEN_IMAGES: Record<string, string> = {
  WETH:  "https://assets.trustwallet.com/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png",
  WBTC:  "https://assets.trustwallet.com/blockchains/ethereum/assets/0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599/logo.png",
  LINK:  "https://assets.trustwallet.com/blockchains/ethereum/assets/0x514910771AF9Ca656af840dff83E8264EcF986CA/logo.png",
  UNI:   "https://assets.trustwallet.com/blockchains/ethereum/assets/0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984/logo.png",
  AAVE:  "https://assets.trustwallet.com/blockchains/ethereum/assets/0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9/logo.png",
  MKR:   "https://assets.trustwallet.com/blockchains/ethereum/assets/0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2/logo.png",
  CRV:   "https://assets.trustwallet.com/blockchains/ethereum/assets/0xD533a949740bb3306d119CC777fa900bA034cd52/logo.png",
  SNX:   "https://assets.trustwallet.com/blockchains/ethereum/assets/0xC011a73ee8576Fb46F5E1c5751cA3B9Fe0af2a6F/logo.png",
  COMP:  "https://assets.trustwallet.com/blockchains/ethereum/assets/0xc00e94Cb662C3520282E6f5717214004A7f26888/logo.png",
  YFI:   "https://assets.trustwallet.com/blockchains/ethereum/assets/0x0bc529c00C6401aEF6D220BE8C6Ea1667F6Ad93e/logo.png",
  "1INCH": "https://assets.trustwallet.com/blockchains/ethereum/assets/0x111111111117dC0aa78b770fA6A738034120C302/logo.png",
  LDO:   "https://assets.trustwallet.com/blockchains/ethereum/assets/0x5A98FcBEA516Cf06857215779Fd812CA3beF1B32/logo.png",
  RPL:   "https://assets.trustwallet.com/blockchains/ethereum/assets/0xD33526068D116cE69F19A9ee46F0bd304F21A51f/logo.png",
  BAL:   "https://assets.trustwallet.com/blockchains/ethereum/assets/0xba100000625a3754423978a60c9317c58a424e3D/logo.png",
  SUSHI: "https://assets.trustwallet.com/blockchains/ethereum/assets/0x6B3595068778DD592e39A122f4f5a5cF09C90fE2/logo.png",
}

const KNOWN_TOKENS: [string, string, string][] = [
  ["Ethereum", "ETH", "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"],
  ["Wrapped Bitcoin", "WBTC", "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599"],
  ["USD Coin", "USDC", "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"],
  ["Chainlink", "LINK", "0x514910771AF9Ca656af840dff83E8264EcF986CA"],
  ["Uniswap", "UNI", "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984"],
  ["Aave", "AAVE", "0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9"],
  ["Curve DAO", "CRV", "0xD533a949740bb3306d119CC777fa900bA034cd52"],
  ["Compound", "COMP", "0xc00e94Cb662C3520282E6f5717214004A7f26888"],
  ["Maker", "MKR", "0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2"],
  ["Synthetix", "SNX", "0xC011a73ee8576Fb46F5E1c5751cA3B9Fe0af2a6f"],
  ["yearn.finance", "YFI", "0x0bc529c00C6401aEF6D220BE8C6Ea1667F6Ad93e"],
  ["Sushiswap", "SUSHI", "0x6B3595068778DD592e39A122f4f5a5cF09C90fE2"],
  ["1inch", "1INCH", "0x111111111117dc0aa78b770fa6a738034120c302"],
  ["Balancer", "BAL", "0xba100000625a3754423978a60c9317c58a424e3D"],
  ["The Graph", "GRT", "0xc944E90C64B2c07662A292be6244BDf05Cda44a7"],
  ["Ren", "REN", "0x408e41876cCCDC0F92210600ef50372656052a38"],
  ["Loopring", "LRC", "0xBBbbCA6A901c926F240b89EacB641d8Aec7AEafD"],
  ["Decentraland", "MANA", "0x0F5D2fB29fb7d3CFeE444a200298f468908cC942"],
  ["Axie Infinity", "AXS", "0xBB0E17EF65F82Ab018d8EDd776e8DD940327B28b"],
  ["Chiliz", "CHZ", "0x3506424F91fD33084466F402d5D97f05F8e3b4AF"],
]

function randomHex(length: number): string {
  const chars = "0123456789abcdef"
  let result = "0x"
  for (let i = 0; i < length; i++) {
    result += chars[Math.floor(Math.random() * 16)]
  }
  return result
}

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function randomFloat(min: number, max: number, decimals = 2): number {
  return parseFloat((Math.random() * (max - min) + min).toFixed(decimals))
}

function getTokenAvatar(symbol: string): string {
  return createAvatar(glass, { seed: symbol, size: 80 }).toDataUri()
}

const DEX_TYPES: DexType[] = ["UNISWAP", "SUSHISWAP", "AERODROME", "ALIEN_BASE"]

function randomDex(): DexType {
  return DEX_TYPES[Math.floor(Math.random() * DEX_TYPES.length)]
}

function generatePoolEntry(
  tokenIndex: number,
  isLocked: boolean,
  ageMs: number,
  existingAddresses: Set<string>
): Pool {
  const [name, symbol, address] = KNOWN_TOKENS[tokenIndex % KNOWN_TOKENS.length]
  const base: BaseToken = { address, name, symbol }
  const quote: BaseToken = {
    address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
    name: "Wrapped Ethereum",
    symbol: "WETH",
  }

  let pairAddress: string
  do {
    pairAddress = randomHex(40)
  } while (existingAddresses.has(pairAddress))
  existingAddresses.add(pairAddress)

  const now = Date.now()
  const marketCap = randomFloat(10000, 50000000)
  const ageSec = ageMs / 1000

  return {
    id: `${symbol}-${tokenIndex}`,
    pairAddress,
    baseToken: base,
    quoteToken: quote,
    priceUsd: randomFloat(0.00000001, 0.1, 8).toFixed(8),
    liquidityUsd: randomFloat(10000, 20000000).toFixed(2),
    volumeUsd: randomFloat(5000, 5000000).toFixed(2),
    marketCapUsd: marketCap.toFixed(2),
    holders: randomInt(50, 10000),
    isVerified: Math.random() < 0.4,
    isRenounced: Math.random() < 0.5,
    isLocked,
    isHoneyPot: Math.random() < 0.1,
    taxBuy: randomFloat(0, 10, 1),
    taxSell: randomFloat(0, 10, 1),
    top10HolderPercent: randomFloat(5, 80, 1),
    devAddress: randomHex(40),
    devPercent: randomFloat(0, 15, 1),
    twitter: `https://x.com/${symbol}`,
    telegram: `https://t.me/${symbol}`,
    image: TOKEN_IMAGES[symbol] ?? getTokenAvatar(symbol),
    eventTimestamp: now - ageMs,
    status: isLocked ? "ACTIVE" : ageSec < 3600 ? "NEW" : "ACTIVE",
    dex: randomDex(),
  }
}

function sortByMcap(a: Pool, b: Pool): number {
  return parseFloat(b.marketCapUsd) - parseFloat(a.marketCapUsd)
}

export function generateMockPools(count = MAX_POOL_COUNT): Pool[] {
  const existingAddresses = new Set<string>()
  let tokenIndex = 0
  const lockedPools: Pool[] = []
  const newPools: Pool[] = []
  const spentPools: Pool[] = []

  for (let i = 0; i < 50; i++) {
    const age = randomInt(0, 7 * 24 * 3600 * 1000)
    lockedPools.push(generatePoolEntry(tokenIndex++, true, age, existingAddresses))
  }
  for (let i = 0; i < 60; i++) {
    const age = randomInt(0, 3599000)
    newPools.push(generatePoolEntry(tokenIndex++, false, age, existingAddresses))
  }
  const spentCount = count - 50 - 60
  for (let i = 0; i < spentCount; i++) {
    const age = randomInt(3601000, 30 * 24 * 3600 * 1000)
    spentPools.push(generatePoolEntry(tokenIndex++, false, age, existingAddresses))
  }

  return [
    ...lockedPools.sort(sortByMcap),
    ...newPools.sort(sortByMcap),
    ...spentPools.sort(sortByMcap),
  ]
}

export function generateMultiplePools(existingPools: Pool[], count: number): Pool[] {
  const existingAddresses = new Set(existingPools.map(p => p.pairAddress))
  const pools: Pool[] = []
  for (let i = 0; i < count; i++) {
    const tokenIndex = existingPools.length + i
    const age = randomInt(0, 3599000)
    pools.push(generatePoolEntry(tokenIndex, false, age, existingAddresses))
  }
  return pools
}

export function generateSinglePool(existingPools: Pool[]): Pool {
  const existingAddresses = new Set(existingPools.map(p => p.pairAddress))
  const tokenIndex = existingPools.length
  const age = randomInt(0, 3599000)
  return generatePoolEntry(tokenIndex, false, age, existingAddresses)
}

export function generateValueUpdates(pools: Pool[], count = BATCH_SIZE): Partial<Pool>[] {
  const shuffled = [...pools].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count).map(p => {
    const update: Partial<Pool> = {
      pairAddress: p.pairAddress,
      priceUsd: (parseFloat(p.priceUsd) * (1 + (Math.random() - 0.48) * 0.15)).toFixed(8),
      volumeUsd: (parseFloat(p.volumeUsd) * (1 + (Math.random() - 0.45) * 0.12)).toFixed(2),
      liquidityUsd: (parseFloat(p.liquidityUsd) * (1 + (Math.random() - 0.5) * 0.08)).toFixed(2),
      holders: Math.max(10, p.holders + Math.floor((Math.random() - 0.4) * 15)),
    }

    if (Math.random() < 0.15) {
      update.eventTimestamp = p.eventTimestamp - randomInt(60000, 3600000)
    }

    if (p.isLocked && Math.random() < 0.05) {
      update.isLocked = false
    }

    return update
  })
}
