import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3054",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "3054",
        pathname: "/**",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/v1/:path*",
        destination:
          "https://pulled-charitable-dis-bookstore.trycloudflare.com/api/v1/:path*",
      },
      {
        source: "/uploads/:path*",
        destination:
          "https://pulled-charitable-dis-bookstore.trycloudflare.com/uploads/:path*",
      },
    ];
  },
};

export default nextConfig;
