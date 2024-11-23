'use client'
import useUtil from '@/hooks/utils/useUtil'
import axios from 'axios'
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from 'react'
interface IpropLoggedInUer {
  loggedInUser: ILoggedinUser
  setIsLoggedInUser: Dispatch<SetStateAction<ILoggedinUser>>
}
/** CREATE CONTEXT FOR LOGGED IN USER
 * Tại và khai báo trạng thái mặt định cho Context
 */
export const userContext = createContext<IpropLoggedInUer>({
  loggedInUser: {
    username: undefined,
    email: undefined,
    //  token: '',
    avatar: undefined,
    id: undefined,
  },
  setIsLoggedInUser: () => {},
})
/** USER PROVIDER
 * Tạo ra nơi cung cấp dữ liệu cho toàn bộ con được bọc bên trong
 * @param ()
 * @returns
 */

export function UserProvider({ children }: { children: ReactNode }) {
  const { getCookie } = useUtil()
  const [loggedInUser, setIsLoggedInUser] = useState<ILoggedinUser>({
    username: undefined,
    email: undefined,
    //  token: '',
    avatar: undefined,
    id: undefined,
  })
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = getCookie('accessToken')
        if (token) {
          const response = await axios.get('/api/auth/me', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          })
          const result = await response.data.data
          if (result) {
            const {
              username,
              avatar,
              email,
              id,
            }: { username: string; avatar: string; email: string; id: number } =
              result
            console.log(username, avatar, email, id)
            setIsLoggedInUser({
              username: username,
              avatar: avatar,
              email: email,
              id: id,
            })
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error)
      }
    }

    fetchUserData()
  }, [])

  const value = {
    loggedInUser: loggedInUser,
    setIsLoggedInUser: setIsLoggedInUser,
  }
  return <userContext.Provider value={value}>{children}</userContext.Provider>
}
