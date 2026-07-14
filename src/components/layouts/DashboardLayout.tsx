import Navbar from "@/components/layouts/Navbar"
import { WatchlistHoldingHeader } from "@/components/layouts/WatchlistHoldingHeader"
import Footer from "@/components/layouts/Footer"
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <WatchlistHoldingHeader />
      <main id="main-content" className="flex flex-1 flex-col overflow-hidden">
        {children}
      </main>
      <Footer />
    </div>
  )
}
