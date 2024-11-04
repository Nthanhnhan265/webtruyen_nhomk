
// "use client"; // Sử dụng cho client-side rendering
// import { Avatar, Button, HR, Label, TextInput } from 'flowbite-react';
"use client"; // Sử dụng cho client-side rendering
import { Avatar, Button, HR, Label, TextInput } from 'flowbite-react';
import React, { useState } from 'react';
import { PiImagesSquare, PiMountainsFill } from "react-icons/pi";
import { LuPencilLine } from "react-icons/lu";
import { useRouter } from 'next/navigation'; // Thêm import useRouter
import styles from '../../_component/GenreDropdown.module.css';

const ProfilePage = () => {
    const router = useRouter(); // Khởi tạo router

    const handleSelectImage = () => {
        router.push('/select-image'); // Chuyển hướng đến trang chọn ảnh
    };

    const handleChangePassword = () => {
        // Logic cập nhật mật khẩu có thể được thêm vào đây
        alert('Mật khẩu đã được cập nhật!'); // Thông báo cho người dùng
    };

    return (
        <div className='px-16 mt-10 bg-black/5 py-20'>
            {/* first form */}
            <h2 className='border-l-2 border-red-500 ps-5 text-black/70 text-xl'>
                Thông tin tài khoản
            </h2>
            <div className='mt-3 mb-6 bg-white pt-5 shadow-md rounded-lg'>
                {/* avatar and other */}
                <div className='flex justify-between items-center px-10'>
                    <div className='flex gap-5'>
                        <Avatar rounded />
                        <div>
                            <br />
                            @username
                        </div>
                    </div>
                    <Button color="failure" onClick={handleSelectImage}>
                        <PiMountainsFill className='mx-2 mt-0.5' />Chọn ảnh
                    </Button>
                </div>
                <HR className='mx-2' />
                <div className='px-10 flex justify-between pb-20'>
                    <div>
                        Họ và tên : Tài
                        <br />
                        Email : taithanhmai@gmail.com
                    </div>
                    <Button className='mt-2 bg-gray-200' color="text-black">
                        <LuPencilLine className='mt-1 mr-2' /> Thay đổi
                    </Button>
                </div>
            </div>

            {/* part 2 */}
            <h2 className='border-l-2 border-red-500 ps-5 text-black/70 text-xl mt-10'>
                Thay đổi mật khẩu
            </h2>
            <div className='mt-3 mb-6 bg-white pt-5 shadow-md rounded-lg'>
                <div className='px-10 flex pb-20'>
                    <div className='flex flex-col gap-4 w-1/2'>
                        <div className='flex items-center gap-4'>
                            <Label className='mr-5' htmlFor="current-password" value="Mật khẩu hiện tại:" />
                            <TextInput id="current-password" type="password" required style={{ width: '300px' }} /> {/* Kích thước dài hơn */}
                        </div>
                        <div className='flex items-center gap-4'>
                            <Label className='mr-10' htmlFor="new-password" value="Mật khẩu mới:" />
                            <TextInput id="new-password" type="password" required style={{ width: '300px' }} /> {/* Kích thước dài hơn */}
                        </div>
                        <div className='flex items-center gap-4'>
                            <Label className='mr-1' htmlFor="confirm-password" value="Xác nhận mật khẩu:" />
                            <TextInput id="confirm-password" type="password" required style={{ width: '300px' }} /> {/* Kích thước dài hơn */}
                        </div>
                    </div>
                    <div className='w-1/2 flex items-end mb-32'>
                        <Button className='mt-4 bg-gray-200' color="text-black" onClick={handleChangePassword}>
                            <LuPencilLine className='mt-1 mr-2' /> Thay đổi
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
