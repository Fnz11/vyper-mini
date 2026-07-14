"use client"

import { memo, useState, useCallback, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Zap, Loader2, Check, X } from "lucide-react"
import toast from "react-hot-toast"
import { cn } from "@/lib/utils"

type BuyStatus = "idle" | "loading" | "success" | "error"

const MIN_DELAY_MS = 600
const MAX_DELAY_MS = 1200
const SUCCESS_RATE = 0.7
const RESET_DELAY_MS = 900

function simulateBuy(): Promise<void> {
  const delay = MIN_DELAY_MS + Math.random() * (MAX_DELAY_MS - MIN_DELAY_MS)
  return new Promise((resolve, reject) =>
    setTimeout(() => (Math.random() < SUCCESS_RATE ? resolve() : reject()), delay),
  )
}

const BuyButton = memo(function BuyButton() {
  const [status, setStatus] = useState<BuyStatus>("idle")
  const mountedRef = useRef(true)
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  useEffect(() => {
    return () => {
      mountedRef.current = false
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  const scheduleReset = useCallback(() => {
    timerRef.current = setTimeout(() => {
      if (mountedRef.current) setStatus("idle")
    }, RESET_DELAY_MS)
  }, [])

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation()
      if (status === "loading") return

      const promise = simulateBuy()
      setStatus("loading")

      toast.promise(promise, {
        loading: "Processing buy…",
        success: "Buy successful! 🎉",
        error: "Transaction failed",
      })

      promise
        .then(() => {
          if (!mountedRef.current) return
          setStatus("success")
          scheduleReset()
        })
        .catch(() => {
          if (!mountedRef.current) return
          setStatus("error")
          scheduleReset()
        })
    },
    [status, scheduleReset],
  )

  const Icon =
    status === "loading" ? Loader2 : status === "success" ? Check : status === "error" ? X : Zap

  return (
    <Button
      variant="gradient-tertiary"
      size="sm"
      className={cn(
        "buy-transaction-button shrink-0 rounded-full border-2 border-tertiary-2 px-3 text-black font-bold",
      )}
      onClick={handleClick}
      aria-label="Buy token"
      aria-busy={status === "loading"}
    >
      <span className={cn("tx-effect", status === "loading" && "loading", status === "success" && "success")} />
      <span className="tx-hover" aria-hidden />
      <Icon className={cn("size-3", status === "loading" && "animate-spin")} />
      <span className="text-[13px] font-bold">Buy</span>
    </Button>
  )
})

export { BuyButton }
