'use client'
import formatDate from '@/components/ulti/formatDate'
import { Pagination, Button } from "flowbite-react";
import Header from '../../_components/header';
import ConfirmDeleteModal from '../../_components/story/ConfirmDeleteModal';
import StoryModal from '../../_components/story/StoryModal';
import { getAllStories, deleteStory } from '@/app/_api/story.api';
import UpdateStoryModal from '../../_components/story/updateStoryModal';
import { useEffect, useState } from 'react';
import { FaEdit, FaPlus, FaSearch, FaTrash } from 'react-icons/fa';
import { BsBoxArrowUpRight } from "react-icons/bs";
import { Avatar } from "flowbite-react";
import Image from 'next/image';

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
    const [modalState, setModalState] = useState<{ type: 'create' | 'update' | null; story: Storie | null }>({ type: null, story: null });

    const [sortOrder, setSortOrder] = useState('asc')
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, settotalPages] = useState(1);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [storyIdToDelete, setStoryIdToDelete] = useState<number | null>(null);
    const [keyword, setKeyWord] = useState<string>('')
    const [editingStory, setEditingStory] = useState(null); // State to hold the story being edited
    const [selectedStory, setSelectedStory] = useState(null); // Add this line


    const fetchStories = async () => {
        setLoading(true)
        try {
            const response = await getAllStories({
                story_name: keyword,
                description: keyword,
                sort: sortOrder,
                page: currentPage,
            })
            setStories(response.stories)
            settotalPages(response.totalPages)
            setLoading(false)
            console.log(response.stories);

        } catch (err) {
            setError('Đã xảy ra lỗi khi lấy dữ liệu.')
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchStories()
    }, [sortOrder, currentPage, keyword])

    const handleDelete = async (id: number) => {
        setStoryIdToDelete(id);
        setDeleteModalOpen(true);
    }

    const handleEdit = (story) => {
        // alert(JSON.stringify(story));

        setEditingStory(story); // Set the story to be edited
        setModalState({ type: 'update', story });
    }
    const handleCloseModal = () => {
        setModalState({ type: null, story: null });
    };
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
    const handleSuccess = () => {
        // fetchStories()
    }
    const onPageChange = (page: number) => setCurrentPage(page);
    const handleSearch = async (keyword: string) => {
        console.log('checked>>', keyword)
        setKeyWord(keyword)
        fetchStories()
    }
    const detailStory = () => {
        alert("hiển thị chi tiết")
    }
    // if (loading) return <p>Đang tải dữ liệu...</p>
    // if (error) return <p>{error}</p>

    return (
        <>
            <div className="flex  flex-col h-screen ">
                <div className="flex justify-between ">
                    <Header handleSearch={handleSearch}></Header>

                </div>

                <div className="mb-4 mt-2 flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Câu chuyện</h1>
                    <div className="flex space-x-4 ">
                        <Button
                            color="success"
                            onClick={() => setModalState({ type: 'create', story: null })} // Open Create Story Modal

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
                                <th className="py-3 text-sm ">Bìa</th>
                                <th className="py-3 text-sm ">Tên câu chuyện</th>
                                <th className="py-3 text-sm ">Tác giả</th>
                                <th className="py-3 text-sm ">Trạng thái</th>
                                <th className="py-3 text-sm ">Tương tác</th>
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
                                        <td className="px-2 flex justify-center text-sm">
                                            <Image alt='' src={`http://localhost:3000/${story.cover}`} width={103} height={133} className='my-2 h-full' />
                                        </td>
                                        <td className="px-2 text-center text-sm">{story.story_name}</td>
                                        <td className="px-2 text-center text-sm">{story.author_id}</td>
                                        <td className="px-2 text-center text-sm">
                                            {story.status === 1 ? "Đã xuất bản" : "Chưa xuất bản"}
                                        </td>
                                        <td className="px-2 text-center text-sm">{story.views}</td>
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

                {modalState.type === 'create' && (
                    <StoryModal
                        show={true}
                        onClose={handleCloseModal}
                        onSuccess={handleCreateSuccess}
                    />
                )}
                {modalState.type === 'update' && modalState.story && (
                    <UpdateStoryModal
                        show={true}
                        onClose={handleCloseModal}
                        onSuccess={handleSuccess}
                        initialData={editingStory} // Pass the editing story data here
                    />
                )}

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
