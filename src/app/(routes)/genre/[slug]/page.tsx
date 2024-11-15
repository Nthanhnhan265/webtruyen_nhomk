"use client"; // Đảm bảo chạy trên client
import { useParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/app/(routes)/_component/Navbar';
import Pagination from '@/app/(routes)/_component/Pagination';
import CustomButton from '@/app/(routes)/_component/CustomButton';
import styles from '../../_component/GenreDropdown.module.css';
import Head from 'next/head';  // Thêm Head component để quản lý SEO

const GenrePage = () => {
  const { slug } = useParams(); // Lấy slug thể loại từ URL

  const [books, setBooks] = useState<any[]>([]); // Khởi tạo books là một mảng
  const [loading, setLoading] = useState(true);
  const currentPage = 1;
  const totalPages = 5;

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        // Gọi API để lấy danh sách truyện của thể loại này
        const res = await fetch(`http://localhost:3000/api/story/genre/${slug}`);

        if (!res.ok) {
          throw new Error("Không thể tải dữ liệu từ API.");
        }

        const data = await res.json();
        console.log("Dữ liệu nhận được từ API(danh sách truyện theo thể loại):", data);
        // Kiểm tra và đảm bảo data có trường `stories` là mảng
        if (data && data.stories && Array.isArray(data.stories)) {
          setBooks(data.stories);
        } else {
          setBooks([]); // Nếu không có truyện, đặt books là mảng rỗng
        }
      } catch (err) {
        console.error("Lỗi khi tải dữ liệu:", err);
        setBooks([]); // Đặt books là mảng rỗng trong trường hợp lỗi
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchBooks();
    }
  }, [slug]);

  if (loading) {
    return <div>Đang tải dữ liệu...</div>;
  }

  if (books.length === 0) {
    return (
      <div>
        <Navbar />
        <p>Không có truyện nào trong thể loại này.</p>
      </div>
    );
  }

  // Lấy tên thể loại để cập nhật SEO
  const genreName = books[0]?.genres[0]?.genre_name || "Thể loại không xác định";

  return (
    <div>
      {/* SEO phần đầu trang */}
      <Head>
        <title>{`Truyện Plus - ${genreName} - Danh sách truyện`}</title>
        <meta name="description" content={`Xem các truyện ${genreName} hay nhất trên Truyện Plus`} />
        <meta property="og:title" content={`Truyện Plus - ${genreName} - Danh sách truyện`} />
        <meta property="og:description" content={`Xem các truyện ${genreName} hay nhất trên Truyện Plus`} />
        <meta property="og:image" content="https://truyenplus.vn/path-to-image.jpg" />
        <meta property="og:url" content={`https://truyenplus.vn/genre/${slug}`} />
        <meta name="robots" content="index, follow" />
      </Head>

      <Navbar />
      <div>
        {books.map((book, index) => (
          <p key={index} className="bg-gray-100 py-2 border-t border-gray-400 border-b pl-4 sm:pl-14 text-center sm:text-left">
            Truyện plus {book.genres[0].genre_name} / Trang 1
          </p>
        ))}

        {books.map((book, index) => (
          <div key={index} className="ml-4 sm:ml-14 mt-8 mb-4">
            <span className="font-bold">Truyện thể loại <span className="font-bold">{book.genres[0].genre_name}</span></span>
          </div>
        ))}

        <hr className="ml-4 sm:ml-14" />

        {books.map((book, index) => (
          <p key={index} className="ml-4 sm:ml-14 my-3 text-center sm:text-left">
            {book.description}
          </p>
        ))}

        <div className="font-sans bg-gray-100 ml-14">
          <div className="background-body bg-gray-100 py-5 px-4 sm:px-5 ml-8">
            <div className="container mx-auto">
              {books.map((book, index) => (
                <div key={index} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 mb-4">
                  <div className="col-span-1 sm:col-span-3">
                    <Image
                      src={book.cover_url || "https://truyenplus.vn/media/book/do-thi-tu-chan-y-thanh.jpeg"} // Thêm ảnh cover thực tế
                      alt={book.story_name}
                      width={300}
                      height={150}
                      className="w-full"
                    />
                  </div>
                  <div className="col-span-1 sm:col-span-9">
                    <Link href={`/story/${book.slug}`} className={styles.hoverNameTitle}>
                      {book.story_name}
                    </Link>
                    <br />
                    <span>Tác giả:</span>
                    <Link className={styles.hoverName} href={`/author/${book.author.slug}`}>
                      {book.author.author_name}
                    </Link>
                    <br />
                    <span>Thể loại:</span> <Link href={`/genre/${slug}`}>{book.genres[0].genre_name}</Link>
                    <br />
                    <span>Số chương:</span><Link href={`/story/${book.slug}`}>{book.total_chapters}</Link>
                  </div>
                </div>
              ))}
            </div>
            <Pagination currentPage={currentPage} totalPages={totalPages} />
          </div>
        </div>
      </div>

      {/* Footer với SEO cải tiến */}
      <footer className="bg-gray-100 p-4 grid grid-cols-1 sm:grid-cols-2 mt-5 pl-4 sm:pl-14 ml-14">
        <div className="mb-4 sm:mb-0">
          Truyện Plus – Trang đọc truyện online, thường xuyên cập nhật những bộ truyện hay nhất thuộc các thể loại đặc sắc như: truyện ngôn tình, truyện tiên hiệp, truyện kiếm hiệp, truyện đam mỹ, light novel…
          <br />
          Mọi vấn đề vi phạm bản quyền vui lòng liên hệ qua email: <span className={styles.textFoot}>truyenchomonline@gmail.com</span>
        </div>
        <div>
        
        {books.map((book, index) => (
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 ">
                  <CustomButton href={`/genre/${book.genres[0].slug}`} title="Go to top page" text="Action" />
                  <CustomButton href={`/genre/${book.genres[0].slug}`} title="Go to top page" text="Adventure" />
                  <CustomButton href={`/genre/${book.genres[0].slug}`} title="Go to top page" text="Romance" />
                  <CustomButton href={`/genre/${book.genres[0].slug}`} title="Go to top page" text="Fantansy" />
                </div>
                    ))}
              {books.map((book, index) => (
                      
              
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-2">
                  <CustomButton href={`/genre/${book.genres[0].slug}`} title="Go to top page" text="Horror" />
                </div>
                    ))}
          <div className={styles.contact}>
            <a href="/contact" title="Contact">Contact</a>
            <span>-</span>
            <a href="/tos" title="Terms of Service">ToS</a>
            <a className="backtop" title="Trở lên đầu trang" href="#" rel="nofollow" aria-label="Trở về đầu trang">⬆</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default GenrePage;

