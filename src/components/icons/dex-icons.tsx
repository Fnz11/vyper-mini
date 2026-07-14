import React from "react"

export function UniswapIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="16" r="16" fill="#FF007A" />
      <path d="M12 8c1.5 2.5 1.5 5.5 0 8s-3 3-3 3" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M20 8c-1.5 2.5-1.5 5.5 0 8s3 3 3 3" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M10 12c4-1 8-1 12 0" stroke="white" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  )
}

export function SushiSwapIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="16" r="16" fill="#E05DAA" />
      <path d="M10 10l12 12M22 10L10 22" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
      <circle cx="16" cy="16" r="4" stroke="white" strokeWidth="1.2" fill="none"/>
    </svg>
  )
}

export function AerodromeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="16" r="16" fill="#2660f5" />
      <path d="M8 20c4-4 5-8 8-8s4 4 8 8" stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <circle cx="16" cy="12" r="2" fill="white"/>
    </svg>
  )
}

export function AlienBaseIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="16" r="16" fill="#92a7bd" />
      <ellipse cx="12" cy="14" rx="2.5" ry="3.5" fill="white"/>
      <ellipse cx="20" cy="14" rx="2.5" ry="3.5" fill="white"/>
      <path d="M12 20c1.5 1.5 4 2 4 2s2.5-.5 4-2" stroke="white" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
    </svg>
  )
}
