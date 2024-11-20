'use client'
import useLogin from '@/hooks/users/useLogin'
import { useUserContext } from '@/hooks/users/userUserContext'
import { Button, Checkbox, Label, TextInput } from 'flowbite-react'
import Link from 'next/link'

import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { HiMail } from 'react-icons/hi'
import { MdOutlineLockPerson } from 'react-icons/md'
import { RiShieldUserFill } from 'react-icons/ri'
import { toast } from 'react-toastify'
import LABEL from '../../label'
import MESSAGE from '../../message'
interface ILoginForm {
  email: string
  password: string
  rememberMe: boolean
}

export default function LoginAdminPage() {
  //================= Declares vars, hooks ==============//
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<ILoginForm>()
  const { login, loading } = useLogin()
  const router = useRouter()

  //================= Handle function ====================//
  /** SUBMIT EMAIL AND PASSWORD
   *  Gửi email và password lên api và trả về kết quả
   * @param data
   */
  const onSubmit = async (data: ILoginForm) => {
    try {
      await login(data.email, data.password)
      toast.success(MESSAGE.auth.loginSuccess)
      return router.push('/dashboard')
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message)
      }
    }
  }

  //================= Render page =========================//
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
            value={'userexampl2e@gmail.com'}
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
          disabled={loading}
        >
          {LABEL.sys.loginLabel}
        </Button>
      </form>
    </div>
  )
}
