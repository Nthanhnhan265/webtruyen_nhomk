
"use client"; // Chạy trên client

import { useParams } from 'next/navigation'; // Sử dụng hook lấy tham số động
import React from 'react';
// import GenreDropdown from './components/GenreDropdown';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
// import Image from './';
import { useState, useEffect } from 'react';
import Link from 'next/link';
// import GenreDropdown from '@/app/(routes)/_component/GenreDropdown';
import Navbar from '@/app/(routes)/_component/Navbar';
import Pagination from '@/app/(routes)/_component/Pagination';
import CustomButton from '@/app/(routes)/_component/CustomButton';

const genres = [
  { id: 1, name: 'Tiên Hiệp', slug: 'tien-hiep' },
  { id: 2, name: 'Kiếm Hiệp', slug: 'kiem-hiep' },
  { id: 3, name: 'Ngôn Tình', slug: 'ngon-tinh' },
  { id: 4, name: 'Quân Sự', slug: 'quan-su' },
  { id: 5, name: 'Lịch Sử', slug: 'lich-su' },
  { id: 6, name: 'Trinh Thám', slug: 'trinh-tham' },
];

const GenrePage = () => {
  const { slug } = useParams(); // Lấy slug từ URL
  const currentPage = 1; // Bạn có thể thay thế bằng giá trị thực tế từ props hoặc query
  const totalPages = 5; // Số trang tối đa
  const [genre, setGenre] = useState(null);

  useEffect(() => {
    if (slug) {
      const foundGenre = genres.find((g) => g.slug === slug);
      setGenre(foundGenre);
    }
  }, [slug]);

  // Nếu slug không khớp với thể loại nào
  if (!genre) {
    return <div>Thể loại không tồn tại</div>;
  }
  if (genre.slug == 'tien-hiep') {

    return (
      <div className="min-h-screen flex flex-col container mx-auto p-4">
        <div className="flex-grow justify-center items-center">
          <Navbar />
          {/* <GenreDropdown /> */}
         
          <p className="nav">Truyện plus / {genre.name} / Trang 1</p>
  
          <h2>{genre.name}</h2>
          <hr />
          <p>Truyện tiên hiệp thường kể về quá trình tu luyện và khám phá thế giới tu sĩ thần tiên đầy bí ẩn của nhân vật chính.</p>
  
          <div className="background-body">
            <div className="container">
              <div className="grid grid-cols-12 gap-4 mb-4">
                <div className="col-span-3">
                  <Image src="https://truyenplus.vn/media/book/tran-hoi-truong-sinh.jpeg" alt="Mô tả hình ảnh" width={300} height={150} />
                </div>
                <div className="col-span-9">
                  <Link href={''}>Trận Hỏi Trường Sinh</Link>
                  <br />
                  <span>Tác giả:</span><Link href={''}>Quan Hư</Link>
                  <br />
                  <span>Thể Loại:</span><Link href={''}>Tiên Hiệp , Ngôn Tình , Huyền Huyễn, Khác</Link>
                  <br />
                  <span>Số chương:</span><Link href={''}>205</Link>
                </div>
              </div>
  
              <div className="grid grid-cols-12 gap-4 mb-5">
                <div className="col-span-3">
                  <Image src="https://truyenplus.vn/media/book/xuat-lung-ky.jpeg" alt="Mô tả hình ảnh" width={300} height={150} />
                </div>
                <div className="col-span-9">
                  <Link href={''}>Xuất Lung Ký</Link>
                  <br />
                  <span>Tác giả:</span><Link href={''}>Hạch Động Lực Chiến Liệt Hạm</Link>
                  <br />
                  <span>Thể Loại:</span><Link href={''}>Tiên Hiệp , Võng Du , Khoa Huyễn , Dã Sử , Hệ Thống , Khác</Link>
                  <br />
                  <span>Số chương:</span><Link href={''}>1484</Link>
                </div>
              </div>
            </div>
          </div>
          <Pagination currentPage={currentPage} totalPages={totalPages} />
        </div>
  
        {/* Footer */}
        <footer className="bg-gray-100 p-4 grid grid-cols-2 mt-5">
          <div>
            Truyện Plus – Trang đọc truyện online, thường xuyên cập nhật những bộ truyện hay nhất thuộc các thể loại đặc sắc như: truyện ngôn tình, truyện tiên hiệp, truyện kiếm hiệp, truyện đam mỹ, light novel…
            <br />
            Mọi vấn đề vi phạm bản quyền vui lòng liên hệ qua email: truyenplusonline@gmail.com
          </div>
          <div> 
        <CustomButton title="Nhấn vào đây" link="/link-page" />
      </div>
        </footer>
      </div>
    );
  }

  // https://truyenplus.vn/media/book/lang-thien-kiem-than.jpg
  // https://truyenplus.vn/media/book/dai-su-huynh-khong-co-gi-la-khong-co-gi-la-dai-su-huynh.jpg
  if (genre.slug == 'kiem-hiep') {
    return (
      <div className="min-h-screen flex flex-col container mx-auto p-4">
        <div className="flex-grow justify-center items-center">
          <Navbar />
          {/* <GenreDropdown /> */}
         
          <p className="nav">Truyện plus / {genre.name} / Trang 1</p>
  
          <h2>{genre.name}</h2>
          <hr />
          <p>Truyện tiên hiệp thường kể về quá trình tu luyện và khám phá thế giới tu sĩ thần tiên đầy bí ẩn của nhân vật chính.</p>
  
          <div className="background-body">
            <div className="container">
              <div className="grid grid-cols-12 gap-4 mb-4">
                <div className="col-span-3">
                  <Image src="https://truyenplus.vn/media/book/lang-thien-kiem-than.jpg" alt="Mô tả hình ảnh" width={300} height={150} />
                </div>
                <div className="col-span-9">
                  <Link href={''}>Trận Hỏi Trường Sinh</Link>
                  <br />
                  <span>Tác giả:</span><Link href={''}>Quan Hư</Link>
                  <br />
                  <span>Thể Loại:</span><Link href={''}>Tiên Hiệp , Ngôn Tình , Huyền Huyễn, Khác</Link>
                  <br />
                  <span>Số chương:</span><Link href={''}>205</Link>
                </div>
              </div>
  
              <div className="grid grid-cols-12 gap-4 mb-5">
                <div className="col-span-3">
                  <Image src=" https://truyenplus.vn/media/book/dai-su-huynh-khong-co-gi-la-khong-co-gi-la-dai-su-huynh.jpg" alt="Mô tả hình ảnh" width={300} height={150} />
                </div>
                <div className="col-span-9">
                  <Link href={''}>Xuất Lung Ký</Link>
                  <br />
                  <span>Tác giả:</span><Link href={''}>Hạch Động Lực Chiến Liệt Hạm</Link>
                  <br />
                  <span>Thể Loại:</span><Link href={''}>Tiên Hiệp , Võng Du , Khoa Huyễn , Dã Sử , Hệ Thống , Khác</Link>
                  <br />
                  <span>Số chương:</span><Link href={''}>1484</Link>
                </div>
              </div>
            </div>
          </div>
          <Pagination  currentPage={currentPage} totalPages={totalPages} />
        </div>
  
        {/* Footer */}
        <footer className="bg-gray-100 p-4 grid grid-cols-2 mt-5">
          <div>
            Truyện Plus – Trang đọc truyện online, thường xuyên cập nhật những bộ truyện hay nhất thuộc các thể loại đặc sắc như: truyện ngôn tình, truyện tiên hiệp, truyện kiếm hiệp, truyện đam mỹ, light novel…
            <br />
            Mọi vấn đề vi phạm bản quyền vui lòng liên hệ qua email: truyenplusonline@gmail.com
          </div>
          <div> 
        <CustomButton title="Nhấn vào đây" link="/link-page" />
      </div>
        </footer>
      </div>
    );
  }

};

export default GenrePage;
