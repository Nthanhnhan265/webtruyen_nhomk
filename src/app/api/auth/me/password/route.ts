import MESSAGE from '@/app/message'
import axios, { AxiosError } from 'axios'
import { NextRequest, NextResponse } from 'next/server'

const api = axios.create({
  baseURL: process.env.NODE_API_URL,
  timeout: 3000,
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

    // Lấy dữ liệu từ body của request
    const { currentPassword, newPassword, confirmPassword } =
      await request.json()

    // Gửi request đến Node.js server với token trong headers
    const res = await api.patch(
      'auth/me/password',
      { currentPassword, newPassword, confirmPassword },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    )

    // Lấy dữ liệu từ response trả về
    const result = res.data

    // Nếu kết quả trả về không thành công, ném lỗi để xử lý
    if (!result.success) {
      throw new Error(result.message || MESSAGE.auth.updatePasswordFailed)
    }

    // Trả về response thành công
    return NextResponse.json(
      {
        success: true,
        message: MESSAGE.auth.updatePasswordSuccess,
        data: result.data,
      },
      { status: 200 },
    )
  } catch (error) {
    // Nếu lỗi là AxiosError
    if (error instanceof AxiosError) {
      console.error('Axios error:', error.response?.data)

      // Nếu server trả về 401, chuyển hướng đến trang đăng nhập
      if (error.response?.status === 401) {
        return NextResponse.redirect('/login', {
          headers: { 'x-message': MESSAGE.auth.loginRedirect },
        })
      }
      // Trả về thông tin lỗi từ Node.js server
      return NextResponse.json(
        {
          success: false,
          message: error.response?.data?.message || MESSAGE.sys.serverError,
          status: error.response?.status || 500,
        },
        { status: error.response?.status || 500 },
      )
    }
    // Nếu lỗi là Error thông thường
    if (error instanceof Error) {
      console.error('Error:', error.message)

      // Trả về thông tin lỗi thông thường
      return NextResponse.json(
        {
          success: false,
          message: error.message || MESSAGE.auth.unexpectedError,
          cause: error.cause || MESSAGE.sys.unknownError,
        },
        { status: 500 },
      )
    }

    // Xử lý lỗi không xác định
    console.error('Unknown error:', error)

    // Trả về thông báo lỗi không xác định
    return NextResponse.json(
      {
        success: false,
        message: MESSAGE.sys.unknownError,
      },
      { status: 500 },
    )
  }
}
