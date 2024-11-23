'use client'
import { useEffect, useState } from 'react'
// import { toast } from 'react-toastify'; // ĐÚNG
import Footer from '@/app/(routes)/_component/footer'
import { getChapterBySlug, getChapterByStoryidAll } from '@/app/api/chapter.api'
import { getAllStorieView } from '@/app/api/story.api'
import { toast } from 'react-toastify'
import Modal from '../../compoment/chapterModal'

interface Chapter {
  id: number
  chapter_name: string
  content: string
  slug: string
  views: number
  chapter_order: number
  published_at: Date
  Story: {
    id: number
    story_name: string
    slug: string
  }
}
interface Story {
  id: number
  story_name: string
  cover: string
  slug: string
}

const ChapterPage = ({
  params,
}: {
  params: { slug: string; chapter: string }
}) => {
  const [chapter, setChapter] = useState<Chapter>()
  const [chapters, setChapters] = useState<Chapter[]>([])
  const [storys, setStorys] = useState<Story[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const data = {
    author_storie: '',
    description: '',
    sort: 'ASC',
    page: 1,
  }
  const fetchStory = async () => {
    const { chapter } = params
    // alert(chapter)
    try {
      const response = await getChapterBySlug(chapter) // Get chapter details from API
      setChapter(response.data)
      // console.log(response);

      // toast.success("Lấy dữ liệu thành công");
      if (response) {
        // toast.success("lay du lieu thanh cong")
      }
      // const { chapters: chaptersData } = await chapterByStory(response.data.Story.id, 1);
      const responseChapter = await getChapterByStoryidAll(
        response.data.story_id,
      )
      console.log(responseChapter)

      setChapters(responseChapter.data.chapters)

      const storynew = await getAllStorieView(data)
      setStorys(storynew.stories)
      // console.log(storynew)
    } catch (error) {
      console.log(error)

      toast.error('Lấy chương truyện thất bại')
    }
  }

  useEffect(() => {
    fetchStory()
  }, [params])
  const handleRead = (slug: string) => {
    window.location.href = `/stories/${slug}`
  }
  const readBook = (slug: string, direction: 'next' | 'previous') => {
    const currentIndex = chapters.findIndex((chap) => chap.slug === slug)

    if (currentIndex === -1) {
      console.error('Không tìm thấy nội dung chương!')
      return
    }

    if (direction === 'next') {
      if (currentIndex < chapters.length - 1) {
        window.location.href = `/stories/${chapter?.Story?.slug}/${
          chapters[currentIndex + 1]?.slug
        }`
      } else {
        console.log('Đây là chương cuối cùng.')
      }
    } else if (direction === 'previous') {
      if (currentIndex > 0) {
        window.location.href = `/stories/${chapter?.Story?.slug}/${
          chapters[currentIndex - 1]?.slug
        }`
      } else {
        console.log('đây là chương đầu tiên.')
      }
    }
  }
  const selectChapter = (chapterSlug: any) => {
    if (chapterSlug) {
      // Redirect to the selected chapter's page
      window.location.href = `/stories/${chapter?.Story?.slug}/${chapterSlug}`
    } else {
      console.error('Invalid chapter or story slug')
    }
  }
  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)
  // console.log("chapter", chapters);

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        data={chapter?.Story?.id ?? 0}
        selectChapter={selectChapter}
        closeModal={closeModal}
      />
      {/* <NavbarComponent /> */}

      <p className="bg-gray-100 py-2 border-t border-gray-400 lg:ps-20 border-b pl-14">
        Truyện plus / {params.slug} / {params.chapter}
      </p>

      <div className="bg-[#f6f7eb] text-[#333] lg:mx-52 mt-2">
        <div className="container mx-auto p-4">
          <div className="container mx-auto max-w-3xl text-center">
            <h1 className="text-2xl font-semibold text-red-600 mb-1">
              {chapter?.Story?.story_name}
            </h1>
            <h2 className="text-lg text-gray-500 mb-4">
              Chương {chapter?.chapter_order}
            </h2>

            <div className="flex justify-center gap-4 mb-6">
              <button
                className="px-4 py-2 bg-green-100 text-green-700 rounded-md font-semibold hover:bg-green-200"
                onClick={() => readBook(chapter?.slug || '', 'previous')}
              >
                &lt;&lt; Chương trước
              </button>
              <button
                className="px-4 py-2 bg-green-500 text-white rounded-md font-semibold hover:bg-green-600"
                onClick={openModal}
              >
                Menu
              </button>
              <button
                className="px-4 py-2 bg-green-100 text-green-700 rounded-md font-semibold hover:bg-green-200"
                onClick={() => readBook(chapter?.slug || '', 'next')}
              >
                Chương tiếp &gt;&gt;
              </button>
            </div>

            <div className="prose prose-lg text-justify leading-relaxed mb-3 text-2xl max-w-full">
              <div
                dangerouslySetInnerHTML={{ __html: chapter?.content || '' }}
              ></div>
            </div>
          </div>

          <div className="flex justify-center gap-4 mb-6">
            <button
              className="px-4 py-2 bg-green-100 text-green-700 rounded-md font-semibold hover:bg-green-200"
              onClick={() => readBook(chapter?.slug || '', 'previous')}
            >
              &lt;&lt; Chương trước
            </button>
            <button
              className="px-4 py-2 bg-green-500 text-white rounded-md font-semibold hover:bg-green-600"
              onClick={openModal}
            >
              Menu
            </button>
            <button
              className="px-4 py-2 bg-green-100 text-green-700 rounded-md font-semibold hover:bg-green-200"
              onClick={() => readBook(chapter?.slug || '', 'next')}
            >
              Chương tiếp &gt;&gt;
            </button>
          </div>

          {/* Comment Section */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-2">Bình luận</h2>
            <textarea
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              rows={4}
              placeholder="Nhập bình luận của bạn..."
            ></textarea>
            <button className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
              Gửi
            </button>
          </div>

          {/* Related Stories */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-2">Truyện hot mới</h2>

            {/* Wrap the stories in a container with the grid layout */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {storys.map((story, index) => {
                return (
                  <div
                    key={index}
                    className="bg-white p-2 rounded shadow hover:shadow-md"
                    onClick={() => handleRead(story.slug)}
                  >
                    <img
                      src={
                        story?.cover
                          ? `http://localhost:3000/${story.cover}`
                          : '/default-cover.jpg'
                      }
                      alt="Story Thumbnail"
                      className="w-full h-32 object-cover rounded"
                    />
                    <p className="text-sm mt-2">{story?.story_name}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  )
}

export default ChapterPage

// export default async function Page() {
//   let data = await fetch('https://api.vercel.app/blog')
//   let posts = await data.json()
//   return (
//     <ul>
//       {posts.map((post) => (
//         <li key={post.id}>{post.title}</li>
//       ))}
//     </ul>
//   )
// }
