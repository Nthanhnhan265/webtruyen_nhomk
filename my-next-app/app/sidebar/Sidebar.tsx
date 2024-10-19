import React, { useState } from 'react'
import {
  FaBook,
  FaCog,
  FaComments,
  FaFolder,
  FaStar,
  FaTag,
  FaUser,
} from 'react-icons/fa'

type SidebarProps = {
  setActivePage: (page: string) => void
}

const Sidebar: React.FC<SidebarProps> = ({ setActivePage }) => {
  // State to track the active page
  const [activePage, setActivePageState] = useState<string>('authors')

  const handlePageChange = (page: string) => {
    setActivePageState(page)
    setActivePage(page)
  }

  return (
    <div className="bg-white text-gray-800 w-64 h-screen flex flex-col shadow-lg">
      <h2 className="text-xl font-bold p-4 border-b text-blue-500 border-gray-700 text-center">
        Web Truyện
      </h2>

      <ul className="flex flex-col p-4 space-y-2 flex-grow">
        <li>
          <button
            className={`w-full text-left hover:bg-gray-200 p-2 rounded flex items-center justify-start ${
              activePage === 'users' ? 'text-blue-500' : 'text-black'
            }`}
            onClick={() => handlePageChange('users')}
          >
            <FaUser className="mr-2" /> Người dùng
          </button>
        </li>
        <li>
          <button
            className={`w-full text-left hover:bg-gray-200 p-2 rounded flex items-center justify-start ${
              activePage === 'authors' ? 'text-blue-500' : 'text-black'
            }`}
            onClick={() => handlePageChange('authors')}
          >
            <FaUser className="mr-2" /> Tác giả
          </button>
        </li>
        <li>
          <button
            className={`w-full text-left hover:bg-gray-200 p-2 rounded flex items-center justify-start ${
              activePage === 'stories' ? 'text-blue-500' : 'text-black'
            }`}
            onClick={() => handlePageChange('stories')}
          >
            <FaBook className="mr-2" /> Truyện
          </button>
        </li>
        <li>
          <button
            className={`w-full text-left hover:bg-gray-200 p-2 rounded flex items-center justify-start ${
              activePage === 'categories' ? 'text-blue-500' : 'text-black'
            }`}
            onClick={() => handlePageChange('categories')}
          >
            <FaFolder className="mr-2" /> Thể loại
          </button>
        </li>
        <li>
          <button
            className={`w-full text-left hover:bg-gray-200 p-2 rounded flex items-center justify-start ${
              activePage === 'reviews' ? 'text-blue-500' : 'text-black'
            }`}
            onClick={() => handlePageChange('reviews')}
          >
            <FaStar className="mr-2" /> Đánh giá
          </button>
        </li>
        <li>
          <button
            className={`w-full text-left hover:bg-gray-200 p-2 rounded flex items-center justify-start ${
              activePage === 'tags' ? 'text-blue-500' : 'text-black'
            }`}
            onClick={() => handlePageChange('tags')}
          >
            <FaTag className="mr-2" /> Tag
          </button>
        </li>
        <li>
          <button
            className={`w-full text-left hover:bg-gray-200 p-2 rounded flex items-center justify-start ${
              activePage === 'comments' ? 'text-blue-500' : 'text-black'
            }`}
            onClick={() => handlePageChange('comments')}
          >
            <FaComments className="mr-2" /> Bình luận
          </button>
        </li>
        <li>
          <button
            className={`w-full text-left hover:bg-gray-200 p-2 rounded flex items-center justify-start ${
              activePage === 'settings' ? 'text-blue-500' : 'text-black'
            }`}
            onClick={() => handlePageChange('settings')}
          >
            <FaCog className="mr-2" /> Cài đặt
          </button>
        </li>
      </ul>
    </div>
  )
}

export default Sidebar
