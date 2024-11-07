import Link from 'next/link'
import { FaBookDead } from 'react-icons/fa'

export default function NotFound() {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-orange-50 text-gray-800 text-center">
      <div className="text-yellow-600 mb-5  animate-bounce">
        <FaBookDead className="w-24 h-24" />
      </div>
      <h1 className="text-8xl font-bold text-yellow-500 mb-4">404</h1>
      <p className="text-2xl mb-2">
        Ôi không! Bạn đã lạc vào một trang không tồn tại.
      </p>
      <p className="text-lg text-gray-500 mb-6">
        Quay lại trang chủ để tiếp tục hành trình của bạn...
      </p>

      <Link
        className="
        text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 transition-colors duration-300"
        href="/"
      >
        ← Quay lại trang chủ
      </Link>
    </div>
  )
}
