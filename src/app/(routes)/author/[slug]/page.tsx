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
  const [genre, setGenre] = useState(null);

  // Bạn có thể thay đổi cách lấy thông tin tác giả dựa trên slug
  const authors = {
    'quan-hu': {
      name: 'Quan Hư',
      bio: 'Thông tin về tác giả Quan Hư.',
    },
    'hach-dong-luc-chien-liet-ham': {
      name: 'Hạch Động Lực Chiến Liệt Hạm',
      bio: 'Thông tin về tác giả Hạch Động Lực Chiến Liệt Hạm.',
    },
  };

  const author = authors[slug];

  if (!author) {
    return <div>Tác giả không tồn tại.</div>;
  }

  return (
    <div className="font-sans bg-gray-100">
      <Navbar />
      <p className="bg-gray-100 py-2 border-t border-gray-400 border-b pl-4 sm:pl-14 text-center sm:text-left">
        Truyện plus / {author.name} / Trang 1
      </p>

      <div className="container mx-auto min-h-screen flex flex-col p-4">
        <div className='ml-4 sm:ml-10 mt-3 mb-3'>
          <span className={styles.authorName}>TÁC GIẢ : <span className='font-bold'> {author.name}</span> </span>
        </div>
        <hr className='ml-4 sm:ml-10' />
        <p className='ml-4 sm:ml-10 my-3 text-center sm:text-left'>
          Tổng hợp truyện của tác giả {author.name} mới nhất trên Truyện Chom.
        </p>

        <div className="backgroundBody bg-gray-100 py-5 px-4 sm:px-5">
          {/* Danh sách sách */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 mb-4">
            <div className="col-span-1 sm:col-span-3">
              <Image src="https://truyenplus.vn/media/book/tran-hoi-truong-sinh.jpeg" alt="Trận Hỏi Trường Sinh" width={300} height={150} className="w-full" />
            </div>
            <div className="col-span-1 sm:col-span-9">
              <Link href={''} className="font-bold">Trận Hỏi Trường Sinh</Link>
              <br />
              <span>Tác giả:</span><Link href="/author/quan-hu">Quan Hư</Link>
              <br />
              <span>Thể Loại:</span><Link href={''}>Tiên Hiệp , Ngôn Tình , Huyền Huyễn, Khác</Link>
              <br />
              <span>Số chương:</span><Link href={''}>205</Link>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 mb-5">
            <div className="col-span-1 sm:col-span-3">
              <Image src="https://truyenplus.vn/media/book/xuat-lung-ky.jpeg" alt="Xuất Lung Ký" width={300} height={150} className="w-full" />
            </div>
            <div className="col-span-1 sm:col-span-9">
              <Link href={''} className="font-bold">Xuất Lung Ký</Link>
              <br />
              <span>Tác giả:</span><Link href="/author/hach-dong-luc-chien-liet-ham">Hạch Động Lực Chiến Liệt Hạm</Link>
              <br />
              <span>Thể Loại:</span><Link href={''}>Tiên Hiệp , Võng Du , Khoa Huyễn , Dã Sử , Hệ Thống , Khác</Link>
              <br />
              <span>Số chương:</span><Link href={''}>1484</Link>
            </div>
          </div>
          <Pagination currentPage={currentPage} totalPages={totalPages} />
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-100 p-4 grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5 pl-4 sm:pl-14">
        <div>
          Truyện Plus – Trang đọc truyện online, thường xuyên cập nhật những bộ truyện hay nhất thuộc các thể loại đặc sắc như: truyện ngôn tình, truyện tiên hiệp, truyện kiếm hiệp, truyện đam mỹ, light novel…
          <br />
          Mọi vấn đề vi phạm bản quyền vui lòng liên hệ qua email: <span className={styles.textFoot}>truyenplusonline@gmail.com</span>
        </div>
        <div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2"> {/* Đổi thành 2 cột cho mobile và 4 cột cho màn hình lớn */}
            <CustomButton href="/some-page" title="Go to some page" text="Truyện Full" />
            <CustomButton href="/some-page" title="Go to some page" text="Truyện Hot" />
            <CustomButton href="/some-page" title="Go to some page" text="Ngôn Tình Hay" />
            <CustomButton href="/some-page" title="Go to some page" text="Ngôn Tình Hài" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-2"> {/* Đổi thành 2 cột cho mobile và 4 cột cho màn hình lớn */}
            <CustomButton href="/some-page" title="Go to some page" text="Truyện Full" />
            <CustomButton href="/some-page" title="Go to some page" text="Truyện Hot" />
            <CustomButton href="/some-page" title="Go to some page" text="Ngôn Tình Hay" />
            <CustomButton href="/some-page" title="Go to some page" text="Ngôn Tình Hài" />
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
