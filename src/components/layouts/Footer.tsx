"use client"

import BtcPrice from "@/components/layouts/footer/BtcPrice"
import SolanaPrice from "@/components/layouts/footer/SolanaPrice"
import PriorityFee from "@/components/layouts/footer/PriorityFee"
import BribeFee from "@/components/layouts/footer/BribeFee"
import FpsAndConnectionStatus from "@/components/layouts/footer/FpsAndConnectionStatus"
import { RegionSelection } from "@/components/layouts/footer/RegionSelection"
import { DocsLink } from "@/components/layouts/footer/DocsLink"
import { SocialMedia } from "@/components/layouts/footer/SocialMedia"

export default function Footer() {
  return (
    <footer className="fixed right-0 bottom-0 z-50 h-9">
      <div className="relative h-full w-full pl-1">
        <div className="bg-background border-border absolute top-0 -left-3 z-[3] h-[110%] w-[50%] rotate-8 -skew-8 rounded-tl-md border-l"></div>
        <div className="bg-background border-border absolute top-0 left-0 z-[2] h-full w-full border-t"></div>
        <div className="relative z-[5] flex h-full items-center">
          <div className="pointer-events-none absolute top-0 right-0 z-[5] size-full bg-gradient-to-l from-white/[0.08] via-white/[0.05]"></div>
          <div className="flex items-center justify-center gap-1">
            <BtcPrice />
            <SolanaPrice />
          </div>
          <div className="bg-border mx-2 h-[50%] w-[1px] rounded" />
          <div className="flex items-center justify-center gap-1">
            <PriorityFee />
            <BribeFee />
          </div>
          <div className="bg-border mx-2 h-[50%] w-[1px] rounded" />
          <div className="flex items-center justify-center gap-1">
            <FpsAndConnectionStatus />
            <RegionSelection />
          </div>
          <div className="bg-border mx-2 h-[50%] w-[1px] rounded" />
          <div className="flex items-center justify-center">
            <DocsLink />
            <SocialMedia />
          </div>
        </div>
      </div>
    </footer>
  )
}
