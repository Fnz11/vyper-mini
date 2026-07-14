"use client"

import dynamic from "next/dynamic"
import { Logo } from "@/components/customs/Logo"

const NavigationLinks = dynamic(
  () => import("@/components/layouts/navbar/NavigationLinks").then((m) => m.NavigationLinks),
  { ssr: true },
)

const SearchNavButton = dynamic(
  () => import("@/components/layouts/navbar/SearchNavButton").then((m) => m.SearchNavButton),
  { ssr: false },
)

const WalletsNavDropdown = dynamic(
  () => import("@/components/layouts/navbar/WalletsNavDropdown").then((m) => m.WalletsNavDropdown),
  { ssr: false },
)

const UserProfile = dynamic(
  () => import("@/components/layouts/navbar/UserProfile").then((m) => m.UserProfile),
  { ssr: false },
)

function Navbar() {
  return (
    <nav
      aria-label="Main navigation"
      className="shrink-0 border-border bg-background/50 sticky top-0 z-50 w-full border-b backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div className="relative h-12 w-full">
        <div className="absolute top-0 left-0 size-full bg-gradient-to-r from-white/4 via-white/3 via-[60%]" />
        <div className="relative z-5 flex h-full items-center justify-between px-2">
          <div className="flex h-full items-center">
            <Logo />
            <div className="bg-border mx-3 h-[50%] w-px rounded" />
            <NavigationLinks />
          </div>
          <div className="flex items-center gap-2">
            <SearchNavButton />
            <WalletsNavDropdown />
            <UserProfile />
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
