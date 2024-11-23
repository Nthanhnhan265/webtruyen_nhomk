import axios, { AxiosError } from 'axios'
import { NextRequest, NextResponse } from 'next/server'
import MESSAGE from '../../../message'
const apiNode = axios.create({
  baseURL: process.env.NODE_API_URL,
  timeout: 3000,
})
export async function GET(request: NextRequest) {
  try {
    const accessToken = request.headers
      .get('Authorization')
      ?.replace('Bearer ', '')
    if (!accessToken) {
      return
    }

    const response = await apiNode.get('auth/me/', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    const result = response.data

    if (!result.success) {
      throw new Error(result.message || MESSAGE.sys.unknownError)
    }

    return NextResponse.json(result)
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response) {
        console.error('Axios error:', error.response.data)
        if (error.response.status === 401) {
          return NextResponse.redirect('/login')
        }
        return NextResponse.json(
          {
            success: false,
            message: error.response.data?.message || MESSAGE.sys.unknownError,
            status: error.response.status || 500,
          },
          { status: error.response.status || 500 },
        )
      } else {
        console.error('Axios error without response:', error.message)
        return NextResponse.json(
          {
            success: false,
            message: MESSAGE.sys.unknownError,
          },
          { status: 500 },
        )
      }
    }

    if (error instanceof Error) {
      console.error('Error:', error.message)
      return NextResponse.json(
        {
          success: false,
          message: error.message || MESSAGE.sys.unknownError,
          cause: error.stack || MESSAGE.sys.loading,
        },
        { status: 500 },
      )
    }

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
