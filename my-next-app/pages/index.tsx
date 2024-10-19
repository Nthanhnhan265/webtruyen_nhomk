// pages/index.js
import GenreList from './components/GenreList';
import Image from 'next/image';
import Link from 'next/link';
export default function Home() {
  return (

    <div className="container">
      <div className="flex justify-center items-center h-screen">
        <GenreList />


        <p className='nav'>Truyện plus / Truyện Tiên Hiệp / Trang 1</p>

        <h2>TRUYỆN TIÊN HIỆP</h2>
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
  );

}

