"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface FeeEntry {
  value: string
  color: string
}

const FEE_CYCLE: FeeEntry[] = [
  { value: "12.3K", color: "text-success" },
  { value: "44.9K", color: "text-warning" },
  { value: "89.1K", color: "text-destructive" },
]

const UPDATE_INTERVAL_MS = 10_000

export default function PriorityFee() {
  const [fee, setFee] = useState<FeeEntry>(FEE_CYCLE[0])

  useEffect(() => {
    const interval = setInterval(() => {
      setFee((prev) => {
        const idx = FEE_CYCLE.findIndex((f) => f.value === prev.value)
        return FEE_CYCLE[(idx + 1) % FEE_CYCLE.length]
      })
    }, UPDATE_INTERVAL_MS)
    return () => clearInterval(interval)
  }, [])

  return (
    <span
      className={cn("bg-light-1 rounded-sm px-2 py-1 font-mono text-xs", fee.color)}
      aria-label="Priority fee"
    >
      Priority {fee.value}
    </span>
  )
}
