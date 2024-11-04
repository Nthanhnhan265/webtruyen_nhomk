'use client'
import formatDate from '@/components/ulti/formatDate'
import { Pagination, Button } from "flowbite-react";
import Header from '../../_components/header';
import ConfirmDeleteModal from '../../_components/story/ConfirmDeleteModal';
import StoryModal from '../../_components/story/StoryModal';
import { getAllStories, deleteStory } from '@/app/_api/story.api';
import { useEffect, useState } from 'react';
import { FaEdit, FaPlus, FaSearch, FaTrash } from 'react-icons/fa';
import { BsBoxArrowUpRight } from "react-icons/bs";

interface Storie {
    id: number,
    status: string,
    author_id: number,
    description: string,
    story_name: string,
    total_chapters: number,
    views: number,
    cover: string, // This will contain the uploaded file
    keywords: string,
    slug: string,
    created_at: string,
    updated_at: string,
};
// import StoryModal from '../../_components/story/StoryModal'
// import UpdateStoryModal from '../../_components/story/UpdateStoryModal'
const storyPage = () => {
    //============ Declare variables and hooks ================//
    const [stories, setStories] = useState<Storie[]>([])
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
    const [storyIdToDelete, setStoryIdToDelete] = useState<number | null>(null);
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
    const detailStory = () => {
        alert("hiển thị chi tiết")
    }
    if (loading) return <p>Đang tải dữ liệu...</p>
    if (error) return <p>{error}</p>

    return (
        <>
            <div className="flex  flex-col h-screen ">
                <div className="flex justify-between ">
                    <div className="flex items-center w-2/3">
                        <Header handleSearch={handleSearch}></Header>

                        <button
                            className="text-black p-2 rounded ml-2 mb-2"
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
                    <div className="flex space-x-4 ">
                        <Button
                            color="success"
                            onClick={() => {
                                setSelectedStory(null) // Reset selected story
                                setShowCreateModal(true) // Open Create Story Modal
                            }}
                        >
                            + Tạo mới
                        </Button>
                    </div>
                </div>
                <div className=' mb-4'>
                    <select
                        className="p-2 border border-gray-300 rounded text-sm"
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value)}
                    >
                        <option value="asc">Sắp xếp theo tên A-Z</option>
                        <option value="desc">Sắp xếp theo tên Z-A</option>
                    </select>
                </div>

                <div className=" flex-grow  overflow-x-auto ">
                    <table
                        style={{ borderCollapse: 'separate', borderSpacing: '0 3px' }}
                        className="border-separate min-w-full "                     >
                        <thead>
                            <tr className="bg-white">
                                <th className="py-3 text-sm ">ID</th>
                                <th className="py-3 text-sm ">Tên câu chuyện</th>
                                <th className="py-3 text-sm ">Mô tả</th>
                                <th className="py-3 text-sm ">Tổng số chương</th>
                                <th className="py-3 text-sm ">Lượt xem</th>
                                <th className="py-3 text-sm ">Bìa</th>
                                <th className="py-3 text-sm ">Từ khóa</th>
                                <th className="py-3 text-sm ">Ngày tạo</th>
                                <th className="py-3 text-sm ">Ngày cập nhật</th>
                                <th className="py-3 text-sm ">Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {stories?.length === 0 ? (
                                <tr>
                                    <td colSpan={12} className="py-1 text-center">
                                        Không tìm thấy câu chuyện nào.
                                    </td>
                                </tr>
                            ) : (
                                stories?.map((story) => (
                                    <tr className="bg-white" key={story.id}>
                                        <td className="px-2 text-center">
                                            <div className="flex items-center justify-center space-x-1">
                                                <span>{story.id}</span>
                                                <button onClick={() => { detailStory() }}>

                                                    <BsBoxArrowUpRight />
                                                </button>
                                            </div>
                                        </td>
                                        <td className="px-2 text-center text-sm">{story.story_name}</td>
                                        <td className="px-2 text-center text-sm">{story.description}</td>
                                        <td className="px-2 text-center text-sm">{story.total_chapters}</td>
                                        <td className="px-2 text-center text-sm">{story.views}</td>
                                        <td className="px-2 text-center text-sm">
                                            <img src={story.cover} alt="Cover" className="h-16 w-16" />
                                        </td>
                                        <td className="px-2 text-center text-sm">{story.keywords}</td>
                                        <td className="px-2 text-center text-sm">{formatDate(story.created_at)}</td>
                                        <td className="px-2 text-center text-sm">{formatDate(story.updated_at)}</td>
                                        <td className="px-2 text-center text-sm">
                                            <div className="flex justify-center space-x-1">
                                                <Button color="warning" onClick={() => handleEdit(story)}>
                                                    Sửa
                                                </Button>
                                                <Button color="failure" onClick={() => handleDelete(story.id)}>
                                                    Xóa
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>

                    </table>
                    <div className="flex overflow-x-auto sm:justify-center">
                        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
                    </div>
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

        </>
    )
}

export default storyPage
