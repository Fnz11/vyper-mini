import { create } from "zustand"
import type { Pool } from "../_types/pool.types"

interface PoolState {
  pools: Map<string, Pool>
  changesCount: number
  isLoading: boolean
  setPools: (incoming: Pool[]) => void
  addPool: (pool: Pool) => void
  batchUpdatePools: (updates: Partial<Pool>[]) => void
  getPoolByAddress: (address: string) => Pool | undefined
}

function hasDiff(a: Pool, b: Pool): boolean {
  return (
    a.priceUsd !== b.priceUsd ||
    a.liquidityUsd !== b.liquidityUsd ||
    a.volumeUsd !== b.volumeUsd ||
    a.marketCapUsd !== b.marketCapUsd ||
    a.holders !== b.holders ||
    a.status !== b.status
  )
}

function buildMap(incoming: Pool[]): Map<string, Pool> {
  const map = new Map<string, Pool>()
  for (const pool of incoming) {
    map.set(pool.pairAddress, pool)
  }
  return map
}

export const usePoolStore = create<PoolState>((set, get) => ({
  pools: new Map(),
  changesCount: 0,
  isLoading: true,

  setPools: (incoming: Pool[]) => {
    const current = get().pools
    const next = buildMap(incoming)
    let changed = next.size !== current.size

    if (!changed) {
      for (const [address, pool] of next) {
        const existing = current.get(address)
        if (!existing || hasDiff(existing, pool)) {
          changed = true
          break
        }
      }
    }

    if (!changed) return

    set({
      pools: next,
      changesCount: get().changesCount + 1,
      isLoading: false,
    })
  },

  addPool: (pool: Pool) => {
    set((state) => {
      const newPools = new Map(state.pools)
      newPools.set(pool.pairAddress, pool)
      return { pools: newPools, changesCount: state.changesCount + 1 }
    })
  },

  batchUpdatePools: (updates: Partial<Pool>[]) => {
    const current = get().pools
    const next = new Map(current)
    let changed = false

    for (const update of updates) {
      if (!update.pairAddress) continue
      const existing = current.get(update.pairAddress)
      if (existing) {
        const merged = { ...existing, ...update }
        next.set(update.pairAddress, merged)
        if (!changed && hasDiff(existing, merged)) {
          changed = true
        }
      }
    }

    if (!changed) return
    set({ pools: next, changesCount: get().changesCount + 1 })
  },

  getPoolByAddress: (address: string) => {
    return get().pools.get(address)
  },
}))
