'use client'
import formatDate from '@/components/ulti/formatDate'
import { Pagination } from "flowbite-react";
import Header from '../../_components/header';
import ConfirmDeleteModal from '../../_components/story/ConfirmDeleteModal';
import StoryModal from '../../_components/story/StoryModal';
import { getAllStories, deleteStory } from '@/app/_api/story.api';
import { useEffect, useState } from 'react';
import { FaEdit, FaPlus, FaSearch, FaTrash } from 'react-icons/fa';
// import StoryModal from '../../_components/story/StoryModal'
// import UpdateStoryModal from '../../_components/story/UpdateStoryModal'
const storyPage = () => {
    //============ Declare variables and hooks ================//
    const [stories, setStories] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [showUpdateModal, setShowUpdateModal] = useState(false)
    const [showCreateModal, setShowCreateModal] = useState(false) // New state for Create Modal
    const [selectedStory, setSelectedStory] = useState(null)
    const [sortOrder, setSortOrder] = useState('asc')
    const [searchTerm, setSearchTerm] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, settotalPages] = useState(1);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [storyIdToDelete, setStoryIdToDelete] = useState(null);
    const [keyword, setKeyWord] = useState<string>('')


    const fetchStories = async () => {
        setLoading(true)
        try {
            const response = await getAllStories({
                author_storie: keyword,
                description: keyword,
                sort: sortOrder,
                page: currentPage,
            })
            setStories(response.stories)
            settotalPages(response.totalPages)
            setLoading(false)
        } catch (err) {
            setError('Đã xảy ra lỗi khi lấy dữ liệu.')
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchStories()
    }, [sortOrder, currentPage])

    const handleDelete = async (id: number) => {
        setStoryIdToDelete(id);
        setDeleteModalOpen(true);
    }

    const handleEdit = (story) => {
        // setSelectedStory(story)
        // setShowUpdateModal(true)
    }
    const handleConfirmDelete = async () => {
        setDeleteModalOpen(false);
        try {
            await deleteStory(storyIdToDelete);
            setStories((prevStories) =>
                prevStories.filter((story) => story.id !== storyIdToDelete))
            // Update the stories state after successful deletion if needed
        } catch (err) {
            console.error("Failed to delete the story", err);
        }
    };
    const handleCreateSuccess = () => {
        // fetchStories()
    }
    const onPageChange = (page: number) => setCurrentPage(page);
    const handleSearch = async (keyword: string) => {
        console.log('checked>>', keyword)
        setKeyWord(keyword)
    }
    const search = () => {
        fetchStories()
        setKeyWord('')

    }
    if (loading) return <p>Đang tải dữ liệu...</p>
    if (error) return <p>{error}</p>

    return (
        <div className="flex flex-col h-screen p-4">
            <div className="flex justify-between mb-4">
                <div className="flex items-center w-1/3">
                    <Header handleSearch={handleSearch}></Header>

                    <button
                        className="text-black p-2 rounded ml-2"
                        onClick={() => search()} // Gọi hàm tìm kiếm khi nhấn nút
                    >
                        <FaSearch className="mr-2" /> {/* Biểu tượng tìm kiếm */}
                    </button>
                </div>
                <div className="flex items-center">
                    <img
                        src="https://via.placeholder.com/50"
                        alt="Avatar"
                        className="rounded-full border border-gray-300 h-10 w-10 mr-2"
                    />
                    <p className="text-sm">Nguyễn Văn A</p>
                </div>
            </div>

            <div className="mb-4 mt-2 flex justify-between items-center">
                <h1 className="text-2xl font-bold">Câu chuyện</h1>
                <div className="flex space-x-4">

                    <button
                        className="bg-green-500 text-white p-2 rounded flex items-center h-10"
                        onClick={() => {
                            setSelectedStory(null) // Reset selected story
                            setShowCreateModal(true) // Open Create Story Modal
                        }}
                    >
                        <FaPlus className="mr-2" /> Tạo mới
                    </button>
                </div>
            </div>
            <div className=' mb-4'>
                <select
                    className="p-2 border border-gray-300 rounded"
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                >
                    <option value="asc">Sắp xếp theo tên A-Z</option>
                    <option value="desc">Sắp xếp theo tên Z-A</option>
                </select>
            </div>

            <div className="overflow-x-auto flex-grow">
                <table className="min-w-full bg-white">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="py-2 border">ID</th>
                            <th className="py-2 border">Tên câu chuyện</th>
                            <th className="py-2 border">Mô tả</th>
                            <th className="py-2 border">Tổng số chương</th>
                            <th className="py-2 border">Lượt xem</th>
                            <th className="py-2 border">Bìa</th>
                            <th className="py-2 border">Từ khóa</th>
                            <th className="py-2 border">Ngày tạo</th>
                            <th className="py-2 border">Ngày cập nhật</th>
                            <th className="py-2 border">Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stories?.length === 0 ? (
                            <tr>
                                <td
                                    colSpan="12"
                                    className="py-1 text-center"
                                >
                                    Không tìm thấy câu chuyện nào.
                                </td>
                            </tr>
                        ) : (
                            stories?.map((story) => (
                                <tr key={story.id}>
                                    <td className="border py-1 text-center">{story.id}</td>
                                    <td className="border py-1">{story.story_name}</td>
                                    <td className="border py-1">{story.description}</td>
                                    <td className="border py-1">{story.total_chapters}</td>
                                    <td className="border py-1">{story.views}</td>
                                    <td className="border py-1">
                                        <img src={story.cover} alt="Cover" className="h-16 w-16" />
                                    </td>
                                    <td className="border py-1">{story.keywords}</td>
                                    <td className="border py-1">{formatDate(story.created_at)}</td>
                                    <td className="border py-1">{formatDate(story.updated_at)}</td>
                                    <td className="border py-1 text-center">
                                        <div className="flex justify-center space-x-1">
                                            <button
                                                className="bg-yellow-500 text-white px-3 py-1 rounded flex items-center h-8"
                                                onClick={() => handleEdit(story)}
                                            >
                                                <FaEdit className="mr-1 text-xs" />
                                                Sửa
                                            </button>
                                            <button
                                                className="bg-red-500 text-white px-3 py-1 rounded flex items-center h-8"
                                                onClick={() => handleDelete(story.id)}
                                            >
                                                <FaTrash className="mr-1 text-xs" />
                                                Xóa
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            <div className="flex overflow-x-auto sm:justify-center">
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
            </div>


            {/* <UpdateStoryModal
                show={showUpdateModal}
                onClose={() => setShowUpdateModal(false)}
                onSuccess={handleSuccess}
                initialData={selectedStory}
            /> */}
            <StoryModal
                show={showCreateModal}
                onClose={() => setShowCreateModal(false)}
                onSuccess={handleCreateSuccess}
            />
            <ConfirmDeleteModal
                isOpen={isDeleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                onConfirm={handleConfirmDelete}
            />
        </div>
    )
}

export default storyPage
