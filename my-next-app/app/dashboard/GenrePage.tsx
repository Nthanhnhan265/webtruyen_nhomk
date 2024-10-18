import React, { useState } from 'react';
import { FaSearch, FaPlus } from 'react-icons/fa';

const GenrePage = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <div className="flex flex-col h-screen p-4">
            {/* Header Section */}
            <div className="flex justify-between items-start mb-4">
                {/* Search Bar */}
                <div className="flex">
                    <input
                        type="text"
                        placeholder="Tìm kiếm..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="p-2 border border-gray-300 rounded w-3/4"  // Mở rộng thanh tìm kiếm
                    />
                    <span className="flex items-center ml-2">
                        <FaSearch />
                    </span>
                </div>
                {/* Avatar (Placeholder) */}
                <div className="flex items-center justify-center w-16 h-16 bg-gray-200 rounded ml-4">
                    {/* Ảnh đại diện ở đây */}
                </div>
            </div>

            {/* Title Section */}
            <h1 className="text-2xl font-bold mb-4 w-3/4">Thể loại</h1> {/* Đảm bảo tiêu đề bằng với nút thêm mới */}

            {/* Create New Button */}
            <div className="flex justify-end mb-4">
                <button className="bg-green-500 text-white p-2 rounded flex items-center">
                    <FaPlus className="mr-2" /> Tạo mới
                </button>
            </div>

            {/* Table Section */}
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="py-2 border">ID</th>
                        <th className="py-2 border">Tên thể loại</th>
                        <th className="py-2 border">Mô tả</th>
                        <th className="py-2 border">Đường dẫn</th>
                        <th className="py-2 border">Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Sample data */}
                    {[1, 2].map((id) => (
                        <tr key={id}>
                            <td className="border py-2 text-center">{id}</td>
                            <td className="border py-2">Kiếm hiệp</td>
                            <td className="border py-2">Lorem ipsum dolor sit [...]</td>
                            <td className="border py-2">the-loai/kiem-hiep</td>
                            <td className="border py-2 text-center">
                                <button className="bg-yellow-500 text-white p-1 rounded mr-2">Sửa</button>
                                <button className="bg-red-500 text-white p-1 rounded">Xóa</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination Section */}
            <div className="flex justify-center my-4">
                <button className="border p-2">‹</button>
                <span className="mx-2">1</span>
                <button className="border p-2">›</button>
            </div>
        </div>
    );
};

export default GenrePage;
