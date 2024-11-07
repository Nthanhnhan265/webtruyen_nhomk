'use client'
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react'

interface IpropLoggedInUer {
  loggedInUser: ILoggedinUser
  setIsLoggedInUser: Dispatch<SetStateAction<ILoggedinUser>>
}
/** CREATE CONTEXT FOR SIDEBAR
 * Tại và khai báo trạng thái mặt định cho Context
 */
const sideContext = createContext<IpropLoggedInUer>({
  loggedInUser: { userId: -1, username: '', email: '', token: '' },
  setIsLoggedInUser: () => {},
})
/** SIDEBAR PROVIDER
 * Tạo ra nơi cung cấp dữ liệu cho toàn bộ con được bọc bên trong
 * @param ()
 * @returns
 */
export function SidebarProvider({ children }: { children: ReactNode }) {
  const [loggedInUser, setIsLoggedInUser] = useState<ILoggedinUser>()
  const value = {
    loggedInUser: loggedInUser,
    setIsLoggedInUser: setIsLoggedInUser,
  }
  return <sideContext.Provider value={value}>{children}</sideContext.Provider>
}
/** SIDE BAR CONTEXT
 * @returns {IpropLoggedInUer} - Trả về đối tượng IpropSidebar
 */
export function getSidebarContext() {
  const sideBar = useContext(sideContext)
  return sideBar
}
