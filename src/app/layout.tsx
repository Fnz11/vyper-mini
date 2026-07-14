import type { Metadata } from "next"
import { Plus_Jakarta_Sans } from "next/font/google"
import { Toaster } from "react-hot-toast"
import DashboardLayout from "@/components/layouts/DashboardLayout"
import "@/app/globals.css"

const font = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-sans",
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: "Vyper Mini — Real-Time DEX Trenches",
    template: "%s | Vyper Mini",
  },
  description:
    "High-performance real-time DEX trenches with batch updates, virtualization, and micro-component architecture. Built with Next.js 15, React 19, Zustand, and react-window.",
  metadataBase: new URL("https://vyper-mini.vercel.app"),
  openGraph: {
    title: "Vyper Mini — Real-Time DEX Trenches",
    description: "Showcasing hyper-fast real-time batch updates with virtualized card list.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vyper Mini",
    description: "Real-time DEX trenches showcase",
  },
  robots: { index: false, follow: false },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${font.variable} dark font-sans antialiased overflow-hidden`}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded-md focus:bg-background focus:px-4 focus:py-2 focus:text-foreground"
        >
          Skip to content
        </a>
        <DashboardLayout>{children}</DashboardLayout>
        <Toaster
          position="top-center"
          gutter={8}
          toastOptions={{
            duration: 4000,
            style: {
              background: "rgba(17,24,39,0.95)",
              color: "#E6EDF3",
              padding: "0.6rem 0.9rem",
              borderRadius: 8,
              boxShadow: "0 6px 18px rgba(2,6,23,0.6)",
              border: "1px solid rgba(255,255,255,0.06)",
              fontSize: "0.875rem",
            },
            success: {
              duration: 2500,
              style: {
                background: "linear-gradient(90deg,#065f46,#10b981)",
                color: "white",
              },
            },
            error: {
              duration: 4000,
              style: {
                background: "linear-gradient(90deg,#dc2626,#f43f5e)",
                color: "white",
              },
            },
          }}
        />
      </body>
    </html>
  )
}
