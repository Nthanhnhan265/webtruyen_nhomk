"use client"; // Đảm bảo chạy trên client
import { useParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/app/(routes)/_component/Navbar';
import Pagination from '@/app/(routes)/_component/Pagination';
import CustomButton from '@/app/(routes)/_component/CustomButton';
import styles from '../../_component/GenreDropdown.module.css';

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
        const res = await fetch(`http://localhost:5000/api/genre/${slug}`);
        const data = await res.json();

        // Kiểm tra và đảm bảo data là một mảng
        if (Array.isArray(data)) {
          setBooks(data); // Nếu data là mảng, đặt books = data
        } else if (data.data && Array.isArray(data.data)) {
          // Nếu API trả về đối tượng chứa mảng trong trường `data`
          setBooks(data.data);
        } else {
          setBooks([]); // Nếu không có mảng dữ liệu, đặt books là mảng rỗng
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

  return (
    <div>
      <Navbar />
      {books.length === 0 ? (
        <p>Không có truyện nào trong thể loại này.</p>
      ) : (
        books.map((book, index) => (
                
      <p className="bg-gray-100 py-2 border-t border-gray-400 border-b pl-4 sm:pl-14 text-center sm:text-left">
        Truyện plus / {book.genre_name} / Trang 1
      </p>
        ))
      )}
       {books.length === 0 ? (
        <p>Không có truyện nào trong thể loại này.</p>
      ) : (
        books.map((book, index) => (
                
   
      <div className="ml-4 sm:ml-14 mt-8 mb-4">
        <span className="font-bold">Truyện thể loại <span className="font-bold">{book.genre_name}</span></span>
      </div>
        ))
      )}
            <hr className="ml-4 sm:ml-14" />
        {books.length === 0 ? (
        <p>Không có truyện nào trong thể loại này.</p>
      ) : (
        books.map((book, index) => (
                
   
      
      <p className="ml-4 sm:ml-14 my-3 text-center sm:text-left">

        {book.description}
      </p>
        ))
      )}

      <div className="font-sans bg-gray-100 ml-14">
        <div className="background-body bg-gray-100 py-5 px-4 sm:px-5 ml-8">
          <div className="container mx-auto">
            {books.length === 0 ? (
              <p>Không có truyện nào trong thể loại này.</p>
            ) : (
              books.map((book, index) => (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 mb-4" key={index}>
                  <div className="col-span-1 sm:col-span-3">
                    <Image
                      src="https://truyenplus.vn/media/book/tran-hoi-truong-sinh.jpeg"
                      alt={book.story_name}
                      width={300}
                      height={150}
                      className="w-full"
                    />
                  </div>
                  <div className="col-span-1 sm:col-span-9">
                    <Link href={`/story/${book.story_slug}`} className={styles.hoverNameTitle}>
                      {book.story_name}
                    </Link>
                    <br />
                    <span>Tác giả:</span>
                    <Link className={styles.hoverName} href={`/author/${book.author_slug}`}>
                      {book.author_name}
                    </Link>
                    <br />
                    <span>Thể loại:</span> <Link href={`/genre/${slug}`}>{book.genre_name}</Link>
                    <br />
                    <span>Số chương:</span><Link href={`/story/${book.story_slug}`}>{book.total_chapters}</Link>
                  </div>
                </div>
              ))
            )}
          </div>
          <Pagination currentPage={currentPage} totalPages={totalPages} />
        </div>
      </div>
      <footer className="bg-gray-100 p-4 grid grid-cols-1 sm:grid-cols-2 mt-5 pl-4 sm:pl-14 ml-14">
        <div className="mb-4 sm:mb-0">
          Truyện Plus – Trang đọc truyện online, thường xuyên cập nhật những bộ truyện hay nhất thuộc các thể loại đặc sắc như: truyện ngôn tình, truyện tiên hiệp, truyện kiếm hiệp, truyện đam mỹ, light novel…
          <br />
          Mọi vấn đề vi phạm bản quyền vui lòng liên hệ qua email: <span className={styles.textFoot}>truyenchomonline@gmail.com</span>
        </div>
        <div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2"> {/* Cải thiện khoảng cách và bố cục */}
            <CustomButton href="/some-page" title="Go to some page" text="Action" />
            <CustomButton href="/some-page" title="Go to some page" text="Adventure" />
            <CustomButton href="/some-page" title="Go to some page" text="Romance" />
            <CustomButton href="/some-page" title="Go to some page" text="Fantansy" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-2"> {/* Cải thiện khoảng cách và bố cục */}
            <CustomButton href="/some-page" title="Go to some page" text="Horror" />
            {/* <CustomButton href="/some-page" title="Go to some page" text="Truyện Hot" />
            <CustomButton href="/some-page" title="Go to some page" text="Ngôn Tình Hay" />
            <CustomButton href="/some-page" title="Go to some page" text="Ngôn Tình Hài" /> */}
          </div>

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
