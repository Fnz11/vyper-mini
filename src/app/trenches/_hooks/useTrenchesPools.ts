"use client"

import { useEffect, useRef, useState } from "react"
import { NEW_POOL_AGE_THRESHOLD_MS, TRENCH_LIMIT_NEW, TRENCH_LIMIT_LOCKED, TRENCH_LIMIT_SPENT } from "../_constants/trenches.constants"
import type { TrenchType, Pool } from "../_types/pool.types"
import { usePoolStore } from "../_stores/usePoolStore"

type PoolWithMcap = Pool & { _mcap: number }

function withMcap(pool: Pool): PoolWithMcap {
  return { ...pool, _mcap: parseFloat(pool.marketCapUsd) }
}

function sortByMcapDesc(pools: Pool[]): Pool[] {
  const withFloats = pools.map(withMcap)
  withFloats.sort((a, b) => b._mcap - a._mcap)
  return withFloats
}

function sortByNewest(pools: Pool[]): Pool[] {
  return [...pools].sort((a, b) => b.eventTimestamp - a.eventTimestamp)
}

function computeAddresses(type: TrenchType): string[] {
  const pools = usePoolStore.getState().pools
  const allPools = Array.from(pools.values())
  const nowMs = Date.now()

  const isNew = (p: Pool) => (nowMs - p.eventTimestamp) <= NEW_POOL_AGE_THRESHOLD_MS
  const isLocked = (p: Pool) => p.isLocked === true
  const isSpent = (p: Pool) => !isNew(p) && !isLocked(p)

  let limit: number
  let filtered: Pool[]

  if (type === "NEW") {
    filtered = allPools.filter(isNew)
    limit = TRENCH_LIMIT_NEW
  } else if (type === "LOCKED") {
    filtered = allPools.filter(isLocked)
    limit = TRENCH_LIMIT_LOCKED
  } else {
    filtered = allPools.filter(isSpent)
    limit = TRENCH_LIMIT_SPENT
  }

  const sorter = type === "NEW" ? sortByNewest : sortByMcapDesc
  return sorter(filtered).slice(0, limit).map(p => p.pairAddress)
}

function arraysEqual(a: string[], b: string[]): boolean {
  return a.length === b.length && a.every((v, i) => v === b[i])
}

export function useTrenchesPools(type: TrenchType): string[] {
  const [addresses, setAddresses] = useState<string[]>([])
  const cachedRef = useRef<string[]>([])

  useEffect(() => {
    const update = () => {
      const next = computeAddresses(type)
      if (!arraysEqual(next, cachedRef.current)) {
        cachedRef.current = next
        setAddresses(next)
      }
    }

    update()
    return usePoolStore.subscribe((state, prevState) => {
      if (state.changesCount !== prevState.changesCount) {
        update()
      }
    })
  }, [type])

  return addresses
}
