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

const TrenchCard = memo(function TrenchCard({ address, index }: TrenchCardProps) {
  const pool = usePoolStore((s) => s.pools.get(address))

  if (!pool) return null

  const isNew = Date.now() - pool.eventTimestamp < 2000

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
                  tooltipContent={<div className="flex flex-col items-center"><span>Liquidity: ${formatCompactNumber(parseFloat(pool.liquidityUsd))}</span></div>}
                />
                <PoolStat
                  icon={<Users size={12} />}
                  value={pool.holders}
                  type="holders"
                  styleVariant="ghost"
                  tooltipContent={<div className="flex flex-col items-center"><span>Holders: {pool.holders.toLocaleString()}</span></div>}
                />
              </div>
              <div className="flex gap-1.5">
                <PoolStat
                  label="V"
                  value={pool.volumeUsd}
                  type="volume"
                  styleVariant="ghost"
                  tooltipContent={<div className="flex flex-col items-center"><span>Volume: ${formatCompactNumber(parseFloat(pool.volumeUsd))}</span></div>}
                />
                <PoolStat
                  label="MC"
                  value={pool.marketCapUsd}
                  type="mcap"
                  styleVariant="ghost"
                  tooltipContent={<div className="flex flex-col items-center"><span>Market Cap: ${formatCompactNumber(parseFloat(pool.marketCapUsd))}</span></div>}
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
                tooltipContent={<div className="flex flex-col items-center"><span>Top 10 Holders: {pool.top10HolderPercent.toFixed(1)}%</span></div>}
              />
              <PoolStat
                icon={<ChefHat size={13} />}
                value={pool.devPercent}
                type="dev"
                tooltipContent={<div className="flex flex-col items-center"><span>Dev: {pool.devPercent.toFixed(1)}% — {pool.devAddress.slice(0, 8)}…</span></div>}
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

export default TrenchCard
