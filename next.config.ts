import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
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
