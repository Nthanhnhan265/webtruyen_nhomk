import { TextInput } from 'flowbite-react'
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
      <div className="max-w-md mb-6 mt-2">
        <TextInput
          id="text"
          type="text"
          icon={IoSearchOutline}
          onChange={handleChange}
          placeholder={LABEL.sys.searchLabel}
          required
        />
      </div>
    </>
  )
}
