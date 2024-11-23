'use client'
import UpdateStoryModal from '@/app/(routes)/dashboard/_components/story/UpdateStoryModal'
import { deleteStory, getAllStories, getStoryById } from '@/app/api/story.api'
import { Avatar, Button, Pagination } from 'flowbite-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { BsBoxArrowUpRight } from 'react-icons/bs'
import { toast } from 'react-toastify'
import Header from '../../_components/header'
import ConfirmDeleteModal from '../../_components/story/ConfirmDeleteModal'
import StoryModal from '../../_components/story/StoryModal'

interface Storie {
  id: number
  status: number
  author_id: number
  description: string
  story_name: string
  total_chapters: number
  views: number
  cover: string // This will contain the uploaded file
  keywords: string
  slug: string
  created_at: string
  updated_at: string
  Author: {
    author_name: string
  }
}
const StoryPage = () => {
  //============ Declare variables and hooks ================//
  const [stories, setStories] = useState<Storie[]>([])
  const [modalState, setModalState] = useState<{
    type: 'create' | 'update' | null
    story: Storie | null
  }>({ type: null, story: null })
  const [sortOrder, setSortOrder] = useState('ASC')
  const [sortBy, setSortBy] = useState('id')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, settotalPages] = useState(1)
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false)
  const [showModalEdit, setShowModalEdit] = useState(false)
  const [storyIdToDelete, setStoryIdToDelete] = useState<number | null>(null)
  const [keyword, setKeyWord] = useState<string>('')
  const [editingStory, setEditingStory] = useState(null)
  const fetchStories = async () => {
    try {
      const response = await getAllStories({
        story_name: keyword,
        description: keyword,
        sortBy: sortBy,
        sort: sortOrder,
        page: currentPage,
      })
      setStories(response.stories)
      settotalPages(response.totalPages)
      console.log(response.stories)
    } catch (err) {
      toast.error('Đã xảy ra lỗi khi lấy dữ liệu.')
      console.log(err)
    }
  }

  useEffect(() => {
    fetchStories()
  }, [sortOrder, currentPage, keyword])

  const handleDelete = async (id: number) => {
    setStoryIdToDelete(id)
    setDeleteModalOpen(true)
  }

  const handleEdit = async (id: number) => {
    try {
      // Indicate that the story is being loaded
      const response = await getStoryById(id)

      if (response?.data) {
        setEditingStory(response.data)
        setShowModalEdit(true)
      } else {
        toast.error('không tìm thấy id')
      }
    } catch (err) {
      toast.error('khong tìm thấy tryện')
      console.log(err);

    }
  }

  const handleCloseModal = () => {
    setModalState({ type: null, story: null })
    setShowModalEdit(false)
  }
  const handleConfirmDelete = async () => {
    setDeleteModalOpen(false)
    try {
      await deleteStory(storyIdToDelete ?? 0)
      setStories((prevStories) =>
        prevStories.filter((story) => story.id !== storyIdToDelete),
      )
      toast.success('xóa thành công')

      // Update the stories state after successful deletion if needed
    } catch (err) {
      toast.error('xóa thất bại')
      console.log(err);

    }
  }
  const handleCreateSuccess = () => {
    fetchStories()
  }
  const handleSuccess = () => {
    fetchStories()
  }
  const onPageChange = (page: number) => setCurrentPage(page)
  const handleSearch = async (keyword: string) => {
    console.log('checked>>', keyword)
    setKeyWord(keyword)
    fetchStories()
  }
  const detailStory = (id: Number) => {
    window.location.href = `stories/${id}`
  }

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
        <div className=" mb-4">
          <select
            className="p-2 border border-gray-300 rounded-xl text-sm mx-2"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            description: string story_name: string
            {/* <option value="id">Id</option> */}
            <option value="story_name">Tên truyện</option>
            <option value="description">Mô tả</option>
          </select>
          <select
            className="p-2 border border-gray-300 rounded-xl text-sm"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="ASC">Sắp xếp tăng dần</option>
            <option value="DESC">Sắp xếp giảm dần</option>
          </select>
        </div>

        <div className=" flex-grow  overflow-x-auto ">
          <table
            style={{ borderCollapse: 'separate', borderSpacing: '0 3px' }}
            className="border-separate min-w-full "
          >
            <thead>
              <tr className="bg-white">
                <th className="py-3 text-sm ">STT</th>
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
                  <td
                    colSpan={12}
                    className="py-1 text-center"
                  >
                    Không tìm thấy câu chuyện nào.
                  </td>
                </tr>
              ) : (
                stories?.map((story, index) => (
                  <tr
                    className="bg-white"
                    key={story.id}
                  >
                    <td className="px-2 text-center">
                      <div className="flex items-center justify-center space-x-1">
                        <span>{index}</span>
                        <button
                          onClick={() => {
                            detailStory(story.id)
                          }}
                        >
                          <BsBoxArrowUpRight />
                        </button>
                      </div>
                    </td>
                    <td className="px-2 flex justify-center text-sm">
                      {story?.cover ? (
                        <Image
                          alt={story.story_name || 'Story Image'}
                          src={`http://localhost:3000/${story.cover}`}
                          width={103}
                          height={133}
                          className="my-2 h-full"
                        />
                      ) : (
                        <Avatar className="my-2 h-full w-full"
                        />
                      )}
                    </td>

                    <td className="px-2 text-center text-sm">
                      {story.story_name}
                    </td>
                    <td className="px-2 text-center text-sm">
                      {story?.Author?.author_name ? story?.Author?.author_name : "không tìm thấy"}
                    </td>
                    <td className="px-2 text-center text-sm">
                      {story.status === 0 ? 'hoàn thành' : 'Chưa xuất bản'}
                    </td>
                    <td className="px-2 text-center text-sm">{story.views}</td>
                    <td className="px-2 text-center text-sm">
                      <div className="flex justify-center space-x-1">
                        <Button
                          color="warning"
                          onClick={() => handleEdit(story.id)}
                        >
                          Sửa
                        </Button>
                        <Button
                          color="failure"
                          onClick={() => handleDelete(story.id)}
                        >
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
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={onPageChange}
            />
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
        <UpdateStoryModal
          show={showModalEdit}
          onClose={handleCloseModal}
          onSuccess={handleSuccess}
          initialData={editingStory} // Pass the editing story data here
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

export default StoryPage

