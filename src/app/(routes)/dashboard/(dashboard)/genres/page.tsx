'use client'
import {
  createGenre,
  deleteGenre,
  getAllgenre,
  getByGenreId,
  updateGenre,
} from '@/app/api/genre.api'
import { Button, Pagination } from 'flowbite-react'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import ConfirmDeleteModal from '../../_components/genres/ConfirmDeleteModal'
import CreateModalGenre from '../../_components/genres/CreateModalGenre'
import UpdateGenreModal from '../../_components/genres/UpdateModalGenre'
import Header from '../../_components/header'
interface Genre {
  id: number
  genre_name: string
  description: string
  slug: string
}
const AuthorPage = () => {
  //============ Declare variables and hooks ================//
  const [Genres, setGenres] = useState<Genre[]>([])
  const [showUpdateModal, setShowUpdateModal] = useState(false)
  const [showCreateModal, setShowCreateModal] = useState(false) // New state for Create Modal
  const [selectedGenre, setSelectedGenre] = useState<Genre | null>(null)
  const [sortOrder, setSortOrder] = useState('DESC')
  const [sortBy, setSortBy] = useState('id')
  const [keyword, setKeyWord] = useState<string>('')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, settotalPages] = useState(1)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [genreToDelete, setGenreToDelete] = useState<number | null>(null)
  // keyword,
  // sortBy,
  // order,
  // page,
  const fetchGenre = async () => {
    try {
      const response = await getAllgenre(
        keyword,
        sortBy,
        sortOrder,
        currentPage,
      )
      setGenres(response.data)
      settotalPages(response.pagination.totalPages)
    } catch (err) {
      console.log('Đã xảy ra lỗi khi lấy dữ liệu.')
    }
  }

  useEffect(() => {
    fetchGenre()
  }, [sortOrder, sortBy, currentPage, keyword])

  const handleDelete = async (id: number) => {
    try {
      const response = await getByGenreId(id)
      if (response.data) {
        setGenreToDelete(id)
        setShowDeleteModal(true) // Open the delete confirmation modal
      }
    } catch (err) {
      toast.error('thể loại không tồn tại')
    }
  }
  const handleCreateSuccess = async (data) => {
    const { genre_name, description, slug } = data
    console.log(data)
    console.log(genre_name, description, slug)

    try {
      await createGenre({ genre_name, description, slug }) // API call to create a new genre
      toast.success('Thể loại đã được thêm thành công!')
      fetchGenre() // Refresh the genre list or handle success as needed
    } catch (error) {
      toast.error('Đã xảy ra lỗi khi thêm thể loại.')
    }
  }
  const handleUpdateSuccess = async (id: number, data: Genre) => {
    try {
      await updateGenre(id, data)
      toast.success('cập nhật thành công')
      setShowUpdateModal(false)
      fetchGenre()
    } catch (err) {
      toast.error('cập nhật thất bại')
    }
  }
  const handleEdit = async (id: number) => {
    try {
      const response = await getByGenreId(id)
      if (response.data) {
        setSelectedGenre(response.data)
        setShowUpdateModal(true)
      }
    } catch (err) {
      toast.error('thể loại không tồn tại')
    }
  }
  const handleSearch = async (keyword: string) => {
    console.log('checked>>', keyword)
    setKeyWord(keyword)
    fetchGenre()
  }

  const onPageChange = (page: number) => setCurrentPage(page)
  const confirmDelete = async () => {
    if (genreToDelete !== null) {
      try {
        // Call the deleteGenre function to delete the selected genre
        await deleteGenre(genreToDelete) // Use the correct function to delete a genre

        // Update the genres state to remove the deleted genre
        setGenres((prevGenres) =>
          prevGenres.filter((genre) => genre.id !== genreToDelete),
        )

        // Close the delete modal
        setShowDeleteModal(false)

        // Reset the genreToDelete state
        setGenreToDelete(null)
        toast.success('xóa thành công')
      } catch (err) {
        // Handle any errors that occur during deletion
        toast.error('Đã xảy ra lỗi khi xóa thể loại.')
      }
    }
  }

  return (
    <div className="flex flex-col h-screen">
      <div className="flex justify-between mb-2 p-4">
        <Header handleSearch={handleSearch} />
      </div>

      <div className="flex justify-between items-center px-4">
        <h1 className="text-2xl font-bold">Thể loại</h1>
        <Button
          color="success"
          onClick={() => {
            setShowCreateModal(true)
          }}
        >
          + Tạo mới
        </Button>
      </div>
      <div className="mb-4 px-4">
        <select
          className="p-2 border border-gray-300 rounded-xl mx-2"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="id">Id</option>
          <option value="genre_name">Tên thể loại</option>
          <option value="description">Mô tả</option>
        </select>
        <select
          className="p-2 border border-gray-300 rounded-xl"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="asc">Sắp xếp tăng dần</option>
          <option value="desc">Sắp xếp giảm dần</option>
        </select>
      </div>

      <div className="flex-grow px-4 overflow-y-auto">
        <table className="min-w-full border-separate border-spacing-y-1">
          <thead>
            <tr className="bg-white">
              <th className="py-4 px-3">ID</th>
              <th className="py-2">Tên tác giả</th>
              <th className="py-2">Mô tả</th>
              <th className="py-2">URL</th>
              <th className="py-2">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {Genres.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="py-4 text-center"
                >
                  Không tìm thấy tác giả nào.
                </td>
              </tr>
            ) : (
              Genres.map((genre) => (
                <tr
                  className="bg-white"
                  key={genre.id}
                >
                  <td className="py-2 px-1 text-center">{genre.id}</td>
                  <td className="py-2 px-1 text-center">{genre.genre_name}</td>
                  <td className="py-2 px-1 text-center">{genre.description}</td>
                  <td className="py-2 px-1 text-center">{genre.slug}</td>
                  <td className="py-2 px-1 text-center">
                    <div className="flex justify-center space-x-1">
                      <Button
                        color="warning"
                        onClick={() => handleEdit(genre.id)}
                      >
                        Sửa
                      </Button>
                      <Button
                        color="failure"
                        onClick={() => handleDelete(genre.id)}
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
        <div className="flex justify-center mt-4">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        </div>
      </div>

      <UpdateGenreModal
        show={showUpdateModal}
        onClose={() => setShowUpdateModal(false)}
        // onSuccess={handleSuccess}
        initialData={selectedGenre}
        onSuccess={(id: number, data) => handleUpdateSuccess(id, data)}
      />
      <CreateModalGenre
        show={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSuccess={(data) => handleCreateSuccess(data)}
      />
      <ConfirmDeleteModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={confirmDelete}
      />
    </div>
  )
}

export default AuthorPage
