interface IUser {
  id: number
  avatar: string
  username: string
  email: string
  role_id: number
  status: boolean
  created_at: string
}

interface IResponse {
  status: number
  success: boolean
  data: any
  message: string
  links: any
}
interface IDashboardUserForm {
  avatar: string
  username: string
  email: string
  password: string
  confirmPassword: string
  role_id: number
  status: string
}
