import { getAccessToken, refreshToken } from '@/auth/token'
import { NEXT_API_BASE_URL, NODE_API_BASE_URL } from '@/helpers/constants'
import axios, { AxiosInstance } from 'axios'

// Axios Instances
const apiNode: AxiosInstance = axios.create({
  baseURL: NODE_API_BASE_URL,
  timeout: 10000,
})

const apiNext: AxiosInstance = axios.create({
  baseURL: NEXT_API_BASE_URL,
  timeout: 10000,
})

// Interceptor for apiNode
apiNode.interceptors.request.use(
  /** REQUEST INTERCEPTOR FOR apiNode
   * Hàm này được gọi mỗi khi một yêu cầu gửi đi qua apiNode
   * Mô tả luồng hoạt động:
   * - Trước khi gửi yêu cầu, hàm lấy access token từ cookie bằng hàm getAccessToken() (tùy theo server hoặc client).
   * - Nếu có access token, nó được thêm vào header Authorization của yêu cầu với định dạng "Bearer <token>".
   * - Yêu cầu sẽ được gửi đi sau khi token đã được thêm vào header.
   */
  async (config) => {
    const token = getAccessToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

/** RESPONSE INTERCEPTOR FOR apiNode
 * Hàm này được gọi khi nhận được phản hồi từ API qua apiNode.
 * Mô tả luồng hoạt động:
 * - Nếu phản hồi có status 401 (Unauthorized), nghĩa là token hết hạn hoặc không hợp lệ.
 * - Khi đó, hàm sẽ gọi refreshToken() để lấy token mới.
 * - Nếu token mới được lấy thành công, yêu cầu gốc sẽ được thử lại với token mới trong header Authorization.
 * - Nếu không có lỗi, phản hồi gốc được trả về.
 * - Nếu có lỗi, Promise.reject() sẽ được gọi với lỗi.
 */
apiNode.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config
    console.log('interceptor called::')
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      const newAccessToken = await refreshToken()
      console.log('accessToken:::', newAccessToken)
      if (newAccessToken) {
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
        return apiNode(originalRequest)
      }
    }
    return Promise.reject(error)
  },
)

// Interceptor for apiNext
apiNext.interceptors.request.use(
  /** REQUEST INTERCEPTOR FOR apiNext
   * Hàm này được gọi mỗi khi một yêu cầu gửi đi qua apiNext.
   * Mô tả luồng hoạt động:
   * - Trước khi gửi yêu cầu, hàm lấy access token từ cookie bằng hàm getAccessToken().
   * - Nếu có access token, nó được thêm vào header Authorization của yêu cầu với định dạng "Bearer <token>".
   * - Yêu cầu sẽ được gửi đi sau khi token đã được thêm vào header.
   */
  async (config) => {
    const token = getAccessToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

export { apiNext, apiNode }
