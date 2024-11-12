import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api", // API address
  timeout: 10000, // Timeout (milliseconds)
});

export const getChapters = async (page: number, limit: number) => {
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
export const chapterByStory = async (story_id: number, page: number) => {
  try {
    // Tạo đối tượng params cho truy vấn
    const params = {
      page: page, // Nếu không có, mặc định là trang 1
      story_id: story_id, // Nếu không có, mặc định lấy 10 chương
    };

    // Sử dụng axios để gọi API với params
    const response = await api.get(`/chapters/chapterByStory`, { params });

    // Trả về dữ liệu từ phản hồi
    return response.data;
  } catch (error) {
    console.error("Error fetching chapters:", error);
    throw error; // Quăng lỗi để xử lý ở chỗ khác
  }
};
export const getChapterBySlug = async (slug: string) => {
  try {
    // Tạo đối tượng params cho truy vấn
    const params = {
      slug: slug
    };

    // Sử dụng axios để gọi API với params
    const response = await api.get(`/chapters/${slug}`);
    // Trả về dữ liệu từ phản hồi
    return response.data;
  } catch (error) {
    console.error("Error fetching chapters:", error);
    throw error; // Quăng lỗi để xử lý ở chỗ khác
  }
};
export const getChapterByStoryidAll = async (id: number) => {
  try {
    const response = await api.get(`/chapters/getstory/${id}`); // Fetch chapter by ID
    return response.data;
  } catch (error) {
    console.error(`Error fetching chapter with id ${id}:`, error);
    throw error;
  }
};
// Function to delete a story by ID

// You can add more API calling functions here (add, update, etc. for stories)

export default {
  getChapters,
  getChapterByStoryidAll,
  chapterByStory,
  getChapterBySlug
};
