'use client'
import { createContext, useState } from 'react'
import { DeleteModal } from '../../app/(routes)/dashboard/_components/delete.modal'
interface IDeleteModalContext {
  isOpen: boolean
  openDeleteModal: (id: number) => void
  closeDeleteModal: () => void
  setHandleDelete: React.Dispatch<React.SetStateAction<(id: number) => void>>
  id: number | null
  message: string
  setMessage: React.Dispatch<React.SetStateAction<string>>
}

export const DeleteModalContext = createContext<IDeleteModalContext | null>(
  null,
)

export const DeleteModalProvider: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [handleDelete, setHandleDelete] = useState<(id: number) => void>(
    () => {},
  )
  const [id, setId] = useState<number>(-1)

  const openDeleteModal = (id: number) => {
    setIsOpen(true)
    setId(id)
  }

  const closeDeleteModal = () => {
    setIsOpen(false)
    setId(-1)
  }
  const value: IDeleteModalContext = {
    isOpen: isOpen,
    openDeleteModal: openDeleteModal,
    closeDeleteModal: closeDeleteModal,
    setHandleDelete: setHandleDelete,
    id,
    message,
    setMessage: setMessage,
  }
  console.log(handleDelete)

  return (
    <DeleteModalContext.Provider value={value}>
      <DeleteModal
        isOpenDModal={id}
        closeDModal={closeDeleteModal}
        onDelete={handleDelete}
        message={message}
      />
      {children}
    </DeleteModalContext.Provider>
  )
}
