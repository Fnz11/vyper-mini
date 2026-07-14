"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { ChartArea, ChevronLeft, ChevronRight, Settings, Star } from "lucide-react"
import { createAvatar } from "@dicebear/core"
import { glass } from "@dicebear/collection"
import { usePoolStore } from "@/app/trenches/_stores/usePoolStore"

import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

const tokenThumb = (symbol: string) =>
  createAvatar(glass, { seed: symbol, size: 20 }).toDataUri()

interface MarqueeItem {
  symbol: string; name: string; price: number; changePercent: number
}

const INITIAL_WATCHLIST: MarqueeItem[] = [
  { symbol: "SOL", name: "Solana", price: 45.67, changePercent: 5.4 },
  { symbol: "USDC", name: "USD Coin", price: 1.0, changePercent: -0.1 },
  { symbol: "RAY", name: "Raydium", price: 1.89, changePercent: 6.8 },
  { symbol: "BONK", name: "Bonk", price: 0.000023, changePercent: 4.5 },
  { symbol: "JUP", name: "Jupiter", price: 0.78, changePercent: -6.0 },
  { symbol: "ORCA", name: "Orca", price: 3.45, changePercent: 7.1 },
  { symbol: "SAMO", name: "Samoycoin", price: 0.01, changePercent: -8.3 },
  { symbol: "SRM", name: "Serum", price: 0.89, changePercent: 4.7 },
  { symbol: "SOL", name: "Solana", price: 45.67, changePercent: 5.4 },
  { symbol: "USDC", name: "USD Coin", price: 1.0, changePercent: -0.1 },
  { symbol: "RAY", name: "Raydium", price: 1.89, changePercent: 6.8 },
  { symbol: "BONK", name: "Bonk", price: 0.000023, changePercent: 4.5 },
  { symbol: "JUP", name: "Jupiter", price: 0.78, changePercent: -6.0 },
  { symbol: "ORCA", name: "Orca", price: 3.45, changePercent: 7.1 },
  { symbol: "SAMO", name: "Samoycoin", price: 0.01, changePercent: -8.3 },
  { symbol: "SRM", name: "Serum", price: 0.89, changePercent: 4.7 },
]

const INITIAL_HOLDINGS: MarqueeItem[] = [
  { symbol: "SOL", name: "Solana", price: 45.67, changePercent: 5.4 },
  { symbol: "USDC", name: "USD Coin", price: 1.0, changePercent: -0.1 },
  { symbol: "RAY", name: "Raydium", price: 1.89, changePercent: 6.8 },
  { symbol: "BONK", name: "Bonk", price: 0.000023, changePercent: 4.5 },
  { symbol: "SOL", name: "Solana", price: 45.67, changePercent: 5.4 },
  { symbol: "USDC", name: "USD Coin", price: 1.0, changePercent: -0.1 },
  { symbol: "RAY", name: "Raydium", price: 1.89, changePercent: 6.8 },
  { symbol: "BONK", name: "Bonk", price: 0.000023, changePercent: 4.5 },
]

const formatPrice = (price: number) => {
  if (price < 0.01) return `$${price.toFixed(6)}`
  return `$${price.toFixed(2)}`
}

function jitter(items: MarqueeItem[]): MarqueeItem[] {
  return items.map(item => {
    const factor = 1 + (Math.random() - 0.48) * 0.15
    const newPrice = item.price * factor
    const newChange = parseFloat((item.changePercent + (Math.random() - 0.5) * 2).toFixed(1))
    return { ...item, price: newPrice, changePercent: newChange }
  })
}

