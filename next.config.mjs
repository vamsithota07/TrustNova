/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compress: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/pricing",
        destination: "/contact",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/Mockups/:path*",
        destination: "/mockups/:path*",
      },
      {
        source: "/og-image.jpg",
        destination: "/opengraph-image",
      },
      {
        source: "/og-image.png",
        destination: "/opengraph-image",
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/mockups/:path*",
        headers: [
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "Content-Security-Policy",
            value: "frame-ancestors 'self'",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
