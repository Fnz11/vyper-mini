import type { Metadata } from "next"
import { TrenchesViewLoader } from "@/app/trenches/_components/TrenchesViewLoader"

export const metadata: Metadata = {
  title: "Trenches",
  description:
    "Real-time batch-updated trenches with virtualized 3-column card list.",
  openGraph: {
    title: "Trenches | Vyper Mini",
    description:
      "3-column virtualized trenches with real-time batch updates.",
  },
}

export default function TrenchesPage() {
  return <TrenchesViewLoader />
}
