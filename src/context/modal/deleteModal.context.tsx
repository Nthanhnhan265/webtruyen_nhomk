'use client'
import { createContext, useState } from 'react'
import { DeleteModal } from '../../app/(routes)/dashboard/_components/delete.modal'

interface IDeleteModalContext<T> {
  isOpen: boolean
  openDeleteModal: (selected: T) => void
  closeDeleteModal: () => void
  setHandleDelete: React.Dispatch<React.SetStateAction<(selected: T) => void>>
  selected: T | null
  message: string
  setMessage: React.Dispatch<React.SetStateAction<string>>
}

// Sử dụng generic <T> để linh hoạt hơn
export const DeleteModalContext =
  createContext<IDeleteModalContext<any> | null>(null)

export const DeleteModalProvider = <T,>({
  children,
}: {
  children: React.ReactNode
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [handleDelete, setHandleDelete] = useState<(selected: any) => void>(
    () => {},
  )
  const [selected, setSelected] = useState<any | null>(null)

  const openDeleteModal = (selected: T) => {
    setIsOpen(true)
    setSelected(selected)
  }

  const closeDeleteModal = () => {
    setIsOpen(false)
    setSelected(null)
  }

  const value: IDeleteModalContext<T> = {
    isOpen,
    openDeleteModal,
    closeDeleteModal,
    setHandleDelete,
    selected,
    message,
    setMessage,
  }
  return (
    <DeleteModalContext.Provider value={value}>
      <DeleteModal
        isOpenDModal={selected}
        closeDModal={closeDeleteModal}
        onDelete={handleDelete}
        message={message}
      />
      {children}
    </DeleteModalContext.Provider>
  )
}
