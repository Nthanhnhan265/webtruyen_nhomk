import axios, { AxiosError } from 'axios'
import { NextRequest, NextResponse } from 'next/server'

// Định nghĩa kiểu dữ liệu
type LoginRequestBody = {
  email: string
  password: string
}

type LoginResponse = {
  success: boolean
  message: string
  data: {
    user: {
      id: string
      email: string
      name: string
    }
  }
  token: {
    accessToken: string
    refreshToken: string
  }
}

const api = axios.create({
  baseURL: process.env.NODE_API_URL,
  timeout: 5000,
})

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as LoginRequestBody
    const { email, password } = body

    // Gửi request đến Node.js server
    const res: { data: LoginResponse } = await api.post('auth/login', {
      email,
      password,
    })
    const result = res.data

    if (!result.success) {
      throw new Error(result.message)
    }

    // Nếu đăng nhập thành công
    const response = NextResponse.json({
      success: true,
      message: 'Đăng nhập thành công.',
      data: result.data,
      accessToken: result.token.accessToken,
    })
    response.cookies.set('refreshToken', result.token.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    })
    return response
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      console.error('Axios error:', error.response?.data)
      return NextResponse.json(
        {
          success: false,
          message: error.response?.data?.message || 'Lỗi từ máy chủ Node.js',
          status: error.response?.status || 500,
        },
        { status: error.response?.status || 500 },
      )
    }

    if (error instanceof Error) {
      console.error('Error:', error.message)
      return NextResponse.json(
        {
          success: false,
          message: error.message || 'Đã xảy ra lỗi không xác định.',
        },
        { status: 500 },
      )
    }

    console.error('Unknown error:', error)
    return NextResponse.json<{ success: boolean; message: string }>(
      {
        success: false,
        message: 'Đã xảy ra lỗi không xác định.',
      },
      { status: 500 },
    )
  }
}
