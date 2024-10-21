'use client'
import {
  createUser,
  deleteUser,
  getUsers,
  updateUser,
} from '@/app/_api/user.api'
import { Button } from 'flowbite-react'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import UserTable from '../_components/users/table.user'
import { UserDModal, UserModal } from '../_components/users/user.modal'
import LABEL from '../label'
import MESSAGE from '../message'

const UserPage = () => {
  //============ Declare variables and hooks ================//
  const [users, setUsers] = useState<IUser[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string>('')
  const [isModalOpen, setIsModalOpen] = useState(false) //CModal: create modal
  const [isDModalOpen, setIsDModalOpen] = useState<number>(-1) //DModal: delete modal
  const [isEditMode, setIsEditMode] = useState(false) //Edit or create mode?
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null)

  //===================== Handle hooks ======================//
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUsers()
        console.log(response)
        setUsers(response.data)
      } catch (err) {
        setError(MESSAGE.sys.fetchError)
      } finally {
        setLoading(false)
      }
    }
    fetchUsers()
  }, [])

  //============ Handle others function =====================//
  // Handle submit and close Modals
  /* Open create modal form*/

  // Mở modal tạo người dùng
  const openCreateModal = () => {
    setIsModalOpen(true)
    setIsEditMode(false) // Chế độ tạo
    setSelectedUser(null)
  }

  // Mở modal cập nhật
  const openUpdateModal = (user: IUser) => {
    setIsModalOpen(true)
    setIsEditMode(true) // Chế độ cập nhật
    setSelectedUser(user)
  }

  // Đóng modal
  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedUser(null)
  }

  /* close create modal form*/
  const closeCModal = () => {
    setIsModalOpen(false)
  }
  /* Open delete modal form*/
  const openDModal = (id: number) => {
    setIsDModalOpen(id)
  }
  /* close create modal form*/
  const closeDModal = () => {
    setIsDModalOpen(-1)
  }

  //handle submit action
  /* Submit: Create a new user  
    Khi modal được ấn lưu, người dùng mới sẽ được tạo và gửi lên api
    Một người dùng mới sẽ được tạo và cho vào bảng user table
  */
  const handleCreateSubmit = async (form: IDashboardUserForm) => {
    console.log(form)
    try {
      const newUser = await createUser(form)
      if (newUser) {
        setUsers((prevUsers) => [...prevUsers, newUser])
        toast.success(MESSAGE.user.createSuccess)
        closeCModal()
      }
    } catch (error) {
      toast.error(MESSAGE.user.createError + '\n' + error.message)
    }
  }

  /* Submit: update a user  */
  const handleSubmit = async (form: IDashboardUserForm, id?: number) => {
    try {
      if (isEditMode && id) {
        // Xử lý cập nhật
        const updatedUser = await updateUser(id, form)
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === id ? { ...user, ...updatedUser } : user,
          ),
        )
        toast.success(MESSAGE.user.updateSuccess)
      } else {
        // Xử lý tạo mới
        const newUser = await createUser(form)
        setUsers((prevUsers) => [...prevUsers, newUser])
        toast.success(MESSAGE.user.createSuccess)
      }
      closeModal()
    } catch (error) {
      toast.error(error.message)
    }
  }
  /* Submit: delete the user by Id*/
  const handleDeleteSubmit = async (id: number) => {
    try {
      await deleteUser(id)
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id))
      toast.success(MESSAGE.user.deleteSuccess)
      closeDModal()
    } catch (error) {
      console.error(error)
      toast.error(MESSAGE.user.deleteError + '\n' + error.message)
    }
  }

  //================= Render component ======================//
  if (loading) return <p>{MESSAGE.sys.loading}</p>
  if (error) return <p>{error}</p>
  return (
    <>
      {/* Create and Delete modal */}
      <UserModal
        isOpenModal={isModalOpen}
        closeModal={closeModal}
        handleSubmit={handleSubmit}
        user={selectedUser}
        isEdit={isEditMode}
      />
      <UserDModal
        isOpenDModal={isDModalOpen}
        closeDModal={closeDModal}
        onDelete={(id) => handleDeleteSubmit(id)}
      ></UserDModal>
      {/* Title and Create button */}
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-xl font-bold">{LABEL.user.label}</h2>
        <Button
          color="success"
          onClick={() => openCreateModal()}
        >
          + {LABEL.sys.create}
        </Button>
      </div>
      {/* user table */}
      <UserTable
        users={users}
        openUModal={openUpdateModal}
        openDModal={openDModal}
        closeCModal={closeCModal}
        closeDModal={closeDModal}
      ></UserTable>
    </>
  )
}

export default UserPage
