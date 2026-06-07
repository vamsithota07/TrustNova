/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "source.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
