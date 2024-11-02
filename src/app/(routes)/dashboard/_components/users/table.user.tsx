'use client'
import formatDate from '@/components/ulti/formatDate'
import { Button } from 'flowbite-react'
import Image from 'next/image'
import { CiImageOff } from 'react-icons/ci'
import LABEL from '../../label'
import MESSAGE from '../../message'

interface Iprops {
  users: IUser[]
  openUModal: (user: IUser) => void
  openDModal: (id: number) => void
  closeDModal: () => void
  imageErrors: { [key: number]: boolean }
  handleImageError: (id: number) => void
  handleResetImageError: (id: number) => void
}
export default function UserTable(props: Iprops) {
  //====Declare variables, hooks==========//

  return (
    <div className="overflow-x-auto w-full">
      <table
        style={{ borderCollapse: 'separate', borderSpacing: '0 3px' }}
        className=" border-separate min-w-full "
      >
        <thead>
          <tr className="bg-white">
            <th className="py-4 px-3 text-sm ">{LABEL.sys.id}</th>
            <th className="py-4 px-2 text-sm">{LABEL.user.avatarLabel}</th>
            <th className="py-4 px-2 text-sm">{LABEL.user.usernameLabel}</th>
            <th className="py-4 px-2 text-sm">{LABEL.user.emailLabel}</th>
            <th className="py-4 px-2 text-sm">{LABEL.user.roleLabel}</th>
            <th className="py-4 px-2 text-sm">{LABEL.user.statusLabel}</th>
            <th className="py-4 px-2 text-sm">{LABEL.sys.createdAtLabel}</th>
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
                  <td className="py-2 px-2 mx-auto">
                    {props.imageErrors[user.id] ? (
                      <div className="rounded-full bg-black/5 w-7 h-7 mx-auto leading-7">
                        <div className="h-full flex justify-center items-center">
                          <CiImageOff />
                        </div>
                      </div>
                    ) : (
                      <div className="w-7 h-7 overflow-hidden rounded-full mx-auto">
                        <Image
                          src={`http://localhost:3000/${user.avatar}`}
                          alt="user's image"
                          width={50}
                          height={50}
                          className="h-full w-full"
                          onError={() => props.handleImageError(user.id)}
                          onLoad={() => props.handleResetImageError(user.id)}
                          style={{ borderRadius: '50%' }}
                        />
                      </div>
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
    </div>
  )
}
