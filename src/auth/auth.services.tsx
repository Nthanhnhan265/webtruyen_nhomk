import axios, { AxiosError } from 'axios'
import MESSAGE from '../app/message'
const apiNext = axios.create({
  baseURL: process.env.NEXT_API_URL,
  timeout: 3001,
})
const apiNode = axios.create({
  baseURL: process.env.NODE_API_URL,
  timeout: 3000,
})
/** Handle login
 * Xử lý đăng nhập khi truyền vào email và password
 * nhân về thông tin người dùng và access token
 * @param email
 * @param password
 */
async function handleLogin(email: string, password: string) {
  try {
    const respone = await apiNext.post('api/login', { email, password })
    const result = respone.data
    if (!result.success) {
      throw new Error(result.message)
    }
    return result
  } catch (error) {
    if (error instanceof AxiosError) {
      throw Error(error?.response?.data?.message)
    }
    throw Error(MESSAGE.sys.unknownError)
  }
}
/** Lấy thông tin người dùng
 * @param accessToken
 * @returns
 */
async function handleGetProfileInfo(accessToken: string) {
  try {
    // const accessToken = await getAccessToken()
    const respone = await apiNode.get('/auth/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    const result = respone.data
    // console.log('called')
    if (!result.success) {
      throw new Error(result.message)
    }
    return result.data
  } catch (error) {
    // if (error instanceof AxiosError) {
    //   console.log(error)
    // }
    console.log('error56::', error)
    // throw error
  }
}

/** Cập nhật mật khẩu
 * Gửi yêu cầu để thay đổi mật khẩu người dùng.
 * @param accessToken Token xác thực
 * @param currentPassword Mật khẩu hiện tại
 * @param newPassword Mật khẩu mới
 * @param confirmPassword Xác nhận mật khẩu mới
 * @returns
 */
async function handleUpdatePassword(
  accessToken: string,
  currentPassword: string,
  newPassword: string,
  confirmPassword: string,
) {
  try {
    const response = await apiNext.patch(
      '/api/auth/me/password',
      { currentPassword, newPassword, confirmPassword },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    )

    const result = response.data
    console.log(result)

    if (!result.success) {
      throw new Error(result.message)
    }

    return result.message // Trả về thông báo thành công
  } catch (error) {
    console.log(error)
    if (error instanceof AxiosError) {
      throw Error(error?.response?.data?.message || MESSAGE.sys.unknownError)
    }
    throw Error(MESSAGE.sys.unknownError)
  }
}
/**
 * Cập nhật avatar người dùng
 * Gửi file ảnh để cập nhật avatar.
 * @param accessToken Token xác thực
 * @param avatarFile File ảnh cần upload
 * @returns URL avatar mới
 */
async function handleUpdateAvatar(accessToken: string, avatarFile: File) {
  try {
    // Tạo FormData để gửi file
    const formData = new FormData()
    formData.append('avatar', avatarFile)
    console.log(avatarFile)
    // Gửi yêu cầu cập nhật avatar
    const response = await apiNext.patch('/api/auth/me/avatar', formData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'multipart/form-data',
      },
    })

    const result = response.data
    console.log(result)

    if (!result.success) {
      throw new Error(result.message)
    }

    return result.data.avatarUrl // Trả về URL avatar mới
  } catch (error) {
    console.log(error)
    if (error instanceof AxiosError) {
      throw Error(error?.response?.data?.message || MESSAGE.sys.unknownError)
    }
    throw Error(MESSAGE.sys.unknownError)
  }
}

export {
  handleGetProfileInfo,
  handleLogin,
  handleUpdateAvatar,
  handleUpdatePassword,
}
