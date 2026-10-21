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
      // The earlier site had a blog; its posts no longer exist, so old links land on the homepage.
      {
        source: "/blog",
        destination: "/",
        permanent: true,
      },
      {
        source: "/blog/:path*",
        destination: "/",
        permanent: true,
      },
      // The earlier site had a /tools page; the interactive package finder is the closest page now.
      {
        source: "/tools",
        destination: "/recommend",
        permanent: true,
      },
      // Short tracked links: each one lands on the homepage with tags, so Google Analytics shows where visitors came from
      // (a click from Instagram's or WhatsApp's in-app browser otherwise shows up as "direct"). Temporary, so they can change.
      { source: "/mail", destination: "/?utm_source=email&utm_medium=signature", permanent: false },
      { source: "/wa", destination: "/?utm_source=whatsapp&utm_medium=message", permanent: false },
      { source: "/ig", destination: "/?utm_source=instagram&utm_medium=bio", permanent: false },
      { source: "/maps", destination: "/?utm_source=google&utm_medium=business_profile", permanent: false },
      { source: "/li", destination: "/?utm_source=linkedin&utm_medium=profile", permanent: false },
      { source: "/x", destination: "/?utm_source=x&utm_medium=post", permanent: false },
      { source: "/report", destination: "/?utm_source=audit_report&utm_medium=pdf", permanent: false },
      { source: "/proposal", destination: "/?utm_source=proposal&utm_medium=pdf", permanent: false },
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
        source: "/:path*",
        headers: [
          { key: "Strict-Transport-Security", value: "max-age=31536000" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
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
