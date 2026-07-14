import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { btnBase, btnSizes, btnVariants } from "@/styles/button"

const buttonVariants = cva(
  btnBase,
  {
    variants: {
      variant: btnVariants,
      size: btnSizes,
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  withLight = true,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
    withLight?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(
        buttonVariants({ variant, size, className }),
        withLight &&
        (size === "sm" ? "lightning-edges" : "lightning-edges-long"),
      )}
      {...props}
    />
  )
}

export { Button }
