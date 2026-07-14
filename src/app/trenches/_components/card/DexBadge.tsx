"use client"
import type { DexType } from "@/app/trenches/_types/pool.types"
import { DEX_BADGE, DEX_BG } from "@/styles/dex"
import { cn } from "@/lib/utils"

export function DexBadge({ dex }: { dex?: DexType }) {
  if (!dex) return null
  const DexIcon = DEX_BADGE[dex]
  if (!DexIcon) return null
  return (
    <div className={cn("size-4 absolute -bottom-1 -right-1 bg-background z-[5] rounded-full ring-1 ring-background flex items-center justify-center", DEX_BG[dex])}>
      <DexIcon className="size-2.5" />
    </div>
  )
}
