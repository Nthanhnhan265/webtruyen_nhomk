'use client'
import { chapterByStory } from '@/app/_api/chapter.api' // Import API functions
import { getStoryBySlug } from '@/app/_api/story.api' // Import API functions
import { useEffect, useState } from 'react'
import NavbarComponent from '../../../../components/navbar'
import Footer from '../../_component/footer'
import { toast } from 'react-toastify'

interface Chapter {
  chapter_title: string
  chapter_id: number
  slug: string
  chapter_name: string
}

interface Story {
  story_name: string
  author_name: string
  keywords: string
  total_chapters: number
  source?: string
  cover: string
  slug: string
}

const page = ({ params }: { params: { slug: string } }) => {
  const [story, setStory] = useState<Story | null>(null)
  const [chapters, setChapters] = useState<Chapter[]>([])
  // State for chapters
  const [currentPage, setCurrentPage] = useState<number>(1) // State for current page
  const [totalPages, setTotalPages] = useState<number>(1) // State for total pages
  const { slug } = params // Lấy slug từ params của route
  // const URL = `${}`;
  useEffect(() => {
    // Log thông tin slug khi thay đổi
    console.log('check useparam', slug)

    const fetchStory = async () => {
      try {
        const data = await getStoryBySlug(slug) // Lấy thông tin story từ API
        console.log('check dât', data)
        setStory(data.data) // Lưu dữ liệu story vào state
        const { chapters, totalPages } = await chapterByStory(
          data.data.id, // Truyền id của story vào hàm getChapters
          currentPage,
        )
        console.log(chapters);

        setChapters(chapters) // Lưu danh sách chương vào state
        setTotalPages(totalPages) // Lưu tổng số trang vào state
      } catch (_error: unknown) {
        toast.error('lay du lieu that bai') // Xử lý lỗi nếu không lấy được dữ liệu
      }
    }
    fetchStory()
  }, [currentPage]) // Thêm slug và story vào dependency array để theo dõi sự thay đổi
  const readBook = (slug: any) => {
    if (!slug) {
      if (chapters && chapters.length > 0) {
        window.location.href = `/stories/${story?.slug}/${chapters[0]?.slug}`;
      } else {
        console.error("No chapters found for this story.");
      }
    } else {
      window.location.href = `/stories/${story?.slug}/${slug}`;
    }
  }
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage) // Update the current page when pagination buttons are clicked
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <NavbarComponent></NavbarComponent>
      {/* Main Content */}
      <main className="flex flex-grow max-w-7xl mx-auto py-8 px-4 space-x-6">
        {/* Left Column - Book Details and Chapter List */}
        <div className="w-2/3 bg-white p-6 rounded-lg shadow">
          {/* Book Details */}
          <div className="flex space-x-4">
            <div className="rounded w-48 h-64">
              <img
                src={
                  'http://localhost:3000/' +
                  (story?.cover || '/default-cover.jpg')
                }
                alt="Book Cover"
                className="w-48 h-64 object-cover rounded"
              />
            </div>
            <div className="space-y-4">
              <h1 className="text-3xl font-bold">{story?.story_name}</h1>
              <p className="text-gray-600">Tác giả: {story?.author_name}</p>
              <p className="text-gray-600">Thể loại: {story?.keywords}</p>
              <p className="text-gray-600">
                Số chương: {story?.total_chapters}
              </p>
              <p className="text-gray-600">
                Nguồn: {story?.source || 'Sưu tầm'}
              </p>
              <button
                onClick={() => readBook(story?.slug)}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Đọc truyện
              </button>
            </div>
          </div>

          {/* Chapter List */}
          <div className="mt-6">
            <h2 className="text-2xl font-semibold">Danh sách chương</h2>
            <ul className="grid grid-cols-2 gap-4 mt-4">
              {chapters.map((chapter, index) => (
                <li key={index}>
                  <a
                    // href={`/stories/${story?.slug}/${chapter.slug}`} // Truyền chapter_id qua query string
                    onClick={() => readBook(chapter.slug)}
                    className="text-blue-500 hover:underline"
                  >
                    {chapter.chapter_name}
                  </a>
                </li>
              ))}
            </ul>

            {/* Pagination */}
            <div className="mt-4 flex justify-center space-x-2">
              <button
                className="px-3 py-1 border rounded"
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  className={`px-3 py-1 border rounded ${i + 1 === currentPage ? 'bg-gray-300' : ''
                    }`}
                  onClick={() => handlePageChange(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
              <button
                className="px-3 py-1 border rounded"
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
              >
                Next
              </button>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div
          className="w-1/3 bg-white p-3 rounded-lg shadow"
          style={{ height: '380px' }}
        >
          <h2 className="text-2xl font-semibold text-orange-500 drop-shadow-md">
            Top Truyện Đề Cử
          </h2>
          {/* Other elements */}
        </div>
      </main >

      <Footer></Footer>
    </div >
  )
}

export default page
