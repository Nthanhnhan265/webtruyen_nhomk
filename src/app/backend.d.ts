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
  id: id | string | undefined
  username: string | undefined
  email: string | undefined
  avatar: string | undefined
}
interface IChapter {
  id: number
  chapter_order: number
  chapter_name: string
  status: boolean
  views: number
  reviews: number
  comments: number
  created_at: string
  published_at: string
  content: string
  slug: string
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
