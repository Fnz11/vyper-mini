import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

export const btnBase = "focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive relative inline-flex shrink-0 items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-all outline-none focus-visible:ring-[3px] disabled:opacity-50 [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"

export const btnVariants = {
  default:
    "bg-primary-gradient text-background transform shadow-md hover:scale-[1.02] hover:shadow-lg hover:shadow-xl hover:brightness-120 active:scale-[0.98]",
  primary:
    "bg-primary-gradient text-background transform shadow-md hover:scale-[1.02] hover:shadow-lg hover:shadow-xl hover:brightness-120 active:scale-[0.98]",
  secondary:
    "bg-secondary-gradient transform text-white shadow-md hover:scale-[1.02] hover:shadow-lg hover:shadow-xl active:scale-[0.98]",
  tertiary:
    "bg-tertiary-gradient transform text-white shadow-md hover:scale-[1.02] hover:shadow-lg hover:shadow-xl hover:brightness-120 active:scale-[0.98]",
  gray: "bg-gray-gradient transform text-white shadow-md hover:scale-[1.02] hover:shadow-lg hover:shadow-xl active:scale-[0.98]",
  gradient:
    "bg-rainbow-gradient animate-gradient transform bg-[length:200%_200%] text-white shadow-lg hover:scale-[1.02] hover:shadow-lg hover:shadow-xl active:scale-[0.98]",
  "gradient-primary":
    "transform bg-[linear-gradient(135deg,var(--primary-1),var(--primary-2),var(--primary-3))] text-white hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]",
  "gradient-secondary":
    "transform bg-[linear-gradient(135deg,var(--secondary-1),var(--secondary-2),var(--secondary-3))] text-white hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]",
  "gradient-tertiary":
    "transform bg-[linear-gradient(135deg,var(--tertiary-1),var(--tertiary-2),var(--tertiary-3))] text-white hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]",
  destructive:
    "bg-destructive hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 transform text-white shadow-md hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]",
  outline:
    "hover:text-background transform border-2 border-[var(--primary-2)] bg-transparent text-[var(--primary-2)] shadow-sm hover:scale-[1.02] hover:bg-[var(--primary-2)] hover:shadow-md active:scale-[0.98]",
  "outline-secondary":
    "transform border-2 border-[var(--secondary-2)] bg-transparent text-[var(--secondary-2)] shadow-sm hover:scale-[1.02] hover:bg-[var(--secondary-2)] hover:text-white hover:shadow-md active:scale-[0.98]",
  "outline-tertiary":
    "transform border-2 border-[var(--tertiary-2)] bg-transparent text-[var(--tertiary-2)] shadow-sm hover:scale-[1.02] hover:bg-[var(--tertiary-2)] hover:text-white hover:shadow-md active:scale-[0.98]",
  ghost:
    "hover:bg-[var(--primary-1)]/20 hover:text-[var(--primary-3)] dark:hover:bg-[var(--primary-1)]/10",
  light: "bg-light-1 hover:bg-light-1 text-white",
  link: "text-[var(--primary-2)] underline-offset-4 hover:text-[var(--primary-2-hover)] hover:underline",
}

export const btnSizes = {
  default: "h-9 rounded-lg px-4 py-2 has-[>svg]:px-3",
  sm: "h-8 gap-1.5 rounded-sm px-3 has-[>svg]:px-2.5",
  lg: "h-10 rounded-lg px-6 has-[>svg]:px-4",
  icon: "size-9",
}

export const buttonVariants = cva(btnBase, {
  variants: {
    variant: btnVariants,
    size: btnSizes,
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
})
