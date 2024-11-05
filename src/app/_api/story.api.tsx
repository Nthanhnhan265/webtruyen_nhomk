import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3000/api', // API address
  timeout: 10000, // Timeout (milliseconds)
})

// Function to fetch the list of stories
export const getStories = async (id: number) => {
  try {
    // Use backticks for template literals
    const response = await api.get(`/story/${id}`) // Adjust endpoint to fetch stories
    return response.data // Return the data
  } catch (error) {
    console.error('Error fetching stories:', error)
    throw error // Rethrow error for handling elsewhere
  }
}
export const getAllStories = async ({
  author_storie,
  description,
  sort,
  page,
}) => {
  try {
    // Use backticks for template literals
    const response = await api.get(`/story`, {
      params: {
        author_storie, // Tìm kiếm theo tên tác giả
        description, // Tìm kiếm theo mô tả (nếu cần)
        sort, // Sắp xếp
        page, // Trang hiện tại   // Giới hạn số lượng tác giả trên mỗi trang
      },
    }) // Adjust endpoint to fetch stories
    return response.data // Return the data
  } catch (error) {
    console.error('Error fetching stories:', error)
    throw error // Rethrow error for handling elsewhere
  }
}

// Function to delete a story by ID
export const deleteStory = async (id: number) => {
  try {
    const response = await api.delete(`/story/delete/${id}`) // Use the correct endpoint for deleting a story
    return response.data // Return the result if needed
  } catch (error) {
    console.error('Error deleting story:', error)
    throw error // Rethrow error for handling elsewhere
  }
}

// You can add more API calling functions here (add, update, etc. for stories)

export default {
  getStories,
  deleteStory,
  getAllStories,
}
