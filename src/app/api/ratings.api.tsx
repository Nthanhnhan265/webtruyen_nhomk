import axios, { AxiosError } from 'axios'
import MESSAGE from '../(routes)/dashboard/message'

// Create an instance of axios
const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  timeout: 2000,
})

// Utility function to get the value of a cookie by name
const getCookie = (name: string): string | null => {
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop()?.split(';')?.shift() ?? null
  return null
}

//=======Add Rating========//
const addRating = async (data: {
  user_id: number
  story_id: number
  star: number
  comment: string
}) => {
  try {
    const accessToken = getCookie('accessToken') // Retrieve token from cookies
    if (!accessToken) {
      throw new Error('No access token found')
    }

    const response = await api.post('/ratings/add', data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    const result = response.data
    if (!result.success) {
      throw new Error(result.message)
    }
    return result
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error?.response?.data?.message)
    } else {
      console.error(error)
      throw new Error(MESSAGE.sys.unknownError)
    }
  }
}

//=======Get Ratings by Story========//
const fetchRatingsByStory = async (storyId: number) => {
  try {
    const accessToken = getCookie('accessToken') // Lấy token từ cookies
    if (!accessToken) {
      throw new Error('No access token found')
    }

    const response = await api.post(`/ratings/story/${storyId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    return response.data
  } catch (error) {
    console.error(MESSAGE.user.fetchUserError, error)
    throw error
  }
}

//=======Get Ratings by User========//
const fetchRatingsByUser = async (userId: number) => {
  try {
    const accessToken = getCookie('accessToken') // Retrieve token from cookies
    if (!accessToken) {
      throw new Error('No access token found')
    }

    const response = await api.get(`/ratings/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    return response.data
  } catch (error) {
    console.error(MESSAGE.user.fetchUserError, error)
    throw error
  }
}

//=======Update Rating========//
const editRating = async (
  storyId: number,
  userId: number,
  star: number,
  comment: string,
) => {
  try {
    const accessToken = getCookie('accessToken') // Retrieve token from cookies
    if (!accessToken) {
      throw new Error('No access token found')
    }

    const response = await api.patch(
      `/ratings/${storyId}`,
      { user_id: userId, star, comment },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    )
    return response.data
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error?.response?.data?.message)
    } else {
      console.error(error)
      throw new Error(MESSAGE.sys.unknownError)
    }
  }
}

//=======Delete Rating========//
const removeRating = async (storyId: number, userId: number) => {
  try {
    const accessToken = getCookie('accessToken') // Retrieve token from cookies
    if (!accessToken) {
      throw new Error('No access token found')
    }

    const response = await api.delete(`/ratings/${storyId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: { user_id: userId },
    })
    return response.data
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error?.response?.data?.message)
    } else {
      console.error(error)
      throw new Error(MESSAGE.sys.unknownError)
    }
  }
}

export {
  addRating,
  editRating,
  fetchRatingsByStory,
  fetchRatingsByUser,
  removeRating,
}
