import type { DexType } from "@/app/trenches/_types/pool.types"
import type { ComponentType } from "react"
import { UniswapIcon, SushiSwapIcon, AerodromeIcon, AlienBaseIcon } from "@/components/icons/dex-icons"

export const DEX_BORDER_CLASS: Record<DexType, string> = {
  UNISWAP:    "border-dex-uniswap",
  SUSHISWAP:  "border-dex-sushiswap",
  AERODROME:  "border-dex-aerodrome",
  ALIEN_BASE: "border-dex-alien-base",
}

export const DEX_BG: Record<DexType, string> = {
  UNISWAP:    "bg-dex-uniswap",
  SUSHISWAP:  "bg-dex-sushiswap",
  AERODROME:  "bg-dex-aerodrome",
  ALIEN_BASE: "bg-dex-alien-base",
}

export const DEX_BADGE: Record<DexType, ComponentType<{ className?: string }>> = {
  UNISWAP: UniswapIcon,
  SUSHISWAP: SushiSwapIcon,
  AERODROME: AerodromeIcon,
  ALIEN_BASE: AlienBaseIcon,
}
