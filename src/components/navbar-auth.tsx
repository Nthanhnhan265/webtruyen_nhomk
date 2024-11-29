'use client'

import styles from '@/app/(routes)/_component/GenreDropdown.module.css'
import useUserContext from '@/hooks/users/userUserContext'
import { Avatar } from 'flowbite-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { RxHamburgerMenu } from 'react-icons/rx'

export default function NavBar() {
  const pathname = usePathname()
  const [keyword, setKeyword] = useState('')
  const { loggedInUser } = useUserContext()
  const [genres, setGenres] = useState([])
  const isDashboardPage = pathname?.includes('dashboard')

  // Fetch genres từ API
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/genres') // API trả về dữ liệu thể loại
        const data = await res.json()
        console.log('Dữ liệu nhận được từ API (Danh sách thể loại):', data)

        // Kiểm tra xem dữ liệu có phải là mảng không và cập nhật state
        if (Array.isArray(data.data)) {
          setGenres(data.data) // Cập nhật genres từ API
        } else {
          setGenres([]) // Nếu không phải mảng, đặt genres là mảng trống
        }
      } catch (err) {
        console.error('Lỗi khi lấy dữ liệu thể loại:', err)
        setGenres([]) // Đặt genres là mảng trống nếu có lỗi
      }
    }

    fetchGenres() // Gọi hàm fetchGenres khi component mount
  }, [])

  // Xử lý thay đổi input tìm kiếm
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value)
  }

  // Xử lý khi nhấn nút tìm kiếm
  const handleClick = () => {
    if (keyword) {
      window.location.href = `/${keyword}`
    }
  }

  // Xử lý khi nhấn phím "Enter"
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && keyword) {
      window.location.href = `/${keyword}`
    }
  }

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
          {/* <div className={styles.dropdownContent}>
                  {genres.length === 0 ? (
                    <div>Đang tải thể loại...</div>
                  ) : (
                    genres.map((genre, index) => (
                      <Link
                        className={styles.genreItem}
                        key={index}
                        href={`/genre/${genre.slug}`} // Dẫn đến trang thể loại theo slug
                      >
                        {genre.genre_name}  
                      </Link>
                    ))
                  )}
                </div> */}
          <li className="relative group py-4">
            <div className={styles.dropdownContainer}>
              <div>THỂ LOẠI</div>
              <ul className="absolute mt-4 bg-white shadow z-10 top-full left-0 w-[calc(100%_+_8rem)] h-auto hidden group-hover:flex flex-col">
                {/* Hiển thị thể loại từ API */}
                {genres.length === 0 ? (
                  <li className="px-4 py-2">Đang tải thể loại...</li>
                ) : (
                  genres.map(
                    (genre: { slug: string; genre_name: string }, index) => (
                      <li
                        key={index}
                        className="px-4 py-2 hover:bg-slate-100"
                      >
                        <Link href={`/genre/${genre.slug}`}>
                          {genre.genre_name}
                        </Link>
                      </li>
                    ),
                  )
                )}
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
            onKeyDown={handleKeyPress}
          />
          <button
            className="bg-gray-300 px-3 py-2 rounded-r-md border"
            onClick={handleClick}
          >
            <FaSearch />
          </button>
        </div>

        <div className="flex items-center space-x-4">
          {loggedInUser.username ? (
            <Link href="/profile">
              <Avatar rounded>
                <div className="font-medium dark:text-white hidden md:block">
                  <span className="text-sm font-bold">Xin chào!</span>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {loggedInUser.username}
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
 * import { useState, useEffect } from 'react'; 
import styles from '@/app/(routes)/_component/GenreDropdown.module.css';
import { Avatar } from 'flowbite-react';
import Link from 'next/link';
import { FaSearch } from 'react-icons/fa';
import { RxHamburgerMenu } from 'react-icons/rx';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isListOpen, setIsListOpen] = useState(false);
  const [genres, setGenres] = useState<any[]>([]); // Khởi tạo genres là mảng trống
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  // Toggle functions
  const toggleList = () => setIsListOpen(!isListOpen);
  const toggleCategory = () => setIsCategoryOpen(!isCategoryOpen);

  // Fetch genres from backend
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/genres`);
        const data = await res.json();
        console.log("Dữ liệu nhận được từ API(danh sách truyện theo thể loại):", data);

        // Kiểm tra xem dữ liệu trả về có phải là mảng không
        if (Array.isArray(data.data)) {
          setGenres(data.data); // Cập nhật genres nếu là mảng
        } else {
          console.error('Dữ liệu không phải là mảng', data);
          setGenres([]); // Đặt genres là mảng trống nếu không phải mảng
        }
      } catch (err) {
        console.error('Lỗi khi lấy dữ liệu thể loại:', err);
        setGenres([]); // Đặt genres là mảng trống nếu có lỗi
      }
    };

    fetchGenres(); // Gọi hàm fetchGenres khi component được render
  }, []); // Chỉ gọi 1 lần khi component mount

  return (
    <nav className="flex flex-col sm:flex-row justify-between items-center p-4 border-b-2 border-gray-200 bg-white px-5 md:px-10 lg:px-20">
      <div className="flex justify-center basis-1/5 md:justify-start items-center w-full text-2xl font-bold">
        <Link href="/" className="flex items-center">
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
                <Link href="/list1" className="block px-4 py-2 hover:bg-gray-100">
                  List 1
                </Link>
              </li>
              <li>
                <Link href="/list2" className="block px-4 py-2 hover:bg-gray-100">
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
                  {genres.length === 0 ? (
                    <div>Đang tải thể loại...</div>
                  ) : (
                    genres.map((genre, index) => (
                      <Link
                        className={styles.genreItem}
                        key={index}
                        href={`/genre/${genre.slug}`} // Dẫn đến trang thể loại theo slug
                      >
                        {genre.genre_name}  
                      </Link>
                    ))
                  )}
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
              <div className="text-sm text-gray-500 dark:text-gray-400">username</div>
            </div>
          </Avatar>
          <div className="inline-block md:hidden">
            <RxHamburgerMenu />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

 */
