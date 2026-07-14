"use client"
import React from "react"
import { CheckCircle, XCircle } from "lucide-react"
import { type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"
import { formatCompactNumber } from "@/lib/format-number"
import { getStatVariant, type StatType } from "@/lib/stat-colors"
import { statContainerVariants, statValueVariants } from "@/app/trenches/_constants/pool-stat-variants.constants"

interface PoolStatProps extends VariantProps<typeof statContainerVariants> {
  label?: string
  value: string | number | boolean | null | undefined
  icon?: React.ReactNode
  type: StatType
  tooltipContent?: React.ReactNode
}

function safeParseNumber(value: unknown): number | null {
  if (value == null) return null
  if (typeof value === "number" && Number.isFinite(value)) return value
  if (typeof value === "string") {
    const n = Number(value.replace(/[^0-9.-]+/g, ""))
    return Number.isFinite(n) ? n : null
  }
  return null
}

function PoolStat({ label, value, icon, type, tooltipContent, styleVariant, colorVariant: cv }: PoolStatProps) {
  const isBool = type === "boolean"
  const colorVariant = cv ?? getStatVariant(type, value)

  let displayValue: string | null = null
  let displayIcon = icon ?? null

  if (isBool) {
    if (value === true) { displayIcon = <CheckCircle className="size-3" />; displayValue = null }
    else { displayIcon = <XCircle className="size-3" />; displayValue = null }
  } else {
    const num = safeParseNumber(value)
    if (num !== null) {
      switch (type) {
        case "liquidity": case "volume": case "mcap":
          displayValue = `$${formatCompactNumber(num)}`; break
        case "dev": case "top10":
          displayValue = `${num.toFixed(1)}%`; break
        case "holders":
          displayValue = formatCompactNumber(num); break
        default:
          displayValue = String(value ?? "")
      }
    } else {
      displayValue = String(value ?? "")
    }
  }

  return (
    <TooltipPrimitive.Root>
      <TooltipTrigger asChild>
        <div className={cn(isBool && "w-[29px]", statContainerVariants({ styleVariant, colorVariant }))}>
          {displayIcon && (
            <span className={cn("inline-flex items-center", isBool && statValueVariants({ colorVariant }))}>
              {displayIcon}
            </span>
          )}
          {label && <span className="text-muted-foreground">{label}</span>}
          {displayValue && (
            <span className={cn("inline-flex items-center gap-0.5", statValueVariants({ colorVariant }))}>
              {displayValue}
            </span>
          )}
        </div>
      </TooltipTrigger>
      {tooltipContent && (
        <TooltipContent sideOffset={4} className="max-w-xs text-center">
          {tooltipContent}
        </TooltipContent>
      )}
    </TooltipPrimitive.Root>
  )
}

const PoolStatBooleanTooltipContentImpl = ({ label, value }: { label?: string; value?: boolean }) => {
  if (!label) {
    return value
      ? <span className="text-success flex items-center gap-0.5">Yes <CheckCircle className="size-3" /></span>
      : <span className="text-destructive flex items-center gap-0.5">No <XCircle className="size-3" /></span>
  }
  return (
    <span className={cn("flex items-center gap-1", value ? "text-success" : "text-destructive")}>
      {label} {value ? <CheckCircle className="size-3" /> : <XCircle className="size-3" />}
    </span>
  )
}
PoolStatBooleanTooltipContentImpl.displayName = "PoolStatBooleanTooltipContent"
export const PoolStatBooleanTooltipContent = React.memo(PoolStatBooleanTooltipContentImpl)

PoolStat.displayName = "PoolStat"
export default React.memo(PoolStat)
