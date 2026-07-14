/**
 * Thresholds for PoolStat color variants.
 * Controls which CVA colorVariant is applied based on value + stat type.
 *
 * Variants: "default" | "good" | "warn" | "bad" | "blue"
 */

export type ColorVariant = "default" | "good" | "warn" | "bad" | "blue"
export type StatType = "liquidity" | "volume" | "mcap" | "holders" | "boolean" | "dev" | "top10" | "generic"

function safeParseNumber(value: unknown): number | null {
  if (value == null) return null
  if (typeof value === "number" && Number.isFinite(value)) return value
  if (typeof value === "string") {
    const n = Number(value.replace(/[^0-9.-]+/g, ""))
    return Number.isFinite(n) ? n : null
  }
  return null
}

/**
 * Determines the color variant for a stat value.
 * Mirrors the thresholds used in vyper-dex.
 */
export function getStatVariant(type: StatType, value: unknown): ColorVariant {
  if (type === "boolean") {
    return value === true ? "good" : "bad"
  }

  const num = safeParseNumber(value)
  if (num === null) return "default"

  switch (type) {
    case "liquidity":
      if (num >= 100_000) return "good"
      if (num >= 10_000) return "blue"
      if (num >= 1_000) return "warn"
      return "bad"

    case "volume":
      if (num >= 500_000) return "good"
      if (num >= 100_000) return "blue"
      if (num >= 10_000) return "warn"
      return "bad"

    case "mcap":
      if (num >= 1_000_000) return "good"
      if (num >= 100_000) return "blue"
      if (num >= 10_000) return "warn"
      return "bad"

    case "holders":
      if (num >= 500) return "good"
      if (num >= 100) return "blue"
      if (num >= 20) return "warn"
      return "bad"

    case "dev":
      if (num <= 2) return "good"
      if (num <= 5) return "warn"
      return "bad"

    case "top10":
      if (num <= 20) return "good"
      if (num <= 40) return "warn"
      return "bad"

    default:
      return "default"
  }
}
