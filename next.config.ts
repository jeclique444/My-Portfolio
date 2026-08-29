// next.config.ts (or next.config.js)
/** @type {import('next').NextConfig} */
const nextConfig = {
  // ✅ Correct image configuration (replace domains with remotePatterns)
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'imagedelivery.net',
      },
      // Add any other image hosts you use here
    ],
  },
  // ✅ Other valid Next.js config options
  reactStrictMode: true,
  // If you need to configure SWC minify or package optimizations, they are now built‑in in Next.js 16,
  // so you can simply remove the options:
  // swcMinify is enabled by default in production.
  // optimizePackageImports is not a standard Next.js option; you can use experimental.optimizePackageImports if needed.
  experimental: {
    // If you need package optimizations, use the experimental flag:
    // optimizePackageImports: ['framer-motion', 'react-icons', 'three'],
  },
};

module.exports = nextConfig;