// import axios, { AxiosError } from 'axios'
// import MESSAGE from '../(routes)/dashboard/message'

// const api = axios.create({
//   baseURL: 'http://localhost:3000/api',
//   timeout: 2000,
// })

// //=======Create========//
// const createUser = async (data: FormData) => {
//   try {
//     const response = await api.post('/users', data, {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
//       },
//     })
//     const result = response.data
//     if (!result.success) {
//       throw new Error(result.message)
//     }
//     const re: IUser = {
//       username: result.data.username,
//       email: result.data.email,
//       status: result.data.status,
//       role_id: result.data.role_id,
//       created_at: result.data.createdAt,
//       id: result.data.id,
//       avatar: '',
//     }
//     return re
//   } catch (error: any) {
//     if (error instanceof AxiosError) {
//       throw new Error(error?.response?.data?.message)
//     } else {
//       console.error(error)
//       throw new Error(MESSAGE.sys.unknownError)
//     }
//   }
// }
// //=======Read========//
// const getUsers = async (
//   sortBy = 'id',
//   order = 'DESC',
//   page = 1,
//   limit = 10,
// ) => {
//   try {
//     console.log(process.env.NODE_API_URL)
//     const response = await api.get(
//       `/users?sortBy=${sortBy}&order=${order}&page=${page}&limit=${limit}`,
//       {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
//         },
//       },
//     )
//     return response.data
//   } catch (error) {
//     console.error(MESSAGE.user.fetchUserError, error)
//     throw error
//   }
// }

// const getUserById = (id: number) => {
//   try {
//   } catch (error) {
//     if (error instanceof AxiosError) {
//       throw new Error(error?.response?.data?.message)
//     } else {
//       console.error(error)
//       throw new Error(MESSAGE.sys.unknownError)
//     }
//   }
// }

// const searchUsers = async (
//   keyword: string,
//   sortBy: string,
//   order: string,
//   page: number,
//   limit: number,
// ) => {
//   try {
//     // Gửi yêu cầu API với query params page và limit
//     const response = await api.get(
//       `/users/search?keyword=${keyword}&sortBy=${sortBy}&order=${order}&page=${page}&limit=${limit}`,
//       {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
//         },
//       },
//     )
//     return response.data
//   } catch (error) {
//     console.error(MESSAGE.user.fetchUserError, error)
//     throw error
//   }
// }
// //=======Update======//
// const updateUser = async (id: number, data: FormData) => {
//   try {
//     const response = await api.patch(`/users/${id}`, data, {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
//       },
//     })
//     const result = response.data
//     if (!result.success) {
//       throw new Error(result.message)
//     }
//     return result.data // Trả về dữ liệu người dùng đã cập nhật
//   } catch (error: any) {
//     if (error instanceof AxiosError) {
//       throw new Error(error?.response?.data?.message)
//     } else if (error.message) {
//       throw new Error(error.message)
//     } else {
//       console.error(error)
//       throw new Error(MESSAGE.sys.unknownError)
//     }
//   }
// }

// //=======Delete========//
// const deleteUser = async (id: number) => {
//   try {
//     const response: IResponse = await api.delete(`/users/${id}`, {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
//       },
//     })
//     const result = response.data
//     console.log(result)
//     if (!result.success) {
//       throw new Error(result.message)
//     }
//     return result
//   } catch (error) {
//     if (error instanceof AxiosError) {
//       throw new Error(error?.response?.data?.message)
//     } else {
//       console.error(error)
//       throw new Error(MESSAGE.sys.unknownError)
//     }
//   }
// }

// export { createUser, deleteUser, getUsers, searchUsers, updateUser }
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
const createUser = async (data: FormData) => {
  try {
    const accessToken = getCookie('accessToken') // Retrieve token from cookies
    if (!accessToken) {
      throw new Error('No access token found')
    }
    const response = await api.post('/users', data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    const result = response.data
    if (!result.success) {
      throw new Error(result.message)
    }
    const re: IUser = {
      username: result.data.username,
      email: result.data.email,
      status: result.data.status,
      role_id: result.data.role_id,
      created_at: result.data.createdAt,
      id: result.data.id,
      avatar: '',
    }
    return re
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
const getUsers = async (
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
      `/users?sortBy=${sortBy}&order=${order}&page=${page}&limit=${limit}`,
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

//=======Search========//
const searchUsers = async (
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
      `/users/search?keyword=${keyword}&sortBy=${sortBy}&order=${order}&page=${page}&limit=${limit}`,
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
const updateUser = async (id: number, data: FormData) => {
  try {
    const accessToken = getCookie('accessToken') // Retrieve token from cookies
    if (!accessToken) {
      throw new Error('No access token found')
    }

    const response = await api.patch(`/users/${id}`, data, {
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
    } else if (error.message) {
      throw new Error(error.message)
    } else {
      console.error(error)
      throw new Error(MESSAGE.sys.unknownError)
    }
  }
}

//=======Delete========//
const deleteUser = async (id: number) => {
  try {
    const accessToken = getCookie('accessToken') // Retrieve token from cookies
    if (!accessToken) {
      throw new Error('No access token found')
    }

    const response: IResponse = await api.delete(`/users/${id}`, {
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

export { createUser, deleteUser, getUsers, searchUsers, updateUser }
