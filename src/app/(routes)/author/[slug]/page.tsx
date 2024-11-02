// src/app/(routes)/author/[slug]/page.tsx

"use client";
import { useParams } from 'next/navigation';
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
// import styles from '@/app/(routes)/_component/GenreDropdown.module.css';
import styles from '../../_component/GenreDropdown.module.css';

const AuthorPage = () => {
    const { slug } = useParams(); // Lấy slug từ URL
    //   const { slug } = useParams(); // Lấy slug từ URL
    const currentPage = 1; // Bạn có thể thay thế bằng giá trị thực tế từ props hoặc query
    const totalPages = 5; // Số trang tối đa
    const [genre, setGenre] = useState(null);

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
    };

    const author = authors[slug];

    if (!author) {
        return <div>Tác giả không tồn tại.</div>;
    }

    return (
        <div>

            {/* Thêm thông tin khác về tác giả */}
            <div className="">
                <div className=" justify-center items-center">
                    <Navbar />
                    {/* <GenreDropdown /> */}

                    <p className="bg-gray-100 py-2 border-t border-gray-400 border-b pl-14">Truyện plus / {author.name} / Trang 1</p>


                    <div className="container min-h-screen  flex flex-col  mx-auto p-4 ">
                        <div className='ml-10 mt-3 mb-3'>

                            <span className={styles.authorName}>TÁC GIẢ : <span className='font-bold'> {author.name}</span> </span>
                        </div>
                        <hr className='ml-10' />
                        <p className='ml-10 my-3'> Tổng hợp truyện của tác giả {author.name} mới nhất trên Truyện Chom.</p>
                        <div className="backgroundBody bg-gray-100 py-5 px-5 ml-10">
                            <div className="grid grid-cols-12 gap-4 mb-4">
                                <div className="col-span-3">
                                    <Image src="https://truyenplus.vn/media/book/tran-hoi-truong-sinh.jpeg" alt="Mô tả hình ảnh" width={300} height={150} />
                                </div>
                                <div className="col-span-9">
                                    <Link className='font-bold ' href={''}>Trận Hỏi Trường Sinh</Link>
                                    <br />
                                    <span>Tác giả:</span><Link href="/author/quan-hu">Quan Hư</Link>
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
                                    <Link href={''} className='font-bold'>Xuất Lung Ký</Link>
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
                </div>

                {/* Footer */}
                <footer className="bg-gray-100 p-4 grid grid-cols-2 mt-5 pl-14">
                    <div >
                        Truyện Plus – Trang đọc truyện online, thường xuyên cập nhật những bộ truyện hay nhất thuộc các thể loại đặc sắc như: truyện ngôn tình, truyện tiên hiệp, truyện kiếm hiệp, truyện đam mỹ, light novel…
                        <br />
                        Mọi vấn đề vi phạm bản quyền vui lòng liên hệ qua email: <span className={styles.textFoot}>truyenplusonline@gmail.com</span>
                    </div>
                    <div>
                        <div className="grid grid-cols-4 gap-4">
                            {/* Hàng 1 */}
                            <div><div className="flex justify-center items-center">
                                <CustomButton
                                    href="/some-page"
                                    title="Go to some page"
                                    text="Truyện Full"
                                />
                            </div></div>
                            <div><div className="flex justify-center items-center">
                                <CustomButton
                                    href="/some-page"
                                    title="Go to some page"
                                    text="Truyện Hot"
                                />
                            </div></div>
                            <div><div className="flex justify-center items-center">
                                <CustomButton
                                    href="/some-page"
                                    title="Go to some page"
                                    text="Ngôn Tình Hay"
                                />
                            </div></div>
                            <div><div className="flex justify-center items-center">
                                <CustomButton
                                    href="/some-page"
                                    title="Go to some page"
                                    text="Ngôn Tình Hài"
                                />
                            </div></div>

                            {/* Hàng 2 */}
                            <div><div className="flex justify-center items-center">
                                <CustomButton
                                    href="/some-page"
                                    title="Go to some page"
                                    text="Ngôn Tình Hài"
                                />
                            </div></div>
                            <div><div className="flex justify-center items-center">
                                <CustomButton
                                    href="/some-page"
                                    title="Go to some page"
                                    text="Ngôn Tình Hài"
                                />
                            </div></div>
                            <div><div className="flex justify-center items-center">
                                <CustomButton
                                    href="/some-page"
                                    title="Go to some page"
                                    text="Ngôn Tình Hài"
                                />
                            </div></div>
                            <div><div className="flex justify-center items-center">
                                <CustomButton
                                    href="/some-page"
                                    title="Go to some page"
                                    text="Ngôn Tình Hài"
                                />
                            </div></div>
                        </div>

                    </div>
                </footer>
            </div>

        </div>
    );
};

export default AuthorPage;