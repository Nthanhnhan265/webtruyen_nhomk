import Link from "next/link";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Avatar,Dropdown  } from "flowbite-react";
import { FaListUl } from "react-icons/fa6";
import { BsClipboard2 } from "react-icons/bs";

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
      <div>
        <Avatar rounded>
          <div className="space-y-1 font-medium dark:text-white">
            <div>Xin chào</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              username
            </div>
          </div>
        </Avatar>
      </div>
    </nav>
  );
};

export default NavBar;
