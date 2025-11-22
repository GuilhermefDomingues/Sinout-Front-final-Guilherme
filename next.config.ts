import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true, // Enable gzip compression
  experimental: {
    optimizePackageImports: ['lucide-react', 'react-icons', '@tabler/icons-react', 'framer-motion'],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets.aceternity.com",
        // se quiser, pode ser mais específico:
        // pathname: "/templates/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
    // ou, se preferir, a forma antiga:
    // domains: ["assets.aceternity.com"],
  },
};

export default nextConfig;
