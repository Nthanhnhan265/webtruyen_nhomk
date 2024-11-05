// src/services/AuthorService.ts
import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8080/api', // Địa chỉ API
  timeout: 10000, // Thời gian chờ (mili giây)
})

// Hàm để gọi API lấy danh sách tác giả
export const getAuthors = async ({ author_name, description, sort, page }) => {
  console.log('check sortOrder', sort)
  console.log('check author_name', author_name)
  console.log('check description', description)
  console.log('check page', page)
  // console.log('check limit', limit);

  try {
    const response = await api.get('/authors', {
      params: {
        author_name, // Tìm kiếm theo tên tác giả
        description, // Tìm kiếm theo mô tả (nếu cần)
        sort, // Sắp xếp
        page, // Trang hiện tại   // Giới hạn số lượng tác giả trên mỗi trang
      },
    })
    return response.data // Trả về dữ liệu
  } catch (error) {
    console.error('Lỗi khi lấy danh sách tác giả:', error)
    throw error // Ném lỗi để xử lý ở nơi khác
  }
}
export const getAuthorsName = async () => {
  try {
    const response = await api.get('/authorsName', {
    })
    return response.data // Trả về dữ liệu
  } catch (error) {
    console.error('Lỗi khi lấy danh sách tác giả:', error)
    throw error // Ném lỗi để xử lý ở nơi khác
  }
}

export const deleteAuthor = async (id) => {
  try {
    const response = await api.delete(`/authors/delete/${id}`) // Sử dụng axios để gửi yêu cầu DELETE
    return response.data // Trả về kết quả nếu cần
  } catch (error) {
    console.error('Lỗi khi xóa tác giả:', error)
    throw error // Ném lỗi để xử lý ở nơi khác
  }
}

export const createAuthor = async (authorData) => {
  try {
    const response = await api.post('/authors/create', authorData) // Adjust the endpoint if necessary
    return response.data // Return the response data
  } catch (error) {
    console.error('Error creating author:', error)
    throw error // Throw error for handling in the calling function
  }
}
export const updateAuthor = async (id, authorData) => {
  try {
    const response = await api.put(`/authors/update/${id}`, authorData) // Adjust the endpoint if necessary
    return response.data // Return the response data
  } catch (error) {
    console.error('Error updating author:', error)
    throw error // Throw error for handling in the calling function
  }
}

// Bạn có thể thêm nhiều hàm gọi API khác ở đây (thêm, sửa, xóa tác giả)

export default {
  getAuthors,
  updateAuthor,
  createAuthor,
  deleteAuthor,
}

// Bạn có thể thêm nhiều hàm gọi API khác ở đây (thêm, sửa, xóa tác giả)
