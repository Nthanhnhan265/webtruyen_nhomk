import styles from '@/app/(routes)/_component/GenreDropdown.module.css'
import { Avatar } from 'flowbite-react'
import Link from 'next/link'
import { useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { RxHamburgerMenu } from 'react-icons/rx'
const genres = [
  { id: 1, name: 'Tiên Hiệp', slug: 'tien-hiep' },
  { id: 2, name: 'Kiếm Hiệp', slug: 'kiem-hiep' },
  { id: 3, name: 'Ngôn Tình', slug: 'ngon-tinh' },
  { id: 4, name: 'Quân Sự', slug: 'quan-su' },
  { id: 5, name: 'Lịch Sử', slug: 'lich-su' },
  { id: 6, name: 'Trinh Thám', slug: 'trinh-tham' },
  // Thêm các thể loại khác
]
const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false)
  // const [isListOpen, setIsListOpen] = useState(false)
  // const [isCategoryOpen, setIsCategoryOpen] = useState(false)
  // const toggleList = () => setIsListOpen(!isListOpen)
  // const toggleCategory = () => setIsCategoryOpen(!isCategoryOpen)
  // const { loggedInUser, setIsLoggedInUser } = useUserContext()
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
        <ul className="flex space-x-6">
          <li className="relative group">
            <button className="hover:text-red-500">DANH SÁCH</button>
            <ul className="absolute mt-2 p-2 bg-white shadow-md hidden group-hover:block">
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
          </li>
          <li className="relative group">
            <div
              className={styles.dropdownContainer}
              onMouseEnter={() => setIsOpen(true)}
              onMouseLeave={() => setIsOpen(false)}
            >
              <div>THỂ LOẠI</div>
              {isOpen && (
                <div className={styles.dropdownContent}>
                  {genres.map((genre, index) => (
                    <Link
                      className={styles.genreItem}
                      key={index}
                      href={`/genre/${genre.slug}`}
                    >
                      {genre.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
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
