"use client"

import { memo } from "react"
import { Check, Copy } from "lucide-react"
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { truncateAddress } from "@/lib/format-number"
import { useCopyToClipboard } from "../../_hooks/useCopyToClipboard"

interface ContractAddressProps {
  address: string
  showCopyButton?: boolean
  variant?: "compact" | "full"
}

const ContractAddress = memo(function ContractAddress({
  address,
  showCopyButton = true,
  variant = "compact",
}: ContractAddressProps) {
  const { copied, copy: onCopy } = useCopyToClipboard(address)

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="flex items-center gap-1">
          <span className={cn(variant === "compact" ? "text-xs" : "text-sm", "text-muted-foreground")}>
            {truncateAddress(address)}
          </span>
          {showCopyButton && (
            <button type="button"
              onClick={onCopy}
              aria-label="Copy address"
              className="opacity-0 group-hover:opacity-100 transition-opacity"
            >
              {copied ? <Check className="size-3 text-success" /> : <Copy className="size-3" />}
            </button>
          )}
        </div>
      </TooltipTrigger>
      <TooltipContent>{address}</TooltipContent>
    </Tooltip>
  )
})

export default ContractAddress
