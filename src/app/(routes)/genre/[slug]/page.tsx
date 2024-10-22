
"use client"; // Chạy trên client

import { useParams } from 'next/navigation'; // Sử dụng hook lấy tham số động
import React from 'react';
// import GenreDropdown from './components/GenreDropdown';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
// import Image from './';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import GenreDropdown from '@/app/components/GenreDropdown';
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
  if (genre.slug =='tien-hiep') {

    return (
      //   <div>

      //     <h1>Thể loại: {genreName}</h1>
      //     <p>Đây là trang của thể loại {genreName} với slugs "{formattedSlug}".</p>

      //     {/* Nội dung khác cho trang thể loại */}

      //   </div>
      <div className="container">
        <div className="flex justify-center items-center h-screen">

        <GenreDropdown />
          <p className='nav'>Truyện plus / {genre.name} / Trang 1</p>

          <h2>{genre.name}</h2>
          <hr />
          <p>Truyện tiên hiệp thường kể về quá trình tu luyện và khám phá thế giới tu sĩ thần tiên đầy bí ẩn của nhân vật chính.</p>
          <div className="background-body">
            <div className="container">
              {/* <GenreDropdown /> */}
              <div className="row">
                <div className="col-3">
                  <Image
                    src="https://truyenplus.vn/media/book/tran-hoi-truong-sinh.jpeg" // Đường dẫn đến hình ảnh trong thư mục public
                    alt="Mô tả hình ảnh"
                    width={300} // Chiều rộng của hình ảnh
                    height={150} // Chiều cao của hình ảnh
                  />
                </div>
                <div className="col-9">
                  <Link href={''}>
                    Trận Hỏi Trường Sinh
                  </Link>
                  <br />
                  <span>Tác giả:</span><Link href={''}>Quan Hư</Link>
                  <br />
                  <span>Thể Loại:</span><Link href={''}>Tiên Hiệp , Ngôn Tình , Huyền Huyễn, Khác</Link>
                  <br />
                  <span>Số chương:</span><Link href={''}>205</Link>
                </div>
              </div>
              <div className="row">
                  <div className="col-3">
                    <Image
                      src="https://truyenplus.vn/media/book/xuat-lung-ky.jpeg"// Đường dẫn đến hình ảnh trong thư mục public
                      alt="Mô tả hình ảnh"
                      width={300} // Chiều rộng của hình ảnh
                      height={150} // Chiều cao của hình ảnh
                    />
                  </div>
                  <div className="col-9">
                    <Link href={''}>
                      Xuất Lung Ký
                    </Link>
                    <br />
                    <span>Tác giả:</span><Link href={''}>Hạch Động Lực Chiến Liệt Hạm</Link>
                    <br />
                    <span>Thể Loại:</span><Link href={''}> Tiên Hiệp , Võng Du , Khoa Huyễn , Dã Sử , Hệ Thống , Khác</Link>
                    <br />
                    <span>Số chương:</span><Link href={''}>1484</Link>
                  </div>
                </div>

            </div>
          </div>
        </div>
        
    
      </div>
      
    );
  
  }
  if(genre.slug =='kiem-hiep'){
    return (

    <div className="container">
    <div className="flex justify-center items-center h-screen">
      <GenreDropdown />


      <p className='nav'>Truyện plus / {genre.name} / Trang 1</p>

      <h2>{genre.name}</h2>
      <hr />
      <p>Truyện tiên hiệp thường kể về quá trình tu luyện và khám phá thế giới tu sĩ thần tiên đầy bí ẩn của nhân vật chính.</p>
      <div className="background-body">
        <div className="container">
          <div className="row">
            <div className="col-3">
              <Image
                src="https://truyenplus.vn/media/book/lang-thien-kiem-than.jpg" // Đường dẫn đến hình ảnh trong thư mục public
                alt="Mô tả hình ảnh"
                width={300} // Chiều rộng của hình ảnh
                height={150} // Chiều cao của hình ảnh
              />
            </div>
            <div className="col-9">
              <Link href={''}>
                Trận Hỏi Trường Sinh
              </Link>
              <br />
              <span>Tác giả:</span><Link href={''}>Quan Hư</Link>
              <br />
              <span>Thể Loại:</span><Link href={''}>Tiên Hiệp , Ngôn Tình , Huyền Huyễn, Khác</Link>
              <br />
              <span>Số chương:</span><Link href={''}>205</Link>
            </div>
          </div>
          <div className="row">
            <div className="col-3">
              <Image
                src="https://truyenplus.vn/media/book/dai-su-huynh-khong-co-gi-la-khong-co-gi-la-dai-su-huynh.jpg"// Đường dẫn đến hình ảnh trong thư mục public
                alt="Mô tả hình ảnh"
                width={300} // Chiều rộng của hình ảnh
                height={150} // Chiều cao của hình ảnh
              />
            </div>
            <div className="col-9">
              <Link href={''}>
                Xuất Lung Ký
              </Link>
              <br />
              <span>Tác giả:</span><Link href={''}>Hạch Động Lực Chiến Liệt Hạm</Link>
              <br />
              <span>Thể Loại:</span><Link href={''}> Tiên Hiệp , Võng Du , Khoa Huyễn , Dã Sử , Hệ Thống , Khác</Link>
              <br />
              <span>Số chương:</span><Link href={''}>1484</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
    );
  }
  
};

export default GenrePage;
