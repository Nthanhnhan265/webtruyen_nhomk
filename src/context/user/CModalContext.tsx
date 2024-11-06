'use client'
import { createContext, ReactNode, useContext, useState } from 'react'

interface ICModal {
  isCModalOpen: boolean
  openCModal: () => void
  closeCModal: () => void
}
// Tạo Context cho trạng thái Modal
const CModalContext = createContext<ICModal>({
  isCModalOpen: false,
  openCModal: () => {},
  closeCModal: () => {},
})

// Provider component để bọc toàn bộ ứng dụng và chia sẻ trạng thái modal
export const CModalProvider = ({ children }: { children: ReactNode }) => {
  const [isCModalOpen, setCModalOpen] = useState(false)
  const openCModal = () => {
    console.log('called')
    alert('called')
    setCModalOpen(true)
  }
  const closeCModal = () => setCModalOpen(false)
  const value = { isCModalOpen, openCModal, closeCModal }
  return (
    <CModalContext.Provider value={value}>{children}</CModalContext.Provider>
  )
}

export const useCModal = () => {
  const context = useContext(CModalContext)
  return context
}
