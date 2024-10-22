/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost'],
  },
  compiler: {
    // Enables the styled-components SWC transform
    styledComponents: true,
  },
  images: {
    domains: ['truyenplus.vn'], // Thêm tên miền 'truyenplus.vn'
  },
}

export default nextConfig
