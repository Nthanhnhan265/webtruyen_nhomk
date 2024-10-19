// next.config.mjs
export default {
  reactStrictMode: true,
  env: {
    CUSTOM_KEY: 'my-value', // Giữ lại giá trị của CUSTOM_KEY
  },
  images: {
    // Kết hợp các domain từ cả hai nhánh
    domains: ['localhost', 'example.com'], 
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Thêm các tùy chỉnh webpack ở đây
    return config;
  },
  async redirects() {
    return [
      {
        source: '/old-path', // Cả hai nhánh đều có cùng đường dẫn
        destination: '/new-path',
        permanent: true,
      },
    ];
  },
};
