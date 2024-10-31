'use client'
import formatDate from '@/components/ulti/formatDate'
import { Button } from 'flowbite-react'
import Image from 'next/image'
import { useState } from 'react'
import { CiImageOff } from 'react-icons/ci'
import LABEL from '../../label'
import MESSAGE from '../../message'

interface Iprops {
  users: IUser[]
  openUModal: (user: IUser) => void
  openDModal: (id: number) => void
  closeDModal: () => void
}
export default function UserTable(props: Iprops) {
  //====Declare variables, hooks==========//
  const [imageErrors, setImageErrors] = useState<{ [key: number]: boolean }>({})

  //==========Handle Function============//
  //Nơi tạo các hàm xử lý cho bảng
  /*
      Hàm xử lý khi ảnh không load thành công  
  */
  const handleImageError = (id: number) => {
    setImageErrors((prevErrors) => ({
      ...prevErrors,
      [id]: true,
    }))
  }

  return (
    <>
      <table
        style={{ borderCollapse: 'separate', borderSpacing: '0 3px' }}
        className="border-separate min-w-full "
      >
        <thead>
          <tr className="bg-white">
            <th className="py-4 px-3 text-sm ">{LABEL.sys.id}</th>
            <th className="py-4 px-2 text-sm">{LABEL.user.avatarLabel}</th>
            <th className="py-4 px-2 text-sm">{LABEL.user.usernameLabel}</th>
            <th className="py-4 px-2 text-sm">{LABEL.user.emailLabel}</th>
            <th className="py-4 px-2 text-sm">{LABEL.user.roleLabel}</th>
            <th className="py-4 px-2 text-sm">{LABEL.user.statusLabel}</th>
            <th className="py-4 px-2 text-sm">{LABEL.user.createdAtLabel}</th>
            <th className="py-4 px-2 text-sm">{LABEL.sys.actionLabel}</th>
          </tr>
        </thead>
        <tbody>
          {props.users
            ? props.users.map((user) => (
              <tr
                className="bg-white"
                key={user.id}
              >
                <td className="py-2 px-3  text-center text-sm">{user.id}</td>
                <td className="py-2 px-2 flex justify-center items-center">
                  {imageErrors[user.id] ? (
                    <div className="rounded-full bg-black/5 w-7 h-7 flex justify-center items-center leading-7">
                      <CiImageOff />
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
                {/* whitespace-nowrap overflow-hidden text-ellipsis max-w-xs */}
                <td className="py-2 px-2 text-sm text-center">
                  {user.username}
                </td>
                <td className="py-2 px-2 text-sm text-center">
                  {user.email}
                </td>
                <td className="py-2 px-2 text-sm text-center">
                  {user.role_id}
                </td>
                <td className="py-2 px-2 text-sm text-center">
                  {user.status ? 'Hoạt động' : 'Khóa'}
                </td>
                <td className="py-2 px-2 text-sm text-center">
                  {formatDate(user.created_at)}
                </td>
                <td className="py-2 px-2 text-sm text-center flex justify-center items-center gap-2 rounded">
                  <Button
                    color="warning"
                    onClick={() => props.openUModal(user)}
                  >
                    {LABEL.sys.edit}
                  </Button>
                  <Button
                    color="failure"
                    onClick={() => props.openDModal(user.id)}
                  >
                    {LABEL.sys.delete}
                  </Button>
                </td>
              </tr>
            ))
            : ''}
        </tbody>
      </table>
      {!props.users || props.users.length === 0 ? (
        <div className="flex justify-center text-sm">
          {MESSAGE.sys.noRecord}
        </div>
      ) : null}
    </>
  )
}
