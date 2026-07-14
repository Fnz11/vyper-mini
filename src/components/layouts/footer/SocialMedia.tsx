"use client"

import Link from "next/link"
import { MessageCircle, Send, Twitter } from "lucide-react"

import { buttonVariants } from "@/styles/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

const TwitterIcon = Twitter
const DiscordIcon = MessageCircle
const TelegramIcon = Send

const socialLinks = [
  {
    name: "X (Twitter)",
    icon: TwitterIcon,
    href: "https://x.com/vyperdex",
    color: "hover:text-[#ffffff]",
  },
  {
    name: "Discord",
    icon: DiscordIcon,
    href: "https://discord.gg/vyperdex",
    color: "hover:text-[#5865F2]",
  },
  {
    name: "Telegram",
    icon: TelegramIcon,
    href: "https://t.me/vyperdex",
    color: "hover:text-[#0088CC]",
  },
]

export function SocialMedia() {
  return (
    <div className="flex items-center gap-1 px-2 py-1">
      {socialLinks.map((social) => (
        <TooltipProvider key={social.name}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  buttonVariants({ variant: "light", size: "sm" }),
                  "text-muted-foreground size-6 rounded-sm p-1",
                  social.color,
                )}
              >
                <social.icon className="size-3" />
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>Join our {social.name} community</p>
              <p className="text-gray-11 mt-1 text-xs">
                Get updates and support
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
    </div>
  )
}
