"use client"

import React from "react"
import { Search, Volume2, Filter, Settings, Shell, Shield, Coins } from "lucide-react"
import type { TrenchType } from "@/app/trenches/_types/pool.types"
import { Button } from "@/components/ui/button"
import { TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"

interface TrenchesHeaderProps {
  type: TrenchType
}

const TYPE_ICONS: Record<TrenchType, React.ReactNode> = {
  NEW: <Shell className="text-primary-2 size-5" />,
  LOCKED: <Shield className="text-primary-2 size-5" />,
  SPENT: <Coins className="text-primary-2 size-5" />,
}

const TrenchesHeader = React.memo(function TrenchesHeader({ type }: TrenchesHeaderProps) {
  const Icon = TYPE_ICONS[type] || TYPE_ICONS.NEW

  return (
    <div className="border-border flex items-center justify-between border-b px-2 py-1">
        <h2 className="ml-1 flex items-center gap-2 text-sm font-semibold">
          {Icon}
          <span>{type}</span>
        </h2>
        <div className="flex items-center justify-center gap-1">
          <Button variant="light" size="sm" className="text-muted-foreground hidden items-center gap-2 px-3 text-xs font-normal sm:flex">
            <Search className="text-foreground h-4 w-4" />
            <span className="text-sm">Search tokens...</span>
          </Button>
          <TooltipPrimitive.Root>
            <TooltipTrigger asChild>
              <Button size="sm" variant="light" className="size-8" aria-label="Audio Alerts">
                <Volume2 className="size-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Audio Alerts</p>
              <p className="text-gray-11 text-xs">Toggle sound notifications for new tokens</p>
            </TooltipContent>
          </TooltipPrimitive.Root>
          <TooltipPrimitive.Root>
            <TooltipTrigger asChild>
              <Button size="sm" variant="light" className="size-8" aria-label="Filter Tokens">
                <Filter className="size-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Filter Tokens</p>
            </TooltipContent>
          </TooltipPrimitive.Root>
          <TooltipPrimitive.Root>
            <TooltipTrigger asChild>
              <Button size="sm" variant="light" className="size-8" aria-label="Column Settings">
                <Settings className="size-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Column Settings</p>
            </TooltipContent>
          </TooltipPrimitive.Root>
        </div>
      </div>
  )
})

export { TrenchesHeader }
