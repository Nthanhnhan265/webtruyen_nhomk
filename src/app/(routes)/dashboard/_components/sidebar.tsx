import Link from 'next/link'
import LABEL from '../label'
const Sidebar: React.FC = () => {
  return (
    <div className="bg-white text-gray-800 w-64 h-screen flex flex-col shadow-lg">
      <h2 className="text-xl font-bold p-4 border-b text-blue-500 border-gray-700 text-center">
        <Link href={'/dashboard'}>{LABEL.sys.appName}</Link>
      </h2>

      <ul className="flex flex-col p-4 space-y-2 flex-grow">
        <li>
          <Link href={'/dashboard/users'}>{LABEL.user.label}</Link>
        </li>
        <li>
          <Link href={'/dashboard/authors'}>tác giả</Link>
        </li>
      </ul>
    </div>
  )
}

export default Sidebar
