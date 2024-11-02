import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000/api", // API address
  timeout: 10000, // Timeout (milliseconds)
});

export const getChapters = async (page, limit) => {
  try {
    // Tạo đối tượng params cho truy vấn
    const params = {
      page: page, // Nếu không có, mặc định là trang 1
      limit: limit, // Nếu không có, mặc định lấy 10 chương
    };

    // Sử dụng axios để gọi API với params
    const response = await api.get(`/chapters`, { params });

    // Trả về dữ liệu từ phản hồi
    return response.data;
  } catch (error) {
    console.error("Error fetching chapters:", error);
    throw error; // Quăng lỗi để xử lý ở chỗ khác
  }
};
export const getChapterById = async (chapterId: number) => {
  try {
    const response = await api.get(`/chapters/${chapterId}`); // Fetch chapter by ID
    return response.data;
  } catch (error) {
    console.error(`Error fetching chapter with id ${chapterId}:`, error);
    throw error;
  }
};
// Function to delete a story by ID

// You can add more API calling functions here (add, update, etc. for stories)

export default {
  getChapters,
  getChapterById,
};
