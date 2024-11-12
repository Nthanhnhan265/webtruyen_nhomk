"use client";

import { useParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/app/(routes)/_component/Navbar';
import Pagination from '@/app/(routes)/_component/Pagination';
import CustomButton from '@/app/(routes)/_component/CustomButton';
import styles from '../../_component/GenreDropdown.module.css';

const AuthorPage = () => {
  const { slug } = useParams(); // Lấy slug từ URL
  const currentPage = 1; // Bạn có thể thay thế bằng giá trị thực tế từ props hoặc query
  const totalPages = 5; // Số trang tối đa
  const [author, setAuthor] = useState<any>(null); // Thông tin tác giả
  const [books, setBooks] = useState<any[]>([]); // Sách của tác giả
  const [loading, setLoading] = useState<boolean>(true); // Trạng thái loading

  useEffect(() => {
    const fetchAuthorData = async () => {
      try {
        setLoading(true);
        const res = await fetch(`http://localhost:5000/api/author/${slug}`);
        const data = await res.json();

        if (data.author && data.books) {
          setAuthor(data.author);
          setBooks(data.books);
        } else {
          console.error('Không tìm thấy tác giả.');
        }
      } catch (err) {
        console.error("Lỗi khi tải dữ liệu:", err);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchAuthorData();
    }
  }, [slug]);

  if (loading) {
    return <div>Đang tải dữ liệu...</div>;
  }

  if (!author) {
    return <div>Tác giả không tồn tại.</div>;
  }

  return (
    <div>
      <Navbar />
      <p className="bg-gray-100 py-2 border-t border-gray-400 border-b pl-4 sm:pl-14 text-center sm:text-left">
        Truyện plus / {author.author_name} / Trang 1
      </p>

      <div className="container mx-auto min-h-screen flex flex-col p-4">
        <div className="ml-4 sm:ml-10 mt-3 mb-3">
          <span className={styles.authorName}>TÁC GIẢ: <span className="font-bold">{author.author_name}</span></span>
        </div>
        <hr className="ml-4 sm:ml-10" />
        <p className="ml-4 sm:ml-10 my-3 text-center sm:text-left">
          Tổng hợp truyện của tác giả {author.author_name} mới nhất trên Truyện Chom.
        </p>

        <div className="font-sans bg-gray-100 ml-9">
          <div className="backgroundBody bg-gray-100 py-5 px-4 sm:px-5">
            {books.map((book, index) => (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 mb-5" key={index}>
                <div className="col-span-1 sm:col-span-3">
                  <Image
                    // src={book.cover || '/default-cover.jpg'}
                  src=  "https://truyenplus.vn/media/book/tran-hoi-truong-sinh.jpeg"
                    alt={book.story_name}
                    width={300}
                    height={150}
                    className="w-full"
                  />
                </div>
                <div className="col-span-1 sm:col-span-9">
                  <Link href={`/story/${book.story_slug}`} className="font-bold">{book.story_name}</Link>
                  <br />
                  <span>Tác giả:</span><Link href={`/author/${author.author_slug}`}>{author.author_name}</Link>
                  <br />
                  <span>Thể Loại:</span><Link href={`/genre/${book.genre_slug}`}>{book.genre_name}</Link>
                  <br />
                  <span>Số chương:</span><Link href={`/story/${book.story_slug}`}>{book.total_chapters}</Link>
                </div>
              </div>
            ))}
            <Pagination currentPage={currentPage} totalPages={totalPages} />
          </div>
        </div>
      </div>

      <footer className="bg-gray-100 p-4 grid grid-cols-1 sm:grid-cols-2 mt-5 pl-4 sm:pl-14 ml-12">
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

export default AuthorPage;
