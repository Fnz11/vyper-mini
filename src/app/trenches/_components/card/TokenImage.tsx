"use client"
import React, { useState } from "react"
import Image from "next/image"
import { createAvatar } from "@dicebear/core"
import { glass } from "@dicebear/collection"
import { cn } from "@/lib/utils"
import { DEX_BORDER_CLASS } from "@/styles/dex"
import { DexBadge } from "./DexBadge"
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover"
import type { DexType } from "@/app/trenches/_types/pool.types"

// Module-level cache: createAvatar called once per symbol, never per render
const avatarCache = new Map<string, string>()

function getCachedAvatar(symbol: string, size: number): string {
  const key = `${symbol}-${size}`
  const cached = avatarCache.get(key)
  if (cached) return cached
  const uri = createAvatar(glass, { seed: symbol, size }).toDataUri()
  avatarCache.set(key, uri)
  return uri
}

function TokenImage({ src, symbol, dex, size = 80 }: {
  src?: string; symbol: string; dex?: DexType; size?: number
}) {
  const [imgError, setImgError] = useState(false)
  const fallback = getCachedAvatar(symbol, size)
  const imgSrc = src && !imgError ? src : fallback

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div
          className={cn(
            "ring-[1.5px] ring-white/10 bg-background rounded-md border-2 p-0.5 relative",
            DEX_BORDER_CLASS[dex ?? "UNISWAP"],
          )}
          style={{ width: size, height: size }}
        >
          <Image
            src={imgSrc}
            alt={symbol}
            width={size}
            height={size}
            className="size-full rounded-md object-contain"
            onError={() => setImgError(true)}
            unoptimized
          />
          <DexBadge dex={dex} />
        </div>
      </PopoverTrigger>
      <PopoverContent sideOffset={5} className="z-50 rounded-md bg-popover p-1 shadow-md">
        <div className="size-48 overflow-hidden rounded-md">
          <Image src={imgSrc} alt={symbol} width={192} height={192} className="size-full object-contain" unoptimized />
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default React.memo(TokenImage)
