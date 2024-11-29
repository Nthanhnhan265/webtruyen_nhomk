import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // API address
  timeout: 10000, // Timeout (milliseconds)
})

export const getAllgenreByName = async () => {
  try {
    const response = await api.get(`/genres`)
    // Trả về dữ liệu từ phản hồi
    return response.data
  } catch (error) {
    console.error('Error fetching chapters:', error)
    throw error // Quăng lỗi để xử lý ở chỗ khác
  }
}
export const createGenre = async (data: unknown) => {
  try {
    const response = await api.post(`/genres`, data)
    // Trả về dữ liệu từ phản hồi
    return response.data
  } catch (error) {
    console.error('Error fetching chapters:', error)
    throw error // Quăng lỗi để xử lý ở chỗ khác
  }
}
export const updateGenre = async (id: number, data: unknown) => {
  try {
    console.log('chek', data)

    const response = await api.put(`/genres/${id}`, data)
    // Trả về dữ liệu từ phản hồi
    return response.data
  } catch (error) {
    console.error('Error fetching chapters:', error)
    throw error // Quăng lỗi để xử lý ở chỗ khác
  }
}
export const getAllgenre = async (
  keyword: string,
  sortBy: string,
  order: string,
  page: number,
) => {
  try {
    const response = await api.get(`/genres/getAllgenres`, {
      params: {
        keyword,
        sortBy,
        order,
        page,
        // Giới hạn số lượng tác giả trên mỗi trang
      },
    })
    // Trả về dữ liệu từ phản hồi
    return response.data
  } catch (error) {
    console.error('Error fetching chapters:', error)
    throw error // Quăng lỗi để xử lý ở chỗ khác
  }
}
export const deleteGenre = async (id: number) => {
  try {
    const response = await api.delete(`/genres/${id}`)
    // Trả về dữ liệu từ phản hồi
    return response.data
  } catch (error) {
    console.error('Error fetching chapters:', error)
    throw error // Quăng lỗi để xử lý ở chỗ khác
  }
}
export const getByGenreId = async (id: number) => {
  try {
    const response = await api.get(`/genres/${id}`)
    // Trả về dữ liệu từ phản hồi
    return response.data
  } catch (error) {
    console.error('Error fetching chapters:', error)
    throw error // Quăng lỗi để xử lý ở chỗ khác
  }
}
export default {
  getAllgenreByName,
  getAllgenre,
  getByGenreId,
  deleteGenre,
}
