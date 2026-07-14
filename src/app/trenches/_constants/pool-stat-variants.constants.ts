import { cva } from "class-variance-authority"

export const statContainerVariants = cva("inline-flex min-h-[20px] items-center gap-1 rounded px-1.5 py-0.5 text-xs", {
  variants: {
    styleVariant: {
      default: "text-muted-foreground border border-white/[0.05] bg-white/[0.02]",
      ghost: "bg-transparent",
    },
    colorVariant: {
      default: "",
      good: "hover:bg-success/[0.02] hover:border-success/20",
      warn: "hover:bg-warning/[0.02] hover:border-warning/20",
      bad: "hover:bg-destructive/[0.02] hover:border-destructive/20",
      blue: "hover:bg-blue-2/[0.06] hover:border-blue-2/20",
    },
  },
  defaultVariants: { styleVariant: "default", colorVariant: "default" },
})

export const statValueVariants = cva("font-semibold", {
  variants: {
    colorVariant: {
      default: "text-muted-foreground",
      good: "text-success",
      warn: "text-warning",
      bad: "text-destructive",
      blue: "text-blue-2",
    },
  },
  defaultVariants: { colorVariant: "default" },
})
