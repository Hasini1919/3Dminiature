import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "5500",
        pathname: "/products/**",
      },
    ],
  },
  reactStrictMode: true,
  // Optional: Set headers if needed for CSP (handled differently)
};

export default nextConfig;
