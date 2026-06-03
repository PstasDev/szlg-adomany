import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'secure.barion.com',
        pathname: '/Content/images/paymentgateway/**',
      },
    ],
  },
};

export default nextConfig;
