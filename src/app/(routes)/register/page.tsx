'use client'

import axios, { AxiosError } from 'axios'
import { Label, TextInput } from 'flowbite-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'
import Navbar from '../../../components/navbar'
import Message from '../../message'
import Footer from '../_component/footer'

// Định nghĩa kiểu cho dữ liệu biểu mẫu
interface FormData {
  username: string
  email: string
  password: string
  confirmPassword: string
}

const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<FormData>() // Sử dụng FormData làm kiểu cho useForm
  const router = useRouter()
  const password = watch('password')
  // Định nghĩa hàm onSubmit với kiểu SubmitHandler của FormData
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const newUserResponse = await axios.post(
        'http://localhost:3000/api/register',
        data,
      )

      if (newUserResponse.status === 201) {
        setTimeout(() => {
          router.push('/login')
        }, 2000)
      }
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        const errorMsg = error.response.data.message
        if (errorMsg.includes('Tên đăng nhập không được quá 50 ký tự.')) {
          setError('username', {
            message: 'Tên đăng nhập không được quá 50 ký tự.',
          })
        } else if (errorMsg.includes('Tên đăng nhập đã tồn tại')) {
          setError('username', { message: Message.auth.nameExists })
        } else if (errorMsg.includes('Email đã tồn tại')) {
          setError('email', { message: Message.auth.emailExists })
        } else {
          setError('username', {
            message: 'Đăng ký thất bại, vui lòng kiểm tra lại thông tin.',
          })
        }
      }
    }
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="bg-white rounded-lg p-6 flex">
          <div className="w-96 p-6">
            <h1 className="text-gray-700 text-2xl font-bold mb-6 text-center">
              Đăng ký
            </h1>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <Label
                  htmlFor="username"
                  value="Tên đăng nhập:"
                  className="block text-gray-700 text-base"
                />
                <TextInput
                  id="username"
                  type="text"
                  {...register('username', {
                    required: 'Tên đăng nhập là bắt buộc',
                    maxLength: {
                      value: 50,
                      message: 'Tên đăng nhập không được quá 50 ký tự',
                    },
                  })}
                  className="text-gray-700 w-full mt-2"
                />
                {errors.username && (
                  <p className="text-red-500 mt-1 text-sm">
                    {errors.username.message}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <Label
                  htmlFor="email"
                  value="Email:"
                  className="block text-gray-700 text-base"
                />
                <TextInput
                  id="email"
                  type="email"
                  {...register('email', {
                    required: 'Email là bắt buộc',
                    maxLength: {
                      value: 50,
                      message: 'Email không được quá 50 ký tự',
                    },
                  })}
                  className="text-gray-700 w-full mt-2"
                />
                {errors.email && (
                  <p className="text-red-500 mt-1 text-sm">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <Label
                  htmlFor="password"
                  value="Mật khẩu:"
                  className="block text-gray-700 text-base"
                />
                <TextInput
                  id="password"
                  type="password"
                  {...register('password', {
                    required: 'Mật khẩu là bắt buộc',
                    maxLength: {
                      value: 50,
                      message: 'Mật khẩu không được quá 50 ký tự',
                    },
                    pattern: {
                      value:
                        /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
                      message: 'Mật khẩu phải có chữ hoa, số, ký tự đặc biệt',
                    },
                  })}
                  className="text-gray-700 w-full mt-2"
                />
                {errors.password && (
                  <p className="text-red-500 mt-1 text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <Label
                  htmlFor="confirmPassword"
                  value="Nhập lại mật khẩu:"
                  className="block text-gray-700 text-base"
                />
                <TextInput
                  id="confirmPassword"
                  type="password"
                  {...register('confirmPassword', {
                    required: 'Xác nhận mật khẩu là bắt buộc',
                    validate: (value) =>
                      value === password || 'Mật khẩu xác nhận không khớp.',
                  })}
                  className="text-gray-700 w-full mt-2"
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 mt-1 text-sm">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
              <button
                type="submit"
                className={`w-full p-2 rounded ${
                  isSubmitting
                    ? 'bg-gray-400'
                    : 'bg-blue-500 text-white hover:bg-blue-600'
                }`}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Đang đăng ký...' : 'Đăng ký'}
              </button>
            </form>
            <div className="flex justify-between mt-4 text-sm text-blue-500">
              <a href="/login">Đăng nhập</a>
              <a href="#">Quên mật khẩu</a>
            </div>
          </div>
          <div>
            <Image
              src="/images/anhnen.jpg"
              alt="Register Background"
              width={400}
              height={300}
            />
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  )
}

export default Register
