import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3000/api', // API address
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
export default {
    getAllgenreByName,
}
