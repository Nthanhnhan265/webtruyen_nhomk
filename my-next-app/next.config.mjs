// next.config.mjs
export default {
  reactStrictMode: true,
  env: {
    CUSTOM_KEY: "my-value",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    domains: ["http://localhost:4000", "https://upload.wikimedia.org/*"],
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Thêm các tùy chỉnh webpack ở đây
    return config;
  },
  async redirects() {
    return [
      {
        source: "/old-path",
        destination: "/new-path",
        permanent: true,
      },
    ];
  },
};
