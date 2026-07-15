"use client"

import { useRef, useState, useCallback, useEffect } from "react"

export function useListHeight(): readonly [(el: HTMLDivElement | null) => void, number] {
  const elRef = useRef<HTMLDivElement | null>(null)
  const observerRef = useRef<ResizeObserver | null>(null)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    return () => {
      observerRef.current?.disconnect()
    }
  }, [])

  const setRef = useCallback((el: HTMLDivElement | null) => {
    // Disconnect previous observer
    observerRef.current?.disconnect()
    observerRef.current = null

    elRef.current = el
    if (!el) return

    setHeight(el.clientHeight)

    observerRef.current = new ResizeObserver((entries) => {
      const entry = entries[0]
      if (entry) setHeight(entry.contentRect.height)
    })
    observerRef.current.observe(el)
  }, [])

  return [setRef, height] as const
}
