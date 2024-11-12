'use client'
import Link from 'next/link'
import { useState } from 'react'
import { HiOutlineSearch } from 'react-icons/hi'
import styles from './GenreDropdown.module.css'

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="flex justify-between items-center p-4 border-b-2 border-gray-200 bg-white px-[200px]">
      <div className="flex items-center text-2xl font-bold -ml-36">
        <Link
          href="/"
          className="flex items-center"
        >
          <span className="text-red-500">truyen</span>
          <span className="mx-1">✨</span>
          <span className="text-red-500">chom</span>
        </Link>
      </div>

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
        <button className="bg-gray-300 px-3 py-2 rounded-r-md">
          <HiOutlineSearch />
        </button>
      </div>

      <div className="flex items-center space-x-4">
        <Link
          href="/login"
          className="hover:text-red-500"
        >
          Đăng nhập
        </Link>
        <Link
          href="/register"
          className="hover:text-red-500"
        >
          Đăng ký
        </Link>
      </div>
    </nav>
  )
}

export default NavBar
