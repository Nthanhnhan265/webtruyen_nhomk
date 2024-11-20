// 'use client'
// import { createContext, useState } from 'react'
// import { DeleteModal } from '../../app/(routes)/dashboard/_components/delete.modal'
// interface IDeleteModalContext {
//   isOpen: boolean
//   openDeleteModal: (selected: object) => void
//   closeDeleteModal: () => void
//   setHandleDelete: React.Dispatch<
//     React.SetStateAction<(selected: object) => void>
//   >
//   selected: object | null
//   message: string
//   setMessage: React.Dispatch<React.SetStateAction<string>>
// }

// export const DeleteModalContext = createContext<IDeleteModalContext | null>(
//   null,
// )

// export const DeleteModalProvider: React.FC<{
//   children: React.ReactNode
// }> = ({ children }) => {
//   const [isOpen, setIsOpen] = useState(false)
//   const [message, setMessage] = useState('')
//   const [handleDelete, setHandleDelete] = useState<(selected: object) => void>(
//     () => {},
//   )
//   const [selected, setSelected] = useState<object>({})

//   const openDeleteModal = (selected: object) => {
//     setIsOpen(true)
//     setSelected(selected)
//   }

//   const closeDeleteModal = () => {
//     setIsOpen(false)
//     setSelected({})
//   }
//   const value: IDeleteModalContext = {
//     isOpen: isOpen,
//     openDeleteModal: openDeleteModal,
//     closeDeleteModal: closeDeleteModal,
//     setHandleDelete: setHandleDelete,
//     selected,
//     message,
//     setMessage: setMessage,
//   }
//   console.log(handleDelete)

//   return (
//     <DeleteModalContext.Provider value={value}>
//       <DeleteModal
//         isOpenDModal={selected}
//         closeDModal={closeDeleteModal}
//         onDelete={handleDelete}
//         message={message}
//       />
//       {children}
//     </DeleteModalContext.Provider>
//   )
// }

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
