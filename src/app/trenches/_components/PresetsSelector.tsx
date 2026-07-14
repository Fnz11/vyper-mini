"use client"

import { motion } from "framer-motion"
import { CheckSquare, Percent, Settings, Zap } from "lucide-react"

import { buttonVariants } from "@/styles/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { usePresetsSettingStore } from "@/stores/use-presets-setting.store"
import { useShallow } from "zustand/react/shallow"

export function PresetsSelector() {
  const { presets, activePresetId } = usePresetsSettingStore(
    useShallow((s) => ({ presets: s.presets, activePresetId: s.activePresetId }))
  )
  const activeIndex = presets.findIndex((p) => p.id === activePresetId)
  const pillWidth = `${100 / presets.length}%`

  return (
    <TooltipProvider>
      <div
        className={cn(
          buttonVariants({ variant: "light", size: "sm" }),
          "h-8 p-1",
        )}
      >
        <div className="relative flex h-full gap-1">
          {presets.length > 0 && (
            <motion.div
              layout
              initial={false}
              animate={{ x: `${activeIndex * 100}%` }}
              transition={{ type: "spring", stiffness: 260, damping: 28 }}
              style={{ width: pillWidth }}
              className="absolute left-0 top-0 bottom-0 z-0 rounded-xs bg-white/6 shadow-sm"
            />
          )}

          {presets.map((p) => (
            <Tooltip key={p.id}>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  onClick={() => usePresetsSettingStore.getState().setActivePreset(p.id)}
                  className={cn(
                    "relative z-10 flex h-full flex-1 items-center justify-center truncate rounded-xs px-3 text-[12px] transition-colors focus:outline-none",
                    activePresetId === p.id ? "text-primary" : "text-muted-foreground",
                  )}
                  aria-pressed={activePresetId === p.id}
                  title={p.label}
                >
                  <div className="text-sm leading-none select-none">{p.label}</div>
                </button>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="p-1">
                <div className="flex flex-col gap-1 text-xs">
                  <div className="flex items-center gap-2"><Percent size={12} className="text-foreground" /><div className="font-medium">{p.slippage}</div></div>
                  <div className="flex items-center gap-2"><Zap size={12} className="text-foreground" /><div className="font-medium">{p.gas}</div></div>
                  <div className="flex items-center gap-2"><CheckSquare size={12} className="text-foreground" /><div className="font-medium">{p.autoApproval ? "On" : "Off"}</div></div>
                </div>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>

      <div className="flex h-full w-8 items-center justify-center">
        <div className="hover:bg-hover-300 flex cursor-pointer items-center justify-center rounded-md p-1">
          <button
            type="button"
            onClick={() => usePresetsSettingStore.getState().setSettingsOpen(true)}
            className="text-foreground hover:text-text-100 cursor-pointer"
            aria-label="Presets settings"
          >
            <Settings size={14} />
          </button>
        </div>
      </div>
    </div>
    </TooltipProvider>
  )
}
