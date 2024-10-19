// src/services/AuthorService.ts
import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3000/api', // Địa chỉ API
  timeout: 10000, // Thời gian chờ (mili giây)
})

// Hàm để gọi API lấy danh sách tác giả
export const getAuthors = async () => {
  try {
    const response = await api.get('/authors')
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

// Bạn có thể thêm nhiều hàm gọi API khác ở đây (thêm, sửa, xóa tác giả)

export default getAuthors

// Bạn có thể thêm nhiều hàm gọi API khác ở đây (thêm, sửa, xóa tác giả)
