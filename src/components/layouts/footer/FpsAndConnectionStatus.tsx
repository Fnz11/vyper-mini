"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

const SIMULATED_LATENCY_MS = 88

export default function FpsAndConnectionStatus() {
  const [display, setDisplay] = useState({ fps: 60, latency: SIMULATED_LATENCY_MS })
  const frameRef = useRef(0)

  useEffect(() => {
    let animationId: number
    const intervalId = setInterval(() => {
      const fps = frameRef.current
      frameRef.current = 0
      setDisplay({ fps, latency: SIMULATED_LATENCY_MS })
    }, 1000)

    const tick = (now: number) => {
      frameRef.current++
      animationId = requestAnimationFrame(tick)
    }

    animationId = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(animationId)
      clearInterval(intervalId)
    }
  }, [])

  const statusColor =
    display.latency < 100
      ? "text-success"
      : display.latency < 200
        ? "text-warning"
        : "text-destructive"

  return (
    <span
      className={cn("bg-light-1 rounded-sm px-2 py-1 font-mono text-xs", statusColor)}
      aria-label="Connection status and FPS"
    >
      Stable {display.latency} MS | {display.fps} FPS
    </span>
  )
}
