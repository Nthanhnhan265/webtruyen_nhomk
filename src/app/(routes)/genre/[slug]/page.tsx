// "use client"; // Đảm bảo chạy trên client
// import { useParams } from 'next/navigation';
// import React, { useState, useEffect } from 'react';
// import Image from 'next/image';
// import Link from 'next/link';
// import Navbar from '@/app/(routes)/_component/Navbar';
// import Pagination from '@/app/(routes)/_component/Pagination';
// import CustomButton from '@/app/(routes)/_component/CustomButton';
// import styles from '../../_component/GenreDropdown.module.css';
// import Head from 'next/head';  // Thêm Head component để quản lý SEO

// const GenrePage = () => {
//   const { slug } = useParams(); // Lấy slug thể loại từ URL

//   const [books, setBooks] = useState<any[]>([]); // Khởi tạo books là một mảng
//   const [loading, setLoading] = useState(true);
//   const [currentPage, setCurrentPage] = useState(1); // Số trang hiện tại từ API
//   const [totalPages, setTotalPages] = useState(1); // Tổng số trang từ API

//   useEffect(() => {
//     const fetchBooks = async () => {
//       try {
//         // Gọi API để lấy danh sách truyện của thể loại này
//         const res = await fetch(`http://localhost:3000/api/story/genre/${slug}?page=${currentPage}`);

//         if (!res.ok) {
//           throw new Error("Không thể tải dữ liệu từ API.");
//         }

//         const data = await res.json();
//         console.log("Dữ liệu nhận được từ API(danh sách truyện theo thể loại):", data);

