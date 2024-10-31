import Link from 'next/link'
import { HiOutlineUsers } from 'react-icons/hi'
import { LuUserCircle2 } from 'react-icons/lu'
import LABEL from '../label'

interface Iprop {
  onClickNavbar: (navbar: string) => void
  isActiveNav: string
}
const Sidebar = () => {
  const CENTER = 'flex items-center gap-4 justify-start'
  return (
    <div className="bg-white text-gray-800 min-h-screen h-full flex flex-col shadow-lg">
      <h2 className="text-xl font-bold p-4 mb-4 border-b text-blue-500 text-center">
        <Link href={'/dashboard'}>{LABEL.sys.appName}</Link>
      </h2>

      <ul className="flex flex-col gap-4 opacity-60 pe-4 pt-3 space-y-2 flex-grow">
        <li className={`ps-8`}>
          <Link
            href={'/dashboard/users'}
            className={`${CENTER}`}
          >
            <HiOutlineUsers />
            {LABEL.user.label}
          </Link>
        </li>
        <li className={`ps-8`}>
          <Link
            href={'/dashboard/authors'}
            className={`${CENTER}`}
          >
            <LuUserCircle2 />
            Tác giả
          </Link>
        </li>
        <li className={`ps-8`}>
          <Link
            href={'/dashboard/stories'}
            className={`${CENTER}`}
          >
            <LuUserCircle2 />
            Truyện
          </Link>
        </li>
        <li className={`ps-8`}>
          <Link
            href={'/dashboard/authors'}
            className={`${CENTER}`}
          >
            <LuUserCircle2 />
            tác giả
          </Link>
        </li>
        <li className={`ps-8`}>
          <Link
            href={'/dashboard/authors'}
            className={`${CENTER}`}
          >
            <LuUserCircle2 />
            tác giả
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default Sidebar
