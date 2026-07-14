"use client"

import React from "react"
import { FixedSizeList } from "react-window"
import { CARD_HEIGHT_PX, CARD_OVERSCAN_COUNT } from "@/app/trenches/_constants/trenches.constants"
import { TrenchCardVirtualized } from "@/app/trenches/_components/card/TrenchCardVirtualized"
import { TrenchesListSkeleton } from "@/app/trenches/_components/skeleton/TrenchesListSkeleton"
import { TrenchesEmpty } from "@/app/trenches/_components/empty/TrenchesEmpty"

interface TrenchesListProps {
  addresses: string[]
  height: number
  listRef: (el: HTMLDivElement | null) => void
  isLoading: boolean
}

const TrenchesList = React.memo(function TrenchesList({ addresses, height, listRef, isLoading }: TrenchesListProps) {
  return (
    <div ref={listRef} className="custom-scrollbar flex-1 overflow-hidden">
      {isLoading ? (
        <TrenchesListSkeleton />
      ) : addresses.length === 0 ? (
        <TrenchesEmpty />
      ) : (
        <FixedSizeList
          height={height}
          itemCount={addresses.length}
          itemData={addresses}
          itemKey={(index: number, data: string[]) => data[index]}
          itemSize={CARD_HEIGHT_PX}
          overscanCount={CARD_OVERSCAN_COUNT}
          width="100%"
        >
          {TrenchCardVirtualized}
        </FixedSizeList>
      )}
    </div>
  )
})

export { TrenchesList }
