"use client"

import { useState } from "react"
import { ChevronDown, Wallet, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const MOCK_WALLETS = [
  { name: "Main Wallet", address: "0x1a2B...9s0T", balance: "1,234.56", isFavorite: true },
  { name: "Trading Wallet", address: "0x9a8B...1s0T", balance: "856.78", isFavorite: true },
  { name: "Savings Wallet", address: "0x2b3C...t1U", balance: "3,456.12", isFavorite: false },
]

export function WalletSelector() {
  const [selectedWallets, setSelectedWallets] = useState<Set<string>>(() => new Set(["0x1a2B...9s0T"]))

  const toggleWallet = (address: string) => {
    setSelectedWallets((prev) => {
      const next = new Set(prev)
      if (next.has(address)) {
        if (next.size <= 1) return prev
        next.delete(address)
      } else next.add(address)
      return next
    })
  }

  const selectAll = () => {
    if (selectedWallets.size === MOCK_WALLETS.length) {
      setSelectedWallets(new Set([MOCK_WALLETS[0].address]))
    } else {
      setSelectedWallets(new Set(MOCK_WALLETS.map((w) => w.address)))
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="light" size="sm" className="h-8 text-xs gap-1" aria-label="Select wallets">
          <Wallet className="size-3.5" />
          {selectedWallets.size > 0 ? (
            <>
              {[...selectedWallets].slice(0, 2).map((addr) => {
                const w = MOCK_WALLETS.find((x) => x.address === addr)
                return w ? (
                  <span key={addr} className="bg-light-1 rounded-xs px-1.5 py-0.5 text-xs">{w.name.slice(0, 5)}...</span>
                ) : null
              })}
              {selectedWallets.size > 2 && <span className="text-muted-foreground text-xs">+{selectedWallets.size - 2}</span>}
            </>
          ) : (
            <span>Select wallets</span>
          )}
          <ChevronDown className="size-3" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="flex items-center justify-between border-b px-4 py-2">
          <h3 className="text-sm font-semibold">Select Wallets</h3>
          <Button size="sm" variant="outline" onClick={selectAll} className="w-fit text-xs h-7">
            {selectedWallets.size === MOCK_WALLETS.length ? "Select favorites" : "Select all"}
          </Button>
        </div>
        <div className="custom-scrollbar max-h-60 overflow-y-auto p-1.5">
          {MOCK_WALLETS.map((wallet) => (
            <div
              key={wallet.address}
              role="button"
              tabIndex={0}
              className="hover:bg-muted/50 flex cursor-pointer items-center justify-between p-3 transition-colors"
              onClick={() => toggleWallet(wallet.address)}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') toggleWallet(wallet.address) }}
            >
              <div className="flex min-w-0 items-center gap-3">
                {selectedWallets.has(wallet.address) ? (
                  <span className="text-primary-2 size-4 flex items-center justify-center">✓</span>
                ) : (
                  <span className="size-4" />
                )}
                <div className="min-w-0">
                  <div className="flex items-center gap-1">
                    <p className="truncate text-sm font-medium">{wallet.name}</p>
                    {wallet.isFavorite && <Star className="text-tertiary-2 size-3" fill="oklch(0.92 0.20 85)" />}
                  </div>
                  <p className="text-muted-foreground font-mono text-xs">{wallet.address}</p>
                </div>
              </div>
              <div className="text-sm font-medium">{wallet.balance} ETH</div>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}
