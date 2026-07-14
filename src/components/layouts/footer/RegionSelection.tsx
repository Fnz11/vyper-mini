"use client"

import { useState } from "react"

import { buttonVariants } from "@/styles/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const regions = [
  { value: "us-e", label: "US-E", flag: "🇺🇸" },
  { value: "us-w", label: "US-W", flag: "🇺🇸" },
  { value: "eu", label: "EU", flag: "🇪🇺" },
  { value: "as", label: "AS", flag: "🌏" },
  { value: "auto", label: "Auto", flag: "🌐" },
]

export function RegionSelection() {
  const [selectedRegion, setSelectedRegion] = useState("auto")

  const selectedRegionData = regions.find((r) => r.value === selectedRegion)

  return (
    <div>
      <Select value={selectedRegion} onValueChange={setSelectedRegion}>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <SelectTrigger
                className={buttonVariants({
                  variant: "light",
                  className:
                    "text-muted-foreground h-6 w-20 rounded-sm border-0 uppercase",
                })}
                removeClassname
              >
                {selectedRegion}
              </SelectTrigger>
            </TooltipTrigger>
            <TooltipContent>
              <p>
                Select your preferred RPC region for optimal connection speed
              </p>
              <p className="text-gray-11 mt-1 text-xs">
                Current: {selectedRegionData?.label}
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <SelectContent>
          {regions.map((region) => (
            <SelectItem key={region.value} value={region.value}>
              <div className="flex items-center gap-2">
                <span>{region.flag}</span>
                <span className="text-xs">{region.label}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
