<<<<<<< HEAD
/** @type {import('next').NextConfig} */
const nextConfig = {};

export default nextConfig;
=======
// next.config.js
export default {
    reactStrictMode: true,
    env: {
        CUSTOM_KEY: 'my-value',
    },
    images: {
        domains: ['example.com'],
    },
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
        // Thêm các tùy chỉnh webpack ở đây
        return config;
    },
    async redirects() {
        return [
            {
                source: '/old-path',
                destination: '/new-path',
                permanent: true,
            },
        ];
    },
};
>>>>>>> Login
