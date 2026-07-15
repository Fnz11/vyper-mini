"use client"

import { useEffect, useRef, useState } from "react"

type ClockListener = () => void

// Module-level singleton — one RAF loop for the entire app
let listeners: Set<ClockListener> = new Set()
let rafId: number | null = null

function startClock() {
  if (rafId !== null) return
  let lastTick = 0

  function tick(now: number) {
    rafId = requestAnimationFrame(tick)
    // Only fire listeners every ~1000ms to match age display granularity
    if (now - lastTick < 1000) return
    lastTick = now
    for (const listener of listeners) {
      listener()
    }
  }

  rafId = requestAnimationFrame(tick)
}

function stopClock() {
  if (rafId !== null) {
    cancelAnimationFrame(rafId)
    rafId = null
  }
}

function subscribe(listener: ClockListener): () => void {
  listeners.add(listener)
  startClock()
  return () => {
    listeners.delete(listener)
    if (listeners.size === 0) stopClock()
  }
}

/**
 * Fires callback on a ~1s global tick shared across all subscribers.
 * Replaces per-component setInterval to avoid timer explosion.
 */
export function useGlobalClock(callback: () => void): void {
  const callbackRef = useRef(callback)
  callbackRef.current = callback

  useEffect(() => {
    return subscribe(() => callbackRef.current())
  }, [])
}
