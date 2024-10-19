import Image from 'next/image'
import { useEffect, useState } from 'react'
import Button from '../../components/Button/Button'
import formatDate from '../../components/Ulti/FormatDate'
import { deleteUser, getUsers } from '../../service/userService'
interface User {
  id: number
  avatar: string
  username: string
  email: string
  role_id: number
  status: boolean
  created_at: string
}

const UserPage = () => {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string>('')
  const [imageErrors, setImageErrors] = useState<{ [key: number]: boolean }>({}) // Store image errors by user ID

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUsers()
        console.log(response)
        setUsers(response.data)
      } catch (err) {
        setError('Đã xảy ra lỗi khi lấy dữ liệu.')
      } finally {
        setLoading(false)
      }
    }
    fetchUsers()
  }, [])

  const handleDelete = async (id: number) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa người dùng này không?')) {
      try {
        await deleteUser(id)
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id))
      } catch (err) {
        setError('Đã xảy ra lỗi khi xóa người dùng.')
      }
    }
  }

  const handleImageError = (id: number) => {
    setImageErrors((prevErrors) => ({
      ...prevErrors,
      [id]: true, // Set error for the specific user ID
    }))
  }

  const renderUsers = (users: User[]) => {
    return (
      <table
        style={{ borderCollapse: 'separate', borderSpacing: '0 3px' }}
        className="border-separate min-w-full"
      >
        <thead>
          <tr className="bg-white">
            <th className="py-4 px-3 text-sm ">Id</th>
            <th className="py-4 px-2 text-sm">Avatar</th>
            <th className="py-4 px-2 text-sm">Tên người dùng</th>
            <th className="py-4 px-2 text-sm">Email</th>
            <th className="py-4 px-2 text-sm">Vai trò</th>
            <th className="py-4 px-2 text-sm">Trạng thái</th>
            <th className="py-4 px-2 text-sm">Ngày</th>
            <th className="py-4 px-2 text-sm">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              className="bg-white"
              key={user.id}
            >
              <td className="py-2 px-3  text-center text-sm">{user.id}</td>
              <td className="py-2 px-2 text-sm text-center">
                {imageErrors[user.id] ? (
                  <div className="rounded-full bg-black/5 w-7 h-7 flex justify-center items-center">
                    <span className="material-symbols-outlined !text-xs">
                      hide_image
                    </span>
                  </div>
                ) : (
                  <Image
                    src={`http://localhost/${user.avatar}`}
                    alt="user's image"
                    width={50}
                    height={50}
                    onError={() => handleImageError(user.id)} // Call the error handler
                    style={{ borderRadius: '50%' }}
                  />
                )}
              </td>
              <td className="py-2 px-2 text-sm text-center">{user.username}</td>
              <td className="py-2 px-2 text-sm text-center">{user.email}</td>
              <td className="py-2 px-2 text-sm text-center">{user.role_id}</td>
              <td className="py-2 px-2 text-sm text-center">
                {user.status ? 'Hoạt động' : 'Khóa'}
              </td>
              <td className="py-2 px-2 text-sm text-center">
                {formatDate(user.created_at)}
              </td>
              <td className="py-2 px-2 text-sm text-center flex justify-center items-center gap-2 rounded">
                <Button
                  buttonName="Sửa"
                  icon=""
                  handle={() => {}}
                  hexBgColor="#FFBC0F"
                  hexTextColor="#fff"
                ></Button>
                <Button
                  buttonName="Xóa"
                  icon=""
                  handle={() => handleDelete(user.id)}
                  hexBgColor="#CA2020"
                  hexTextColor="#fff"
                ></Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  }

  if (loading) return <p>Đang tải dữ liệu...</p>
  if (error) return <p>{error}</p>

  return (
    <>
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-xl font-bold">Người dùng</h2>
        <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
          + Tạo Mới
        </button>
      </div>
      {renderUsers(users)}
    </>
  )
}

export default UserPage
