// export default Sidebar
'use client'
import { Drawer, Sidebar as SidebarFlowBite } from 'flowbite-react'
import Link from 'next/link'

import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { AiOutlineComment, AiOutlineStar } from 'react-icons/ai'
import { BiCog } from 'react-icons/bi'
import { HiOutlineUsers } from 'react-icons/hi'
import { LuTag, LuUserCircle2 } from 'react-icons/lu'
import { MdBook } from 'react-icons/md'
import LABEL from '../label'

interface INavItem {
  href: string
  label: string
  icon: React.ComponentType // Pass the icon as a component type
}

const Sidebar = () => {
  //===================== DECLARE VARIABLE, HOOKS ====================//
  const navItems: INavItem[] = [
    {
      href: '/dashboard/users',
      label: LABEL.user.label,
      icon: HiOutlineUsers, // Pass the component constructor
    },
    {
      href: '/dashboard/authors',
      label: 'Tác giả',
      icon: LuUserCircle2,
    },
    {
      href: '/dashboard/stories',
      label: 'Truyện',
      icon: MdBook,
    },
    {
      href: '/dashboard/genres',
      label: 'Thể loại',
      icon: LuTag,
    },
    {
      href: '/dashboard/reviews',
      label: 'Đánh giá',
      icon: AiOutlineStar,
    },
    {
      href: '/dashboard/comments',
      label: 'Bình luận',
      icon: AiOutlineComment,
    },
    {
      href: '/dashboard/settings',
      label: 'Cài đặt',
      icon: BiCog,
    },
  ]
  const path = usePathname()
  const [isOpen, setIsOpen] = useState(true)
  const CENTER = 'flex items-center gap-2 justify-start ps-8 py-2'

  //===================== HANDLE FUNCTIONS ============================//
  const handleClose = () => setIsOpen(false)

  //===================== RENDER COMPONENTS ===========================//
  return (
    <>
      {/* ================== DESKTOP SIDEBAR =============================*/}
      <div className="hidden lg:flex bg-white text-gray-800 min-h-screen h-full flex-col shadow-lg">
        <h2 className="text-xl font-bold p-4 mb-4 border-b text-blue-500 text-center">
          <Link href={'/dashboard'}>{LABEL.sys.appName}</Link>
        </h2>
        <ul className="flex flex-col gap-1.5 opacity-60 pe-4 pt-3 space-y-2 flex-grow">
          {navItems.map((item, index) => (
            <li
              key={index}
              className="hover:bg-black/5 hover:rounded-md ms-1"
            >
              <Link
                href={item.href}
                className={
                  path === item.href
                    ? `${CENTER} text-[#013CC6] relative bg-gray-100 rounded-md`
                    : CENTER
                }
              >
                <item.icon /> {/* Use the component */}
                {item.label}
                {path === item.href ? (
                  <div className="absolute top-0 left-0 w-1 bottom-0 bg-[#0B63F8]"></div>
                ) : (
                  ''
                )}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* ================== MOBILE SIDEBAR  ============================= */}
      <div className="lg:hidden flex items-center justify-center">
        <Drawer
          open={isOpen}
          onClose={handleClose}
          className="p-0"
        >
          <Drawer.Header
            title="MENU"
            titleIcon={() => <></>}
          />
          <Drawer.Items>
            <SidebarFlowBite
              aria-label="Sidebar with multi-level dropdown example"
              className="[&>div]:bg-transparent w-full [&>div]:p-0"
            >
              <div className="flex h-full flex-col justify-between py-2">
                <div>
                  <SidebarFlowBite.Items>
                    <SidebarFlowBite.ItemGroup>
                      {navItems.map((item, index) => (
                        <SidebarFlowBite.Item
                          key={index}
                          href={item.href}
                          icon={item.icon} // Render the component as JSX
                          className={
                            path === item.href
                              ? `${CENTER} text-[#013CC6] relative bg-gray-100 rounded-md`
                              : CENTER
                          }
                        >
                          {item.label}
                          {path === item.href ? (
                            <div className="absolute top-0 left-0 w-1 bottom-0 bg-[#0B63F8]"></div>
                          ) : (
                            ''
                          )}
                        </SidebarFlowBite.Item>
                      ))}
                    </SidebarFlowBite.ItemGroup>
                  </SidebarFlowBite.Items>
                </div>
              </div>
            </SidebarFlowBite>
          </Drawer.Items>
        </Drawer>
      </div>
    </>
  )
}

export default Sidebar


// // <<<<<<< xem-the-loai-truyen-new

// import { AiFillAppstore } from "react-icons/ai";
// import { IoSettingsOutline } from "react-icons/io5";
// import { IoBagCheckOutline } from "react-icons/io5";
// import { BsBagHeart } from "react-icons/bs";
// import LABEL from '../label'

// interface Iprop {
//   onClickNavbar: (navbar: string) => void
//   isActiveNav: string
// }
// const Sidebar = () => {
//   const CENTER = 'flex items-center gap-4 justify-start'
//   return (
//     <div className="bg-white text-gray-800 min-h-screen h-full flex flex-col shadow-lg">


//       <ul className="flex flex-col gap-4 opacity-60 pe-4 pt-3 space-y-2 flex-grow">

//         <li className="ps-8 relative hover:border-l-4 hover:border-red-600">
//           <Link
//             href={'/dashboard/authors'}
//             className={`${CENTER} flex items-center space-x-2 hover:text-red-600`}
//           >
//             <AiFillAppstore />
//             Thông tin tài khoản
//           </Link>
//           {/* Đường viền đỏ chỉ xuất hiện khi hover vào <li> */}
//           {/* <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-600 opacity-0 hover:opacity-100 transition-all"></div> */}
//         </li>
//         <li className={`ps-8 relative hover:border-l-4 hover:border-red-600`}>
//           <Link
//             href={'/dashboard/stories'}
//             className={`${CENTER} items-center space-x-2 hover:text-red-600`}
//           >
//             <BsBagHeart />
//             Truyện yêu thích
//           </Link>
//         </li>
//         <li className={`ps-8 relative hover:border-l-4 hover:border-red-600`}>
//           <Link
//             href={'/dashboard/authors'}
//             className={`${CENTER} items-center space-x-2 hover:text-red-600`}
//           >
//             <IoBagCheckOutline />
//             Truyện gần đây
//           </Link>
//         </li>
//         <li className={`ps-8 relative hover:border-l-4 hover:border-red-600`}>
//           <Link
//             href={'/dashboard/authors'}
//             className={`${CENTER} items-center space-x-2 hover:text-red-600`}
//           >
//             <IoSettingsOutline />
//             Cài đặt
//           </Link>
//         </li>
//       </ul>
//     </div>
