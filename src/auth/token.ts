import { NEXT_API_BASE_URL } from '@/helpers/constants'
import axios from 'axios'
import { getCookie, setCookie } from 'cookies-next'

/** GET TOKEN FROM COOKIES
 * lấy accessToken từ cookie dự trên ngữ cảnh là server hay client
 * Kiểm tra xem là client hay server, nếu window là undefinded thì là môi trường server -> sử dụng next/headers
 * @returns
 */
const getAccessToken = async () => {
  if (typeof window === 'undefined') {
    const { cookies } = await import('next/headers')
    const cookieStore = cookies()
    return cookieStore.get('accessToken')?.value
  } else {
    return getCookie('accessToken')
  }
}

/** CALL API TO REFRESH TOKEN
 * gọi đến server nextjs để lấy lại token
 * @returns
 */
import { AxiosError } from 'axios'

const refreshToken = async (): Promise<string | null> => {
  try {
    console.log('Refreshing token...')

    // Khởi tạo headers
    const headers: Record<string, string> = {}

    // Nếu chạy trên server-side
    if (typeof window === 'undefined') {
      const { cookies } = await import('next/headers')
      const cookieStore = cookies()
      const refreshToken = cookieStore.get('refreshToken')?.value

      if (!refreshToken) {
        console.log('No refresh token found on server-side')
        return null
      }

      // Đính kèm cookie vào header
      headers['Cookie'] = `refreshToken=${refreshToken}`
      console.log('Server-side headers:', headers)
    }

    // Gọi API refresh token
    const response = await axios.get(
      `${NEXT_API_BASE_URL}/auth/refresh-token`,
      {
        headers,
        withCredentials: true,
      },
    )
    const { accessToken } = response.data.token
    // Lưu accessToken vào cookie (chỉ chạy trên client-side)
    if (typeof window !== 'undefined') {
      setCookie('accessToken', accessToken, {
        path: '/',
      })
    }

    return accessToken
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error(
        'Error refreshing token:',
        error.response?.data || error.message,
      )
    } else {
      console.error('Error refreshing token:', error)
    }
    return null
  }
}

export default refreshToken

export { getAccessToken, refreshToken }
