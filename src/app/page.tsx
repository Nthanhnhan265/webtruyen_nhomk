'use client'
import { Pagination } from 'flowbite-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'

import { getAllStorieNew, getAllStorieView } from '@/app/api/story.api'
import Footer from './(routes)/_component/footer'
interface Story {
  story_name: string
  total_chapters: number
  keywords: string
  slug: string
  cover: string
}
export default function HomePage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [hotStories, setHotStories] = useState<Story[]>([])
  const [newStories, setNewStories] = useState<Story[]>([])

  const fetchStories = async () => {
    const params = {
      author_storie: '',
      description: '',
      sort: 'ASC',
      page: currentPage,
    }

    try {
      const response = await getAllStorieView(params)
      const responseNew = await getAllStorieNew(params)
      setNewStories(responseNew.stories || [])
      setHotStories(response.stories || [])
      setTotalPages(response.totalPages || 1)
    } catch (error) {
      console.error('Error fetching stories:', error)
    }
  }
  const handleClick = (slug: string) => {
    window.location.href = `/stories/${slug}`
  }
  const onPageChange = (page: number) => {
    setCurrentPage(page)
  }

  useEffect(() => {
    fetchStories()
  }, [currentPage])

  // const { userProfile, accessToken } = await useProfile()
  // console.log(userProfile)
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* <NavBar /> */}
      {/* Featured Image Section */}
      <section className="py-8 bg-white">
        <div className="container mx-auto">
          <h2 className="text-xl font-semibold mb-4 ms-28">TRUYỆN HOT 🔥</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 px-28 lg:grid-cols-5 gap-4 justify-center">
            {hotStories.map((story, index) => (
              <div
                key={index}
                onClick={() => handleClick(story.slug)}
                className="flex flex-col items-center"
              >
                <Image
                  src={
                    story?.cover
                      ? `http://localhost:3000/${story.cover}`
                      : '/default-cover.jpg'
                  }
                  alt={story.story_name || 'Story Image'}
                  width={140}
                  height={200}
                  className="rounded-lg shadow-md"
                />
                <p className="text-center mt-2 text-sm font-medium text-gray-800 w-24 truncate">
                  {story.story_name || 'No Title'}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Updates Section */}
      <section className="py-8 px-5 md:px-10 lg:px-20 min-h-20">
        <div className="container mx-auto">
          <h2 className="text-xl font-semibold mb-4">Truyện Mới Cập Nhật</h2>
          <div className="bg-white rounded shadow-lg">
            <div className="divide-y divide-gray-200">
              {newStories.map((story, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-4"
                >
                  <span className="text-gray-700 font-semibold">
                    {story.story_name || 'No Title'}
                  </span>
                  <span className="text-gray-500">
                    {story.keywords || 'No Keywords'}
                  </span>
                  <span className="text-red-500">
                    {story.total_chapters
                      ? `${story.total_chapters} Chương`
                      : '0'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pagination */}
      <div className="flex overflow-x-auto justify-center mt-4 px-5 md:px-10 lg:px-20">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </div>

      <Footer></Footer>
    </div>
  )
}
