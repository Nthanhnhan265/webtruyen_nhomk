import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import React, { useEffect, useState } from 'react';
import { getAuthors, deleteAuthor } from '../../service/authorService';
import UpdateAuthorModal from '@/components/UpdateAuthorModal';

const AuthorPage = () => {
    const [authors, setAuthors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [selectedAuthor, setSelectedAuthor] = useState(null);
    const [sortOrder, setSortOrder] = useState('asc'); // State for sorting order

    const fetchAuthors = async (sortOrder) => {
        setLoading(true);
        try {
            const response = await getAuthors(sortOrder);
            setAuthors(response);
            setLoading(false);
        } catch (err) {
            setError('Đã xảy ra lỗi khi lấy dữ liệu.');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAuthors(sortOrder); // Fetch with the selected sort order
    }, [sortOrder]);

    const handleDelete = async (id) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa tác giả này không?')) {
            try {
                await deleteAuthor(id);
                setAuthors((prevAuthors) => prevAuthors.filter((author) => author.id !== id));
            } catch (err) {
                setError('Đã xảy ra lỗi khi xóa tác giả.');
            }
        }
    };

    const handleEdit = (author) => {
        setSelectedAuthor(author);
        setShowModal(true);
    };

    const handleSuccess = () => {
        fetchAuthors(sortOrder); // Fetch authors after successful update
    };

    if (loading) return <p>Đang tải dữ liệu...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="flex flex-col h-screen p-4">
            <div className="flex justify-between mb-4">
                <input
                    type="text"
                    placeholder="Tìm kiếm..."
                    className="p-2 border border-gray-300 rounded w-1/3 h-10"
                />
                <div className="flex items-center">
                    <img
                        src="https://via.placeholder.com/50"
                        alt="Avatar"
                        className="rounded-full border border-gray-300 h-10 w-10 mr-2"
                    />
                    <p className="text-sm">Nguyễn Văn A</p>
                </div>
            </div>

            <div className="mb-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold">Tác giả</h1>

                <div className="flex space-x-4">
                    {/* Sorting Dropdown */}
                    <select
                        className="p-2 border border-gray-300 rounded"
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value)} // Update sort order
                    >
                        <option value="desc">Sắp xếp theo tên A-Z</option>
                        <option value="asc">Sắp xếp theo tên Z-A</option>
                    </select>

                    {/* Tạo mới button */}
                    <button
                        className="bg-green-500 text-white p-2 rounded flex items-center h-10"
                        onClick={() => {
                            setSelectedAuthor(null);
                            setShowModal(true);
                        }}
                    >
                        <FaPlus className="mr-2" /> Tạo mới
                    </button>
                </div>
            </div>

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
                        {authors.map((author) => (
                            <tr key={author.id}>
                                <td className="border py-2 text-center">{author.id}</td>
                                <td className="border py-2">{author.author_name}</td>
                                <td className="border py-2">{author.description}</td>
                                <td className="border py-2">{author.slug}</td>
                                <td className="border py-2 text-center flex space-x-2">
                                    <button
                                        className="bg-yellow-500 text-white p-2 rounded flex items-center h-10"
                                        onClick={() => handleEdit(author)}
                                    >
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

            <div className="flex justify-center my-4">
                <button className="border p-2">‹</button>
                <span className="mx-2">1</span>
                <button className="border p-2">›</button>
            </div>

            <UpdateAuthorModal
                show={showModal}
                onClose={() => setShowModal(false)}
                onSuccess={handleSuccess}
                initialData={selectedAuthor}
            />
        </div>
    );
};

export default AuthorPage;
