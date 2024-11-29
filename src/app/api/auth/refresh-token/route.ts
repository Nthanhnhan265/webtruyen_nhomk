import axios, { AxiosError } from 'axios'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  try {
    // Lấy cookie refreshToken từ header
    const cookies = req.headers.get('cookie') || ''
    const refreshToken = cookies
      .split('; ')
      .find((cookie) => cookie.startsWith('refreshToken='))
      ?.split('=')[1]

    if (!refreshToken) {
      return NextResponse.json(
        { success: false, status: 400, message: 'Missing refresh token' },
        { status: 400 },
      )
    }
    // Gửi refreshToken đến Node.js API qua axios
    const response = await axios.post(
      'http://localhost:5000/api/auth/refresh-token',
      {
        refreshToken,
      },
    )

    // Nhận Access Token từ Node.js
    const token = response.data.token
    return NextResponse.json({ success: true, token })
  } catch (error) {
    if (error instanceof Error) {
    }
    if (error instanceof AxiosError) {
      console.error(
        'Error refreshing token:',
        error.response?.data || error.message,
      )

      // Trả lỗi từ Node.js hoặc lỗi hệ thống
      return NextResponse.json(
        {
          success: false,
          status: error.response?.status || 500,
          message: error.response?.data?.message || 'Internal Server Error',
        },
        { status: error.response?.status || 500 },
      )
    }
  }
  return NextResponse.json({})
}
