import { create } from "zustand"
import type { Pool } from "../_types/pool.types"

interface PoolState {
  pools: Map<string, Pool>
  poolVersions: Map<string, number>
  changesCount: number
  isLoading: boolean
  setPools: (incoming: Pool[]) => void
  addPool: (pool: Pool) => void
  batchUpdatePools: (updates: Partial<Pool>[]) => void
  getPoolByAddress: (address: string) => Pool | undefined
  getPoolVersion: (address: string) => number
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
  poolVersions: new Map(),
  changesCount: 0,
  isLoading: true,

  setPools: (incoming: Pool[]) => {
    const current = get().pools
    const next = buildMap(incoming)
    let changed = next.size !== current.size
    const changedAddresses: string[] = []

    for (const [address, pool] of next) {
      const existing = current.get(address)
      if (!existing || hasDiff(existing, pool)) {
        changed = true
        changedAddresses.push(address)
      }
    }

    if (!changed) return

    const nextVersions = new Map(get().poolVersions)
    for (const addr of changedAddresses) {
      nextVersions.set(addr, (nextVersions.get(addr) ?? 0) + 1)
    }

    set({
      pools: next,
      poolVersions: nextVersions,
      changesCount: get().changesCount + 1,
      isLoading: false,
    })
  },

  addPool: (pool: Pool) => {
    set((state) => {
      const newPools = new Map(state.pools)
      newPools.set(pool.pairAddress, pool)
      const newVersions = new Map(state.poolVersions)
      newVersions.set(pool.pairAddress, (newVersions.get(pool.pairAddress) ?? 0) + 1)
      return {
        pools: newPools,
        poolVersions: newVersions,
        changesCount: state.changesCount + 1,
      }
    })
  },

  batchUpdatePools: (updates: Partial<Pool>[]) => {
    const current = get().pools
    const currentVersions = get().poolVersions
    const nextPools = new Map(current)
    const nextVersions = new Map(currentVersions)
    let changed = false

    for (const update of updates) {
      if (!update.pairAddress) continue
      const existing = current.get(update.pairAddress)
      if (!existing) continue
      const merged = { ...existing, ...update }
      if (hasDiff(existing, merged)) {
        nextPools.set(update.pairAddress, merged)
        nextVersions.set(update.pairAddress, (nextVersions.get(update.pairAddress) ?? 0) + 1)
        changed = true
      }
    }

    if (!changed) return
    set({ pools: nextPools, poolVersions: nextVersions, changesCount: get().changesCount + 1 })
  },

  getPoolByAddress: (address: string) => {
    return get().pools.get(address)
  },

  getPoolVersion: (address: string) => {
    return get().poolVersions.get(address) ?? 0
  },
}))
