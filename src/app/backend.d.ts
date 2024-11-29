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
interface Genre {
  id?: number
  genre_name: string
  description: string
  slug: string
}
interface IReview {
  user_id: number
  story_id: number
  star: number
  comment: string
  created_at: string
  User: {
    username: string
  }
  Story: {
    story_id: number
    story_name: string
  }
  [key: string]: unknown
}
interface IAuthor {
  id?: number
  author_name: string
  description: string
  slug: string
  created_at?: string
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
interface StoryError {
  storyName: string
  keywords: string
  description: string
  authorId: string
  status: string
  coverFile: string
  selectedCategories: string
  slug: string
}
