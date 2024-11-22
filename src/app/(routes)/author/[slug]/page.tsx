// 'use client'; // Đảm bảo component này chạy trên client

// import { useParams, useSearchParams } from 'next/navigation';
// import React, { useState, useEffect } from 'react';
// import Image from 'next/image';
// import Link from 'next/link';
// import Navbar from '@/app/(routes)/_component/Navbar';
// import Pagination from '@/app/(routes)/_component/Pagination';
// import CustomButton from '@/app/(routes)/_component/CustomButton';
// import styles from '../../_component/GenreDropdown.module.css';
// import Head from 'next/head';

// const AuthorPage = () => {
//   const { slug } = useParams(); // Lấy slug từ URL
//   const searchParams = useSearchParams(); // Lấy query params
//   const currentPage = parseInt(searchParams.get('page') || '1', 10); // Lấy trang hiện tại từ query, mặc định là 1
//   const limit = 2; // Số lượng câu chuyện mỗi trang
//   const [author, setAuthor] = useState<any>(null); // Thông tin tác giả
//   const [books, setBooks] = useState<any[]>([]); // Sách của tác giả
//   const [totalPages, setTotalPages] = useState<number>(0); // Tổng số trang
//   const [loading, setLoading] = useState<boolean>(true); // Trạng thái loading
//   const [error, setError] = useState<string | null>(null); // Trạng thái lỗi

//   useEffect(() => {
//     const fetchAuthorData = async () => {
//       try {
//         setLoading(true);
//         setError(null); // Reset lỗi khi bắt đầu gọi API
//         const res = await fetch(`http://localhost:3000/api/authors/authorsbooks/${slug}?page=${currentPage}&limit=${limit}`);

//         // Kiểm tra nếu response không thành công
//         if (!res.ok) {
//           throw new Error('Không thể tải dữ liệu tác giả');
//         }

//         const data = await res.json();

//         console.log("tổng trang : " +totalPages);

//         console.log("author page:" + JSON.stringify(data));  // Kiểm tra dữ liệu trả về

//         // Kiểm tra dữ liệu có hợp lệ không
//         if (data.message && data.data && data.data.author) {
//           const { author, totalPages, totalStories } = data.data; // Lấy thông tin tác giả và tổng số trang
//           setAuthor(author); // Lưu thông tin tác giả
//           setBooks(author.stories || []); // Lưu câu chuyện của tác giả (nếu có)

