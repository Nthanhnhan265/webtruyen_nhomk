import { Avatar } from 'flowbite-react'
import Link from 'next/link'
import { useState } from 'react'
import { BsClipboard2 } from 'react-icons/bs'
import { FaSearch } from 'react-icons/fa'
import { FaListUl } from 'react-icons/fa6'
import { RxHamburgerMenu } from 'react-icons/rx'

const NavBar = () => {
  const [isListOpen, setIsListOpen] = useState(false)
  const [isCategoryOpen, setIsCategoryOpen] = useState(false)

  const toggleList = () => setIsListOpen(!isListOpen)
  const toggleCategory = () => setIsCategoryOpen(!isCategoryOpen)

  return (
    <nav className="flex flex-col sm:flex-row justify-between items-center p-4 border-b-2 border-gray-200 bg-white px-5 md:px-10 lg:px-20">
      <div className="flex justify-center basis-1/5 md:justify-start items-center w-full text-2xl font-bold">
        <Link
          href="/"
          className="flex items-center"
        >
          <span className="text-red-500">truyen</span>
          <span className="mx-1">✨</span>
          <span className="text-red-500">chom</span>
        </Link>
      </div>
      <div className="flex w-full gap-1 md:w-auto items-center justify-between ">
        <ul className="space-x-6 hidden md:flex gap-2">
          {/* Danh sách */}
          <li className="relative">
            <button
              onClick={toggleList}
              className="flex items-center hover:text-red-500"
            >
              <FaListUl className="mr-1" />
              DANH SÁCH
            </button>
            {isListOpen && (
              <ul className="absolute mt-2 p-2 bg-white shadow-md">
                <li>
                  <Link
                    href="/list1"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    List 1
                  </Link>
                </li>
                <li>
                  <Link
                    href="/list2"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    List 2
                  </Link>
                </li>
              </ul>
            )}
          </li>

          {/* Thể loại */}
          <li className="relative">
            <button
              onClick={toggleCategory}
              className="flex items-center hover:text-red-500"
            >
              <BsClipboard2 className="mr-1" />
              THỂ LOẠI
            </button>
            {isCategoryOpen && (
              <ul className="absolute mt-2 p-2 bg-white shadow-md">
                <li>
                  <Link
                    href="/category1"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Category 1
                  </Link>
                </li>
                <li>
                  <Link
                    href="/category2"
                    className="block px-4 py-2 hover:bg-gray-100 whitespace-nowrap"
                  >
                    Category 2
                  </Link>
                </li>
              </ul>
            )}
          </li>
        </ul>

        <div className="flex items-center">
          <input
            type="text"
            placeholder="Tìm kiếm truyện..."
            className="border border-gray-300 rounded-l-md px-3 py-1 focus:outline-none"
          />
          <button className="bg-gray-300 px-3 py-2 rounded-r-md border">
            <FaSearch />
          </button>
        </div>
        <div className="flex items-center">
          <Avatar rounded>
            <div className="space-y-1 font-medium dark:text-white hidden md:block">
              <div>Xin chào</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                username
              </div>
            </div>
          </Avatar>
          <div className="inline-block md:hidden">
            <RxHamburgerMenu />
          </div>
        </div>
      </div>
    </nav>
  )
}

export default NavBar
