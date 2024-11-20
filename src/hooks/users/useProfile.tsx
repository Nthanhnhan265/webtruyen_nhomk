import { cookies } from 'next/headers'
import { handleGetProfileInfo } from '../../auth/auth.services'

/** RETURN PROFILE OF USER
 * Lấy thông tin người dùng, bẳng cách lấy token trong cookie và gọi đến server nodejs,
 * chỉ dùng cho server components
 * @returns userProfie
 */
export default function useProfile() {
  const cookieStore = cookies()
  const accessToken = cookieStore.get('accessToken')?.value
  async function getProfile() {
    return await handleGetProfileInfo(accessToken || '')
  }
  const userProfile = getProfile()
  return { userProfile, accessToken }
}
