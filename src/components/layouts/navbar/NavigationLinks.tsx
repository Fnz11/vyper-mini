"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const NAV_ITEMS = [
  { href: "/trenches", label: "Trenches" },
  { href: "/trade", label: "Trade" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/wallets", label: "Wallets" },
] as const

export function NavigationLinks() {
  const pathname = usePathname()

  if (!NAV_ITEMS.length) return null

  return (
    <nav aria-label="Main navigation" className="flex items-center gap-0.5">
      {NAV_ITEMS.map((item) => {
        const isActive = pathname.startsWith(item.href)
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "rounded-md px-2.5 py-1.5 text-sm font-medium transition-colors",
              isActive
                ? "bg-light-1 text-primary-2"
                : "text-muted-foreground hover:bg-light-1-hover hover:text-foreground",
            )}
          >
            {item.label}
          </Link>
        )
      })}
    </nav>
  )
}
