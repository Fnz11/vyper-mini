"use client"

import { TrenchType } from "@/app/trenches/_types/pool.types"
import { TrenchesListContainer } from "@/app/trenches/_components/TrenchesListContainer"
import { useBatchUpdater } from "@/app/trenches/_hooks/useBatchUpdater"
import { PresetsSelector } from "@/app/trenches/_components/PresetsSelector"
import { WalletSelector } from "@/app/trenches/_components/WalletSelector"
import PresetsSettingModal from "@/app/trenches/_components/PresetsSettingModal"

function TrenchesView() {
  useBatchUpdater()
  return (
    <div className="flex flex-1 flex-col overflow-hidden max-h-[calc(100vh-80px)]">
      <div className="border-border flex shrink-0 items-center justify-between border-b px-2 py-1.5">
        <h1 className="text-lg font-semibold">Trenches</h1>
        <div className="flex items-center gap-2">
          <PresetsSelector />
          <WalletSelector />
        </div>
      </div>

      <div className="grid min-h-0 flex-1 grid-cols-3 overflow-hidden">
        <TrenchesListContainer type={TrenchType.NEW} />
        <TrenchesListContainer type={TrenchType.LOCKED} />
        <TrenchesListContainer type={TrenchType.SPENT} />
      </div>

      <PresetsSettingModal />
    </div>
  )
}

export default TrenchesView
