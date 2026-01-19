import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },

  // Enable React strict mode for better development experience
  reactStrictMode: true,

  // Optimize production builds
  poweredByHeader: false,
};

export default nextConfig;
