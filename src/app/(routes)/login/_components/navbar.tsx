import Link from 'next/link';
import { useState } from 'react';

const NavBar = () => {
  const [isListOpen, setIsListOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  const toggleList = () => setIsListOpen(!isListOpen);
  const toggleCategory = () => setIsCategoryOpen(!isCategoryOpen);

  return (
    <nav className="flex justify-between items-center p-4 border-b-2 border-gray-200 bg-white">
      <div className="flex items-center text-2xl font-bold">
        <Link href="/" className="flex items-center">
          <span className="text-red-500">truyen</span>
          <span className="mx-1">✨</span>
          <span className="text-red-500">chom</span>
        </Link>
      </div>

      <ul className="flex space-x-6">
        <li>
          <button onClick={toggleList} className="hover:text-red-500">DANH SÁCH</button>
          {isListOpen && (
            <ul className="absolute mt-2 p-2 bg-white shadow-md">
              <li><Link href="/list1" className="block px-4 py-2 hover:bg-gray-100">List 1</Link></li>
              <li><Link href="/list2" className="block px-4 py-2 hover:bg-gray-100">List 2</Link></li>
            </ul>
          )}
        </li>
        <li>
          <button onClick={toggleCategory} className="hover:text-red-500">THỂ LOẠI</button>
          {isCategoryOpen && (
            <ul className="absolute mt-2 p-2 bg-white shadow-md">
              <li><Link href="/category1" className="block px-4 py-2 hover:bg-gray-100">Category 1</Link></li>
              <li><Link href="/category2" className="block px-4 py-2 hover:bg-gray-100">Category 2</Link></li>
            </ul>
          )}
        </li>
      </ul>

      <div className="flex items-center">
        <input
          type="text"
          placeholder="Tìm kiếm truyện..."
          className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none"
        />
        <button className="ml-2 bg-gray-300 px-3 py-1 rounded-md">🔍</button>
      </div>

      <div className="flex items-center space-x-4">
        <Link href="/login" className="hover:text-red-500">Đăng nhập</Link>
        <Link href="/register" className="text-red-500">Đăng ký</Link>
      </div>
    </nav>
  );
};

export default NavBar;
