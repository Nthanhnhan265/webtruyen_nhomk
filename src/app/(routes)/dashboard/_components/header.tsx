'use client'
import { useSidebarContext } from '@/context/navigation/sidebar.context'
import useUserContext from '@/hooks/users/userUserContext'
import { Avatar, TextInput } from 'flowbite-react'
import { IoSearchOutline } from 'react-icons/io5'
import { RxHamburgerMenu } from 'react-icons/rx'
import LABEL from '../label'
interface IHeaderProp {
  handleSearch: (keyword: string) => void
}
export default function Header(prop: IHeaderProp) {
  //==============declare vars, hooks=============//
  const { isOpenProp, setIsOpenProp } = useSidebarContext()
  const { loggedInUser } = useUserContext()

  //==============handle function=================//
  /*
    HandleChange: search record when typing 
    thực thi hàm này khi ô textarea có thay đổi, 
    và gọi hàm được truyền vào trong component này
*/
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    prop.handleSearch(e.target.value)
  }
  //==============render components===============//
  return (
    <>
      <div className="w-full mb-10 mt-2 flex justify-between items-center">
        <TextInput
          id="text"
          type="text"
          className="basis-1/2"
          icon={IoSearchOutline}
          onChange={handleChange}
          placeholder={LABEL.sys.searchLabel}
          required
        />

        <div className="flex basis-1/2 justify-end w-full">
          <Avatar
            className="shadow items-center"
            status="online"
            img={'http://localhost:3000/' + loggedInUser.avatar}
          ></Avatar>
          <button
            onClick={() => {
              setIsOpenProp(!isOpenProp)
              console.log(isOpenProp)
            }}
            className={`p-3 block lg:hidden hover:border-black/20 hover:shadow transition-all duration-200 border-2 ms-2 rounded-md`}
          >
            <RxHamburgerMenu />
          </button>
        </div>
      </div>
    </>
  )
}
