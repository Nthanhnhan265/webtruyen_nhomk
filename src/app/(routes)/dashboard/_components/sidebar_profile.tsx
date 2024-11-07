import Link from 'next/link'

import { AiFillAppstore } from "react-icons/ai";
import { IoSettingsOutline } from "react-icons/io5";
import { IoBagCheckOutline } from "react-icons/io5";
import { BsBagHeart } from "react-icons/bs";
import LABEL from '../label'

interface Iprop {
  onClickNavbar: (navbar: string) => void
  isActiveNav: string
}
 const Sidebar = () => {
  const CENTER = 'flex items-center gap-4 justify-start'
  return (
    <div className="bg-white text-gray-800 min-h-screen h-full flex flex-col shadow-lg">


      <ul className="flex flex-col gap-4 opacity-60 pe-4 pt-7 space-y-2 flex-grow">

        <li className="ps-8 relative hover:border-l-4 hover:border-red-600">
          <Link
            href={'/dashboard/authors'}
            className={`${CENTER} flex items-center space-x-2 hover:text-red-600`}
          >
            <AiFillAppstore />
            Thông tin tài khoản
          </Link>
          {/* Đường viền đỏ chỉ xuất hiện khi hover vào <li> */}
          {/* <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-600 opacity-0 hover:opacity-100 transition-all"></div> */}
        </li>
        <li className={`ps-8 relative hover:border-l-4 hover:border-red-600`}>
          <Link
            href={'/dashboard/stories'}
            className={`${CENTER} items-center space-x-2 hover:text-red-600`}
          >
            <BsBagHeart />
            Truyện yêu thích
          </Link>
        </li>
        <li className={`ps-8 relative hover:border-l-4 hover:border-red-600`}>
          <Link
            href={'/dashboard/authors'}
            className={`${CENTER} items-center space-x-2 hover:text-red-600`}
          >
            <IoBagCheckOutline />
            Truyện gần đây
          </Link>
        </li>
        <li className={`ps-8 relative hover:border-l-4 hover:border-red-600`}>
          <Link
            href={'/dashboard/authors'}
            className={`${CENTER} items-center space-x-2 hover:text-red-600`}
          >
            <IoSettingsOutline />
            Cài đặt
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default Sidebar
