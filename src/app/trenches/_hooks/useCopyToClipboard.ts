"use client"
import { useCallback, useEffect, useRef, useState } from "react"

export function useCopyToClipboard(text: string) {
  const [copied, setCopied] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => () => { if (timer.current) clearTimeout(timer.current) }, [])

  const copy = useCallback(async (e: React.MouseEvent) => {
    e.stopPropagation()
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      timer.current = setTimeout(() => setCopied(false), 2000)
    } catch {}
  }, [text])

  return { copied, copy }
}
