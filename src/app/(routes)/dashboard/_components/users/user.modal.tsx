'use client'
import {
  Button,
  FileInput,
  Label,
  Modal,
  Select,
  TextInput,
} from 'flowbite-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { HiOutlineExclamationCircle } from 'react-icons/hi'
import { IoIosImages } from 'react-icons/io'
import { toast } from 'react-toastify'
import LABEL from '../../label'
import MESSAGE from '../../message'

//============User's modal============//
//============CREAT, UPDATE===========//
interface IModalProps {
  isOpenModal: boolean
  handleSubmit: (form: FormData, id?: number) => void
  closeModal: () => void
  user?: IUser | null
  isEdit?: boolean
}

function UserModal(prop: IModalProps) {
  // ===================== Declare hooks, variables ==================//
  const [avatarFile, setAvatarFile] = useState<any>()
  const [imageErrors, setImageErrors] = useState<Boolean>(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    reset,
  } = useForm<IDashboardUserForm>()

  // Đặt dữ liệu cho form trong trường hợp thêm mới và chỉnh sửa
  useEffect(() => {
    if (prop.isEdit && prop.user) {
      setValue('username', prop.user.username || '')
      setValue('email', prop.user.email || '')
      setValue('status', prop.user.status === true ? 'true' : 'false')
      setValue('role_id', prop.user.role_id)
      // setValue('avatar', prop.user.avatar)
    } else {
      reset({
        username: '',
        email: '',
        status: 'true',
        role_id: 1,
      })
    }
  }, [prop.isEdit, prop.user, reset, setValue])
  console.log(imageErrors)
  // Hiện password và confirm password nếu là thêm mới và ẩn nếu chỉnh sửa
  const passwordRegister = !prop.isEdit
    ? register('password', {
        minLength: {
          value: 6,
          message: MESSAGE.user.passwordStrength,
        },
        validate: (value) => {
          if (
            prop.isEdit &&
            !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/.test(value)
          ) {
            return MESSAGE.user.passwordStrength
          }
          return true
        },
      })
    : {}
  const confirmPasswordRegister = !prop.isEdit
    ? register('confirmPassword', {
        validate: (value) => {
          if (value !== getValues('password')) {
            return MESSAGE.user.passwordsNotMatch
          }
          return true
        },
      })
    : {}

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
      toast.error(MESSAGE.user.uploadError)
      return false
    }
    if (!validFormats.includes(file.type)) {
      toast.error(MESSAGE.user.formatError)
      return false
    }
    if (file.size > maxSize) {
      toast.error(MESSAGE.user.sizeError)
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
      setImageErrors(false)
      setAvatarFile(file)
    }
  }
  /** HANDLE CLEAR DATA ON MODAL
   * Đóng modal và xóa dữ liệu
   */
  const clearModal = () => {
    prop.closeModal()
    setAvatarFile('')
    setImageErrors(false)
    reset()
  }

  /** HANLDE SUBMIT FORM
   *
   * @param data
   * @returns
   */
  const onSubmit = (data: IDashboardUserForm) => {
    console.log('submit clicked', data)
    /*
      Trường hợp không có avatar và không chọn file thì chặn lại
    */
    if (!prop.user?.avatar && !validateFile(avatarFile)) {
      return
    }
    const formData = new FormData()
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value)
    })
    //Tạo người dùng:
    /*
      admin điền các thông tin và chọn hình ảnh, sau đó ấn submit, 
      lấy thông tin user và hình ảnh avatar cho vào đối tượng formData và gửi lên server
    */
    if (!prop.isEdit) {
      formData.append('avatar', avatarFile)
    }
    // Chỉnh sửa người dùng
    /*
      admin sửa những thông tin cần sửa như bình thường 
      - trường hợp đổi ảnh avatar thì làm như việc tạo người dùng mới - cho file vào đối tượng formData 
      - trường hợp không đổi ảnh avatar thì giữ nguyên đường dẫn cũ
      */
    else {
      if (avatarFile) {
        formData.append('avatar', avatarFile)
      } else if (prop.user?.avatar) {
        formData.append('avatar', prop.user?.avatar)
      }
    }
    prop.handleSubmit(formData, prop.user?.id)
    // console.log(formData.get('avatar'))
    // console.log(formData.getAll)
    // const formDataObject = Object.fromEntries(formData.entries())
    // console.log(formDataObject) // In ra toàn bộ dữ liệu dưới dạng object
    // console.log(formData.entries())
  }
  //=================== Render component =====================//
  return (
    <Modal
      show={prop.isOpenModal}
      onClose={prop.closeModal}
      size="5xl"
      position="top-center"
    >
      <Modal.Header>
        {prop.isEdit ? LABEL.user.editLabel : LABEL.user.createLabel}
      </Modal.Header>

      <form
        className="gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Modal.Body className="md:grid grid-cols-2 gap-4">
          <div className="col-span-1 space-y-4">
            {/* Username Field */}
            <div>
              <Label
                htmlFor="username"
                value={LABEL.user.usernameLabel}
              />
              <TextInput
                id="username"
                type="text"
                {...register('username', {
                  required: MESSAGE.user.usernameRequired,
                  validate: (value) => {
                    if (!/^[^\W_]+$/.test(value)) {
                      return MESSAGE.user.usernameSpecialChars
                    }
                    return true
                  },
                })}
              />
              <div className="h-3">
                {errors.username && (
                  <p className="text-red-500 text-xs">
                    {errors.username.message}
                  </p>
                )}
              </div>
            </div>
            {/* Email Field */}
            <div>
              <Label
                htmlFor="email"
                value={LABEL.user.emailLabel}
              />
              <TextInput
                id="email"
                type="email"
                {...register('email', {
                  required: MESSAGE.user.emailRequired,
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: MESSAGE.user.emailRequired,
                  },
                })}
              />
              <div className="h-3">
                {errors.email && (
                  <p className="text-red-500 text-xs">{errors.email.message}</p>
                )}
              </div>
            </div>
            {/* Password Field */}
            {!prop.isEdit && (
              <>
                <div>
                  <Label
                    htmlFor="password"
                    value={LABEL.user.passwordLabel}
                  />
                  <TextInput
                    id="password"
                    type="password"
                    {...passwordRegister}
                  />
                  <div className="h-3">
                    {errors.password && (
                      <p className="text-red-500 text-xs">
                        {errors.password.message}
                      </p>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
          {/* Second Column */}
          <div className="grid grid-cols-3 gap-x-1 col-span-1 space-y-4">
            <div className="col-span-2 space-y-4">
              {/* Role Selection */}
              <div className="max-w-md">
                <Label
                  htmlFor="role_id"
                  value={LABEL.user.roleLabel}
                />
                <Select
                  id="role_id"
                  {...register('role_id', {
                    required: MESSAGE.user.roleNotFound,
                  })}
                >
                  <option value="1">{LABEL.sys.role.admin}</option>
                  <option value="2">{LABEL.sys.role.user}</option>
                </Select>

                <div className="h-3">
                  {errors.role_id && (
                    <p className="text-red-500 text-xs">
                      {errors.role_id.message}
                    </p>
                  )}
                </div>
              </div>
              {/* Status Selection */}
              <div className="max-w-md">
                <Label
                  htmlFor="status"
                  value={LABEL.user.statusLabel}
                />
                <Select
                  id="status"
                  {...register('status', {
                    required: MESSAGE.user.statusNotFound,
                  })}
                >
                  <option value="true">{LABEL.sys.statusAccount.active}</option>
                  <option value="false">
                    {LABEL.sys.statusAccount.banned}
                  </option>
                </Select>
                <div className="h-3">
                  {errors.status && (
                    <p className="text-red-500 text-xs">
                      {errors.status.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
            {/* Avatar Upload */}
            <div className="col-span-1 flex items-center relative overflow-hidden">
              {!imageErrors &&
                (prop.user?.avatar && !avatarFile ? (
                  <Image
                    src={'http://localhost:3000/' + prop.user.avatar}
                    alt="avatar"
                    width={400}
                    height={400}
                    className="absolute w-full h-auto z-[1]"
                    onError={() => {
                      setImageErrors(true)
                    }}
                  />
                ) : (
                  avatarFile && (
                    <Image
                      src={URL.createObjectURL(avatarFile)}
                      alt="avatar"
                      width={400}
                      height={400}
                      className="absolute w-full h-auto z-[1]"
                    />
                  )
                ))}
              <Label
                htmlFor="avatar"
                className="flex group w-full h-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed  gap-1 z-10 bg-gray-500/20 hover:backdrop-brightness-50 transition-all duration-200"
              >
                {/* border-gray-300 bg-gray-50 hover:bg-gray-100 */}
                <IoIosImages className="text-lg group-hover:text-white duration-300" />
                <p className="mb-2 text-sm group-hover:text-white duration-300">
                  {LABEL.user.avatarLabel}
                </p>
                <FileInput
                  id="avatar"
                  className="hidden"
                  name="avatar"
                  accept="image/png, image/webp, image/jpg"
                  // {...register('avatar', {})}
                  onChange={handleFileChange}
                />
                {errors.avatar && (
                  <p style={{ color: 'red' }}>{errors.avatar.message}</p>
                )}
              </Label>
            </div>

            {/* Confirm Password Field */}
            {!prop.isEdit && (
              <>
                <div className="col-span-3">
                  <Label
                    htmlFor="confirmPassword"
                    value={LABEL.user.confirmPassLabel}
                  />
                  <TextInput
                    id="confirmPassword"
                    type="password"
                    {...confirmPasswordRegister}
                  />
                  <div className="h-3">
                    {errors.confirmPassword && (
                      <p className="text-red-500 text-xs">
                        {errors.confirmPassword.message}
                      </p>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </Modal.Body>

        {/* Modal Footer */}
        <Modal.Footer className="justify-end">
          <Button
            type="submit"
            color="blue"
          >
            {LABEL.sys.save}
          </Button>
          <Button
            color="gray"
            onClick={clearModal}
          >
            {LABEL.sys.cancel}
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  )
}

//============DELETE=================//
interface IDModalProps {
  isOpenDModal: number
  closeDModal: () => void
  onDelete: (id: number) => void
}
function UserDModal(prop: IDModalProps) {
  return (
    <>
      {/* <Button onClick={prop.openDModal}>Toggle modal</Button> */}
      <Modal
        show={prop.isOpenDModal != -1}
        size="md"
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              {MESSAGE.user.confirmDelete}
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                color="failure"
                onClick={() => prop.onDelete(prop.isOpenDModal)}
              >
                {LABEL.sys.confirm}
              </Button>
              <Button
                color="gray"
                onClick={prop.closeDModal}
              >
                {LABEL.sys.cancel}
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}

export { UserDModal, UserModal }
