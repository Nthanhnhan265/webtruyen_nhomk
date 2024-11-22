

import axios, { AxiosError } from 'axios'
import MESSAGE from '../message'
import { log } from 'console'

const api = axios.create({
  baseURL: "http://localhost:3000/api", // API address
  timeout: 10000, // Timeout (milliseconds)
});
interface getAllStorieView {
  author_storie: string
  description: string
  sort: number
  page: number
}
interface getAllStories {
  author_storie: string
  description: string
  story_name: string
  sortBy: string
  sort: number
  page: number
}
//  v
//=======Create========//
export const createStory = async (data: FormData, selectedGenre: any) => {
  try {
    const response = await api.post('/story/create', data)
    console.log("check tao cau truyen, ", response);
    {
      selectedGenre && selectedGenre.map(async (genre: number) => {
        const newGenreStory = { story_id: response.data.story.data.id, genre_id: genre }
        const GenreStory = await api.post('/story-genre', newGenreStory)
      })
    }
    if (response.data.success == true) {
      console.log();
      ("Tạo câu truyện thành công")
    }
    const result = response.data
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
    const response = await api.put(`/story/update/${id}`, data)

    if (response.data.success == true) {
      console.log();
      ("cập nhật câu truyện thành công")
    }
    const result = response.data
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
export const getStories = async (id: number) => {
  try {
    const response = await api.get(`/story/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching stories:", error);
    throw error;
  }
};
export const getStoryBySlug = async (slug: string) => {
  try {
    const response = await api.get(`/story/getStoryBySlug/${slug}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching stories:", error);
    throw error;
  }
};
export const getStoryById = async (id: number) => {
  try {
    const response = await api.get(`/story/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching stories:", error);
    throw error;
  }
};
export const getAllStorieView = async ({
  author_storie,
  description,
  sort,
  page,
}: getAllStorieView) => {
  try {
    const response = await api.get(`/story/getAllStorieView`, {
      params: {
        author_storie,
        description,
        sort,
        page
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching stories:", error);
    throw error;
  }
};
export const getAllStorieNew = async ({
  author_storie,
  description,
  sort,
  page,
}: getAllStories) => {
  try {
    // Use backticks for template literals
    const response = await api.get(`/story/getAllStorieNew`, {
      params: {
        author_storie, // Tìm kiếm theo tên tác giả
        description, // Tìm kiếm theo mô tả (nếu cần)
        sort, // Sắp xếp
        page, // Trang hiện tại   // Giới hạn số lượng tác giả trên mỗi trang
      },
    }); // Adjust endpoint to fetch stories
    return response.data; // Return the data
  } catch (error) {
    console.error("Error fetching stories:", error);
    throw error; // Rethrow error for handling elsewhere
  }
};
export const getAllStories = async ({
  story_name,
  description,
  sortBy,
  sort,
  page,
}: getAllStories) => {
  try {
    const response = await api.get(`/story`, {
      params: {
        story_name,
        description,
        sortBy,
        sort,
        page,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching stories:", error);
    throw error;
  }
};
export const getSearchStorie = async (
  keyword: string,
  page: number
) => {
  try {
    const response = await api.get(`/story/search/${keyword}`, {
      params: {
        page,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching stories:", error);
    throw error;
  }
};

export const deleteStory = async (id: number) => {
  try {
    const response = await api.delete(`/story/delete/${id}`);
    const deleteStoryId = await api.delete(`/chapters/handleDeleteStoryId/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting story:", error);
    throw error;
  }
};
export default {
  getStories,
  deleteStory,
  getAllStories,
  getAllStorieView,
  getAllStorieNew,
  getStoryBySlug,
  createStory,
  getStoryById,
  getSearchStorie
}

