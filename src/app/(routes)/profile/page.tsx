'use client' // Sử dụng cho client-side rendering
import UserSideBar from '@/app/(routes)/_component/sidebar_profile'
import Navbar from '@/components/navbar'
import { Avatar, Button, HR, Label, TextInput } from 'flowbite-react'
import { useRouter } from 'next/navigation' // Thêm import useRouter
import { LuPencilLine } from 'react-icons/lu'
import { PiMountainsFill } from 'react-icons/pi'

const ProfilePage = () => {
  const router = useRouter() // Khởi tạo router

  const handleSelectImage = () => {
    router.push('/select-image') // Chuyển hướng đến trang chọn ảnh
  }

  const handleChangePassword = () => {
    // Logic cập nhật mật khẩu có thể được thêm vào đây
    alert('Mật khẩu đã được cập nhật!') // Thông báo cho người dùng
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <div className="fixed top-0 left-0 w-full z-10 bg-gray-800 text-black">
        <Navbar />
      </div>

      {/* Sidebar */}
      <div className="fixed top-24 left-0 w-64 h-screen bg-gray-800 text-white">
        {' '}
        {/* Thêm top-16 để tạo khoảng cách từ Navbar */}
        <UserSideBar />
      </div>

      {/* Nội dung chính */}
      <div className="flex-1 ml-64 mt-10 px-16 py-20 bg-black/5">
        {/* Thông tin tài khoản */}
        <h2 className="border-l-2 border-red-600 ps-5 text-black/70 text-xl">
          Thông tin tài khoản
        </h2>
        <div className="mt-3 mb-6 bg-white pt-5 shadow-md rounded-lg">
          {/* avatar and other */}
          <div className="flex justify-between items-center px-10">
            <div className="flex gap-5">
              <Avatar rounded />
              <div>
                <br />
                @username
              </div>
            </div>
            <Button
              color="failure"
              onClick={handleSelectImage}
            >
              <PiMountainsFill className="mx-2 mt-0.5" />
              Chọn ảnh
            </Button>
          </div>
          <HR className="mx-2" />
          <div className="px-10 flex justify-between pb-20">
            <div>
              Họ và tên : Tài
              <br />
              Email : taithanhmai@gmail.com
            </div>
            <Button
              className="mt-2 bg-gray-200"
              color="text-black"
            >
              <LuPencilLine className="mt-1 mr-2" /> Thay đổi
            </Button>
          </div>
        </div>

        {/* Thay đổi mật khẩu */}
        <h2 className="border-l-2 border-red-600 ps-5 text-black/70 text-xl mt-10">
          Thay đổi mật khẩu
        </h2>
        <div className="mt-3 mb-6 bg-white pt-5 shadow-md rounded-lg">
          <div className="px-10 flex pb-20">
            <div className="flex flex-col gap-4 w-1/2 mt-4">
              <div className="flex items-center gap-4">
                <Label
                  className="mr-5"
                  htmlFor="current-password"
                  value="Mật khẩu hiện tại:"
                />
                <TextInput
                  id="current-password"
                  type="password"
                  required
                  style={{ width: '300px' }}
                />{' '}
                {/* Kích thước dài hơn */}
              </div>
              <div className="flex items-center gap-4">
                <Label
                  className="mr-10"
                  htmlFor="new-password"
                  value="Mật khẩu mới:"
                />
                <TextInput
                  id="new-password"
                  type="password"
                  required
                  style={{ width: '300px' }}
                />{' '}
                {/* Kích thước dài hơn */}
              </div>
              <div className="flex items-center gap-4">
                <Label
                  className="mr-1"
                  htmlFor="confirm-password"
                  value="Xác nhận mật khẩu:"
                />
                <TextInput
                  id="confirm-password"
                  type="password"
                  required
                  style={{ width: '300px' }}
                />{' '}
                {/* Kích thước dài hơn */}
              </div>
            </div>
            <div className="w-1/2 flex justify-end mb-32">
              <Button
                className="mt-4 bg-gray-200"
                color="text-black"
                onClick={handleChangePassword}
              >
                <LuPencilLine className="mt-1 mr-2" /> Thay đổi
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
