import MESSAGE from '@/app/message'
import axios, { AxiosError } from 'axios'
import { NextRequest, NextResponse } from 'next/server'

const api = axios.create({
  baseURL: process.env.NODE_API_URL,
  timeout: 5000,
})

export async function PATCH(request: NextRequest) {
  try {
    // Lấy Access Token từ header Authorization
    const accessToken = request.headers
      .get('Authorization')
      ?.replace('Bearer ', '')

    // Kiểm tra nếu Access Token không tồn tại
    if (!accessToken) {
      return NextResponse.json(
        {
          success: false,
          message: MESSAGE.auth.accessTokenMissing,
        },
        { status: 401 },
      )
    }

    // Lấy dữ liệu từ form data (avatar file)
    const formData = await request.formData()
    const avatarFile = formData.get('avatar') as File

    if (!avatarFile) {
      return NextResponse.json(
        {
          success: false,
          message: MESSAGE.sys.fetchError,
        },
        { status: 400 },
      )
    }

    // Tạo FormData để gửi file
    const uploadFormData = new FormData()
    uploadFormData.append('avatar', avatarFile)

    // Gửi yêu cầu cập nhật avatar
    const response = await api.patch('auth/me/avatar', uploadFormData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'multipart/form-data',
      },
    })

    const result = await response.data

    // Nếu kết quả trả về không thành công, ném lỗi
    if (!result.success) {
      throw new Error(result.message || MESSAGE.sys.unknownError)
    }

    // Trả về response thành công với avatar URL mới
    return NextResponse.json(
      {
        success: true,
        message: MESSAGE.auth.updateSuccess,
        data: { avatarUrl: result.data.avatar },
      },
      { status: 200 },
    )
  } catch (error) {
    // Xử lý lỗi từ Axios
    if (error instanceof AxiosError) {
      console.error('Axios error:', error.response?.data)

      // Nếu server trả về 401, chuyển hướng đến trang đăng nhập
      if (error.response?.status === 401) {
        return NextResponse.redirect('/login')
      }

      // Trả về lỗi từ Node.js server
      return NextResponse.json(
        {
          success: false,
          message: error.response?.data?.message || MESSAGE.sys.unknownError,
          status: error.response?.status || 500,
        },
        { status: error.response?.status || 500 },
      )
    }

    // Lỗi thông thường
    if (error instanceof Error) {
      console.error('Error:', error.message)

      // Trả về thông báo lỗi
      return NextResponse.json(
        {
          success: false,
          message: error.message || MESSAGE.sys.unknownError,
          cause: error.cause || MESSAGE.sys.loading,
        },
        { status: 500 },
      )
    }

    // Lỗi không xác định
    console.error('Unknown error:', error)

    return NextResponse.json(
      {
        success: false,
        message: MESSAGE.sys.unknownError,
      },
      { status: 500 },
    )
  }
}
