import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'images.unsplash.com',
        protocol: 'https',
        port: '',
      },
      {
        hostname: 'descriptive-ibis-773.convex.cloud',
        protocol: 'https',
        port: '',
      },
    ],
  },
};

export default nextConfig;
