'use client'
import { Button, Checkbox, Label, TextInput } from 'flowbite-react'
import Link from 'next/link'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { HiMail } from 'react-icons/hi'
import { MdOutlineLockPerson } from 'react-icons/md'
import { RiShieldUserFill } from 'react-icons/ri'
import LABEL from '../../label'
import MESSAGE from '../../message'

interface ILoginForm {
  email: string
  password: string
  rememberMe: boolean
}
interface ILoginAdminProps {
  onSubmit: (form: ILoginForm) => void
}
export default function LoginAdminPage(prop: ILoginAdminProps) {
  //================= Declares vars, hooks ==============//
  const [email, setEmail] = useState('')
  const {
    getValues,
    setValue,
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm<ILoginForm>()
  //=================Handle function ====================//
  const onSubmit = (data: ILoginForm) => {
    console.log(data)
    // prop.onSubmit(data) // Gọi hàm handleSubmit được truyền từ props với dữ liệu form
  }
  /**
   * OnCloseModal: Close login modal
   */
  return (
    <div className="flex justify-center">
      <form
        method="post"
        onSubmit={handleSubmit(onSubmit)}
        className="flex min-w-96 px-16 py-8 mt-8 rounded-md border-b-4 border-[#007AFF]/60 shadow-sm bg-white flex-col gap-4"
      >
        <h1 className="flex font-semibold justify-center text-lg items-center gap-2 uppercase">
          <RiShieldUserFill />
          {LABEL.sys.loginToDashboardLabel}
        </h1>
        <div>
          <div className="mb-2 block">
            <Label
              htmlFor="email"
              value={LABEL.user.emailLabel}
            />
          </div>
          <TextInput
            id="email"
            type="email"
            icon={HiMail}
            placeholder={LABEL.user.enterEmail}
            {...register('email', {
              required: MESSAGE.auth.emailRequired,
            })}
          />
          <div className="h-3 mt-1">
            {errors.email && (
              <p className="text-red-500 text-xs">{errors.email.message}</p>
            )}
          </div>
        </div>
        <div>
          <div className="mb-2 block">
            <Label
              htmlFor="password"
              value={LABEL.user.passwordLabel}
            />
          </div>
          <TextInput
            id="password"
            type="password"
            icon={MdOutlineLockPerson}
            placeholder={LABEL.user.enterPassword}
            {...register('password', {
              required: MESSAGE.auth.passwordRequired,
            })}
          />

          <div className="h-3 mt-1">
            {errors.password && (
              <p className="text-red-500 text-xs">{errors.password.message}</p>
            )}
          </div>
        </div>
        <div className="flex justify-between text-xs items-center gap-2">
          <div className="flex items-center gap-2">
            <Checkbox id="remember" />
            <Label htmlFor="remember">{LABEL.user.checkboxRememerMe}</Label>
          </div>
          <Link
            href={'#'}
            className="text-blue-600 font-bold"
          >
            {LABEL.sys.forgotPasswordLabel}
          </Link>
        </div>
        <Button
          type="submit"
          gradientDuoTone="purpleToBlue"
          className="mx-8 mt-2 shadow-md shadow-black/30"
        >
          {LABEL.sys.loginLabel}
        </Button>
      </form>
    </div>
  )
}
