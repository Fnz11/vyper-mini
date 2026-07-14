"use client"
import { Search } from "lucide-react"

import { Button } from "@/components/ui/button"

export function SearchNavButton() {
  return (
    <Button
      variant="light"
      size="sm"
      className="text-muted-foreground hover:text-foreground hidden items-center gap-2 px-3 text-xs font-normal sm:flex"
    >
      <Search className="text-foreground h-4 w-4" />
      <span className="text-sm">Search tokens...</span>
      <div className="bg-light-1 text-muted-foreground ml-2 rounded px-1.5 py-0.5 text-xs">⌘K</div>
    </Button>
  )
}
