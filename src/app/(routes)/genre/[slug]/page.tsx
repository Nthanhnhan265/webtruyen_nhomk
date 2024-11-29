'use client' // Đảm bảo chạy trên client
import CustomButton from '@/app/(routes)/_component/CustomButton'
import Pagination from '@/app/(routes)/_component/Pagination'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import styles from '../../_component/GenreDropdown.module.css'

const GenrePage = () => {
  const { slug } = useParams() // Lấy slug thể loại từ URL
  const [books, setBooks] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1) // Trang hiện tại
  const [totalPages, setTotalPages] = useState(1) // Tổng số trang
  const router = useRouter()
  const searchParams = useSearchParams() // Lấy query từ URL

  // Hàm lấy thông tin truyện
  const fetchBooks = async () => {
    try {
      const page = searchParams.get('page')
        ? parseInt(searchParams.get('page') as string, 10)
        : 1
      setCurrentPage(page) // Cập nhật lại currentPage từ query params

      const res = await fetch(
        `http://localhost:3000/api/story/genre/${slug}?page=${page}`,
      )
      if (!res.ok) throw new Error('Không thể tải dữ liệu từ API.')

      const data = await res.json()
      console.log(
        'Dữ liệu nhận được từ API(danh sách truyện theo thể loại):',
        data,
      )

      if (data && data.data && Array.isArray(data.data.stories)) {
        setBooks(data.data.stories)
        setTotalPages(data.pagination.totalPages) // Cập nhật tổng số trang từ API
      } else {
        setBooks([]) // Nếu không có truyện, đặt books là mảng rỗng
      }
    } catch (err) {
      console.error('Lỗi khi tải dữ liệu:', err)
      setBooks([]) // Đặt books là mảng rỗng trong trường hợp lỗi
    } finally {
      setLoading(false)
    }
  }

  // Khi slug hoặc page thay đổi, gọi lại API
  useEffect(() => {
    if (slug) {
      fetchBooks()
    }
  }, [slug, searchParams]) // Thêm searchParams vào dependencies

  if (loading) {
    return <div>Đang tải dữ liệu...</div>
  }

  if (books.length === 0) {
    return <p>Không có truyện nào trong thể loại này.</p>
  }

  const genreName = books[0]?.genres[0]?.genre_name || 'Thể loại không xác định'

  return (
    <div>
      <Head>
        <title>{`Truyện Chom - ${genreName} - Danh sách truyện`}</title>
        <meta
          name="description"
          content={`Xem các truyện ${genreName} hay nhất trên Truyện Chom`}
        />
      </Head>

      <div>
        <p className="bg-gray-100 py-2 border-t border-gray-400 border-b pl-4 sm:pl-14 text-center sm:text-left">
          Truyện {genreName} / Trang {currentPage}
        </p>

        <div className="ml-4 sm:ml-14 mt-8 mb-4">
          <span className="font-bold">
            Truyện thể loại <span className="font-bold">{genreName}</span>
          </span>
        </div>
        <hr className="ml-4 sm:ml-14" />
        <p className="ml-4 sm:ml-14 my-3 text-center sm:text-left">
          {books[0]?.description}
        </p>

        <div className="font-sans bg-gray-100 ml-14">
          <div className="background-body bg-gray-100 py-5 px-4 sm:px-5 ml-8">
            <div className="container mx-auto">
              {books.map((book, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 mb-4"
                >
                  <div className="col-span-1 sm:col-span-3">
                    <Image
                      src={
                        book.cover_url ||
                        'https://truyenplus.vn/media/book/do-thi-tu-chan-y-thanh.jpeg'
                      }
                      alt={book.story_name}
                      width={300}
                      height={150}
                      className="w-full"
                    />
                  </div>
                  <div className="col-span-1 sm:col-span-9">
                    <Link
                      href={`/story/${book.slug}`}
                      className={styles.hoverNameTitle}
                    >
                      {book.story_name}
                    </Link>
                    <br />
                    <span>Tác giả:</span>
                    <Link
                      className={styles.hoverName}
                      href={`/author/${book.author.author_slug}`}
                    >
                      {book.author.author_name}
                    </Link>
                    <br />
                    <span>Thể loại:</span>{' '}
                    <Link href={`/genre/${slug}`}>{genreName}</Link>
                    <br />
                    <span>Số chương:</span>
                    <Link href={`/story/${book.slug}`}>
                      {book.total_chapters}
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
            />
          </div>
        </div>
      </div>

      <footer className="bg-gray-100 p-4 grid grid-cols-1 sm:grid-cols-2 mt-5 pl-4 sm:pl-14 ml-12">
        <div className="mb-4 sm:mb-0">
          Truyện Plus – Trang đọc truyện online, thường xuyên cập nhật những bộ
          truyện hay nhất thuộc các thể loại đặc sắc như: action , adventure ,
          romance…
          <br />
          Mọi vấn đề vi phạm bản quyền vui lòng liên hệ qua email:{' '}
          <span className={styles.textFoot}>truyenchomonline@gmail.com</span>
        </div>
        <div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <CustomButton
              href="/some-page"
              title=""
              text="Action"
            />
            <CustomButton
              href="/some-page"
              title=""
              text="Adventure"
            />
            <CustomButton
              href="/some-page"
              title=""
              text="Romance"
            />
            <CustomButton
              href="/some-page"
              title=""
              text="Fantasy"
            />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-2">
            <CustomButton
              href="/some-page"
              title=""
              text="Horror"
            />
          </div>

          <div className={styles.contact}>
            <a
              href="/contact"
              title="Contact"
            >
              Contact
            </a>
            <span>-</span>
            <a
              href="/tos"
              title="Terms of Service"
            >
              ToS
            </a>
            <a
              className="backtop"
              title="Trở lên đầu trang"
              href="#"
              rel="nofollow"
              aria-label="Trở về đầu trang"
            >
              ⬆
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default GenrePage
