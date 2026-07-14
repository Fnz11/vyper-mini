"use client"

import { memo } from "react"
import { Check, Copy } from "lucide-react"
import { useCopyToClipboard } from "../../_hooks/useCopyToClipboard"

interface TokenHeaderProps {
  symbol: string
  name: string
}

const TokenHeader = memo(function TokenHeader({ symbol, name }: TokenHeaderProps) {
  const { copied, copy: onCopy } = useCopyToClipboard(symbol)

  return (
    <div className="flex items-center gap-1.5 font-semibold">
      <span>{symbol}</span>
      <span className="text-muted-foreground text-[13px] font-normal">{name}</span>
      <button type="button" onClick={onCopy} aria-label="Copy symbol" className="opacity-0 group-hover:opacity-100 transition-opacity">
        {copied ? <Check className="size-3 text-success" /> : <Copy className="size-3.5" />}
      </button>
    </div>
  )
})

export default TokenHeader
