'use client'
import { Avatar, TextInput } from 'flowbite-react'
import { IoSearchOutline } from 'react-icons/io5'
import LABEL from '../label'
interface IHeaderProp {
  handleSearch: (keyword: string) => void
}
export default function Header(prop: IHeaderProp) {
  //==============declare vars, hooks=============//
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
      <div className="w-full mb-10 mt-2 flex justify-between">
        <TextInput
          id="text"
          type="text"
          className="basis-1/2"
          icon={IoSearchOutline}
          onChange={handleChange}
          placeholder={LABEL.sys.searchLabel}
          required
        />
        <Avatar
          className="shadow"
          status="online"
        ></Avatar>
      </div>
    </>
  )
}
