import Image from "next/image"
import Link from "next/link"

export function Logo() {
  return (
    <Link href="/" className="shrink-0" aria-label="Vyper home">
      <Image
        src="/logo-long.png"
        alt="Vyper"
        width={150}
        height={40}
        className="h-7 w-auto"
        priority
      />
    </Link>
  )
}
