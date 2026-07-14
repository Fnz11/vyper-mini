"use client"

import Link from "next/link"
import { FileText } from "lucide-react"

import { buttonVariants } from "@/styles/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

export function DocsLink() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            href="/"
            className={cn(
              buttonVariants({ variant: "light", size: "sm" }),
              "h-6 rounded-sm",
            )}
          >
            <FileText className="h-3 w-3" />
            <span className="text-muted-foreground hidden text-xs leading-0 sm:inline">
              Docs
            </span>
          </Link>
        </TooltipTrigger>
        <TooltipContent>
          <p>Access Vyper DEX documentation and guides</p>
          <p className="text-gray-11 mt-1 text-xs">
            Learn about trading, features, and API
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
