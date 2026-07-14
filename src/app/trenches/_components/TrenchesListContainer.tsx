"use client"

import React from "react"
import type { TrenchType } from "@/app/trenches/_types/pool.types"
import { useTrenchesPools } from "@/app/trenches/_hooks/useTrenchesPools"
import { usePoolStore } from "@/app/trenches/_stores/usePoolStore"
import { useListHeight } from "@/app/trenches/_hooks/useListHeight"
import { TrenchesHeader } from "@/app/trenches/_components/TrenchesHeader"
import { TrenchesList } from "@/app/trenches/_components/TrenchesList"
import { TooltipProvider } from "@/components/ui/tooltip"

interface TrenchesListContainerProps {
  type: TrenchType
}

const TrenchesListContainer = React.memo(function TrenchesListContainer({
  type,
}: TrenchesListContainerProps) {
  const addresses = useTrenchesPools(type)
  const isLoading = usePoolStore(s => s.isLoading)
  const [listRef, height] = useListHeight()

  return (
    <TooltipProvider>
      <div className="flex h-full flex-col border-r">
        <TrenchesHeader type={type} />
        <TrenchesList addresses={addresses} height={height} listRef={listRef} isLoading={isLoading} />
      </div>
    </TooltipProvider>
  )
})

export { TrenchesListContainer }
