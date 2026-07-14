"use client"

import dynamic from "next/dynamic"
import { TrenchesListSkeleton, TrenchesSkeleton } from "@/app/trenches/_components/skeleton/TrenchesListSkeleton"

const TrenchesViewDynamic = dynamic(
  () => import("@/app/trenches/_components/TrenchesView"),
  {
    ssr: false,
    loading: TrenchesSkeleton
  },
)

export function TrenchesViewLoader() {
  return <TrenchesViewDynamic />
}
