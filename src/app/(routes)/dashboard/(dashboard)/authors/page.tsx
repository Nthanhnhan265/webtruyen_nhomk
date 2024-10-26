'use client'
import { deleteAuthor, getAuthors } from '@/app/_api/authorService'
import { useEffect, useState } from 'react'
import { FaEdit, FaPlus, FaSearch, FaTrash } from 'react-icons/fa'
import AuthorModal from '../../_components/author/AuthorModal'
import UpdateAuthorModal from '../../_components/author/UpdateAuthorModal'

const UserPage = () => {
  //============ Declare variables and hooks ================//
  const [authors, setAuthors] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showUpdateModal, setShowUpdateModal] = useState(false)
  const [showCreateModal, setShowCreateModal] = useState(false) // New state for Create Modal
  const [selectedAuthor, setSelectedAuthor] = useState(null)
  const [sortOrder, setSortOrder] = useState('asc')
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const limit = 4

  const fetchAuthors = async () => {
    setLoading(true)
    try {
      const response = await getAuthors({
        author_name: searchTerm,
        description: searchTerm,
        sort: sortOrder,
        page: currentPage,
      })
      setAuthors(response)
      setLoading(false)
    } catch (err) {
      setError('Đã xảy ra lỗi khi lấy dữ liệu.')
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAuthors()
  }, [sortOrder, currentPage])

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa tác giả này không?')) {
      try {
        await deleteAuthor(id)
        setAuthors((prevAuthors) =>
          prevAuthors.filter((author) => author.id !== id),
        )
      } catch (err) {
        setError('Đã xảy ra lỗi khi xóa tác giả.')
      }
    }
  }

  const handleEdit = (author) => {
    setSelectedAuthor(author)
    setShowUpdateModal(true)
  }

  const handleSuccess = () => {
    fetchAuthors()
  }

  const handleSearch = () => {
    fetchAuthors() // Gọi hàm fetchAuthors khi nhấn nút tìm kiếm
  }

  if (loading) return <p>Đang tải dữ liệu...</p>
  if (error) return <p>{error}</p>

  return (
    <div className="flex flex-col h-screen p-4">
      <div className="flex justify-between mb-4">
        <div className="flex items-center w-1/3">
          <input
            type="text"
            placeholder="Tìm kiếm..."
            className="p-2 border border-gray-300 rounded w-full h-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            className="text-black p-2 rounded ml-2"
            onClick={handleSearch} // Gọi hàm tìm kiếm khi nhấn nút
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
        <h1 className="text-2xl font-bold">Tác giả</h1>
        <div className="flex space-x-4">

          <button
            className="bg-green-500 text-white p-2 rounded flex items-center h-10"
            onClick={() => {
              setSelectedAuthor(null) // Reset selected author
              setShowCreateModal(true) // Open Create Author Modal
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
        </select></div>


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
            {authors.length === 0 ? (
              <tr>
                <td
                  colSpan="5"
                  className="py-1 text-center"
                >
                  Không tìm thấy tác giả nào.
                </td>
              </tr>
            ) : (
              authors.map((author) => (
                <tr key={author.id}>
                  <td className="border py-1 text-center">{author.id}</td>
                  <td className="border py-1">{author.author_name}</td>
                  <td className="border py-1">{author.description}</td>
                  <td className="border py-1">{author.slug}</td>
                  <td className="border py-1 text-center">
                    <div className="flex justify-center space-x-1">
                      {' '}
                      {/* Centering buttons */}
                      <button
                        className="bg-yellow-500 text-white px-3 py-1 rounded flex items-center h-8" // Increased padding
                        onClick={() => handleEdit(author)}
                      >
                        <FaEdit className="mr-1 text-xs" />
                        Sửa
                      </button>
                      <button
                        className="bg-red-500 text-white px-3 py-1 rounded flex items-center h-8" // Increased padding
                        onClick={() => handleDelete(author.id)}
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

      <div className="flex justify-center my-4">
        <button
          className="border p-2"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          ‹
        </button>
        <span className="mx-2">{currentPage}</span>
        <button
          className="border p-2"
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          ›
        </button>
      </div>

      <UpdateAuthorModal
        show={showUpdateModal}
        onClose={() => setShowUpdateModal(false)}
        onSuccess={handleSuccess}
        initialData={selectedAuthor}
      />
      <AuthorModal
        show={showCreateModal} // Show Create Author Modal
        onClose={() => setShowCreateModal(false)} // Close Create Author Modal
        onSuccess={handleSuccess} // Handle success after creation
      />
    </div>
  )
}

export default UserPage
