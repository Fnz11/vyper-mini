import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"

function CardSkeleton({ index }: { index: number }) {
  return (
    <div className={cn(
      "flex h-[119px] w-full items-center gap-4 px-2.5",
      index % 2 === 0 ? "bg-light-1" : "bg-light-2"
    )}>
      <div className="flex flex-col items-center gap-1">
        <Skeleton className="size-20 rounded-md" />
        <Skeleton className="h-3 w-14" />
      </div>
      <div className="flex flex-1 flex-col gap-2">
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-1.5">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-3 w-20" />
          </div>
          <div className="flex flex-col items-end gap-1">
            <div className="flex gap-1.5">
              <Skeleton className="h-5 w-16" />
              <Skeleton className="h-5 w-14" />
            </div>
            <div className="flex gap-1.5">
              <Skeleton className="h-5 w-14" />
              <Skeleton className="h-5 w-16" />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex gap-1">
            <Skeleton className="h-5 w-7" />
            <Skeleton className="h-5 w-7" />
            <Skeleton className="h-5 w-7" />
            <Skeleton className="h-5 w-7" />
            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-5 w-10" />
            <Skeleton className="h-5 w-20" />
          </div>
          <Skeleton className="h-8 w-16 rounded-full" />
        </div>
      </div>
    </div>
  )
}

export function TrenchesListSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="flex flex-col">
      {Array.from({ length: count }, (_, i) => (
        <CardSkeleton key={i} index={i} />
      ))}
    </div>
  )
}

export function TrenchesSkeleton() {
  return (
    <div className="grid h-[calc(100vh-48px)] grid-cols-3 overflow-hidden">
      <TrenchesListSkeleton />
      <TrenchesListSkeleton />
      <TrenchesListSkeleton />
    </div>
  )
}