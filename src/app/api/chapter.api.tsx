import axios, { AxiosError } from 'axios'
import MESSAGE from '../message'

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  timeout: 10000, // Timeout (milliseconds)
})

export const getChapters = async (page: number, limit: number) => {
  try {
    // Tạo đối tượng params cho truy vấn
    const params = {
      page: page, // Nếu không có, mặc định là trang 1
      limit: limit, // Nếu không có, mặc định lấy 10 chương
    }

    // Sử dụng axios để gọi API với params
    const response = await api.get(`/chapters`, { params })

    // Trả về dữ liệu từ phản hồi
    return response.data
  } catch (error) {
    console.error('Error fetching chapters:', error)
    throw error // Quăng lỗi để xử lý ở chỗ khác
  }
}
export const chapterByStory = async (story_id: number, page: number) => {
  try {
    // Tạo đối tượng params cho truy vấn
    const params = {
      page: page, // Nếu không có, mặc định là trang 1
      story_id: story_id, // Nếu không có, mặc định lấy 10 chương
    }

    // Sử dụng axios để gọi API với params
    const response = await api.get(`/chapters/chapterByStory`, { params })

    // Trả về dữ liệu từ phản hồi
    return response.data
  } catch (error) {
    console.error('Error fetching chapters:', error)
    throw error // Quăng lỗi để xử lý ở chỗ khác
  }
}
export const getChapterBySlug = async (slug: string) => {
  try {
    // Tạo đối tượng params cho truy vấn

    // Sử dụng axios để gọi API với params
    const response = await api.get(`/chapters/getChapterByslug/${slug}`)
    // Trả về dữ liệu từ phản hồi
    return response.data
  } catch (error) {
    console.error('Error fetching chapters:', error)
    throw error // Quăng lỗi để xử lý ở chỗ khác
  }
}
export const getChapterByStoryidAll = async (id: number) => {
  try {
    const response = await api.get(`/chapters/getstory/${id}`) // Fetch chapter by ID
    return response.data
  } catch (error) {
    console.error(`Error fetching chapter with id ${id}:`, error)
    throw error
  }
}
// Function to delete a story by ID

// You can add more API calling functions here (add, update, etc. for stories)

// Utility function to get the value of a cookie by name
export const getCookie = (name: string): string | null => {
  try {
    const value = `; ${document.cookie}`
    const parts = value.split(`; ${name}=`)
    if (parts.length === 2) return parts.pop()?.split(';')?.shift() ?? null
  } catch (error) {
    console.log(error)
    return null
  }
  return null
}

// Lấy thông tin truyện và danh sách chương dựa trên ID truyện
export async function getStoryAndChapters(
  id: number,
  accessToken: string,
  option?: {
    sortBy?: string
    orderBy?: string
    keywords?: string
    page?: number
    limit?: number
    includeStory?: boolean // Thêm tham số `includeStory`
  },
) {
  try {
    // Lấy accessToken từ cookie nếu không truyền từ server-side
    let token = accessToken
    if (!token) {
      token = getCookie('accessToken') || ''
      if (!token) {
        throw new Error(MESSAGE.sys.noAccessToken)
      }
    }

    // Xây dựng query string
    const params = new URLSearchParams()
    if (option?.sortBy) params.append('sortBy', option.sortBy)
    if (option?.orderBy) params.append('order', option.orderBy)
    if (option?.keywords) params.append('keywords', option.keywords)
    if (option?.page) params.append('page', option.page.toString())
    if (option?.limit) params.append('limit', option.limit.toString())
    if (option?.includeStory !== undefined)
      params.append('includeStory', String(option.includeStory)) // Thêm `includeStory` nếu có

    const url = `/story/${id}/chapters?${params.toString()}`

    // Gửi request tới API
    const response = await api.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    const result = response.data

    if (!result.success) {
      throw new Error(result.message)
    }
    const { story, chapters } = result.data
    const pagination = result.pagination
    return { story, chapters, pagination }
  } catch (error) {
    console.error('Error fetching story and chapters:', error)
    if (error instanceof AxiosError) {
      throw new Error(error?.response?.data?.message || MESSAGE.sys.fetchError)
    } else {
      throw new Error(MESSAGE.sys.unknownError)
    }
  }
}

