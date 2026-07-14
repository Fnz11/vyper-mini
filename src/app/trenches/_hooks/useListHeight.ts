"use client"

import { useRef, useState, useCallback } from "react"

export function useListHeight(): readonly [(el: HTMLDivElement | null) => void, number] {
  const ref = useRef<HTMLDivElement | null>(null)
  const [height, setHeight] = useState(0)

  const setRef = useCallback((el: HTMLDivElement | null) => {
    ref.current = el
    if (el) {
      setHeight(el.clientHeight)
    }
  }, [])

  return [setRef, height] as const
}
