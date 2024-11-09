import { getAuthorsName } from '@/app/api/authorService'
import { getAllgenreByName } from '@/app/api/genre.api'
import { createStory } from '@/app/api/story.api'
import { FileInput, Label } from 'flowbite-react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
// In your component where you render StoryModal
const StoryModal = ({ show, onClose, onSuccess }) => {
  if (!show) return null
  const categoriess = [
    { id: 1, name: 'Fantasy' },
    { id: 2, name: 'Science Fiction' },
    { id: 3, name: 'Mystery' },
    { id: 4, name: 'Romance' },
    { id: 5, name: 'Horror' },
    { id: 5, name: 'Horror' },
    { id: 5, name: 'Horror' },
    { id: 5, name: 'Horror' },
    { id: 5, name: 'Horror' },
    { id: 5, name: 'Horror' },
    { id: 5, name: 'Horror' },
    { id: 5, name: 'Horror' },
    { id: 5, name: 'Horror' },
    { id: 5, name: 'Horror' },
    { id: 5, name: 'Horror' },
    { id: 5, name: 'Horror' },
    { id: 5, name: 'Horror' },
  ]

  const [authors, setAuthors] = useState([])
  const [categories, setCategories] = useState([])
  const [error, setError] = useState('')

  // Define state variables for each story attribute
  const [tags, setTags] = useState([]) // State cho tags
  const [status, setStatus] = useState('')
  const [authorId, setAuthorId] = useState('')
  const [description, setDescription] = useState('')
  const [storyName, setStoryName] = useState('')
  const [totalChapters, setTotalChapters] = useState(0)
  const [views, setViews] = useState(0)
  const [cover, setCover] = useState(null)
  const [coverPreview, setCoverPreview] = useState(null)
  const [keywords, setKeywords] = useState('')
  const [slug, setSlug] = useState('')
  const [selectedCategories, setSelectedCategories] = useState([])
  const [showMore, setShowMore] = useState(false) // State for showing more categories
  const [coverFile, setCoverFile] = useState<any>()
  const [imageErrors, setImageErrors] = useState<Boolean>(false)
  const fetchAuthors = async () => {
    try {
      const response = await getAuthorsName()
      const responseGenre = await getAllgenreByName()
      setAuthors(response.data.authors)
      setCategories(responseGenre.data)
      // alert(JSON.stringify(responseGenre))
      console.log(response.data.authors)
    } catch (err) {
      setError('Đã xảy ra lỗi khi lấy dữ liệu.')
    }
  }

  useEffect(() => {
    fetchAuthors()
  }, [])
  // Handle file input change
  //===================== Handle functions =======================//
  /** VALIDATE FILE UPLOADED
   * kiểm tra file ảnh được tải lên có hợp lệ không
   *  @param {File} file - Đối tượng kiểu File
   *  @returns {Boolean}
   * */
  const validateFile = (file: File) => {
    console.log(file)
    const maxSize = 5 * 1024 * 1024
    const validFormats = ['image/jpeg', 'image/png', 'image/webp']
    if (!file) {
      toast.error('MESSAGE.user.uploadError')
      return false
    }
    if (!validFormats.includes(file.type)) {
      toast.error('MESSAGE.user.formatError')
      return false
    }
    if (file.size > maxSize) {
      toast.error('MESSAGE.user.sizeError')
      return false
    }
    return true
  }

  /** HANDLE UPLOAD FILE AND VALIDATION
   * Thực thi thay đổi file và xác minh định dạng, size, kiểu file
   * @param event
   * @returns
   */
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files
    if (fileList && fileList.length > 0) {
      const file = fileList[0]
      if (!validateFile(file)) {
        return
      }
      console.log()
      setCoverFile(file)
    }
  }
  const handleCategoryChange = (event) => {
    const value = String(event.target.value) // Chuyển đổi giá trị thành chuỗi
    setSelectedCategories((prevSelected) => {
      if (prevSelected.includes(value)) {
        return prevSelected.filter((id) => id !== value) // Bỏ chọn
      }
      return [...prevSelected, value] // Chọn
    })
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    // e.preventDefault()
    if (!storyName.trim() || !description.trim() || !slug.trim() || !authorId) {
      toast.error(
        'Các trường tên truyện, mô tả, slug và tác giả không được để trống.',
      )
      return
    }

    // 2. Kiểm tra ký tự đặc biệt
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/ // Thay đổi biểu thức chính quy nếu cần
    if (
      specialCharRegex.test(storyName) ||
      specialCharRegex.test(description) ||
      specialCharRegex.test(slug)
    ) {
      toast.error('Tên truyện, mô tả và slug không được chứa ký tự đặc biệt.')
      return
    }
    if (!validateFile(coverFile)) {
      return
    }
    //status, author_id, description, story_name, total_chapters, views, keywords, slug
    const formData = new FormData()
    formData.append('story_name', storyName)
    formData.append('status', status)
    formData.append('description', description)
    formData.append('author_id', authorId)
    formData.append('total_chapters', `${totalChapters}`)
    formData.append('keywords', keywords)
    formData.append('slug', slug)
    formData.append('cover', coverFile)
    const formDataObject = Object.fromEntries(formData.entries())
    console.log(formDataObject) // In ra toàn bộ dữ liệu dưới dạng object
    await createStory(formData, selectedCategories)

    onClose()
  }

  // On tags changed
  const onTagsChanged = (newTags) => {
    setTags(newTags) // Cập nhật state tags
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Thêm Truyện Mới</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            X
          </button>
        </div>
        <hr className="mb-5" />
        <form onSubmit={(e) => handleSubmit(e)}>
          {/* {line 1} */}
          {/* xs sm md lg */}
          <div className=" lg:flex lg:grid-cols-2 gap-5 mb-4 justify-normal">
            <div className="w-full lg:w-80 me-5">
              {/* {tên truyện} */}
              <div>
                <label className="block text-sm font-medium">Tên Truyện:</label>
                <input
                  type="text"
                  className="w-full border p-2 rounded"
                  value={storyName}
                  onChange={(e) => setStoryName(e.target.value)}
                />
              </div>
              {/* {từ khóa} */}

              <div>
                <label className="block text-sm font-medium">Từ Khóa:</label>
                <input
                  type="text"
                  className="w-full border p-2 rounded"
                  value={keywords}
                  onChange={(e) => setKeywords(e.target.value)}
                />
              </div>
            </div>
            <div className="md:flex w-full">
              <div className="me-10  md:basis-1/2">
                {/* {tác giả id} */}

                <div>
                  <select
                    className="w-full border p-2 rounded"
                    value={authorId}
                    onChange={(e) => setAuthorId(e.target.value)}
                  >
                    <option value="">Chọn tác giả</option>
                    {(Array.isArray(authors) ? authors : []).map((author) => (
                      <option
                        key={author.id}
                        value={author.id}
                      >
                        {author.author_name}
                      </option>
                    ))}
                  </select>
                </div>
                {/* {trạng thái} */}

                <div>
                  <label className="block text-sm font-medium">
                    Trạng Thái:
                  </label>
                  <select
                    className="w-full border p-2 rounded"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="">Chọn trạng thái</option>
                    <option value="ongoing">Đang cập nhật</option>
                    <option value="completed">Hoàn thành</option>
                  </select>
                </div>
              </div>
              <div>
                {/* {ảnh bìa} */}
                <div>
                  <div className="flex w-full items-center justify-center relative">
                    {coverFile && (
                      <Image
                        src={URL.createObjectURL(coverFile)}
                        alt="avatar"
                        width={400}
                        height={400}
                        className="absolute w-full h-full rounded-lg  z-[1]"
                      />
                    )}
                    <Label
                      htmlFor="cover"
                      className="flex z-10 h-40 w-40 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600  dark:hover:border-gray-500 "
                    >
                      <div className="flex flex-col items-center justify-center pb-6 pt-5">
                        <svg
                          className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 16"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                          />
                        </svg>
                        <p className="mb-2 text-center text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-semibold">Click to upload</span>{' '}
                          or drag and drop
                        </p>
                        <p className="text-xs text-center text-gray-500 dark:text-gray-400">
                          SVG, PNG, JPG or GIF (MAX. 800x400px)
                        </p>
                      </div>
                      <FileInput
                        id="cover"
                        className="hidden"
                        accept="image/*"
                        onChange={handleFileChange}
                      />
                    </Label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* {mô tả line 2} */}

          <div className="mb-4">
            <label className="block text-sm font-medium">Mô Tả:</label>
            <textarea
              className="w-full border p-2 rounded"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* {line 3} */}
          <div className="flex grid-cols-2">
            {/* {the loai} */}

            <div className="w-full px-2">
              <label className="block text-sm font-medium">Thể loại</label>
              <div className="max-h-32 overflow-y-auto border border-gray-300 rounded p-2">
                <div className="flex flex-col">
                  {categories
                    .slice(0, showMore ? categories.length : 1)
                    .map((category) => (
                      <div
                        key={category.id}
                        className="flex items-center"
                      >
                        <input
                          type="checkbox"
                          id={category.id}
                          value={category.id}
                          checked={selectedCategories.includes(
                            String(category.id),
                          )} // Chuyển đổi thành chuỗi để so sánh
                          onChange={handleCategoryChange}
                          className="mr-2"
                        />
                        <label
                          htmlFor={category.id}
                          className="text-sm"
                        >
                          {category.genre_name}
                        </label>
                      </div>
                    ))}
                </div>
              </div>
              {/* Toggle button for more categories */}
              {categories.length > 2 && (
                <button
                  type="button"
                  onClick={() => setShowMore(!showMore)}
                  className="mt-2 text-blue-500"
                >
                  {showMore ? 'Ẩn bớt' : 'Xem thêm'}
                </button>
              )}
            </div>
            {/* {slug} */}

            <div className="w-full px-2">
              <label className="block text-sm font-medium">Slug:</label>
              <input
                type="text"
                className="w-full border p-2 rounded"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4"></div>
          <div className="flex justify-end mt-6">
            <button
              type="button"
              className="mr-2 px-4 py-2 bg-red-500 text-white rounded"
              onClick={onClose}
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Lưu
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default StoryModal
