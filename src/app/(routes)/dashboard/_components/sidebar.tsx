'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AiOutlineComment, AiOutlineStar } from 'react-icons/ai'
import { BiCog } from 'react-icons/bi'
import { HiOutlineUsers } from 'react-icons/hi'
import { LuTag, LuUserCircle2 } from 'react-icons/lu'
import { MdBook } from 'react-icons/md'
import LABEL from '../label'

interface INavItem {
  href: string
  label: string
  icon: JSX.Element
}

const Sidebar = () => {
  //===================== DECLARE VARIABLE, HOOKS ====================//
  const navItems: INavItem[] = [
    {
      href: '/dashboard/users',
      label: LABEL.user.label,
      icon: <HiOutlineUsers />,
    },
    {
      href: '/dashboard/authors',
      label: 'Tác giả',
      icon: <LuUserCircle2 />,
    },
    {
      href: '/dashboard/stories', // Đường dẫn cho mục truyện
      label: 'Truyện',
      icon: <MdBook />, // Icon cho truyện
    },
    {
      href: '/dashboard/genres',
      label: 'Thể loại',
      icon: <LuTag />,
    },
    {
      href: '/dashboard/reviews',
      label: 'Đánh giá',
      icon: <AiOutlineStar />,
    },
    {
      href: '/dashboard/comments',
      label: 'Bình luận',
      icon: <AiOutlineComment />,
    },
    {
      href: '/dashboard/settings',
      label: 'Cài đặt',
      icon: <BiCog />,
    },

    // Thêm các mục khác vào đây
  ]
  const path = usePathname()

  const CENTER = 'flex items-center gap-2 justify-start ps-8 py-2'
  //===================== HANDLE FUNCTIONS ============================//

  //===================== RENDER COMPONENTS ===========================//
  return (
    <div className="bg-white text-gray-800 min-h-screen h-full flex flex-col shadow-lg">
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
              {item.icon}
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
  )
}

export default Sidebar

// 'use client'

// import { Button, Drawer, Sidebar, TextInput } from 'flowbite-react'
// import { useState } from 'react'
// import {
//   HiChartPie,
//   HiClipboard,
//   HiCollection,
//   HiInformationCircle,
//   HiLogin,
//   HiPencil,
//   HiSearch,
//   HiShoppingBag,
//   HiUsers,
// } from 'react-icons/hi'

// export default function SidebarTest() {
//   const [isOpen, setIsOpen] = useState(true)

//   const handleClose = () => setIsOpen(false)

//   return (
//     <>
//       <div className="flex min-h-[50vh] items-center justify-center">
//         <Button onClick={() => setIsOpen(true)}>Show navigation</Button>
//       </div>
//       <Drawer
//         open={isOpen}
//         onClose={handleClose}
//       >
//         <Drawer.Header
//           title="MENU"
//           titleIcon={() => <></>}
//         />
//         <Drawer.Items>
//           <Sidebar
//             aria-label="Sidebar with multi-level dropdown example"
//             className="[&>div]:bg-transparent [&>div]:p-0"
//           >
//             <div className="flex h-full flex-col justify-between py-2">
//               <div>
//                 <form className="pb-3 md:hidden">
//                   <TextInput
//                     icon={HiSearch}
//                     type="search"
//                     placeholder="Search"
//                     required
//                     size={32}
//                   />
//                 </form>
//                 <Sidebar.Items>
//                   <Sidebar.ItemGroup>
//                     <Sidebar.Item
//                       href="/"
//                       icon={HiChartPie}
//                     >
//                       Dashboard
//                     </Sidebar.Item>
//                     <Sidebar.Item
//                       href="/e-commerce/products"
//                       icon={HiShoppingBag}
//                     >
//                       Products
//                     </Sidebar.Item>
//                     <Sidebar.Item
//                       href="/users/list"
//                       icon={HiUsers}
//                     >
//                       Users list
//                     </Sidebar.Item>
//                     <Sidebar.Item
//                       href="/authentication/sign-in"
//                       icon={HiLogin}
//                     >
//                       Sign in
//                     </Sidebar.Item>
//                     <Sidebar.Item
//                       href="/authentication/sign-up"
//                       icon={HiPencil}
//                     >
//                       Sign up
//                     </Sidebar.Item>
//                   </Sidebar.ItemGroup>
//                   <Sidebar.ItemGroup>
//                     <Sidebar.Item
//                       href="https://github.com/themesberg/flowbite-react/"
//                       icon={HiClipboard}
//                     >
//                       Docs
//                     </Sidebar.Item>
//                     <Sidebar.Item
//                       href="https://flowbite-react.com/"
//                       icon={HiCollection}
//                     >
//                       Components
//                     </Sidebar.Item>
//                     <Sidebar.Item
//                       href="https://github.com/themesberg/flowbite-react/issues"
//                       icon={HiInformationCircle}
//                     >
//                       Help
//                     </Sidebar.Item>
//                   </Sidebar.ItemGroup>
//                 </Sidebar.Items>
//               </div>
//             </div>
//           </Sidebar>
//         </Drawer.Items>
//       </Drawer>
//     </>
//   )
// }
