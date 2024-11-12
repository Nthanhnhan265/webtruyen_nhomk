'use client'
import { useSidebarContext } from '@/context/navigation/sidebar.context'
import { Drawer, Sidebar as SidebarFlowBite } from 'flowbite-react'
import Link from 'next/link'

import { usePathname } from 'next/navigation'
import { AiOutlineComment, AiOutlineStar } from 'react-icons/ai'
import { BiCog } from 'react-icons/bi'
import { GoX } from 'react-icons/go'
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
  const CENTER = 'flex items-center gap-2 justify-start ps-8 py-2'
  const { isOpenProp, setIsOpenProp } = useSidebarContext()
  //===================== HANDLE FUNCTIONS ============================//

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
          open={isOpenProp}
          onClose={() => setIsOpenProp(!isOpenProp)}
          className="p-0"
        >
          <h2 className="text-xl font-bold p-4 mb-4 border-b relative text-blue-500 text-center ">
            <Link href={'/dashboard'}>{LABEL.sys.appName}</Link>
            <button
              className=" absolute w-6 h-6 top-3 right-3 hover:bg-black/5 flex  justify-center items-center rounded-md text-sm text-black/50 hover:text-black"
              onClick={() => setIsOpenProp(!isOpenProp)}
            >
              <GoX></GoX>
            </button>
          </h2>
          <Drawer.Items>
            <SidebarFlowBite
              aria-label="Sidebar with multi-level dropdown example"
              className="[&>div]:bg-transparent w-full [&>div]:p-0 opacity-60"
            >
              <div className="flex h-full flex-col justify-between py-2">
                <div>
                  <SidebarFlowBite.Items>
                    <SidebarFlowBite.ItemGroup>
                      {navItems.map((item, index) => (
                        <Link
                          key={index}
                          href={item.href}
                          key={index}
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
