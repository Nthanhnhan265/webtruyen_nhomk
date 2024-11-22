import React, { useEffect, useState } from 'react'

interface FormErrors {
  author_name?: string
  description?: string
  slug?: string
}

interface AuthorModalProps {
  show: boolean // Indicates whether the modal is visible
  onClose: () => void // Function to call when closing the modal
  onSuccess: (data: {
    author_name: string
    description: string
    slug: string
  }) => void // Function to call on successful author creation
}

const AuthorModal: React.FC<AuthorModalProps> = ({
  show,
  onClose,
  onSuccess,
}) => {
  const [author_name, setAuthorName] = useState('')
  const [description, setDescription] = useState('')
  const [slug, setSlug] = useState('')
  const [errors, setErrors] = useState<FormErrors>({}) // Store errors for each field

  // Reset form fields and errors when modal is opened
  useEffect(() => {
    if (show) {
      setAuthorName('')
      setDescription('')
      setSlug('')
      setErrors({})
    }
  }, [show])

  // Validate form data
  const validateForm = () => {
    let isValid = true
    const formErrors: FormErrors = {}

    // Validate author name
    if (!author_name) {
      formErrors.author_name = 'Bạn không được để trống tên tác giả.'
      isValid = false
    } else if (
      author_name.length < 1 ||
      author_name.length > 255 ||
      /[^a-zA-Z0-9\sàáạảãâầấậẩẫèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữđ]/.test(
        author_name,
      )
    ) {
      formErrors.author_name =
        'Vui lòng nhập tên tác giả hợp lệ (1 - 255 ký tự và không chứa ký tự đặc biệt).'
      isValid = false
    }

    // Validate URL (slug)
    if (!slug) {
      formErrors.slug = 'Bạn không được để trống URL.'
      isValid = false
    } else if (slug.length < 1 || slug.length > 255) {
      formErrors.slug = 'Vui lòng nhập URL hợp lệ (1 - 255 ký tự).'
      isValid = false
    }

    // Validate description (optional, but must be less than 500 characters)
    if (
      !description.trim() || // Check if empty
      description.length > 500 || // Check if too long
      /[^a-zA-Z0-9\sàáạảãâầấậẩẫèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữđ]/.test(description) // Check for invalid characters
    ) {
      formErrors.description = 'Vui lòng nhập mô tả hợp lệ (1 - 500 ký tự, không chứa ký tự đặc biệt).';
      isValid = false;
    }


    setErrors(formErrors)
    return isValid
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // If validation fails, do not proceed
    if (!validateForm()) return

    // Call the onSuccess prop with form data if validation passes
    onSuccess({ author_name, description, slug })
  }

  // Handle cancel action
  const handleCancel = () => {
    onClose()
  }
  const generateSlug = (name: string) => {
    return name
      .normalize('NFD')
      .toLowerCase() // Convert to lowercase
      .trim() // Remove leading and trailing spaces
      .replace(/[^\w\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-'); // Avoid multiple consecutive hyphens
  };
  // Return null if modal is not visible
  if (!show) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg w-1/2">
        <h2 className="text-xl font-bold mb-4">Thêm Tác Giả</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2">Tên tác giả</label>
            <input
              value={author_name}
              onChange={(e) => {
                setAuthorName(e.target.value)
                setSlug(generateSlug(e.target.value))
              }}
              className={`w-full p-2 border ${errors.author_name ? 'border-red-500' : 'border-gray-300'
                } rounded`}
              placeholder="Nhập tên tác giả"
            />
            {errors.author_name && (
              <p className="text-red-500">{errors.author_name}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block mb-2">URL</label>
            <input
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className={`w-full p-2 border ${errors.slug ? 'border-red-500' : 'border-gray-300'
                } rounded`}
              placeholder="tac-gia/..."
            />
            {errors.slug && <p className="text-red-500">{errors.slug}</p>}
          </div>
          <div className="mb-4">
            <label className="block mb-2">Mô tả</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={`w-full p-2 border ${errors.description ? 'border-red-500' : 'border-gray-300'
                } rounded`}
              rows={5}
              placeholder="Mô tả không vượt quá 500 ký tự"
            ></textarea>
            {errors.description && (
              <p className="text-red-500">{errors.description}</p>
            )}
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleCancel}
              className="bg-red-500 text-white px-4 py-2 rounded mr-2"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Lưu
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AuthorModal
