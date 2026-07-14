import React from "react"
import { Inbox } from "lucide-react"

const TrenchesEmpty = React.memo(function TrenchesEmpty() {
  return (
    <div className="flex h-full items-center justify-center border-r">
      <div className="flex flex-col items-center gap-2 text-muted-foreground">
        <Inbox className="h-8 w-8" />
        <p className="text-sm">No pools found</p>
      </div>
    </div>
  )
})

export { TrenchesEmpty }
