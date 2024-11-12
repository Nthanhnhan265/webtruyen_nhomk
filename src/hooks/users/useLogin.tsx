import { handleLogin } from '@/auth/auth.services'
import { useState } from 'react'
import { useUserContext } from './userUserContext'

// Custom Hook để xử lý đăng nhập
function useLogin() {
  const { setIsLoggedInUser } = useUserContext()
  const [loading, setLoading] = useState(false)

  const login = async (email: string, password: string) => {
    try {
      setLoading(true)
      const result = await handleLogin(email, password)

      setIsLoggedInUser({
        email: result.data.email,
        username: result.data.username,
        avatar: result.data.avatar,
        id: result.data.id,
      })
      // localStorage.setItem('accessToken', result.accessToken)
      document.cookie = `accessToken=${result.accessToken}; Max-Age=1200; Path=/; SameSite=Strict; Secure`
    } catch (error) {
      throw error
    } finally {
      setLoading(false)
    }
  }

  return {
    login,
    loading,
  }
}

export default useLogin
