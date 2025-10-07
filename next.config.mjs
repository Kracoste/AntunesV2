/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    typedRoutes: true
  },
  // Optimisations pour compatibilité cross-platform
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  // Améliorer la compatibilité des polices
  optimizeFonts: true,
  // Activer la compression
  compress: true,
  // Support PWA et offline
  reactStrictMode: true,
  // Meilleure gestion du trailing slash pour tous les OS
  trailingSlash: false,
};

export default nextConfig;


