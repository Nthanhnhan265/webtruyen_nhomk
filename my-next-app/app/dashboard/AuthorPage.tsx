import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import React, { useEffect, useState } from 'react';
import { getAuthors, deleteAuthor } from '../../service/authorService'; // Import hàm getAuthors từ AuthorService

const AuthorPage = () => {
    const [authors, setAuthors] = useState([]);  // State để lưu trữ danh sách tác giả
    const [loading, setLoading] = useState(true); // State để kiểm soát trạng thái loading
    const [error, setError] = useState(''); // State để lưu lỗi nếu có

    useEffect(() => {
        const fetchAuthors = async () => {
            try {
                const response = await getAuthors();
                console.log(response);

                setAuthors(response); // Lưu dữ liệu vào state
                setLoading(false); // Đặt trạng thái loading là false
            } catch (err) {
                setError('Đã xảy ra lỗi khi lấy dữ liệu.');
                setLoading(false); // Đặt trạng thái loading là false
            }
        };

        fetchAuthors(); // Gọi hàm fetchAuthors khi component được mount
    }, []); // Chạy một lần khi component được mount

    const handleDelete = async (id) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa tác giả này không?')) {
            try {
                await deleteAuthor(id); // Gọi hàm xóa
                // Cập nhật lại danh sách tác giả sau khi xóa
                setAuthors((prevAuthors) => prevAuthors.filter((author) => author.id !== id));
            } catch (err) {
                setError('Đã xảy ra lỗi khi xóa tác giả.');
            }
        }
    };

    if (loading) return <p>Đang tải dữ liệu...</p>; // Hiển thị thông báo tải dữ liệu
    if (error) return <p>{error}</p>; // Hiển thị lỗi nếu có

    return (
        <div className="flex flex-col h-screen p-4">
            {/* Header section with Avatar and Search */}
            <div className="flex justify-between mb-4">
                {/* Search Input */}
                <input
                    type="text"
                    placeholder="Tìm kiếm..."
                    className="p-2 border border-gray-300 rounded w-1/3 h-10" // Fixed height for the search bar
                />

                {/* Avatar */}
                <div className="flex items-center">
                    <img
                        src="https://via.placeholder.com/50" // Placeholder image
                        alt="Avatar"
                        className="rounded-full border border-gray-300 h-10 w-10 mr-2"
                    />
                    <p className="text-sm">Nguyễn Văn A</p>
                </div>
            </div>

            {/* Title and Create button */}
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Tác giả</h1>
                <button className="bg-green-500 text-white p-2 rounded flex items-center h-10">
                    <FaPlus className="mr-2" /> Tạo mới
                </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto flex-grow">
                <table className="min-w-full bg-white">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="py-2 border">ID</th>
                            <th className="py-2 border">Tên tác giả</th>
                            <th className="py-2 border">Mô tả</th>
                            <th className="py-2 border">URL</th>
                            <th className="py-2 border">Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Sample data */}
                        {authors.map((author) => (
                            <tr key={author.id}>
                                <td className="border py-2 text-center">{author.id}</td>
                                <td className="border py-2">{author.author_name}</td>
                                <td className="border py-2">{author.description}</td>
                                <td className="border py-2">{author.slug}</td>
                                <td className="border py-2 text-center flex space-x-2">
                                    {/* Updated to ensure equal height */}
                                    <button className="bg-yellow-500 text-white p-2 rounded flex items-center h-10">
                                        <FaEdit className="mr-1" /> Sửa
                                    </button>
                                    <button
                                        className="bg-red-500 text-white p-2 rounded flex items-center h-10"
                                        onClick={() => handleDelete(author.id)}
                                    >
                                        <FaTrash className="mr-1" /> Xóa
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-center my-4">
                <button className="border p-2">‹</button>
                <span className="mx-2">1</span>
                <button className="border p-2">›</button>
            </div>
        </div>
    );
};

export default AuthorPage;
