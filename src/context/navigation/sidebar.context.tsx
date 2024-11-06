'use client'
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react'

interface IpropSidebar {
  isOpenProp: boolean
  setIsOpenProp: Dispatch<SetStateAction<boolean>>
}
/** CREATE CONTEXT FOR SIDEBAR
 * Tại và khai báo trạng thái mặt định cho Context
 */
const sideContext = createContext<IpropSidebar>({
  isOpenProp: false,
  setIsOpenProp: () => {},
})
/** SIDEBAR PROVIDER
 * Tạo ra nơi cung cấp dữ liệu cho toàn bộ con được bọc bên trong
 * @param ()
 * @returns
 */
export function SidebarProvider({ children }: { children: ReactNode }) {
  const [isOpen, setOpen] = useState<boolean>(false)
  const value = { isOpenProp: isOpen, setIsOpenProp: setOpen }
  return <sideContext.Provider value={value}>{children}</sideContext.Provider>
}
/** SIDE BAR CONTEXT
 * @returns {IpropSidebar} - Trả về đối tượng IpropSidebar
 */
export function getSidebarContext() {
  const sideBar = useContext(sideContext)
  return sideBar
}
