'use client' // Error boundaries must be Client Components

import { Button } from 'flowbite-react'
import { useState } from 'react'
import { AiOutlineExclamationCircle } from 'react-icons/ai'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const [showDetails, setShowDetails] = useState(false) // Trạng thái để điều khiển việc hiển thị chi tiết lỗi

  //   useEffect(() => {
  //     // Log the error to an error reporting service
  //     console.error(error)
  //   }, [error])

  return (
    <div className="flex flex-col justify-center items-center h-1/2 p-8 rounded-lg">
      <AiOutlineExclamationCircle className="text-red-500 text-6xl mb-4" />
      <h2 className="text-3xl font-semibold text-gray-800 mb-4">
        Có lỗi xảy ra
      </h2>
      <div className="flex gap-2 mb-8 justify-center items-center">
        {/* Nút Xem chi tiết / Ẩn chi tiết */}
        <Button
          onClick={() => setShowDetails(!showDetails)}
          color="gray"
          className="bg-blue-500 text-white hover:bg-blue-600 transition duration-300"
        >
          {showDetails ? 'Ẩn chi tiết' : 'Xem chi tiết'}
        </Button>

        {/* Nút thử lại */}
        <Button
          onClick={reset}
          color="gray"
          className="flex items-center gap-2 bg-green-500 text-white hover:bg-green-600 transition duration-300"
        >
          Thử lại
        </Button>
      </div>
      {/* Hiển thị nút xem chi tiết nếu lỗi có thông tin chi tiết */}
      {showDetails && (
        <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-md">
          <p className="font-medium">Thông tin lỗi:</p>
          <pre className="whitespace-pre-wrap">{error.message}</pre>
          {/* Nếu cần, có thể hiển thị thêm error.stack */}
          {error.stack && (
            <pre className="whitespace-pre-wrap mt-2">{error.stack}</pre>
          )}
        </div>
      )}
    </div>
  )
}
