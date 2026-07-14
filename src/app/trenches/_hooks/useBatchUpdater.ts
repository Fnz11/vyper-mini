"use client"

import { useEffect, useRef } from "react"
import { BATCH_INTERVAL_MS } from "../_constants/trenches.constants"
import type { Pool, ApiUpdate } from "../_types/pool.types"
import { usePoolStore } from "../_stores/usePoolStore"

export function useBatchUpdater() {
  const pendingUpdatesRef = useRef<Partial<Pool>[]>([])
  const pendingNewPoolsRef = useRef<Pool[]>([])
  const initializedRef = useRef(false)

  useEffect(() => {
    let active = true
    const controller = new AbortController()
    const { signal } = controller

    const init = async () => {
      try {
        const res = await fetch("/api/pools", { signal })
        if (!active) return
        const data: { pools?: Pool[]; timestamp: number } = await res.json()
        if (!active) return
        if (data.pools) {
          usePoolStore.getState().setPools(data.pools)
          initializedRef.current = true
        }
      } catch (err) {
        if (!active || err instanceof DOMException) return
      }
    }

    const tick = async () => {
      if (!initializedRef.current) return

      try {
        const res = await fetch("/api/pools?update=1", { signal })
        if (!active) return
        const data: { update?: ApiUpdate; timestamp: number } = await res.json()
        if (!active) return

        if (data.update) {
          if (data.update.updates) {
            pendingUpdatesRef.current.push(...data.update.updates)
          }
          if (data.update.newPools) {
            pendingNewPoolsRef.current.push(...data.update.newPools)
          }
        }
      } catch (err) {
        if (!active || err instanceof DOMException) return
      }

      const store = usePoolStore.getState()

      if (pendingUpdatesRef.current.length > 0) {
        store.batchUpdatePools(pendingUpdatesRef.current)
        pendingUpdatesRef.current = []
      }

      if (pendingNewPoolsRef.current.length > 0) {
        for (const pool of pendingNewPoolsRef.current) {
          store.addPool(pool)
        }
        pendingNewPoolsRef.current = []
      }
    }

    init()
    const id = setInterval(tick, BATCH_INTERVAL_MS)
    return () => {
      active = false
      controller.abort()
      clearInterval(id)
    }
  }, [])
}
