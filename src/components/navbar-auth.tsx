'use client'

import styles from '@/app/(routes)/_component/GenreDropdown.module.css'
import { Avatar } from 'flowbite-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { RxHamburgerMenu } from 'react-icons/rx'

const genres = [
  { id: 1, name: 'Tiên Hiệp', slug: 'tien-hiep' },
  { id: 2, name: 'Kiếm Hiệp', slug: 'kiem-hiep' },
  { id: 3, name: 'Ngôn Tình', slug: 'ngon-tinh' },
  { id: 4, name: 'Quân Sự', slug: 'quan-su' },
  { id: 5, name: 'Lịch Sử', slug: 'lich-su' },
  { id: 6, name: 'Trinh Thám', slug: 'trinh-tham' },
]

export default function NavBar({
  userProfile,
}: // accessToken,
{
  userProfile: object
  accessToken?: string
}) {
  const pathname = usePathname()
  const [keyword, setKeyword] = useState('')

  const isDashboardPage = pathname?.includes('dashboard')

  if (isDashboardPage) return null
  // Handle change in the search input
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value)
  }
  // Handle search button click
  const handleClick = () => {
    if (keyword) {
      window.location.href = `/${keyword}`
    }
  }
  // Handle "Enter" key press to trigger the search
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && keyword) {
      window.location.href = `/${keyword}`
    }
  }
  return (
    <nav className="flex flex-col gap-8 sm:flex-row justify-between items-center border-b-2 border-gray-200 bg-white px-5 md:px-10 lg:px-20">
      <div className="flex justify-center py-2 basis-1/5 md:justify-start items-center w-full text-2xl font-bold">
        <Link
          href="/"
          className="flex items-center"
        >
          <Image
            alt="logo"
            src={'/images/logo-no-background.svg'}
            width={222}
            height={451}
          />
        </Link>
      </div>

      <div className="flex w-full gap-1 basis-4/5 md:w-auto items-center justify-between ">
        <ul className="flex space-x-6">
          <li className="relative group py-4">
            <div className={styles.dropdownContainer}>
              <div>THỂ LOẠI</div>
              <ul className="absolute mt-4 bg-white shadow top-full left-0 w-[calc(100%_+_8rem)] h-auto hidden group-hover:flex flex-col">
                {genres.map((genre, index) => (
                  <li
                    key={index}
                    className="px-4 py-2 hover:bg-slate-100"
                  >
                    <Link href={`/genre/${genre.slug}`}>{genre.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        </ul>

        <div className="flex items-center">
          <input
            type="text"
            placeholder="Tìm kiếm truyện..."
            className="border border-gray-300 rounded-l-md px-3 py-1 focus:outline-none"
            onChange={handleSearch}
            onKeyDown={handleKeyPress} // Add keydown event for Enter key
          />
          <button
            className="bg-gray-300 px-3 py-2 rounded-r-md border"
            onClick={handleClick}
          >
            <FaSearch />
          </button>
        </div>
        <div className="flex items-center space-x-4">
          {userProfile ? (
            <Link href="/profile">
              <Avatar rounded>
                <div className="font-medium dark:text-white hidden md:block">
                  <span className="text-sm font-bold">Xin chào!</span>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {userProfile.username}
                  </div>
                </div>
              </Avatar>
            </Link>
          ) : (
            <>
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
            </>
          )}
          <div className="inline-block md:hidden">
            <RxHamburgerMenu />
          </div>
        </div>
      </div>
    </nav>
  )
}
/**
 * 'use client'
 
export default function NavBar({
  userProfile,
  accessToken,
}: {
  userProfile: object
  accessToken: string
}) {
  const pathname = usePathname()

  const isDashboardPage = pathname?.includes('dashboard')

  if (isDashboardPage) return null

  return (
    <nav className="flex flex-col gap-8 sm:flex-row justify-between items-center border-b-2 border-gray-200 bg-white px-5 md:px-10 lg:px-20">
      <div className="flex justify-center py-2 basis-1/5 md:justify-start items-center w-full text-2xl font-bold">
        <Link
          href="/"
          className="flex items-center"
        >
          <Image
            alt="logo"
            src={'/images/logo-no-background.svg'}
            width={222}
            height={451}
          />
        </Link>
      </div>

      <div className="flex w-full gap-1 basis-4/5 md:w-auto items-center justify-between ">
        <ul className="flex space-x-6">
          <li className="relative group py-4">
            <div className={styles.dropdownContainer}>
              <div>THỂ LOẠI</div>
              <ul className="absolute mt-4 bg-white shadow top-full left-0 w-[calc(100%_+_8rem)] h-auto hidden group-hover:flex flex-col">
                {genres.map((genre, index) => (
                  <li
                    key={index}
                    className="px-4 py-2 hover:bg-slate-100"
                  >
                    <Link href={`/genre/${genre.slug}`}>{genre.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        </ul>

        <div className="flex items-center">
          <input
            type="text"
            placeholder="Tìm kiếm truyện..."
            className="border border-gray-300 rounded-l-md px-3 py-1 focus:outline-none"
            onChange={handleSearch}
            onKeyDown={handleKeyPress} // Add keydown event for Enter key
          />
          <button className="bg-gray-300 px-3 py-2 rounded-r-md border" onClick={handleClick}>
            <FaSearch />
          </button>
        </div>

        <div className="flex items-center space-x-4">
          {userProfile ? (
            <Link href="/profile">
              <Avatar rounded>
                <div className="font-medium dark:text-white hidden md:block">
                  <span className="text-sm font-bold">Xin chào!</span>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {userProfile.username}
                  </div>
                </div>
              </Avatar>
            </Link>
          ) : (
            <>
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
            </>
          )}

          <div className="inline-block md:hidden">
            <RxHamburgerMenu />
          </div>
        </div>
      </div>
    </nav>
  )
}
 */
