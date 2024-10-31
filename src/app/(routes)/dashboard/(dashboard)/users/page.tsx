'use client'
import {
  createUser,
  deleteUser,
  getUsers,
  searchUsers,
  updateUser,
} from '@/app/_api/user.api'
import { Button, Label, Pagination, Select } from 'flowbite-react'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import Header from '../../_components/header'
import UserTable from '../../_components/users/table.user'
import { UserDModal, UserModal } from '../../_components/users/user.modal'
import LABEL from '../../label'
import MESSAGE from '../../message'

const UserPage = () => {
  //============ Declare variables and hooks ================//
  const [users, setUsers] = useState<IUser[]>([])
  // const [loading, setLoading] = useState<boolean>(true)
  // const [error, setError] = useState<string>('')
  const [isModalOpen, setIsModalOpen] = useState(false) //CModal: create modal
  const [isDModalOpen, setIsDModalOpen] = useState<number>(-1) //DModal: delete modal
  const [isEditMode, setIsEditMode] = useState(false) //Edit or create mode?
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState<number>(0)
  const [sortBy, setSortBy] = useState<string>('id')
  const [orderBy, setOrderBy] = useState<string>('DESC')
  const [keyword, setKeyWord] = useState<string>('')
  const sortableProps = [
    { label: LABEL.sys.id, value: 'id' },
    { label: LABEL.user.usernameLabel, value: 'username' },
    { label: LABEL.user.emailLabel, value: 'email' },
    { label: LABEL.user.createdAtLabel, value: 'createdAt' },
    { label: LABEL.user.roleLabel, value: 'role_id' },
    { label: LABEL.user.statusLabel, value: 'status' },
  ]
  const MAXIMUM_RECORDS = 10
  //===================== Handle hooks ======================//
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        if (keyword) {
          const response = await searchUsers(
            keyword,
            sortBy,
            orderBy,
            currentPage,
            MAXIMUM_RECORDS,
          )
          setUsers(response.data)
          setTotalPages(response.pagination.totalPages)
        } else {
          const response = await getUsers(
            sortBy,
            orderBy,
            currentPage,
            MAXIMUM_RECORDS,
          )
          setUsers(response.data)
          setTotalPages(response.pagination.totalPages)
        }
      } catch (err) {
        console.log(err)
        toast.error(MESSAGE.sys.fetchError)
      }
      //  finally {
      //   setLoading(false)
      // }
    }
    fetchUsers()
  }, [currentPage, sortBy, orderBy, keyword])

  //============ Handle others function =====================//
  //click to change page
  const onPageChange = (page: number) => {
    setCurrentPage(page)
  }
  //click to choose sort by
  const handleChangeSortBy = async (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setSortBy(e.target.value)
  }
  //click to choose order
  const handleChangeOrderBy = async (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    console.log('selected')
    setOrderBy(e.target.value)
  }

  //handle search
  const handleSearch = async (keyword: string) => {
    console.log('checked>>', keyword)
    setKeyWord(keyword)
  }

  //open create modal
  const openCreateModal = () => {
    setIsModalOpen(true)
    setIsEditMode(false) // Chế độ tạo
    setSelectedUser(null)
  }

  //open update modal
  const openUpdateModal = (user: IUser) => {
    setIsModalOpen(true)
    setIsEditMode(true) // Chế độ cập nhật
    setSelectedUser(user)
  }

  // close modal
  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedUser(null)
  }

  /* Open delete modal form*/
  const openDModal = (id: number) => {
    setIsDModalOpen(id)
  }
  /* close create modal form*/
  const closeDModal = () => {
    setIsDModalOpen(-1)
  }

  /* Submit: update a user  */
  const handleSubmit = async (form: IDashboardUserForm, id?: number) => {
    try {
      if (isEditMode && id) {
        // Xử lý cập nhật
        const updatedUser = await updateUser(id, { ...form, status: 'us' })

        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === id ? { ...user, ...updatedUser } : user,
          ),
        )
        toast.success(MESSAGE.user.updateSuccess)
      } else {
        // Xử lý tạo mới
        const newUser = await createUser(form)
        if (newUser) {
          const result = await getUsers()
          setUsers(result.data)
          toast.success(MESSAGE.user.createSuccess)
        }
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
  return (
    <>
      {/* header */}
      <Header handleSearch={handleSearch}></Header>

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
      <div className="flex justify-between items-center mb-0">
        <h2 className="text-xl font-bold">{LABEL.user.label}</h2>
        <Button
          color="success"
          onClick={() => openCreateModal()}
        >
          + {LABEL.sys.create}
        </Button>
      </div>
      {/* sort */}
      <div className="mb-2 ">
        <div className="mb-2 block">
          <Label
            htmlFor="sortBy"
            value={LABEL.sys.sortLabel}
          />
        </div>
        <div className="flex gap-2">
          <Select
            id="sortBy"
            name="sortBy"
            required
            className="max-w-40"
            onChange={(e) => handleChangeSortBy(e)}
          >
            {sortableProps.map((property) => (
              <option
                key={property.value}
                value={property.value}
                selected={property.value === 'id'}
              >
                {property.label}
              </option>
            ))}
          </Select>

          <Select
            id="order"
            name="order"
            required
            className="max-w-40"
            onChange={(e) => handleChangeOrderBy(e)}
          >
            <option value="DESC">{LABEL.sys.DESC}</option>
            <option value="ASC">{LABEL.sys.ASC}</option>
          </Select>
        </div>
      </div>

      {/* user table */}
      <UserTable
        users={users}
        openUModal={openUpdateModal}
        openDModal={openDModal}
        closeDModal={closeDModal}
      ></UserTable>
      <div className="flex overflow-x-auto justify-center">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
          className="mt-8"
        />
      </div>
    </>
  )
}

export default UserPage
