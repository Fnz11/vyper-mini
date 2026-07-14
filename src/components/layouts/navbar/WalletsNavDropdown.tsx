"use client"

import { ChevronDown, Copy, CircleArrowOutDownLeft, CircleArrowOutUpRight, ExternalLink, Star, Wallet } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

const mockWallets = [
  { name: "Main Wallet", address: "5fNfvyp5f3HP...KjxuL8pU", balance: "1,234.56", isFavorite: true },
  { name: "Trading Wallet", address: "9Bd2nK8x2mH7...3vR8yW2Q", balance: "856.78", isFavorite: true },
  { name: "Savings Wallet", address: "7cP9jL4k5sN2...1zM6xT9E", balance: "3,456.12", isFavorite: false },
]

function WalletButtonBundle({ address }: { address: string }) {
  return (
    <div className="mt-1 flex items-center gap-1">
      <Tooltip><TooltipTrigger asChild><button type="button" aria-label="Copy address" className="hover:text-primary size-4 p-0"><Copy className="size-3" /></button></TooltipTrigger><TooltipContent sideOffset={6}>Copy address</TooltipContent></Tooltip>
      <Tooltip><TooltipTrigger asChild><button type="button" aria-label="Deposit" className="hover:text-primary size-4 p-0"><CircleArrowOutDownLeft className="size-3" /></button></TooltipTrigger><TooltipContent sideOffset={6}>Deposit</TooltipContent></Tooltip>
      <Tooltip><TooltipTrigger asChild><button type="button" aria-label="Withdraw" className="hover:text-primary size-4 p-0"><CircleArrowOutUpRight className="size-3" /></button></TooltipTrigger><TooltipContent sideOffset={6}>Withdraw</TooltipContent></Tooltip>
      <Tooltip><TooltipTrigger asChild><button type="button" aria-label="Open in explorer" className="hover:text-primary size-4 p-0"><ExternalLink className="size-3" /></button></TooltipTrigger><TooltipContent sideOffset={6}>Open in explorer</TooltipContent></Tooltip>
    </div>
  )
}

export function WalletsNavDropdown() {
  const totalBalance = mockWallets.reduce((sum, w) => sum + parseFloat(w.balance.replace(",", "")), 0)

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="light" size="sm" className="flex items-center gap-2">
          <Wallet className="h-4 w-4" />
          <span className="hidden text-sm font-medium sm:inline">${totalBalance.toLocaleString()}</span>
          <ChevronDown className="size-3" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="border-b px-4 py-2">
          <h3 className="text-sm font-semibold">My Wallets</h3>
          <p className="text-muted-foreground flex items-center gap-1 text-xs">Total Balance: {totalBalance.toLocaleString()} ETH</p>
        </div>
        <div className="custom-scrollbar max-h-60 overflow-y-auto p-1.5">
          {mockWallets.map((wallet) => (
            <div key={wallet.address} className="hover:bg-muted/50 flex cursor-pointer items-center justify-between p-3 transition-colors">
              <div className="flex min-w-0 items-center gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-1">
                    <p className="truncate text-sm font-medium">{wallet.name}</p>
                    {wallet.isFavorite && <Star className="text-tertiary-2 size-3" fill="oklch(0.92 0.20 85)" />}
                  </div>
                  {wallet.address && <p className="text-muted-foreground font-mono text-xs">{wallet.address}</p>}
                </div>
              </div>
              <div className="flex flex-col items-center gap-0 text-right">
                <div className="mr-2 flex items-center gap-1 text-sm font-medium">{wallet.balance} ETH</div>
                <WalletButtonBundle address={wallet.address} />
              </div>
            </div>
          ))}
        </div>
        <div className="flex border-t p-3">
          <Button variant="outline" size="sm" className="flex-1">Manage Wallets</Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
