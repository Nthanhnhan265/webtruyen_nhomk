interface IUser {
  id: number
  avatar: string
  username: string
  email: string
  Role: {
    id: number
    role_name: string
    description: string
  }
  status: boolean
  created_at: string
}
interface ILoggedinUser {
  id: string | undefined
  username: string | undefined
  email: string | undefined
  avatar: string | undefined
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
interface IAuthor {
  id: number
  author_name: string
  description: string
  slug: string
  created_at: string
}

interface IResponse {
  status: number
  success: boolean
  data: object
  message: string
  links: object
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

interface IProfilePasswordChange {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}
