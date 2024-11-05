'use client'
import { Button } from 'flowbite-react'
import LABEL from '../label'
import MESSAGE from '../message'
// import LABEL from '../../label'
// import MESSAGE from '../../message'

interface Iprops {
  tbHeaderCells: Array<{
    label: string
    name: string
    render?: (item: any) => JSX.Element
  }>
  tbCells: Array<any>
  handleClickUpdate: (id: number) => void
  handleClickDelete: (id: number) => void
}
export default function Table(props: Iprops) {
  return (
    <div className="overflow-x-auto w-full">
      <table
        style={{ borderCollapse: 'separate', borderSpacing: '0 3px' }}
        className=" border-separate min-w-full "
      >
        <thead>
          <tr className="bg-white">
            {props.tbHeaderCells.map((header) => (
              <td
                key={header.label}
                className="py-4 px-3 text-center font-bold text-sm"
              >
                {header.label}
              </td>
            ))}
            <td className="py-4 px-3 font-bold text-sm text-center">
              {LABEL.sys.actionLabel}
            </td>
          </tr>
        </thead>
        <tbody>
          {props.tbCells.map((item, rowIndex) => (
            <tr
              className="bg-white"
              key={rowIndex}
            >
              {props.tbHeaderCells.map((header, colIndex) => (
                <>
                  <td
                    key={colIndex}
                    className=" py-2 px-3  text-center text-sm"
                  >
                    {header.render ? header.render(item) : item[header.name]}
                  </td>
                </>
              ))}
              <td className="py-2 px-2 text-sm text-center flex justify-center items-center gap-2 rounded">
                <Button
                  color="warning"
                  onClick={() => props.handleClickUpdate(item)}
                >
                  {LABEL.sys.edit}
                </Button>
                <Button
                  color="failure"
                  onClick={() => props.handleClickDelete(item.id)}
                >
                  {LABEL.sys.delete}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {!props.tbCells ? (
        <div className="flex justify-center text-sm">
          {MESSAGE.sys.noRecord}
        </div>
      ) : null}
    </div>
  )
}
/**
 *   {props.users
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
                 // whitespace-nowrap overflow-hidden text-ellipsis max-w-xs //
                  <td className="py-2 px-2 text-sm text-center">
                    {user.username}
                  </td>
                  <td className="py-2 px-2 text-sm text-center">
                    {user.email}
                  </td>
                  <td className="py-2 px-2 text-sm text-center">
                    {user.Role.role_name}
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
 */
