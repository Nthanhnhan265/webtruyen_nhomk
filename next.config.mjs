/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost'],
  },
  compiler: {
    // Enables the styled-components SWC transform
    styledComponents: true,
  },
}

export default nextConfig
