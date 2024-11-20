import { cookies } from 'next/headers'
import { handleGetProfileInfo } from '../../auth/auth.services'

/** RETURN PROFILE OF USER
 * Lấy thông tin người dùng, bẳng cách lấy token và gọi đến server nodejs,
 * chỉ dùng cho server components
 * @returns userProfie
 */
export default async function useProfile() {
  const cookieStore = cookies()
  const accessToken = cookieStore.get('accessToken')?.value
  const userProfile = await handleGetProfileInfo(accessToken || '')
  return { userProfile, accessToken }
}
