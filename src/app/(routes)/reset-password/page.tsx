// src/app/login/page.tsx

import { Button, Label, TextInput } from 'flowbite-react'
import { useForm } from 'react-hook-form'
import { HiMail } from 'react-icons/hi'
import { RiMailSendLine, RiShieldUserFill } from 'react-icons/ri'
import LABEL from '../dashboard/label'
interface IForgotForm {
  email: string
}
const ForgotPassword = () => {
  //================= Declares vars, hooks ==============//
  const {
    // getValues,
    // setValue,
    // register,
    formState: { errors },
    // reset,
    handleSubmit,
  } = useForm<IForgotForm>()
  //=================Handle function ====================//
  /**
   *
   * @param data
   */
  const onSubmit = (data: IForgotForm) => {
    console.log(data)
  }
  //=================Render page=========================//
  return (
    <div className="flex justify-center">
      <form
        method="post"
        onSubmit={handleSubmit(onSubmit)}
        className="flex min-w-96 px-10 py-8 mt-20 rounded-md border-t border-l border-r border-b-4 border-[#007AFF]/60 shadow-xl bg-white flex-col gap-4"
      >
        <h1 className="flex font-semibold justify-center text-lg items-center gap-2 uppercase">
          <RiShieldUserFill />
          {LABEL.sys.resetPassword}
          <hr />
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
            className=""
            // {...register('email', {
            //   required: MESSAGE.auth.emailRequired,
            // })}
          />
          <div className="h-3 mt-1">
            {/* {errors.email && (
              <p className="text-red-500 text-xs">{errors.email.message}</p>
            )} */}
          </div>
        </div>
        <Button
          type="submit"
          gradientDuoTone="purpleToBlue"
          className="shadow-md shadow-black/30 mx-14"
        >
          <RiMailSendLine className="mt-0.5 me-3" />
          {LABEL.sys.send}
        </Button>
      </form>
    </div>
  )
}

export default ForgotPassword
