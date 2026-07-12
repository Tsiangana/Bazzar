import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Cache persistente do Turbopack em disco tem causado corrupção
    // recorrente (.next/dev/cache/turbopack) — desativada a favor de
    // cache só em memória, mais lenta a frio mas nunca fica presa.
    turbopackFileSystemCacheForDev: false,
    turbopackFileSystemCacheForBuild: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
    ],
  },
};

export default nextConfig;
