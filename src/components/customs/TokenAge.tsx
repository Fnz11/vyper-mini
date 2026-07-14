"use client"

import { memo, useState, useEffect } from "react"
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"

interface TokenAgeProps {
  eventTimestamp: number
}

const AGE_UPDATE_INTERVAL_MS = 1000

function getRelativeTime(timestamp: number): string {
  const diff = Date.now() - timestamp
  const seconds = Math.max(0, Math.floor(diff / 1000))
  if (seconds < 60) return `${seconds}s`
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes}m ${seconds % 60}s`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ${minutes % 60}m`
  const days = Math.floor(hours / 24)
  return `${days}d ${hours % 24}h`
}

function useTokenAge(eventTimestamp: number): string {
  const [age, setAge] = useState(() => getRelativeTime(eventTimestamp))

  useEffect(() => {
    const interval = setInterval(() => {
      setAge(getRelativeTime(eventTimestamp))
    }, AGE_UPDATE_INTERVAL_MS)
    return () => clearInterval(interval)
  }, [eventTimestamp])

  return age
}

const TokenAge = memo(function TokenAge({ eventTimestamp }: TokenAgeProps) {
  const age = useTokenAge(eventTimestamp)
  const isoDate = new Date(eventTimestamp).toISOString()

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span className="text-[10px] text-muted-foreground">{age}</span>
      </TooltipTrigger>
      <TooltipContent>{isoDate}</TooltipContent>
    </Tooltip>
  )
})

export { TokenAge }
export type { TokenAgeProps }