export function WatchlistHoldingHeader() {
  const [activeTab, setActiveTab] = useState<"watchlist" | "holdings">("watchlist")
  const [watchlist, setWatchlist] = useState(INITIAL_WATCHLIST)
  const [holdings, setHoldings] = useState(INITIAL_HOLDINGS)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    return usePoolStore.subscribe((state, prevState) => {
      if (state.changesCount !== prevState.changesCount) {
        setWatchlist(jitter)
        setHoldings(jitter)
      }
    })
  }, [])

  const currentData = activeTab === "watchlist" ? watchlist : holdings

  const scroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return
    const scrollAmount = 200
    const newScrollLeft = scrollContainerRef.current.scrollLeft + (direction === "left" ? -scrollAmount : scrollAmount)
    scrollContainerRef.current.scrollTo({ left: newScrollLeft, behavior: "smooth" })
  }
  const hasData = currentData.length > 0

  return (
    <div className="border-border shadow-primary/[0.03] bg-background/50 relative h-[30px] w-screen shrink-0 items-center gap-1 overflow-hidden border-b px-2 shadow-xl backdrop-blur flex">
      <div className="absolute top-0 left-0 size-full bg-gradient-to-r from-white/[0.04] via-white/[0.03] via-[60%]"></div>

      <div className="relative z-10 flex h-full items-center gap-1">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button size="sm" variant="light" className="size-6 rounded-sm" title="Settings">
              <Settings className="size-3" />
            </Button>
          </TooltipTrigger>
          <TooltipContent><p>Settings</p></TooltipContent>
        </Tooltip>
        <div className="bg-border h-[60%] w-[1px] rounded" />

        <div className="bg-light-1 flex w-fit overflow-hidden rounded-sm">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="sm"
                variant="light"
                className={cn("h-6 w-6 rounded-sm", activeTab === "watchlist" ? "bg-transparent" : "text-primary-2")}
                onClick={() => setActiveTab("watchlist")}
                withLight={false}
                title="Watchlist"
              >
                <Star className="size-3" />
              </Button>
            </TooltipTrigger>
            <TooltipContent><p>Watchlist</p></TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="sm"
                variant="light"
                className={cn("h-6 w-6 rounded-sm", activeTab === "holdings" ? "bg-transparent" : "text-primary-2")}
                onClick={() => setActiveTab("holdings")}
                withLight={false}
                title="Holdings"
              >
                <ChartArea className="size-3" />
              </Button>
            </TooltipTrigger>
            <TooltipContent><p>Holdings</p></TooltipContent>
          </Tooltip>
        </div>
        <div className="bg-border h-[60%] w-[1px] rounded" />
      </div>

      <div className="relative z-10 w-full flex-1 overflow-hidden">
        <div className="absolute top-0 left-[-5px] z-[5] h-full w-20 bg-gradient-to-r from-[#13141b] from-[50%] to-transparent"></div>
        <div className="from-background absolute top-0 right-[-5px] z-[5] h-full w-20 bg-gradient-to-l from-[50%] to-transparent"></div>

        <Tooltip>
          <TooltipTrigger asChild>
            <button
              type="button"
              className="text-muted-foreground hover:text-foreground absolute top-0 left-0 z-[10] ml-[-2px] flex h-6 items-center transition-all duration-200 ease-out hover:-translate-x-1"
              onClick={() => scroll("left")}
              title="Scroll left"
            >
              <ChevronLeft className="size-4" strokeWidth={1.5} />
              <span className="ml-[-3px] font-mono text-xs leading-0">prev</span>
            </button>
          </TooltipTrigger>
          <TooltipContent><p>Scroll left</p></TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <button
              type="button"
              className="text-muted-foreground hover:text-foreground absolute top-0 right-0 z-[10] ml-[-2px] flex h-6 items-center transition-all duration-200 ease-out hover:translate-x-1"
              onClick={() => scroll("right")}
              title="Scroll right"
            >
              <span className="mr-[-3px] font-mono text-xs leading-0">next</span>
              <ChevronRight className="size-4" strokeWidth={1.5} />
            </button>
          </TooltipTrigger>
          <TooltipContent><p>Scroll right</p></TooltipContent>
        </Tooltip>

        {hasData ? (
          <div ref={scrollContainerRef} className="scrollbar-hide custom-scrollbar flex h-full items-center gap-1 overflow-x-auto px-6">
            {currentData.map((item, index) => (
              <div
                key={`${item.symbol}-${index}`}
                className="bg-light-1-hover flex shrink-0 cursor-pointer items-center gap-1.5 rounded px-2 py-0.5 font-mono transition-colors"
                title={`${item.name} - ${formatPrice(item.price)}`}
              >
                <div className="relative block size-5 overflow-hidden rounded-full">
                  <Image
                    src={tokenThumb(item.symbol)}
                    alt={item.symbol}
                    width={20}
                    height={20}
                    className="size-full object-contain"
                    unoptimized
                  />
                </div>
                <span className="text-gray-12 min-w-fit text-xs font-medium">{item.symbol}</span>
                <span className="text-gray-11 min-w-fit text-xs">{formatPrice(item.price)}</span>
                <span className={cn("min-w-fit text-xs font-medium", item.changePercent >= 0 ? "text-success" : "text-destructive")}>
                  {item.changePercent >= 0 ? "+" : ""}{item.changePercent.toFixed(2)}%
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-gray-11 flex h-full items-center justify-center text-xs">
            {activeTab === "watchlist" ? "No watchlist items" : "No holdings"}
          </div>
        )}
      </div>
    </div>
  )
}
