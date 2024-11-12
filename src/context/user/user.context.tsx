'use client'
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
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
  const [loggedInUser, setIsLoggedInUser] = useState<ILoggedinUser>({
    username: undefined,
    email: undefined,
    //  token: '',
    avatar: undefined,
    id: undefined,
  })
  const value = {
    loggedInUser: loggedInUser,
    setIsLoggedInUser: setIsLoggedInUser,
  }
  return <userContext.Provider value={value}>{children}</userContext.Provider>
}
