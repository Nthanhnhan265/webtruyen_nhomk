// pages/the-loai/[slug].js
import { useRouter } from 'next/router';
import Image from 'next/image';
// import Image from './';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import GenreList from '../components/GenreList';

const genres = [
  { id: 1, name: 'Tiên Hiệp', slug: 'tien-hiep' },
  { id: 2, name: 'Kiếm Hiệp', slug: 'kiem-hiep' },
  { id: 3, name: 'Ngôn Tình', slug: 'ngon-tinh' },
  { id: 4, name: 'Quân Sự', slug: 'quan-su' },
  { id: 5, name: 'Lịch Sử', slug: 'lich-su' },
  { id: 6, name: 'Trinh Thám', slug: 'trinh-tham' },
];

const GenrePage = () => {
  const router = useRouter();
  const { slug } = router.query; // Lấy slug từ URL
  
  const [genre, setGenre] = useState(null);

  useEffect(() => {
    // Tìm thể loại dựa vào slug
    const foundGenre = genres.find((g) => g.slug === slug);
    setGenre(foundGenre);
  }, [slug]);

  // Nếu không tìm thấy thể loại, trả về thông báo lỗi
  if (!genre) {
    return <p>Thể loại không tồn tại</p>;
  }
  if (genre && genre.id === 1) {
    return (
      <>
         <div className="container">
      <div className="flex justify-center items-center h-screen">
        <GenreList />


        <p className='nav'>Truyện plus / {genre.name} / Trang 1</p>

        <h2>{genre.name}</h2>
        <hr />
        <p>Truyện tiên hiệp thường kể về quá trình tu luyện và khám phá thế giới tu sĩ thần tiên đầy bí ẩn của nhân vật chính.</p>
        <div className="background-body">
          <div className="container">
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
      </>
    );
  } 
  if (genre && genre.id === 2) {
    return (
      <>
          <div className="container">
      <div className="flex justify-center items-center h-screen">
        <GenreList />


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
      </>
    );
  } 
  
 
  
};

export default GenrePage;

