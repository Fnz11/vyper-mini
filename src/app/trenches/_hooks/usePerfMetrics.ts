"use client"

import { useRef, useState, useEffect } from "react"
import { usePoolStore } from "@/app/trenches/_stores/usePoolStore"

const METRICS_UPDATE_INTERVAL_MS = 1000

interface PerfMetrics {
  fps: number
  cardsRendered: number
  totalPools: number
  avgBatchSize: number
  storeChangeCount: number
}

export function usePerfMetrics(): PerfMetrics {
  const [metrics, setMetrics] = useState<PerfMetrics>({
    fps: 0,
    cardsRendered: 0,
    totalPools: 0,
    avgBatchSize: 0,
    storeChangeCount: 0,
  })

  const frameCountRef = useRef(0)
  const lastFpsUpdateRef = useRef<number | null>(null)
  if (lastFpsUpdateRef.current === null) lastFpsUpdateRef.current = performance.now()
  const fpsRef = useRef(0)
  const rafIdRef = useRef(0)
  const totalPoolsRef = useRef(0)
  const storeChangesRef = useRef(0)

  useEffect(() => {
    const unsub = usePoolStore.subscribe((state) => {
      totalPoolsRef.current = state.pools.size
      storeChangesRef.current = state.changesCount
    })
    return () => unsub()
  }, [])

  useEffect(() => {
    let running = true

    function tick() {
      if (!running) return
      frameCountRef.current++
      const now = performance.now()
      const elapsed = now - lastFpsUpdateRef.current!
      if (elapsed >= 1000) {
        fpsRef.current = Math.round(frameCountRef.current * 1000 / elapsed)
        frameCountRef.current = 0
        lastFpsUpdateRef.current = now
      }
      rafIdRef.current = requestAnimationFrame(tick)
    }

    rafIdRef.current = requestAnimationFrame(tick)
    return () => {
      running = false
      cancelAnimationFrame(rafIdRef.current)
    }
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics({
        fps: fpsRef.current,
        cardsRendered: totalPoolsRef.current,
        totalPools: totalPoolsRef.current,
        avgBatchSize: 0,
        storeChangeCount: storeChangesRef.current,
      })
    }, METRICS_UPDATE_INTERVAL_MS)

    return () => clearInterval(interval)
  }, [])

  return metrics
}
