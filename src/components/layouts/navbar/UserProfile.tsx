"use client"

import { createAvatar } from "@dicebear/core"
import { identicon } from "@dicebear/collection"
import Image from "next/image"
import { ChevronDown, LogOut, User, Settings } from "lucide-react"
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"

export function UserProfile() {
  const avatarUrl = createAvatar(identicon, { seed: "CryptoTrader", size: 28 }).toDataUri()
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="light" size="sm" className="flex items-center gap-2">
          <Image src={avatarUrl} alt="" width={28} height={28} className="size-6 rounded-full ring-1 ring-primary-2" unoptimized />
          <span className="text-sm font-medium text-foreground hidden sm:inline">CryptoTr...</span>
          <ChevronDown className="size-3 text-muted-foreground" />
        </Button>
      </PopoverTrigger>
      <PopoverContent sideOffset={8} align="end" className="z-50 w-56 rounded-md bg-popover p-2 shadow-md border border-border">
        <div className="flex items-center gap-2 px-2 py-1.5 border-b border-border mb-1">
          <Image src={avatarUrl} alt="" width={32} height={32} className="size-8 rounded-full" unoptimized />
          <div className="flex flex-col">
            <span className="text-sm font-medium">CryptoTrader</span>
            <span className="text-xs text-muted-foreground font-mono">0x1234...5678</span>
          </div>
        </div>
        <button type="button" className="flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-sm hover:bg-light-1-hover">
          <User className="size-4" /> Profile
        </button>
        <button type="button" className="flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-sm hover:bg-light-1-hover">
          <Settings className="size-4" /> Settings
        </button>
        <div className="border-t border-border mt-1 pt-1">
          <button type="button" className="flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-sm text-destructive hover:bg-destructive/10">
            <LogOut className="size-4" /> Disconnect
          </button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