//         // Kiểm tra và đảm bảo data có trường stories là mảng
//         if (data && data.data && Array.isArray(data.data.stories)) {
//           setBooks(data.data.stories);
//           setTotalPages(data.pagination.totalPages); // Cập nhật tổng số trang từ API
//         } else {
//           setBooks([]); // Nếu không có truyện, đặt books là mảng rỗng
//         }
//       } catch (err) {
//         console.error("Lỗi khi tải dữ liệu:", err);
//         setBooks([]); // Đặt books là mảng rỗng trong trường hợp lỗi
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (slug) {
//       fetchBooks();
//     }
//   }, [slug, currentPage]); // Thêm currentPage vào dependency để khi chuyển trang sẽ gọi lại API

//   if (loading) {
//     return <div>Đang tải dữ liệu...</div>;
//   }

//   if (books.length === 0) {
//     return (
//       <div>
//         <Navbar />
//         <p>Không có truyện nào trong thể loại này.</p>
//       </div>
//     );
//   }

//   // Lấy tên thể loại để cập nhật SEO
//   const genreName = books[0]?.genres[0]?.genre_name || "Thể loại không xác định";

//   return (
//     <div>
//       {/* SEO phần đầu trang */}
//       <Head>
//         <title>{`Truyện Chom - ${genreName} - Danh sách truyện`}</title>
//         <meta name="description" content={`Xem các truyện ${genreName} hay nhất trên Truyện Chom`} />
//         <meta property="og:title" content={`Truyện Chom - ${genreName} - Danh sách truyện`} />
//         <meta property="og:description" content={`Xem các truyện ${genreName} hay nhất trên Truyện Chom`} />
//         <meta property="og:image" content="https://truyenplus.vn/path-to-image.jpg" />
//         <meta property="og:url" content={`https://truyenplus.vn/genre/${slug}`} />
//         <meta name="robots" content="index, follow" />
//       </Head>

//       <Navbar />
//       <div>
//         {books.map((book, index) => (
//           <p key={index} className="bg-gray-100 py-2 border-t border-gray-400 border-b pl-4 sm:pl-14 text-center sm:text-left">
//             Truyện {book.genres[0].genre_name} / Trang 1
//           </p>
//         ))}

//         {books.map((book, index) => (
//           <div key={index} className="ml-4 sm:ml-14 mt-8 mb-4">
//             <span className="font-bold">Truyện thể loại <span className="font-bold">{book.genres[0].genre_name}</span></span>
//           </div>
//         ))}

//         <hr className="ml-4 sm:ml-14" />

//         {books.map((book, index) => (
//           <p key={index} className="ml-4 sm:ml-14 my-3 text-center sm:text-left">
//             {book.description}
//           </p>
//         ))}

//         <div className="font-sans bg-gray-100 ml-14">
//           <div className="background-body bg-gray-100 py-5 px-4 sm:px-5 ml-8">
//             <div className="container mx-auto">
//               {books.map((book, index) => (
//                 <div key={index} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 mb-4">
//                   <div className="col-span-1 sm:col-span-3">
//                     <Image
//                       src={book.cover_url || "https://truyenplus.vn/media/book/do-thi-tu-chan-y-thanh.jpeg"} // Thêm ảnh cover thực tế
//                       alt={book.story_name}
//                       width={300}
//                       height={150}
//                       className="w-full"
//                     />
//                   </div>
//                   <div className="col-span-1 sm:col-span-9">
//                      {/* sang trang chi tiết truyện */}
//                     <Link href={`/story/${book.slug}`} className={styles.hoverNameTitle}>
//                       {book.story_name}
//                     </Link>
//                     <br />
//                      {/* sang trang tác giả */}
//                     <span>Tác giả:</span>
//                     <Link className={styles.hoverName} href={`/author/${book.author.author_slug}`}>
//                       {book.author.author_name}
//                     </Link>
//                     <br />
//                     <span>Thể loại:</span> <Link href={`/genre/${slug}`}>{book.genres[0].genre_name}</Link>
//                     <br />
//                     <span>Số chương:</span><Link href={`/story/${book.slug}`}>{book.total_chapters}</Link>
//                   </div>
//                 </div>
//               ))}
//             </div>
//             <Pagination currentPage={currentPage} totalPages={totalPages} />
//           </div>
//         </div>
//       </div>

//       {/* Footer với SEO cải tiến */}
//       <footer className="bg-gray-100 p-4 grid grid-cols-1 sm:grid-cols-2 mt-5 pl-4 sm:pl-14 ml-14">
//         <div className="mb-4 sm:mb-0">
//           Truyện Chom – Trang đọc truyện online, thường xuyên cập nhật những bộ truyện hay nhất thuộc các thể loại đặc sắc như: action , adventure , romance…
//           <br />
//           Mọi vấn đề vi phạm bản quyền vui lòng liên hệ qua email: <span className={styles.textFoot}>truyenchomonline@gmail.com</span>
//         </div>
//         <div>

//         {books.map((book, index) => (

//                 <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 ">
//                   <CustomButton href={`/genre/${book.genres[0].slug}`} title="Go to top page" text="Action" />
//                   <CustomButton href={`/genre/${book.genres[0].slug}`} title="Go to top page" text="Adventure" />
//                   <CustomButton href={`/genre/${book.genres[0].slug}`} title="Go to top page" text="Romance" />
//                   <CustomButton href={`/genre/${book.genres[0].slug}`} title="Go to top page" text="Fantansy" />
//                 </div>
//                     ))}
//               {books.map((book, index) => (

//                 <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-2">
//                   <CustomButton href={`/genre/${book.genres[0].slug}`} title="Go to top page" text="Horror" />
//                 </div>
//                     ))}
//           <div className={styles.contact}>
//             <a href="/contact" title="Contact">Contact</a>
//             <span>-</span>
//             <a href="/tos" title="Terms of Service">ToS</a>
//             <a className="backtop" title="Trở lên đầu trang" href="#" rel="nofollow" aria-label="Trở về đầu trang">⬆</a>
//           </div>
//         </div>
//       </footer>
'use client' // Chạy trên client
// /author/quan-hu
// "use client";
// image ,button,form ở flowbite,react icon
import Pagination from '@/app/(routes)/_component/Pagination'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import NavbarComponent from '../../../../components/navbar'
import styles from '../../_component/GenreDropdown.module.css'
import Footer from '../../_component/footer'

const genres = [
  { id: 1, name: 'Tiên Hiệp', slug: 'tien-hiep' },
  { id: 2, name: 'Kiếm Hiệp', slug: 'kiem-hiep' },
  { id: 3, name: 'Ngôn Tình', slug: 'ngon-tinh' },
  { id: 4, name: 'Quân Sự', slug: 'quan-su' },
  { id: 5, name: 'Lịch Sử', slug: 'lich-su' },
  { id: 6, name: 'Trinh Thám', slug: 'trinh-tham' },
]

const booksData = {
  'tien-hiep': [
    {
      slug: 'quan-hu',
      title: 'Trận Hỏi Trường Sinh',
      author: 'Quan Hư',
      genres: 'Tiên Hiệp, Ngôn Tình, Huyền Huyễn, Khác',
      chapters: 205,
      img: 'https://truyenplus.vn/media/book/tran-hoi-truong-sinh.jpeg',
    },
    {
      slug: 'hach-dong-luc-chien-liet-ham',
      title: 'Xuất Lung Ký',
      author: 'Hạch Động Lực Chiến Liệt Hạm',
      genres: 'Tiên Hiệp, Võng Du, Khoa Huyễn, Dã Sử, Hệ Thống, Khác',
      chapters: 1484,
      img: 'https://truyenplus.vn/media/book/xuat-lung-ky.jpeg',
    },
  ],
  'kiem-hiep': [
    {
      title: 'Lang Thiên Kiếm Thần',
      author: 'Quan Hư',
      genres: 'Tiên Hiệp, Ngôn Tình, Huyền Huyễn, Khác',
      chapters: 205,
      img: 'https://truyenplus.vn/media/book/lang-thien-kiem-than.jpg',
    },
    {
      title: 'Đại Sư Huynh',
      author: 'Hạch Động Lực Chiến Liệt Hạm',
      genres: 'Tiên Hiệp, Võng Du, Khoa Huyễn, Dã Sử, Hệ Thống, Khác',
      chapters: 1484,
      img: 'https://truyenplus.vn/media/book/dai-su-huynh-khong-co-gi-la-khong-co-gi-la-dai-su-huynh.jpg',
    },
  ],
}

const GenrePage = () => {
  const { slug } = useParams()
  const genre = genres.find((g) => g.slug === slug)
  const currentPage = 1
  const totalPages = 5

  if (!genre) {
    return <div>Thể loại không tồn tại</div>
  }

  const books = booksData[genre.slug] || []

  return (
    <div className="">
      <NavbarComponent></NavbarComponent>
      <p className="bg-gray-100 py-2 border-t border-gray-400 border-b pl-14">
        Truyện plus / {genre.name} / Trang 1
      </p>
      <div className="ml-14 mt-8 mb-4">
        <span className="font-bold">
          {' '}
          Truyện <span className="font-bold">{genre.name}</span>
        </span>
      </div>
      <hr className="ml-14" />
      <p className="ml-14 my-3">{`Truyện ${genre.name} thường kể về quá trình tu luyện và khám phá thế giới tu sĩ thần tiên đầy bí ẩn của nhân vật chính.`}</p>
      <div className="background-body bg-gray-100 py-5 px-5 ml-14 ">
        <div className="container">
          {books.map((book, index) => (
            <div
              className="grid grid-cols-12 gap-4 mb-4"
              key={index}
            >
              <div className="col-span-3">
                <Image
                  src={book.img}
                  alt={book.title}
                  width={300}
                  height={150}
                />
              </div>
              <div className="col-span-9">
                <Link
                  href=""
                  className={styles.hoverNameTitle}
                >
                  {book.title}
                </Link>
                <br />
                <span>Tác giả:</span>{' '}
                <Link
                  className={styles.hoverName}
                  href={`/author/${book.slug}`}
                >
                  {book.author}
                </Link>
                <br />
                <span>Thể Loại:</span> <Link href="">{book.genres}</Link>
                <br />
                <span>Số chương:</span> <Link href="">{book.chapters}</Link>
              </div>
            </div>
          ))}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
          />
        </div>
      </div>
      <Footer></Footer>
    </div>
  )
}

export default GenrePage
