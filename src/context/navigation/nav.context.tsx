import { createContext, useContext, useState } from 'react'

interface ISideBar {
  isOpen: Boolean
  setIsOpen: any
}
const SidebarContext = createContext<ISideBar>({
  isOpen: true,
  setIsOpen: '',
})

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <SidebarContext.Provider value={{ isOpen, setIsOpen }}>
      <SidebarNav />
    </SidebarContext.Provider>
  )
}

function SidebarNav() {
  const { isOpen } = useContext(SidebarContext)

  return (
    <div>
      <p>Home</p>
      {isOpen && <p>Submenu</p>}
    </div>
  )
}
