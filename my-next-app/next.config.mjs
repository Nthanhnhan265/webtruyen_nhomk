// // next.config.js
// module.exports = {
//     reactStrictMode: true,
//     env: {
//         CUSTOM_KEY: 'my-value',
//     },
//     images: {
//         domains: ['example.com'],
//     },
//     webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
//         // Thêm các tùy chỉnh webpack ở đây
//         return config;
//     },
//     async redirects() {
//         return [
//             {
//                 source: '/old-path',
//                 destination: '/new-path',
//                 permanent: true,
//             },
//         ];
//     },
// };
// next.config.mjs
export default {
  reactStrictMode: true,
  env: {
    CUSTOM_KEY: 'my-value',
  },

  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Thêm các tùy chỉnh webpack ở đây
    return config
  },
  images: {
    domains: ['localhost'], // Add your allowed domains here
  },
  async redirects() {
    return [
      {
        source: '/old-path',
        destination: '/new-path',
        permanent: true,
      },
    ]
  },
}
