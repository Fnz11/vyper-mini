"use client"
import { useState, useEffect } from "react"

export default function BtcPrice() {
  const [price, setPrice] = useState({ value: 67234.5, change: 2.34 })

  useEffect(() => {
    const interval = setInterval(() => {
      setPrice(prev => {
        const delta = prev.value * (Math.random() * 0.002 - 0.001)
        return { value: prev.value + delta, change: prev.change + (Math.random() * 0.2 - 0.1) }
      })
    }, 15000)
    return () => clearInterval(interval)
  }, [])

  return (
    <span className="bg-light-1 border border-white/[0.06] rounded-sm px-2 py-1 font-mono text-xs flex items-center gap-1" aria-label="Bitcoin price">
      <span className="text-yellow-500 font-bold">₿</span>
      <span className="text-foreground">${price.value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
      <span className={price.change >= 0 ? "text-success" : "text-destructive"}>
        {price.change >= 0 ? "+" : ""}{price.change.toFixed(2)}%
      </span>
    </span>
  )
}
