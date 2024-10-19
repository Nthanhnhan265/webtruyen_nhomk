// src/services/UserService.ts
import axios from 'axios'
interface Response {
  status: number
  success: boolean
  data: any
  message: string
  links: any
}
const api = axios.create({
  baseURL: 'http://localhost:3000/api', // Địa chỉ API
  timeout: 10000, // Thời gian chờ (mili giây)
})

export const createUsers = async (userData) => {
  try {
    const response = await api.post('/users', userData) // Gọi API để thêm người dùng
    const data = response.data
    console.log(data.message) // In ra thông báo thành công
    if (!data.success) {
      throw new Error(data.message) // Ném lỗi nếu API trả về lỗi
    }
    return data.data // Trả về dữ liệu người dùng mới được thêm
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response?.data.message || error.message)
    } else {
      console.log('Lỗi khi thêm người dùng:', error.message)
    }
  }
}

// Hàm để gọi API lấy danh sách người dùng
export const getUsers = async () => {
  try {
    const response = await api.get('/users') // Cập nhật endpoint
    return response.data // Trả về dữ liệu
  } catch (error) {
    console.error('Lỗi khi lấy danh sách người dùng:', error)
    throw error // Ném lỗi để xử lý ở nơi khác
  }
}

// Hàm để gọi API xóa người dùng
export const deleteUser = async (id: number) => {
  try {
    const response: Response = await api.delete(`/users/${id}`) // Cập nhật endpoint
    if ((response.success = false)) {
      throw new Error(response.message)
    }
    return response.data // Trả về kết quả nếu cần
  } catch (error) {
    console.error('Lỗi khi xóa người dùng:', error)
    throw error // Ném lỗi để xử lý ở nơi khác
  }
}

// Bạn có thể thêm nhiều hàm gọi API khác ở đây (thêm, sửa, xóa người dùng)

export default getUsers // Cập nhật export mặc định nếu cần
