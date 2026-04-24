import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  devIndicators: false,
  images: {
    remotePatterns: [
      { hostname: 'images.unsplash.com' },
    ],
  },
}

export default nextConfig
