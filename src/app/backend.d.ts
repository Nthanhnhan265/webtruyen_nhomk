interface IUser {
  id: number
  avatar: string
  username: string
  email: string
  role_id: number
  status: boolean
  created_at: string
}
interface IChapter {
  id: number
  order: number
  name: string
  status: string
  views: number
  reviews: number
  comments: number
  create_at: string
  published_at: string
}
interface IResponse {
  status: number
  success: boolean
  data: any
  message: string
  links: any
}
interface IDashboardUserForm {
  avatar: FileList
  username: string
  email: string
  password: string
  confirmPassword: string
  role_id: number
  status: string
}