//           // Lưu tổng số trang từ dữ liệu trả về hoặc tính toán từ totalStories
//           setTotalPages(author.totalPages || Math.ceil(totalStories / limit));
//         } else {
//           setError('Tác giả không tồn tại hoặc không có câu chuyện nào');
//         }
//       } catch (err: any) {
//         setError(err.message || 'Đã có lỗi xảy ra, vui lòng thử lại sau');
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (slug) {
//       fetchAuthorData();
//     }
//   }, [slug, currentPage]);

//   if (loading) {
//     return <div>Đang tải dữ liệu...</div>;
//   }

//   if (error) {
//     return <div>{error}</div>; // Hiển thị thông báo lỗi
//   }

//   // Tạo SEO meta tags từ dữ liệu tác giả
//   const authorName = author?.author_name || "Tác giả không xác định";

//   return (
//     <div>
//       {/* SEO */}
//       <Head>
//         <title>{`${authorName} - Truyện Chom`}</title>
//         <meta name="description" content={`Khám phá những bộ truyện của tác giả ${authorName} tại Truyện Chom. Tìm những tác phẩm mới nhất và thú vị nhất.`} />
//         <meta property="og:title" content={`${authorName} - Truyện Chom`} />
//         <meta property="og:description" content={`Khám phá những bộ truyện của tác giả ${authorName} tại Truyện Chom. Tìm những tác phẩm mới nhất và thú vị nhất.`} />
//         <meta property="og:image" content="https://truyenplus.vn/path-to-image.jpg" />
//         <meta property="og:url" content={`https://truyenplus.vn/author/${slug}`} />
//         <meta name="robots" content="index, follow" />
//       </Head>

//       <Navbar />
//       <p className="bg-gray-100 py-2 border-t border-gray-400 border-b pl-4 sm:pl-14 text-center sm:text-left">
//         Truyện Chom / {authorName} / Trang {currentPage}
//       </p>

//       <div className="container mx-auto min-h-screen flex flex-col p-4">
//         <div className="ml-4 sm:ml-10 mt-3 mb-3">
//           <span className={styles.authorName}>TÁC GIẢ: <span className="font-bold">{authorName}</span></span>
//         </div>
//         <hr className="ml-4 sm:ml-10" />
//         <p className="ml-4 sm:ml-10 my-3 text-center sm:text-left">
//           Tổng hợp truyện của tác giả {authorName} mới nhất trên Truyện Chom.
//         </p>

//         <div className="font-sans bg-gray-100 ml-9">
//           <div className="backgroundBody bg-gray-100 py-5 px-4 sm:px-5">
//             {books.length > 0 ? (
//               books.map((book, index) => (
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 mb-5" key={index}>
//                   <div className="col-span-1 sm:col-span-3">
//                     <Image
//                       src={"https://truyenplus.vn/media/book/do-thi-tu-chan-y-thanh.jpeg"}
//                       alt={book.story_name}
//                       width={300}
//                       height={150}
//                       className="w-full"
//                     />
//                   </div>
//                   <div className="col-span-1 sm:col-span-9">
//                   {/* sang trang chi tiết truyện */}
//                     <Link href={`/story/${book.story_slug}`} className={styles.hoverNameTitle}>{book.story_name}</Link>
//                     <br />
//                      {/* sang trang tác giả */}
//                     <span>Tác giả:</span>
//                     <Link className={styles.hoverName} href={`/author/${author.slug}`}>{authorName}</Link>
//                     <br />
//                     <span>Thể Loại:</span>
//                     {book.genres.length > 0 ? (
//                       book.genres.map((genre, idx) => (
//                         <Link key={idx} href={`/genre/${genre.genre_slug}`} className={styles.hoverName}>
//                           {genre.genre_name}
//                         </Link>
//                       ))
//                     ) : (
//                       <span>Chưa có thể loại</span>
//                     )}
//                     <br />
//                     <span>Số chương:</span>
//                     <Link href={`/story/${book.story_slug}`}>{book.total_chapters}</Link>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <div>Không có câu chuyện nào của tác giả này.</div>
//             )}
//             {/* <Pagination currentPage={currentPage} totalPages={2} /> */}
//             <Pagination currentPage={currentPage} totalPages={totalPages} />
//           </div>
//         </div>
//       </div>
//         {/* Footer */}
//        <footer className="bg-gray-100 p-4 grid grid-cols-1 sm:grid-cols-2 mt-5 pl-4 sm:pl-14 ml-12">
//          <div className="mb-4 sm:mb-0">
//            Truyện Plus – Trang đọc truyện online, thường xuyên cập nhật những bộ truyện hay nhất thuộc các thể loại đặc sắc như: action , adventure , romance…
//            <br />
//            Mọi vấn đề vi phạm bản quyền vui lòng liên hệ qua email: <span className={styles.textFoot}>truyenchomonline@gmail.com</span>
//          </div>
//          <div>
//            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
//              <CustomButton href="/some-page" title="" text="Action" />
//              <CustomButton href="/some-page" title="" text="Adventure" />
//              <CustomButton href="/some-page" title="" text="Romance" />
//              <CustomButton href="/some-page" title="" text="Fantasy" />
//            </div>
//            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-2">
//              <CustomButton href="/some-page" title="" text="Horror" />
//            </div>

//            <div className={styles.contact}>
//              <a href="/contact" title="Contact">Contact</a>
//              <span>-</span>
//              <a href="/tos" title="Terms of Service">ToS</a>
//              <a className="backtop" title="Trở lên đầu trang" href="#" rel="nofollow" aria-label="Trở về đầu trang">⬆</a>
//            </div>
//          </div>
//       </footer>
//     </div>
//   );
// };
'use client'
import { useParams } from 'next/navigation'
// import GenreDropdown from './components/GenreDropdown';
import Image from 'next/image'
// import Image from './';
import Link from 'next/link'
// import GenreDropdown from '@/app/(routes)/_component/GenreDropdown';
import Pagination from '@/app/(routes)/_component/Pagination'
// import styles from '@/app/(routes)/_component/GenreDropdown.module.css';
import NavbarComponent from '../../../../components/navbar'
import styles from '../../_component/GenreDropdown.module.css'
import Footer from '../../_component/footer'

const AuthorPage = () => {
  const { slug } = useParams() // Lấy slug từ URL
  //   const { slug } = useParams(); // Lấy slug từ URL
  const currentPage = 1 // Bạn có thể thay thế bằng giá trị thực tế từ props hoặc query
  const totalPages = 5 // Số trang tối đa

  // Bạn có thể thay đổi cách lấy thông tin tác giả dựa trên slug
  const authors = {
    'quan-hu': {
      name: 'Quan Hư',
      bio: 'Thông tin về tác giả Quan Hư.',
      // Thêm thông tin khác nếu cần
    },
    'hach-dong-luc-chien-liet-ham': {
      name: 'Hạch Động Lực Chiến Liệt Hạm',
      bio: 'Thông tin về tác giả Hạch Động Lực Chiến Liệt Hạm.',
      // Thêm thông tin khác nếu cần
    },
  }

  const author = authors[slug]

  if (!author) {
    return <div>Tác giả không tồn tại.</div>
  }

  return (
    <div>
      <NavbarComponent></NavbarComponent>
      {/* Thêm thông tin khác về tác giả */}
      <div className="">
        <div className=" justify-center items-center">
          {/* <GenreDropdown /> */}

          <p className="bg-gray-100 py-2 border-t border-gray-400 border-b pl-14">
            Truyện plus / {author.name} / Trang 1
          </p>

          <div className="container min-h-screen  flex flex-col  mx-auto p-4 ">
            <div className="ml-10 mt-3 mb-3">
              <span className={styles.authorName}>
                TÁC GIẢ : <span className="font-bold"> {author.name}</span>{' '}
              </span>
            </div>
            <hr className="ml-10" />
            <p className="ml-10 my-3">
              {' '}
              Tổng hợp truyện của tác giả {author.name} mới nhất trên Truyện
              Chom.
            </p>
            <div className="backgroundBody bg-gray-100 py-5 px-5 ml-10">
              <div className="grid grid-cols-12 gap-4 mb-4">
                <div className="col-span-3">
                  <Image
                    src="https://truyenplus.vn/media/book/tran-hoi-truong-sinh.jpeg"
                    alt="Mô tả hình ảnh"
                    width={300}
                    height={150}
                  />
                </div>
                <div className="col-span-9">
                  <Link
                    className="font-bold "
                    href={''}
                  >
                    Trận Hỏi Trường Sinh
                  </Link>
                  <br />
                  <span>Tác giả:</span>
                  <Link href="/author/quan-hu">Quan Hư</Link>
                  <br />
                  <span>Thể Loại:</span>
                  <Link href={''}>
                    Tiên Hiệp , Ngôn Tình , Huyền Huyễn, Khác
                  </Link>
                  <br />
                  <span>Số chương:</span>
                  <Link href={''}>205</Link>
                </div>
              </div>

              <div className="grid grid-cols-12 gap-4 mb-5">
                <div className="col-span-3">
                  <Image
                    src="https://truyenplus.vn/media/book/xuat-lung-ky.jpeg"
                    alt="Mô tả hình ảnh"
                    width={300}
                    height={150}
                  />
                </div>
                <div className="col-span-9">
                  <Link
                    href={''}
                    className="font-bold"
                  >
                    Xuất Lung Ký
                  </Link>
                  <br />
                  <span>Tác giả:</span>
                  <Link href="/author/hach-dong-luc-chien-liet-ham">
                    Hạch Động Lực Chiến Liệt Hạm
                  </Link>
                  <br />
                  <span>Thể Loại:</span>
                  <Link href={''}>
                    Tiên Hiệp , Võng Du , Khoa Huyễn , Dã Sử , Hệ Thống , Khác
                  </Link>
                  <br />
                  <span>Số chương:</span>
                  <Link href={''}>1484</Link>
                </div>
              </div>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
              />
            </div>
          </div>
        </div>
      </div>

      <Footer></Footer>
    </div>
  )
}

export default AuthorPage
