import axios, { AxiosError } from 'axios'
import MESSAGE from '../app/message'
const apiNext = axios.create({
  baseURL: process.env.NEXT_API_URL,
  timeout: 3000,
})
/** Handle login
 * Xử lý đăng nhập khi truyền vào email và password
 * nhân về thông tin người dùng và access token
 * @param email
 * @param password
 */
async function handleLogin(email: string, password: string) {
  try {
    const respone = await apiNext.post('/api/login', { email, password })
    const result = respone.data
    console.log(result)
    if (!result.success) {
      throw new Error(result.message)
    }
    return result
  } catch (error) {
    if (error instanceof AxiosError) {
      throw Error(error?.response?.data?.message)
    }
    throw Error(MESSAGE.sys.unknownError)
  }
}

export { handleLogin }
