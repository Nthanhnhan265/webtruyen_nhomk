import axios, { AxiosError } from 'axios'
import MESSAGE from '../(routes)/dashboard/message'

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  timeout: 5000,
})

//=======Create========//
const createUser = async (data: IDashboardUserForm) => {
  try {
    const response = await api.post('/users', data)
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
  } catch (error: any) {
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
    // Gửi yêu cầu API với query params page và limit
    const response = await api.get(
      `/users?sortBy=${sortBy}&order=${order}&page=${page}&limit=${limit}`,
    )
    return response.data
  } catch (error) {
    console.error(MESSAGE.user.fetchUserError, error)
    throw error
  }
}

const getUserById = (id: number) => {
  try {
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error?.response?.data?.message)
    } else {
      console.error(error)
      throw new Error(MESSAGE.sys.unknownError)
    }
  }
}

const searchUsers = async (
  keyword: string,
  sortBy: string,
  order: string,
  page: number,
  limit: number,
) => {
  try {
    // Gửi yêu cầu API với query params page và limit
    const response = await api.get(
      `/users/search?keyword=${keyword}&sortBy=${sortBy}&order=${order}&page=${page}&limit=${limit}`,
    )
    return response.data
  } catch (error) {
    console.error(MESSAGE.user.fetchUserError, error)
    throw error
  }
}
//=======Update======//
const updateUser = async (id: number, data: IDashboardUserForm) => {
  try {
    const response = await api.patch(`/users/${id}`, data)
    const result = response.data
    if (!result.success) {
      throw new Error(result.message)
    }
    return result.data // Trả về dữ liệu người dùng đã cập nhật
  } catch (error: any) {
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
    const response: IResponse = await api.delete(`/users/${id}`)
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
