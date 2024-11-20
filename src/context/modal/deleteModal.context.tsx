'use client'
import { createContext, useState } from 'react'
import { DeleteModal } from '../../app/(routes)/dashboard/_components/delete.modal'
interface IDeleteModalContext {
  isOpen: boolean
  openDeleteModal: (selected: object) => void
  closeDeleteModal: () => void
  setHandleDelete: React.Dispatch<
    React.SetStateAction<(selected: object) => void>
  >
  selected: object | null
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
  const [handleDelete, setHandleDelete] = useState<(selected: object) => void>(
    () => {},
  )
  const [selected, setSelected] = useState<object>({})

  const openDeleteModal = (selected: object) => {
    setIsOpen(true)
    setSelected(selected)
  }

  const closeDeleteModal = () => {
    setIsOpen(false)
    setSelected({})
  }
  const value: IDeleteModalContext = {
    isOpen: isOpen,
    openDeleteModal: openDeleteModal,
    closeDeleteModal: closeDeleteModal,
    setHandleDelete: setHandleDelete,
    selected,
    message,
    setMessage: setMessage,
  }
  console.log(handleDelete)

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
