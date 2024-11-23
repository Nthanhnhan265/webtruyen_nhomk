'use client'
import { Avatar, Pagination } from 'flowbite-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'

import { getAllStorieNew, getAllStorieView, incrementStoryViews } from '@/app/api/story.api'
import Footer from './(routes)/_component/footer'
import { toast } from 'react-toastify'
interface Story {
  id: number;
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

  const handleRead = async (slug: string, id: number) => {
    window.location.href = `/stories/${slug}`
    const view = await incrementStoryViews(id)
    console.log(view);

    if (!view) {
      toast.error("lỗi khi tăng view")
    }

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
      {/* Featured Image Section */}
      <section className="py-8 bg-white">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold mb-4 ms-48 text-gray-900 ">
            TRUYỆN HOT 🔥
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 px-3 md:px-5 lg:px-40">
            {' '}
            {/* Giảm gap ở đây */}
            {hotStories.map((story, index) => (
              <div
                key={index}
                onClick={() => handleRead(story.slug, story.id)}
                className="cursor-pointer"
              >
                <div className="relative w-[140px] h-[200px] mx-auto">
                  {story?.cover ? (
                    <Image
                      src={`http://localhost:3000/${story.cover}`}
                      alt={story.story_name || 'Story Image'}
                      fill
                      className="rounded-md shadow object-cover"
                    />
                  ) : (
                    <Avatar className="w-full h-full rounded-md shadow object-cover" />
                  )}
                </div>

                <p
                  className="text-center mt-2 text-sm font-medium text-gray-800 truncate"
                  title={story.story_name || 'No Title'} // Hiển thị tên đầy đủ khi hover
                >
                  {story.story_name || 'No Title'}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Updates Section */}
      <section className="py-8 px-5 md:px-10 lg:mx-10 lg:px-20 min-h-20">
        <div className="container mx-auto">
          <h2 className="text-2xl font-semibold mb-4 lg:ms-20">
            Truyện Mới Cập Nhật
          </h2>
          <div className="bg-white rounded shadow-lg px-10 mx-20">
            <div className="divide-y divide-gray-200">
              {newStories.map((story, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-4"
                  onClick={() => handleRead(story.slug, story.id)}
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
      <section className="py-8 px-5 md:px-10 lg:mx-28 lg:px-20 min-h-20">
        <div className="">
          <b> Web đọc truyện online hay và cập nhật mới nhất - TruyenChom.vn</b>
        </div>
        Trang web dành cho những tín đồ mê đọc truyện online đêm khuya với các
        thể loại hot nhất hiện nay như là đọc truyện ngôn tình, đọc truyện ma,
        truyện tiên hiệp, kiếm hiệp. Tất cả được truyenchom cập nhật thường
        xuyên từ các dịch giả truyện chuyên nghiệp và đăng tải hằng ngày.
        <br />
        <br />
        Bạn đang tìm kiếm một trang web đọc truyện mới nhất? Bạn không biết đọc
        truyện ở đâu? Nếu bạn đang loay hoay giữa hàng ngàn danh mục truyện, bạn
        vẫn không biết nên đọc truyện gì hay nhất?
        <br />
        <br />
        Nhưng đừng lo, đã có truyenchom cùng bạn đồng hành bạn qua những bộ
        truyện full với hồi kết đẫm nước mắt, hay một cái kết viên mãn hài lòng.
        Đến với truyenchom là đến với kho tàng truyện tranh khổng lồ, và không
        ngừng cập nhật những xu hướng truyện đọc mới nhất. Để xứng đáng một
        trang web đọc truyện miễn phí, giải trí hữu ích, thân thiện, nhanh nhất
        và đầy đủ nhất. Tất cả mang đến một trải nghiệm tuyệt vời nhất cho bạn
        đọc.
        <br />
        <br />
        Nếu bạn là người đam mê những câu truyện võ hiệp, đấu kiếm thì các bộ
        như “Kiếm động cửu thiên”, “Thế giới hoàn mỹ đồng”,…là những top truyện
        kiếm hiệp hay nhất. Hay những câu truyện ma như “Kết hôn âm dương”,
        “Hành tẩu âm dương” có làm bạn rùng mình, mất ngủ đêm khuya. Những cái
        kết đẫm nước mắt của bộ truyện “ngôn tình hoàn”, “ngôn tình ngược” sẽ
        làm bạn có suy nghĩ khác đi về tình yêu đôi lứa.
        <br />
        <br />
        Ngoài ra, truyenchom còn tổng hợp những truyện tuổi thơ, truyện teen như
        Once peace, Doraemon,…để đây sẽ là trang web đọc truyện dành cho cả gia
        đình, và không giới hạn lứa tuổi. Với phương châm “bạn đọc vui, chúng
        tôi vui” thì truyenchom sẽ luôn phát triển và cập nhật những mẫu truyện
        hay và miễn phí mới nhất vì đọc giả thân yêu. Chúc bạn có những phút
        giây giải trí bên bộ truyện mình ưng ý.
      </section>
      <Footer></Footer>
    </div>
  )
}
