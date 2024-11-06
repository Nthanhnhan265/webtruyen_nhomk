import axios, { AxiosError } from 'axios'
import MESSAGE from '../message'
import { log } from 'console'

const api = axios.create({
  baseURL: 'http://localhost:3000/api', // API address
  timeout: 10000, // Timeout (milliseconds)
})

//=======Create========//
export const createStory = async (data: FormData, selectedCategories) => {
  try {
    // alert(JSON.stringify(selectedCategories))
    const response = await api.post('/story/create', data)
    console.log("check tao cau truyen, ", response);

    {
      // alert(JSON.stringify(response))

      selectedCategories && selectedCategories.map(async (categorie) => {
        const newGenreStory = { story_id: response.data.story.data.id, genre_id: categorie }
        const GenreStory = await api.post('/story-genre', newGenreStory)
      })

    }
    if (response.data.success == true) {
      alert("Tạo câu truyện thành công")
    }
    const result = response.data
    // alert("result" + JSON.stringify(result))
    // if (!result.success) {
    //   throw new Error(result.message)
    // }
    console.log(result)
    return null
  } catch (error: any) {
    if (error instanceof AxiosError) {
      throw new Error(error?.response?.data?.message)
    } else {
      console.error(error)
      throw new Error(MESSAGE.sys.unknownError)
    }
  }
}
export const updateStory = async (data: FormData, id: number) => {
  try {
    // alert(JSON.stringify(id))
    const response = await api.put(`/story/update/${id}`, data)
    // console.log("check tao cau truyen, ", response);

    {
      // alert(JSON.stringify(response))
      // selectedCategories && selectedCategories.map(async (categorie) => {
      //   const newGenreStory = { story_id: response.data.story.data.id, genre_id: categorie }
      //   const GenreStory = await api.post('/story-genre', newGenreStory)
      // })

    }
    if (response.data.success == true) {
      alert("cập nhật câu truyện thành công")
    }
    const result = response.data
    // alert("result" + JSON.stringify(result))
    // if (!result.success) {
    //   throw new Error(result.message)
    // }
    console.log(result)
    return null
  } catch (error: any) {
    if (error instanceof AxiosError) {
      throw new Error(error?.response?.data?.message)
    } else {
      console.error(error)
      throw new Error(MESSAGE.sys.unknownError)
    }
  }
}
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
  story_name,
  description,
  sort,
  page,
}) => {
  try {
    // Use backticks for template literals
    const response = await api.get(`/story`, {
      params: {
        story_name, // Tìm kiếm theo tên tác giả
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
  createStory
}
