import { useContext } from 'react'
import { DeleteModalContext } from '../../context/modal/deleteModal.context'

export const useDeleteModal = () => {
  const context = useContext(DeleteModalContext)
  if (context === null) {
    throw new Error('useDeleteModal must be used within a DeleteModalProvider')
  }
  return context
}
