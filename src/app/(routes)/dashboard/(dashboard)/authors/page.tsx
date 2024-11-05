'use client'
import { deleteAuthor, getAuthors } from '@/app/_api/authorService'
import { useEffect, useState } from 'react'
import { Pagination } from "flowbite-react";
import { Button } from 'flowbite-react'

import { FaEdit, FaPlus, FaSearch, FaTrash } from 'react-icons/fa'
import AuthorModal from '../../_components/author/AuthorModal'
import UpdateAuthorModal from '../../_components/author/UpdateAuthorModal'
import Header from '../../_components/header'
interface Author {
  id: number;
  author_name: string;
  description: string;
  slug: string;
}
const AuthorPage = () => {
  //============ Declare variables and hooks ================//
  const [authors, setAuthors] = useState<Author[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showUpdateModal, setShowUpdateModal] = useState(false)
  const [showCreateModal, setShowCreateModal] = useState(false) // New state for Create Modal
  const [selectedAuthor, setSelectedAuthor] = useState<Author | null>(null)
  const [sortOrder, setSortOrder] = useState('asc')
  const [searchTerm, setSearchTerm] = useState('')
  const [keyword, setKeyWord] = useState<string>('')
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, settotalPages] = useState(1);

  const limit = 4

  const fetchAuthors = async () => {
    setLoading(true)
    try {
      const response = await getAuthors({
        author_name: keyword,
        description: keyword,
        sort: sortOrder,
        page: currentPage,
      })
      setAuthors(response.authors)
      settotalPages(response.totalPages)
      setLoading(false)
    } catch (err) {
      setError('Đã xảy ra lỗi khi lấy dữ liệu.')
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAuthors()
  }, [sortOrder, currentPage])

  const handleDelete = async (id: number) => {
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
  const handleSuccess = (data: Author) => {
    // Handle success, maybe update state or refetch data
  };

  const handleEdit = (author: Author) => {
    setSelectedAuthor(author)
    setShowUpdateModal(true)
  }

  const handleSearch = async (keyword: string) => {
    console.log('checked>>', keyword)
    setKeyWord(keyword)
  }
  const search = () => {
    fetchAuthors()
    setKeyWord('')

  }
  const onPageChange = (page: number) => setCurrentPage(page);


  if (loading) return <p>Đang tải dữ liệu...</p>
  if (error) return <p>{error}</p>

  return (
    <div className="flex flex-col h-screen">
      <div className="flex justify-between mb-2 p-4">
        <div className="flex items-center">
          <Header handleSearch={handleSearch} />
          <button
            className="text-black p-2 rounded ml-2 mb-2"
            onClick={() => search()}
          >
            <FaSearch className="mr-2" />
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

      <div className="flex justify-between items-center px-4">
        <h1 className="text-2xl font-bold">Tác giả</h1>
        <Button
          color="success"
          onClick={() => {
            setSelectedAuthor(null);
            setShowCreateModal(true);
          }}
        >
          + Tạo mới
        </Button>
      </div>
      <div className="mb-4 px-4">
        <select
          className="p-2 border border-gray-300 rounded"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="asc">Sắp xếp theo tên A-Z</option>
          <option value="desc">Sắp xếp theo tên Z-A</option>
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
            {authors.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-4 text-center">
                  Không tìm thấy tác giả nào.
                </td>
              </tr>
            ) : (
              authors.map((author) => (
                <tr className="bg-white" key={author.id}>
                  <td className="py-2 px-1 text-center">{author.id}</td>
                  <td className="py-2 px-1 text-center">{author.author_name}</td>
                  <td className="py-2 px-1 text-center">{author.description}</td>
                  <td className="py-2 px-1 text-center">{author.slug}</td>
                  <td className="py-2 px-1 text-center">
                    <div className="flex justify-center space-x-1">
                      <Button color="warning" onClick={() => handleEdit(author)}>
                        Sửa
                      </Button>
                      <Button color="failure" onClick={() => handleDelete(author.id)}>
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
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
        </div>
      </div>

      <UpdateAuthorModal
        show={showUpdateModal}
        onClose={() => setShowUpdateModal(false)}
        onSuccess={handleSuccess}
        initialData={selectedAuthor}
      />
      <AuthorModal
        show={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSuccess={handleSuccess}
      />
    </div>
  );
}

export default AuthorPage;