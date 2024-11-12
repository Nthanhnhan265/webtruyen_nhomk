// export { createUser, deleteUser, getReviews, searchReviews, updateUser }
import axios, { AxiosError } from 'axios'
import MESSAGE from '../(routes)/dashboard/message'

// Create an instance of axios
const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  timeout: 2000,
})

// Utility function to get the value of a cookie by name
const getCookie = (name: string): string | null => {
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop()?.split(';')?.shift() ?? null
  return null
}

//=======Create========//
const createReview = async (data: FormData) => {
  try {
    const accessToken = getCookie('accessToken') // Retrieve token from cookies
    if (!accessToken) {
      throw new Error('No access token found')
    }

    const response = await api.post('/reviews', data, {
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

//=======Read========//
const getReviews = async (
  sortBy = 'id',
  order = 'DESC',
  page = 1,
  limit = 10,
) => {
  try {
    const accessToken = getCookie('accessToken') // Retrieve token from cookies
    if (!accessToken) {
      throw new Error('No access token found')
    }

    console.log(process.env.NODE_API_URL)
    const response = await api.get(
      `/reviews?sortBy=${sortBy}&order=${order}&page=${page}&limit=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    )
    console.log(response.data)
    return response.data
  } catch (error) {
    console.error(MESSAGE.user.fetchUserError, error)
    throw error
  }
}

//=======Search========//
const searchReviews = async (
  keyword: string,
  sortBy: string,
  order: string,
  page: number,
  limit: number,
) => {
  try {
    const accessToken = getCookie('accessToken') // Retrieve token from cookies
    if (!accessToken) {
      throw new Error('No access token found')
    }

    const response = await api.get(
      `/reviews/search?keyword=${keyword}&sortBy=${sortBy}&order=${order}&page=${page}&limit=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    )
    return response.data
  } catch (error) {
    console.error(MESSAGE.user.fetchUserError, error)
    throw error
  }
}

//=======Update========//
const updateReview = async (id: number, data: FormData) => {
  try {
    const accessToken = getCookie('accessToken') // Retrieve token from cookies
    if (!accessToken) {
      throw new Error('No access token found')
    }

    const response = await api.patch(`/reviews/${id}`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    const result = response.data
    if (!result.success) {
      throw new Error(result.message)
    }
    return result.data
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error?.response?.data?.message)
    } else if (error instanceof Error && error.message) {
      throw new Error(error.message)
    } else {
      console.error(error)
      throw new Error(MESSAGE.sys.unknownError)
    }
  }
}

//=======Delete========//
const deleteReview = async (id: number) => {
  try {
    const accessToken = getCookie('accessToken') // Retrieve token from cookies
    if (!accessToken) {
      throw new Error('No access token found')
    }

    const response: IResponse = await api.delete(`/reviews/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    const result = response.data
    console.log(result)
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

export { createReview, deleteReview, getReviews, searchReviews, updateReview }
