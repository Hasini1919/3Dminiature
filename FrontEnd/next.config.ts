import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "5500",
        pathname: "/products/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "5500",
        pathname: "/uploads/profile/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "5500",
        pathname: "/images/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "5500",
        pathname: "/uploads/user-uploads/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "5500",
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;