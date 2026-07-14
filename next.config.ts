import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.dicebear.com",
      },
      {
        protocol: "https",
        hostname: "assets.trustwallet.com",
      },
      {
        protocol: "https",
        hostname: "assets.coingecko.com",
      },
    ],
  },
}

export default nextConfig
