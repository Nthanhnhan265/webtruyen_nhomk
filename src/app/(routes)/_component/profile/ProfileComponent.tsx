'use client'
import MESSAGE from '@/app/(routes)/dashboard/message'
import { handleUpdateAvatar, handleUpdatePassword } from '@/auth/auth.services'
import formatDate from '@/components/ulti/formatDate'
import useFile from '@/hooks/files/useFile'
import { Avatar, Button, FileInput, HR, Label, TextInput } from 'flowbite-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { IoMail } from 'react-icons/io5'
import { LuPencilLine } from 'react-icons/lu'
import { MdCancel } from 'react-icons/md'
import { PiMountainsFill } from 'react-icons/pi'
import { TfiSave } from 'react-icons/tfi'
import { toast } from 'react-toastify'
import LABEL from '../../../label'
export default function ProfileComponent(props: {
  accessToken: string
  username: string
  email: string
  role: number
  createdAt: string
  avatar: string
}) {
  //========================= DECLARE VARS, HOOKS ======================//
  const [imageErrors, setImageErrors] = useState<boolean>(false)

  const [avatarFile, setAvatarFile] = useState()
  const { validateFile, error } = useFile({
    maxSizeMB: 5,
    allowedTypes: ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'],
  })
  const profileForm = useForm<IProfilePasswordChange>()
  useEffect(() => {
    if (error) {
      toast.error(error)
    }
  }, [error])

  //========================= HANDLE FUNCTIONS ===========================//
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
  /** HANDLE SAVE AVATAR */
  /**
   *
   * @returns
   */
  const handleSaveAvatar = async () => {
    try {
      if (!avatarFile) {
        toast.error('Bạn chưa chọn ảnh nào để cập nhật!')
        return
      }

      // Gọi API lưu avatar
      const avatarUrl = await handleUpdateAvatar(props.accessToken, avatarFile)
      toast.success('Cập nhật ảnh thành công!')

      console.log('Avatar mới:', avatarUrl)
    } catch (error: any) {
      toast.error(error.message || 'Có lỗi xảy ra trong quá trình lưu.')
    }
  }

  /** HANDLE UPLOAD FILE AND VALIDATION
   * Thực thi thay đổi file và xác minh định dạng, size, kiểu file
   * @param event
   * @returns
   */
  const handleCancelUpload = () => {
    setAvatarFile(undefined)
    setImageErrors(false)
    const input = document.getElementById('avatar') as HTMLInputElement
    if (input) {
      input.value = ''
    }
  }

  /** HANDLE SUBMIT CHANGING PASSWORD
   * sửa mật khẩu
   *
   */
  const onSubmit = async (data: IProfilePasswordChange) => {
    try {
      const message = await handleUpdatePassword(
        props.accessToken,
        data.currentPassword,
        data.newPassword,
        data.confirmPassword,
      )
      toast.success(message)
      profileForm.reset()
    } catch (error: any) {
      toast.error(error.message || 'Có lỗi xảy ra!')
    }
  }

  //======================== RENDER COMPONENTS ==========================//
  return (
    <>
      {/* Nội dung chính */}
      <div className="ml-0 flex-1 mt-16 px-3 md:px-5 lg:px-10 ">
        {/* Thông tin tài khoản */}
        <h2
          className={`border-l-2 ${
            props.role === 1 ? 'border-blue-600' : 'border-red-600'
          } ps-5 py-1.5 text-black/80 text-xl`}
        >
          Thông tin tài khoản
        </h2>
        <div className="mt-3 mb-6 bg-white pt-5 shadow-md rounded-lg">
          {/* avatar and other */}
          <div className="flex justify-between items-center px-3 md:px-8">
            <div className="flex items-center gap-2  lg:gap-5">
              {/* show avatar */}

              {!imageErrors &&
                (props.avatar && !avatarFile ? (
                  <Avatar
                    rounded
                    img={'http://localhost:3000/' + props.avatar}
                    alt="avatar"
                    className="object-cover"
                  />
                ) : (
                  avatarFile && (
                    <Avatar
                      img={URL.createObjectURL(avatarFile)}
                      alt="avatar"
                      className="object-cover"
                      rounded
                    />
                  )
                ))}
              {/* Show username */}
              <div className=" text-md">
                <span className="font-light uppercase">{props.username}</span>
                <span className="block text-xs font-light opacity-80">
                  {LABEL.sys.joinedAt} {formatDate(props.createdAt)}
                </span>
              </div>
            </div>
            {/* Upload file */}
            <div className="flex gap-2">
              <div>
                <label
                  htmlFor="avatar"
                  className={`flex items-center justify-center px-4 py-2 rounded-lg cursor-pointer ${
                    props.role === 1
                      ? 'bg-blue-500 hover:bg-blue-600'
                      : 'bg-red-500 hover:bg-red-600'
                  } text-white focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                    props.role === 1
                      ? 'focus:ring-blue-500'
                      : 'focus:ring-red-500'
                  } 
                  ${avatarFile ? 'hidden' : ''}
                  `}
                >
                  <PiMountainsFill className="me-2 mt-0.5" />
                  Chọn ảnh
                </label>

                <FileInput
                  id="avatar"
                  className="hidden"
                  onChange={handleFileChange}
                  disabled={avatarFile ? true : false}
                  accept="image/png, image/jpeg, image/webp"
                />
              </div>
              <div className={!avatarFile ? 'hidden' : ''}>
                <Button
                  gradientMonochrome="success"
                  onClick={handleSaveAvatar}
                >
                  <TfiSave className="mt-0.5 me-2" />
                  {LABEL.sys.save}
                </Button>
              </div>
              <div className={!avatarFile ? 'hidden' : ''}>
                <Button
                  gradientMonochrome="failure"
                  onClick={handleCancelUpload}
                >
                  <MdCancel className="mt-0.5 me-2" />
                  {LABEL.sys.cancel}
                </Button>
              </div>
            </div>
          </div>
          <HR className="mx-2 mt-8 mb-4 opacity-90" />
          <div className="md:grid grid-cols-2  md:items-start pb-0 lg:pb-20 px-3 md:px-8">
            <ul className="text-black/60">
              <li className="flex gap-2 items-center">
                <IoMail />
                <span className="font-light">Email:</span>{' '}
                <span className="italic text-md">{props.email}</span>
              </li>
            </ul>
            <div className="w-full justify-end flex">
              <Button
                className="mt-8 mb-8 md:mt-2 bg-gray-200 hover:bg-gray-300"
                color="text-black"
              >
                <LuPencilLine className="mt-1 mr-2" /> Thay đổi
              </Button>
            </div>
          </div>
        </div>
        {/* Thay đổi mật khẩu */}
        <h2
          className={`border-l-2 ${
            props.role === 1 ? 'border-blue-600' : 'border-red-600'
          } ps-5 py-1.5 text-black/80 text-xl mt-10`}
        >
          Thay đổi mật khẩu
        </h2>
        <div className="mt-3 mb-6 bg-white pt-5 shadow-md rounded-lg">
          <form
            onSubmit={profileForm.handleSubmit(onSubmit)}
            noValidate
            className="px-3 md:px-8 flex flex-col md:flex-row pb-10 md:pb-20"
          >
            <div className="flex flex-col gap-4 w-full md:w-1/2 mt-4">
              {/* Mật khẩu cũ */}
              <div className="md:flex items-center gap-4">
                <Label
                  className="basis-1/3"
                  htmlFor="current-password"
                  value="Mật khẩu hiện tại:"
                />
                <div className="w-full">
                  <TextInput
                    id="current-password"
                    type="password"
                    required
                    className="w-full"
                    sizing="sm"
                    {...profileForm.register('currentPassword', {
                      required: 'Mật khẩu hiện tại là bắt buộc',
                    })}
                  />
                  {profileForm.formState.errors.currentPassword && (
                    <p className="text-red-500 text-xs ms-1/3">
                      {profileForm.formState.errors.currentPassword.message}
                    </p>
                  )}
                </div>
              </div>
              {/* Mật khẩu mới */}
              <div className="md:flex items-center gap-4">
                <Label
                  className="basis-1/3"
                  htmlFor="new-password"
                  value="Mật khẩu mới:"
                />
                <div className="w-full">
                  <TextInput
                    id="new-password"
                    type="password"
                    required
                    className="w-full"
                    sizing="sm"
                    {...profileForm.register('newPassword', {
                      required: 'Mật khẩu mới là bắt buộc',
                      minLength: {
                        value: 6,
                        message: 'Mật khẩu mới phải có ít nhất 6 ký tự',
                      },
                      validate: (value) => {
                        if (
                          !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/.test(
                            value,
                          )
                        ) {
                          return MESSAGE.user.passwordStrength
                        }
                        return true
                      },
                    })}
                  />
                  {profileForm.formState.errors.newPassword && (
                    <p className="text-red-500 text-xs">
                      {profileForm.formState.errors.newPassword.message}
                    </p>
                  )}
                </div>
              </div>
              {/* Xác nhận mật khẩu */}
              <div className="md:flex items-center gap-4">
                <Label
                  className="basis-1/3"
                  htmlFor="confirm-password"
                  value="Xác nhận mật khẩu:"
                />
                <div className="w-full">
                  <TextInput
                    id="confirm-password"
                    type="password"
                    required
                    className="w-full"
                    sizing="sm"
                    {...profileForm.register('confirmPassword', {
                      required: 'Vui lòng xác nhận mật khẩu',
                      validate: (value) =>
                        value === profileForm.watch('newPassword') ||
                        'Mật khẩu xác nhận không khớp',
                    })}
                  />

                  {profileForm.formState.errors.confirmPassword && (
                    <p className="text-red-500 text-xs">
                      {profileForm.formState.errors.confirmPassword.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="w-full md:w-1/2 flex justify-end items-start md:mb-32">
              <Button
                className="mt-6 md:mt-0 bg-gray-200 hover:bg-gray-300"
                color="text-black"
                type="submit"
              >
                <LuPencilLine className="mt-1 mr-2" /> Thay đổi
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
