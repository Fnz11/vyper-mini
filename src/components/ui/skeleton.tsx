import { cn } from "@/lib/utils"

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("bg-gradient-to-br from-white/10 to-white/0 animate-pulse rounded-sm", className)}
      {...props}
    />
  )
}

export { Skeleton }
