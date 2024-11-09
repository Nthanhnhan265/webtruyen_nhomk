import { handleLogin } from '@/auth/auth.services'
import { getUserContext } from '@/context/user/user.context'
import { useState } from 'react'

// Custom Hook để xử lý đăng nhập
function useLogin() {
  const { setIsLoggedInUser, loggedInUser } = getUserContext()
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
      localStorage.setItem('accessToken', result.accessToken)
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
