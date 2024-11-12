import axios, { AxiosError } from 'axios'
import { NextRequest, NextResponse } from 'next/server'
const api = axios.create({
  baseURL: process.env.NODE_API_URL,
  timeout: 3000,
})
export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    // Gửi request đến Node.js server
    const res = await api.post('auth/login', { email, password })
    const result = res.data

    if (!result.success) {
      throw new Error(result.message)
    }

    // Nếu đăng nhập thành công
    const response = NextResponse.json({
      success: true,
      message: result.token.data,
      data: result.data,
      accessToken: result.token.accessToken,
    })
    response.cookies.set('refreshToken', result.token.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    })
    return response
  } catch (error) {
    // Xử lý lỗi Axios
    if (error instanceof AxiosError) {
      console.error('Axios error:', error.response?.data)
      return NextResponse.json(
        {
          success: false,
          message: error?.response?.data?.message || 'Lỗi từ máy chủ Node.js',
          status: error?.response?.status || 500,
        },
        { status: error?.response?.status || 500 },
      )
    }

    // Xử lý lỗi thông thường
    if (error instanceof Error) {
      console.error('Error:', error.message)
      return NextResponse.json(
        {
          success: false,
          message: error.message || 'Đã xảy ra lỗi.',
          cause: error.cause || 'Unknown',
        },
        { status: 500 },
      )
    }

    // Catch-all cho các lỗi không xác định
    console.error('Unknown error:', error)
    return NextResponse.json(
      {
        success: false,
        message: 'Đã xảy ra lỗi không xác định.',
      },
      { status: 500 },
    )
  }
}
// export async function GET(request: NextRequest) {
//   console.log('nextjs server got a request')
//   return NextResponse.json({
//     hello: 'world',
//   })
// }
