"use client"

import { memo } from "react"
import { CheckCircle, ChefHat, Flag, Grape, Lock, Users } from "lucide-react"
import { usePoolStore } from "@/app/trenches/_stores/usePoolStore"
import TokenImage from "@/app/trenches/_components/card/TokenImage"
import TokenHeader from "@/app/trenches/_components/card/TokenHeader"
import ContractAddress from "@/app/trenches/_components/card/ContractAddress"
import PoolStat, { PoolStatBooleanTooltipContent } from "@/app/trenches/_components/card/PoolStat"
import { BuyButton } from "@/components/customs/BuyButton"
import { TokenAge } from "@/components/customs/TokenAge"
import { TokenSocials } from "@/components/customs/TokenSocials"
import { formatCompactNumber } from "@/lib/format-number"
import { cn } from "@/lib/utils"

interface TrenchCardProps {
  address: string
  index: number
}

const NEW_FLASH_MS = 2000

const TrenchCard = memo(function TrenchCard({ address, index }: TrenchCardProps) {
  // Subscribe to per-address version number only — re-renders ONLY when this pool changes
  const version = usePoolStore((s) => s.getPoolVersion(address))
  const pool = usePoolStore.getState().getPoolByAddress(address)

  if (!pool) return null

  const isNew = Date.now() - pool.eventTimestamp < NEW_FLASH_MS

  return (
    <div
        className={cn(
          "group relative flex h-full w-full cursor-pointer items-center gap-4 overflow-hidden px-2.5 transition-colors lightning-edges",
          index % 2 === 0 ? "bg-light-1" : "bg-light-2",
          isNew && "animate-flash-green",
        )}
      >
        <div className="flex flex-col items-center justify-center gap-1">
          <TokenImage src={pool.image} symbol={pool.baseToken.symbol} dex={pool.dex} />
          <ContractAddress address={pool.pairAddress} showCopyButton variant="compact" />
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-1.5">
          <div className="flex items-start justify-between">
            <div className="min-w-0">
              <TokenHeader symbol={pool.baseToken.symbol} name={pool.baseToken.name} />
              <div className="text-muted-foreground mt-1 flex items-center gap-3 text-xs">
                <TokenAge eventTimestamp={pool.eventTimestamp} />
                <TokenSocials twitter={pool.twitter} telegram={pool.telegram} />
              </div>
            </div>

            <div className="flex flex-col items-end gap-1 text-right text-xs">
              <div className="flex gap-1.5">
                <PoolStat
                  label="Liq"
                  value={pool.liquidityUsd}
                  type="liquidity"
                  styleVariant="ghost"
                  tooltipContent={<LiqTooltip value={pool.liquidityUsd} />}
                />
                <PoolStat
                  icon={<Users size={12} />}
                  value={pool.holders}
                  type="holders"
                  styleVariant="ghost"
                  tooltipContent={<HoldersTooltip value={pool.holders} />}
                />
              </div>
              <div className="flex gap-1.5">
                <PoolStat
                  label="V"
                  value={pool.volumeUsd}
                  type="volume"
                  styleVariant="ghost"
                  tooltipContent={<VolumeTooltip value={pool.volumeUsd} />}
                />
                <PoolStat
                  label="MC"
                  value={pool.marketCapUsd}
                  type="mcap"
                  styleVariant="ghost"
                  tooltipContent={<McapTooltip value={pool.marketCapUsd} />}
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
              <PoolStat
                icon={<CheckCircle size={13} />}
                value={pool.isVerified}
                type="boolean"
                tooltipContent={<PoolStatBooleanTooltipContent label="Verified" value={pool.isVerified} />}
              />
              <PoolStat
                icon={<Flag size={13} />}
                value={pool.isRenounced}
                type="boolean"
                tooltipContent={<PoolStatBooleanTooltipContent label="Renounced" value={pool.isRenounced} />}
              />
              <PoolStat
                icon={<Lock size={13} />}
                value={pool.isLocked}
                type="boolean"
                tooltipContent={<PoolStatBooleanTooltipContent label="Locked" value={pool.isLocked} />}
              />
              <PoolStat
                icon={<Grape size={13} />}
                value={pool.isHoneyPot}
                type="boolean"
                tooltipContent={<PoolStatBooleanTooltipContent label="Honeypot" value={pool.isHoneyPot} />}
              />
              <PoolStat
                label="TOP10"
                value={`${pool.top10HolderPercent.toFixed(1)}%`}
                type="generic"
                tooltipContent={<Top10Tooltip value={pool.top10HolderPercent} />}
              />
              <PoolStat
                icon={<ChefHat size={13} />}
                value={pool.devPercent}
                type="dev"
                tooltipContent={<DevTooltip devPercent={pool.devPercent} devAddress={pool.devAddress} />}
              />
              <div className="text-muted-foreground">
                Tax B/S: <span className="text-white">{pool.taxBuy}/{pool.taxSell}</span>
              </div>
            </div>
            <BuyButton />
          </div>
        </div>
      </div>
  )
})

// Stable tooltip content components — prevent new JSX node per render
const LiqTooltip = memo(({ value }: { value: string }) => (
  <div className="flex flex-col items-center"><span>Liquidity: ${formatCompactNumber(parseFloat(value))}</span></div>
))
LiqTooltip.displayName = "LiqTooltip"

const HoldersTooltip = memo(({ value }: { value: number }) => (
  <div className="flex flex-col items-center"><span>Holders: {value.toLocaleString()}</span></div>
))
HoldersTooltip.displayName = "HoldersTooltip"

const VolumeTooltip = memo(({ value }: { value: string }) => (
  <div className="flex flex-col items-center"><span>Volume: ${formatCompactNumber(parseFloat(value))}</span></div>
))
VolumeTooltip.displayName = "VolumeTooltip"

const McapTooltip = memo(({ value }: { value: string }) => (
  <div className="flex flex-col items-center"><span>Market Cap: ${formatCompactNumber(parseFloat(value))}</span></div>
))
McapTooltip.displayName = "McapTooltip"

const Top10Tooltip = memo(({ value }: { value: number }) => (
  <div className="flex flex-col items-center"><span>Top 10 Holders: {value.toFixed(1)}%</span></div>
))
Top10Tooltip.displayName = "Top10Tooltip"

const DevTooltip = memo(({ devPercent, devAddress }: { devPercent: number; devAddress: string }) => (
  <div className="flex flex-col items-center"><span>Dev: {devPercent.toFixed(1)}% — {devAddress.slice(0, 8)}…</span></div>
))
DevTooltip.displayName = "DevTooltip"

export default TrenchCard
