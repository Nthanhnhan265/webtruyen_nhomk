export default function DashboardHome() {
  const userName = 'Admin' // Thay bằng tên người dùng đăng nhập nếu có.

  return (
    <div className="p-6 space-y-6">
      {/* Phần chào mừng */}
      <div className="bg-blue-100 p-4 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold text-blue-800">
          Chào mừng trở lại, {userName}!
        </h1>
        <p className="text-gray-600">
          Dưới đây là một số thông tin và tính năng hữu ích dành cho bạn.
        </p>
      </div>

      {/* Thống kê tổng quan */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
          <h2 className="text-xl font-medium text-gray-800">Tổng số truyện</h2>
          <p className="text-3xl font-bold text-blue-600">120</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
          <h2 className="text-xl font-medium text-gray-800">Người dùng</h2>
          <p className="text-3xl font-bold text-green-600">250</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
          <h2 className="text-xl font-medium text-gray-800">Chương đã duyệt</h2>
          <p className="text-3xl font-bold text-purple-600">500</p>
        </div>
      </div>

      {/* Liên kết nhanh */}
      <div className="bg-gray-50 p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-medium text-gray-800">Liên kết nhanh</h2>
        <div className="mt-4 flex flex-wrap gap-4">
          <a
            href="/dashboard/stories"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Quản lý truyện
          </a>
          <a
            href="/dashboard/users"
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
          >
            Quản lý người dùng
          </a>
          <a
            href="/dashboard/settings"
            className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
          >
            Cài đặt
          </a>
        </div>
      </div>
    </div>
  )
}
