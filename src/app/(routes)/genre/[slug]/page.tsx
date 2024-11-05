
"use client"; // Chạy trên client
// /author/quan-hu
// "use client";
// image ,button,form ở flowbite,react icon 
import { useParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/app/(routes)/_component/Navbar';
import Pagination from '@/app/(routes)/_component/Pagination';
import CustomButton from '@/app/(routes)/_component/CustomButton';
import styles from '../../_component/GenreDropdown.module.css';

const genres = [
  { id: 1, name: 'Tiên Hiệp', slug: 'tien-hiep' },
  { id: 2, name: 'Kiếm Hiệp', slug: 'kiem-hiep' },
  { id: 3, name: 'Ngôn Tình', slug: 'ngon-tinh' },
  { id: 4, name: 'Quân Sự', slug: 'quan-su' },
  { id: 5, name: 'Lịch Sử', slug: 'lich-su' },
  { id: 6, name: 'Trinh Thám', slug: 'trinh-tham' },
];

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
};

const GenrePage = () => {
  const { slug } = useParams();
  const genre = genres.find((g) => g.slug === slug);
  const currentPage = 1;
  const totalPages = 5;

  if (!genre) {
    return <div>Thể loại không tồn tại</div>;
  }

  const books = booksData[genre.slug] || [];

  return (
    <div className="">
      <Navbar />
      <p className="bg-gray-100 py-2 border-t border-gray-400 border-b pl-14">Truyện plus / {genre.name} / Trang 1</p>
      <div className='ml-14 mt-8 mb-4'>

        <span className='font-bold'> Truyện <span className='font-bold'>{genre.name}</span></span>
      </div>
      <hr className='ml-14' />
      <p className='ml-14 my-3'>{`Truyện ${genre.name} thường kể về quá trình tu luyện và khám phá thế giới tu sĩ thần tiên đầy bí ẩn của nhân vật chính.`}</p>
      <div className="background-body bg-gray-100 py-5 px-5 ml-14 ">
        <div className="container">
          {books.map((book, index) => (
            <div className="grid grid-cols-12 gap-4 mb-4" key={index}>
              <div className="col-span-3">
                <Image src={book.img} alt={book.title} width={300} height={150} />
              </div>
              <div className="col-span-9">
                <Link href="" className={styles.hoverNameTitle}>{book.title}</Link>
                <br />
                <span>Tác giả:</span> <Link className={styles.hoverName} href={`/author/${book.slug}`}>{book.author}</Link>
                <br />
                <span>Thể Loại:</span> <Link href="">{book.genres}</Link>
                <br />
                <span>Số chương:</span> <Link href="">{book.chapters}</Link>
              </div>
            </div>
          ))}
          <Pagination currentPage={currentPage} totalPages={totalPages} />
        </div>
      </div>
      <footer className="bg-gray-100 p-4 grid grid-cols-2 mt-5 pl-14">
        <div >
          Truyện Plus – Trang đọc truyện online, thường xuyên cập nhật những bộ truyện hay nhất thuộc các thể loại đặc sắc như: truyện ngôn tình, truyện tiên hiệp, truyện kiếm hiệp, truyện đam mỹ, light novel…
          <br />
          Mọi vấn đề vi phạm bản quyền vui lòng liên hệ qua email: <span className={styles.textFoot}>truyenchomonline@gmail.com</span>
        </div>
        <div>
          <div className="grid grid-cols-4 gap-1"> {/* Giảm khoảng cách giữa các button */}
            {/* Hàng 1 */}
            <CustomButton href="/some-page" title="Go to some page" text="Truyện Full" />
            <CustomButton href="/some-page" title="Go to some page" text="Truyện Hot" />
            <CustomButton href="/some-page" title="Go to some page" text="Ngôn Tình Hay" />
            <CustomButton href="/some-page" title="Go to some page" text="Ngôn Tình Hài" />

            {/* Hàng 2 */}
            <CustomButton href="/some-page" title="Go to some page" text="Ngôn Tình Hài" />
            <CustomButton href="/some-page" title="Go to some page" text="Ngôn Tình Hài" />
            <CustomButton href="/some-page" title="Go to some page" text="Ngôn Tình Hài" />
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

export default GenrePage;