/** GET CHAPTER BY ID
 * @param id
 * @param accessToken
 * @returns
 */
export async function getChapterId(id: number, accessToken?: string) {
  try {
    let token = accessToken
    if (!token) {
      console.log('api>>', true)
      token = getCookie('accessToken') || ''
      if (!token) {
        throw new Error(MESSAGE.sys.noAccessToken)
      }
    }
    const response = await api.get(`/chapters/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    const result = response.data
    if (!result.success) {
      throw new Error(result.message)
    }
    console.log(result)
    const chapter = result.data
    return chapter
  } catch (error) {
    console.error(error)
    if (error instanceof AxiosError) {
      throw new Error(error?.response?.data?.message || MESSAGE.sys.fetchError)
    } else {
      throw new Error(MESSAGE.sys.unknownError)
    }
  }
}

/**DELETE CHAPTER BY ID
 *
 * @param id
 * @returns
 */
export const deleteChapter = async (id: number) => {
  try {
    const accessToken = getCookie('accessToken')
    if (!accessToken) {
      throw new Error(MESSAGE.sys.noAccessToken)
    }

    const response = await api.delete(`/chapters/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    const result = response.data
    if (!result.success) {
      throw new Error(result.message || MESSAGE.chapter.deleteFailed)
    }

    return result
  } catch (error) {
    console.log(error)
    if (error instanceof AxiosError) {
      throw new Error(MESSAGE.chapter.deleteFailed)
    } else {
      throw new Error(MESSAGE.sys.unknownError)
    }
  }
}

/** CREATE NEW CHAPTER
 * @param chapter_name
 * @param content
 * @param story_id
 * @param slug
 * @param views
 * @param status
 * @param chapter_order
 * @returns
 */
export const createChapter = async (
  chapter_name: string,
  content: string,
  story_id: number,
  slug: string,
  status: boolean,
  chapter_order: number,
  accessToken?: string,
) => {
  try {
    // Lấy accessToken từ cookie nếu không truyền từ server-side
    let token = accessToken
    if (!token) {
      token = getCookie('accessToken') || ''
      if (!token) {
        throw new Error(MESSAGE.sys.noAccessToken)
      }
    }

    const chapterData = {
      chapter_name,
      content,
      story_id,
      slug,
      status,
      chapter_order,
    }

    const response = await api.post('/chapters', chapterData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    const result = response.data
    if (!result.success) {
      throw new Error(result.message || MESSAGE.chapter.createFailed)
    }

    return result
  } catch (error) {
    console.log(error)
    if (error instanceof AxiosError) {
      throw new Error(
        error?.response?.data?.message || MESSAGE.chapter.createFailed,
      )
    } else {
      console.error(error)
      throw new Error(MESSAGE.sys.unknownError)
    }
  }
}

/** UPDATE THE CHAPTER
 * @param id
 * @param chapter_name
 * @param content
 * @param story_id
 * @param slug
 * @param views
 * @param status
 * @param chapter_order
 * @returns
 */
export const updateChapter = async (
  id: number,
  chapter_name: string,
  content: string,
  story_id: number,
  slug: string,
  views: number,
  status: boolean,
  chapter_order: number,
) => {
  try {
    const accessToken = getCookie('accessToken')
    if (!accessToken) {
      throw new Error(MESSAGE.sys.noAccessToken)
    }

    const chapterData = {
      chapter_name,
      content,
      story_id,
      slug,
      views,
      status,
      chapter_order,
    }

    const response = await api.patch(`/chapters/${id}`, chapterData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    const result = response.data
    if (!result.success) {
      throw new Error(result.message || MESSAGE.chapter.updateFailed)
    }

    return MESSAGE.chapter.updateSuccess
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error?.response?.data?.message || MESSAGE.sys.fetchError)
    } else {
      console.error(error)
      throw new Error(MESSAGE.sys.unknownError)
    }
  }
}
