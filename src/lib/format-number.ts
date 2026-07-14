/**
 * Formats a number into a compact human-readable string.
 * Examples: 1500 → "1.5K", 2300000 → "2.3M", 4500000000 → "4.5B"
 */
export function formatCompactNumber(value: number | string | null | undefined): string {
  const num = parseFloat(String(value ?? ""))
  if (isNaN(num)) return "-"

  const abs = Math.abs(num)
  const sign = num < 0 ? "-" : ""

  if (abs >= 1_000_000_000) return `${sign}${(abs / 1_000_000_000).toFixed(1)}B`
  if (abs >= 1_000_000) return `${sign}${(abs / 1_000_000).toFixed(1)}M`
  if (abs >= 1_000) return `${sign}${(abs / 1_000).toFixed(1)}K`
  if (abs >= 1) return `${sign}${abs.toFixed(2)}`
  if (abs > 0) return `${sign}${abs.toFixed(4)}`
  return "0"
}

/**
 * Formats a price with smart decimal places.
 * Very small prices show more decimals.
 */
function formatPrice(value: number | string | null | undefined): string {
  const num = parseFloat(String(value ?? ""))
  if (isNaN(num)) return "-"

  if (num === 0) return "$0"
  if (num >= 1000) return `$${formatCompactNumber(num)}`
  if (num >= 1) return `$${num.toFixed(2)}`
  if (num >= 0.001) return `$${num.toFixed(4)}`
  return `$${num.toFixed(8)}`
}

/**
 * Truncates a wallet/contract address to short form: 0x1234...abcd
 */
export function truncateAddress(address: string, chars = 4): string {
  if (!address || address.length < chars * 2 + 2) return address
  return `${address.slice(0, chars + 2)}...${address.slice(-chars)}`
}
