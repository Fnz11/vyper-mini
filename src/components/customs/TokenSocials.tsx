import { memo } from "react"
import { FaXTwitter } from "react-icons/fa6"
import { FaTelegram } from "react-icons/fa6"
import { Search } from "lucide-react"
import { cn } from "@/lib/utils"

interface TokenSocialsProps {
  twitter?: string
  telegram?: string
}

function getTwitterUrl(handle: string): string {
  const clean = handle.replace(/^@/, "")
  return `https://x.com/${clean}`
}

function getTelegramUrl(handle: string): string {
  const clean = handle.replace(/^@/, "")
  return `https://t.me/${clean}`
}

const iconLinkClass = "text-muted-foreground hover:text-foreground transition-colors"

const TokenSocials = memo(function TokenSocials({ twitter, telegram }: TokenSocialsProps) {
  if (!twitter && !telegram) return null

  return (
    <div className="flex items-center gap-1">
      {twitter && (
        <a
          href={getTwitterUrl(twitter)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Twitter profile"
          className={cn(iconLinkClass)}
        >
          <FaXTwitter className="w-3 h-3" />
        </a>
      )}
      {telegram && (
        <a
          href={getTelegramUrl(telegram)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Telegram group"
          className={cn(iconLinkClass)}
        >
          <FaTelegram className="w-3 h-3" />
        </a>
      )}
      <a
        href="#"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Search token"
        className={cn(iconLinkClass)}
      >
        <Search className="w-3 h-3" />
      </a>
    </div>
  )
})

export { TokenSocials }
export type { TokenSocialsProps }
