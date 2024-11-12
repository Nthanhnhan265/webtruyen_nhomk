/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', 'truyenplus.vn', 'placehold.co'], // Thêm tên miền 'truyenplus.vn'
  },
  compiler: {
    // Enables the styled-components SWC transform
    styledComponents: true,
  },
}

export default nextConfig
