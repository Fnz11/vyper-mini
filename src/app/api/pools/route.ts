import { NextResponse } from "next/server"
import type { Pool } from "@/app/trenches/_types/pool.types"
import { generateMockPools, generateMultiplePools, generateValueUpdates } from "@/app/api/pools/_data/mock-generator"
import { MAX_POOL_COUNT, BATCH_SIZE } from "@/app/trenches/_constants/trenches.constants"

let cachedPools: Pool[] | null = null
let updateCount = 0

export function GET(req: Request): NextResponse {
  const url = new URL(req.url)
  const isUpdate = url.searchParams.get("update") === "1"

  if (!cachedPools || !isUpdate) {
    cachedPools = generateMockPools(MAX_POOL_COUNT)
    return NextResponse.json({ pools: cachedPools, timestamp: Date.now() })
  }

  updateCount++

  const updates = generateValueUpdates(cachedPools, BATCH_SIZE)
  updates.forEach(u => {
    const idx = cachedPools!.findIndex(p => p.pairAddress === u.pairAddress)
    if (idx !== -1) cachedPools![idx] = { ...cachedPools![idx], ...u }
  })

  const response: { updates: Partial<Pool>[]; newPools?: Pool[]; timestamp: number } = {
    updates,
    timestamp: Date.now(),
  }

  if (updateCount % 3 === 0) {
    const newPools = generateMultiplePools(cachedPools, 20)
    cachedPools.unshift(...newPools)
    if (cachedPools.length > MAX_POOL_COUNT) cachedPools.splice(MAX_POOL_COUNT)
    response.newPools = newPools
  }

  return NextResponse.json({ update: response })
}
