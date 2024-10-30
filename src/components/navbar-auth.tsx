import Link from "next/link";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const NavBar = () => {
  const [isListOpen, setIsListOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  const toggleList = () => setIsListOpen(!isListOpen);
  const toggleCategory = () => setIsCategoryOpen(!isCategoryOpen);

  return (
    <nav className="flex justify-between items-center p-4 border-b-2 border-gray-200 bg-white px-[200px]">
      <div className="flex items-center text-2xl font-bold">
        <Link href="/" className="flex items-center">
          <span className="text-red-500">truyen</span>
          <span className="mx-1">✨</span>
          <span className="text-red-500">chom</span>
        </Link>
      </div>

      <ul className="flex space-x-6">
  <li className="relative group">
    <button className="hover:text-red-500">DANH SÁCH</button>
    <ul className="absolute mt-2 p-2 bg-white shadow-md hidden group-hover:block group-focus-within:block z-10">
      <li className="hover:bg-gray-100">
        <Link href="/list1" className="block px-4 py-2">
          List 1
        </Link>
      </li>
      <li className="hover:bg-gray-100">
        <Link href="/list2" className="block px-4 py-2">
          List 2
        </Link>
      </li>
    </ul>
  </li>
  <li className="relative group">
    <button className="hover:text-red-500">THỂ LOẠI</button>
    <ul className="absolute mt-2 p-2 bg-white shadow-md hidden group-hover:block 0">
      <li className="hover:bg-gray-100">
        <Link href="/category1" className="block px-4 py-2">
          Category 1
        </Link>
      </li>
      <li className="hover:bg-gray-100">
        <Link href="/category2" className="block px-4 py-2">
          Category 2
        </Link>
      </li>
    </ul>
  </li>
</ul>


      <div className="flex items-center">
        <input
          type="text"
          placeholder="Tìm kiếm truyện..."
          className="border border-gray-300 rounded-l-md px-3 py-1 focus:outline-none"
        />
        <button className="bg-gray-300 px-3 py-1 rounded-r-md">
          <FontAwesomeIcon icon={faSearch} className="text-gray-700" />
        </button>
      </div>

      <div className="flex items-center space-x-4"></div>
    </nav>
  );
};

export default NavBar;
