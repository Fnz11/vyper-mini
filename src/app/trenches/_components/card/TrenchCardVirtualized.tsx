import { memo } from "react"
import type { ListChildComponentProps } from "react-window"
import TrenchCard from "@/app/trenches/_components/card/TrenchCard"

const TrenchCardVirtualized = memo(function TrenchCardVirtualized({
  index,
  style,
  data,
}: ListChildComponentProps<string[]>) {
  return (
    <div style={style}>
      <TrenchCard address={data[index]} index={index} />
    </div>
  )
})

export { TrenchCardVirtualized }
