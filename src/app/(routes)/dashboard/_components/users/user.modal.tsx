'use client'
import {
  Button,
  FileInput,
  Label,
  Modal,
  Select,
  TextInput,
} from 'flowbite-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { HiOutlineExclamationCircle } from 'react-icons/hi'
import LABEL from '../../label'
import MESSAGE from '../../message'

//============User's modal============//
//============CREAT, UPDATE===========//
interface IModalProps {
  isOpenModal: boolean
  handleSubmit: (form: IDashboardUserForm, id?: number) => void
  closeModal: () => void
  user?: IUser | null
  isEdit?: boolean
}

function UserModal(prop: IModalProps) {
  // ============Declare hooks, variables =====================//
  const [avatarFile, setAvatarFile] = useState<File>()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    reset,
  } = useForm<IDashboardUserForm>()

  // Fill out the form with the value when editing
  useEffect(() => {
    if (prop.user && prop.isEdit) {
      // Fill form fields with existing user data when editing
      setValue('username', prop.user.username)
      setValue('email', prop.user.email)
      setValue('status', prop.user.status)
      setValue('role_id', prop.user.role_id)
    } else {
      reset() // Reset form when creating new
    }
  }, [prop.user, prop.isEdit])

  // Validate file upload
  const validateFile = (file: File) => {
    const maxSize = 5 * 1024 * 1024 // 5MB
    const validFormats = ['image/jpeg', 'image/png', 'image/webp']

    if (!file) {
      return MESSAGE.user.uploadError // No file selected
    }

    if (!validFormats.includes(file.type)) {
      return MESSAGE.user.formatError // Invalid format
    }

    if (file.size > maxSize) {
      return MESSAGE.user.sizeError // File too large
    }

    return true // File valid
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files
    if (fileList && fileList.length > 0) {
      const file = fileList[0]
      setAvatarFile(file)
    }
  }

  const clearModal = () => {
    prop.closeModal()
    reset()
  }

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
        onSubmit={handleSubmit((data) =>
          prop.handleSubmit(data, prop.user?.id),
        )}
      >
        <Modal.Body className="grid grid-cols-2 gap-4">
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
              {errors.username && (
                <p className="text-red-500 text-xs">
                  {errors.username.message}
                </p>
              )}
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
              {errors.email && (
                <p className="text-red-500 text-xs">{errors.email.message}</p>
              )}
            </div>

            {/* Password Field */}
            {!prop.isEdit && (
              <div>
                <Label
                  htmlFor="password"
                  value={LABEL.user.passwordLabel}
                />
                <TextInput
                  id="password"
                  type="password"
                  {...register('password', {
                    required: MESSAGE.user.passwordRequired,
                    minLength: {
                      value: 6,
                      message: MESSAGE.user.passwordStrength,
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
                {errors.password && (
                  <p className="text-red-500 text-xs">
                    {errors.password.message}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Second Column */}
          <div className="col-span-1 space-y-4">
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
              {errors.role_id && (
                <p className="text-red-500 text-xs">{errors.role_id.message}</p>
              )}
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
                <option value="1">{LABEL.sys.statusAccount.active}</option>
                <option value="0">{LABEL.sys.statusAccount.banned}</option>
              </Select>
              {errors.status && (
                <p className="text-red-500 text-xs">{errors.status.message}</p>
              )}
            </div>

            {/* Avatar Upload */}
            <div className="col-span-1 flex items-end">
              <Label
                htmlFor="dropzone-file"
                className="flex w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100"
              >
                <div className="flex flex-col items-center justify-center pb-5 pt-5">
                  <svg
                    className="mb-4 h-8 w-8 text-gray-500"
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
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5A5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500">
                    {LABEL.user.avatarLabel}
                  </p>
                  {!avatarFile ||
                    (validateFile(avatarFile) !== true && (
                      <p className="text-red-500 text-xs">
                        {validateFile(avatarFile)}
                      </p>
                    ))}
                </div>
                <FileInput
                  id="dropzone-file"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </Label>
            </div>

            {/* Confirm Password Field */}
            {!prop.isEdit && (
              <div className="col-span-3">
                <Label
                  htmlFor="confirmPassword"
                  value={LABEL.user.confirmPassLabel}
                />
                <TextInput
                  id="confirmPassword"
                  type="password"
                  {...register('confirmPassword', {
                    required: MESSAGE.user.passwordRequired,
                    validate: (value) => {
                      if (value !== getValues('password')) {
                        return MESSAGE.user.passwordsNotMatch
                      }
                      return true
                    },
                  })}
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-xs">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            )}
          </div>
        </Modal.Body>

        {/* Modal Footer */}
        <Modal.Footer>
          <Button
            color="gray"
            onClick={clearModal}
          >
            {LABEL.sys.cancel}
          </Button>
          <Button
            type="submit"
            color="blue"
          >
            {LABEL.sys.save}
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  )
}

// interface IModalProps {
//   isOpenCModal: boolean
//   handleSumit: (from: IDashboardUserForm, id?: number) => void
//   closeCModal: () => void
//   handleCreateSubmit: (form: IDashboardUserForm) => void
//   user?: IUser
//   isEdit?: boolean
// }

// function UserModal(prop: IModalProps) {
//   // ============Declare hooks, variables =====================//
//   const [avatarFile, setAvatarFile] = useState<File>()

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     setValue,
//     getValues,
//     reset,
//   } = useForm<IDashboardUserForm>()
//   //fill out the form with the value
//   useEffect(() => {
//     if (prop.user) {
//       setValue('username', prop.user.username)
//       setValue('email', prop.user.email)
//       setValue('status', prop.user.status)
//       setValue('role_id', prop.user.role_id)
//     } else {
//       reset() // Reset lại form khi tạo mới
//     }
//   }, [prop.user, prop.isEdit])

//   //==============Handle others function=======================//
//   const validateFile = (file: File) => {
//     const maxSize = 5 * 1024 * 1024 // 5MB
//     const validFormats = ['image/jpeg', 'image/png', 'image/webp']

//     if (!file) {
//       return MESSAGE.user.uploadError // Không chọn file
//     }

//     if (!validFormats.includes(file.type)) {
//       return MESSAGE.user.formatError // Định dạng không hợp lệ
//     }

//     if (file.size > maxSize) {
//       return MESSAGE.user.sizeError // Kích thước quá lớn
//     }

//     return true // Hợp lệ
//   }
//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const fileList = event.target.files
//     // console.log(fileList[0].name)
//     console.log('called')
//     if (fileList && fileList.length > 0) {
//       const file = fileList[0]
//       setAvatarFile(file)
//     }
//   }

//   const clearModal = () => {
//     console.log('called when user closed modal, cleared data')
//     prop.closeCModal()
//     reset()
//   }

//   return (
//     <>
//       <Modal
//         show={prop.isOpenCModal}
//         onClose={prop.closeCModal}
//         size="5xl"
//         position="top-center"
//       >
//         <Modal.Header>
//           {prop.user ? LABEL.user.editLabel : LABEL.user.createLabel}
//         </Modal.Header>
//         <form
//           className="gap-4"
//           onSubmit={handleSubmit(prop.handleCreateSubmit)}
//         >
//           <Modal.Body className="grid grid-cols-2 gap-4">
//             <div className="col-span-1 space-y-4">
//               {/* Username Field */}
//               <div>
//                 <Label
//                   htmlFor="username"
//                   value={LABEL.user.usernameLabel}
//                 />
//                 <TextInput
//                   id="username"
//                   type="text"
//                   placeholder=""
//                   {...register('username', {
//                     required: MESSAGE.user.usernameRequired,
//                     validate: (value) => {
//                       if (!/^[^\W_]+$/.test(value)) {
//                         return MESSAGE.user.usernameSpecialChars
//                       }
//                       return true
//                     },
//                   })}
//                 />
//                 <div>
//                   {errors.username && (
//                     <p className="text-red-500 text-xs">
//                       {errors.username.message}
//                     </p>
//                   )}
//                 </div>
//               </div>

//               {/* Email Field */}
//               <div>
//                 <Label
//                   htmlFor="email"
//                   value={LABEL.user.emailLabel}
//                 />
//                 <TextInput
//                   id="email"
//                   type="email"
//                   placeholder=""
//                   {...register('email', {
//                     required: MESSAGE.user.emailRequired,
//                     pattern: {
//                       value: /^\S+@\S+$/i,
//                       message: MESSAGE.user.emailRequired,
//                     },
//                   })}
//                 />
//                 <div>
//                   {errors.email && (
//                     <p className="text-red-500 text-xs">
//                       {errors.email.message}
//                     </p>
//                   )}
//                 </div>
//               </div>

//               {/* Password Field */}
//               <div>
//                 <Label
//                   htmlFor="password"
//                   value={LABEL.user.passwordLabel}
//                 />
//                 <TextInput
//                   id="password"
//                   type="password"
//                   {...register('password', {
//                     required: MESSAGE.user.passwordRequired,
//                     minLength: {
//                       value: 6,
//                       message: MESSAGE.user.passwordStrength,
//                     },
//                     validate: (value) => {
//                       if (
//                         !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/.test(
//                           value,
//                         )
//                       ) {
//                         return MESSAGE.user.passwordStrength
//                       }
//                       return true
//                     },
//                   })}
//                 />
//                 {errors.password && (
//                   <p className="text-red-500 text-xs">
//                     {errors.password.message}
//                   </p>
//                 )}
//               </div>
//             </div>

//             {/* Second Column */}
//             <div className="space-y-2 grid grid-cols-3 gap-2 me-1">
//               <div className="col-span-2 space-y-4">
//                 {/* Role Selection */}
//                 <div className="max-w-md">
//                   <Label
//                     htmlFor="role_id"
//                     value={LABEL.user.roleLabel}
//                   />
//                   <Select
//                     id="role_id"
//                     {...register('role_id', {
//                       required: MESSAGE.user.roleNotFound,
//                     })}
//                   >
//                     <option value="1">{LABEL.sys.role.admin}</option>
//                     <option value="2">{LABEL.sys.role.user}</option>
//                   </Select>
//                   <div>
//                     {errors.role_id && (
//                       <p className="text-red-500 text-xs">
//                         {errors.role_id.message}
//                       </p>
//                     )}
//                   </div>
//                 </div>

//                 {/* Status Selection */}
//                 <div className="max-w-md">
//                   <Label
//                     htmlFor="status"
//                     value={LABEL.user.statusLabel}
//                   />
//                   <Select
//                     id="status"
//                     {...register('status', {
//                       required: MESSAGE.user.statusNotFound,
//                     })}
//                   >
//                     <option value="1">{LABEL.sys.statusAccount.active}</option>
//                     <option value="0">{LABEL.sys.statusAccount.banned}</option>
//                   </Select>
//                   <div>
//                     {errors.status && (
//                       <p className="text-red-500 text-xs">
//                         {errors.status.message}
//                       </p>
//                     )}
//                   </div>
//                 </div>
//               </div>

//               {/* Avatar Upload */}

//               <div className="col-span-1 flex items-end ">
//                 <Label
//                   htmlFor="dropzone-file"
//                   className="flex w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100"
//                 >
//                   <div className="flex flex-col items-center justify-center pb-5 pt-5">
//                     <svg
//                       className="mb-4 h-8 w-8 text-gray-500"
//                       aria-hidden="true"
//                       xmlns="http://www.w3.org/2000/svg"
//                       fill="none"
//                       viewBox="0 0 20 16"
//                     >
//                       <path
//                         stroke="currentColor"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="2"
//                         d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
//                       />
//                     </svg>
//                     <p className="mb-2 text-sm text-center text-gray-500">
//                       <span className="font-semibold">
//                         {LABEL.user.avatarLabel}
//                       </span>
//                     </p>
//                     <div>
//                       {!avatarFile ||
//                         (validateFile(avatarFile) !== true && (
//                           <p className="text-red-500 text-xs">
//                             {validateFile(avatarFile)}
//                           </p>
//                         ))}
//                     </div>
//                   </div>
//                   <FileInput
//                     id="dropzone-file"
//                     className="hidden"
//                     // onChange={handleFileChange}

//                     // {...register('avatar', {
//                     //   validate: {
//                     //     lessThan10MB: (files) =>
//                     //       files[0]?.size < 10000000 || 'Max 10MB',
//                     //     acceptedFormats: (files) =>
//                     //       ['image/jpeg', 'image/png', 'image/gif'].includes(
//                     //         files[0]?.type,
//                     //       ) || 'Only PNG, JPEG e GIF',
//                     //   },
//                     // })}

//                     // required
//                   />
//                 </Label>
//               </div>

//               {/* Confirm Password Field */}
//               <div className="col-span-3">
//                 <Label
//                   htmlFor="confirmPassword"
//                   value={LABEL.user.confirmPassLabel}
//                 />
//                 <TextInput
//                   id="confirmPassword"
//                   type="password"
//                   {...register('confirmPassword', {
//                     required: MESSAGE.user.passwordRequired,
//                     validate: (value) => {
//                       if (value !== getValues('password')) {
//                         return MESSAGE.user.passwordsNotMatch
//                       }
//                       return true
//                     },
//                   })}
//                 />
//                 <div>
//                   {errors.confirmPassword && (
//                     <p className="text-red-500 text-xs">
//                       {errors.confirmPassword.message}
//                     </p>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </Modal.Body>

//           {/* Footer of the Modal */}
//           <Modal.Footer className="justify-end">
//             <Button
//               type="submit"
//               className="font-bold"
//             >
//               {LABEL.sys.save}
//             </Button>
//             <Button
//               color="gray"
//               onClick={() => {
//                 prop.closeCModal()
//                 clearModal()
//               }}
//             >
//               {LABEL.sys.cancel}
//             </Button>
//           </Modal.Footer>
//         </form>
//       </Modal>
//     </>
//   )
// }

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
                onClick={() => prop.closeDModal()}
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
