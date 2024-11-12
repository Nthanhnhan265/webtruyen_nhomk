'use client'

import { Checkbox, Label, TextInput } from 'flowbite-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'
import { FcGoogle } from 'react-icons/fc'
import NavbarComponent from '../../../components/navbar'
import useLogin from '../../../hooks/users/useLogin'
import Footer from '../_component/footer'

// Định nghĩa kiểu cho dữ liệu biểu mẫu
interface FormData {
  email: string
  password: string
  rememberMe: boolean
}

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<FormData>() // Sử dụng FormData làm kiểu cho useForm
  const router = useRouter()
  const { login, loading } = useLogin()
  // Định nghĩa hàm onSubmit với kiểu SubmitHandler của FormData
  const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
    // try {
    //   const response = await axios.post('http://localhost:3000/api/login', {
    //     username,
    //     password,
    //   })

    //   if (response.status === 200) {
    //     const { token } = response.data
    //     localStorage.setItem('token', token)

    //     if (rememberMe) {
    //       localStorage.setItem('username', username)
    //     } else {
    //       localStorage.removeItem('username')
    //     }

    //     setTimeout(() => {
    //       router.push('/')
    //     }, 1000)
    //   }
    // } catch (error) {
    //   if (error instanceof AxiosError && error.response) {
    //     const errorMsg = error.response.data.message

    //     if (errorMsg === 'Tên đăng nhập không tồn tại') {
    //       setError('username', { message: Message.auth.nameError })
    //     } else if (errorMsg === 'Mật khẩu không chính xác') {
    //       setError('password', { message: 'Mật khẩu không chính xác' })
    //     } else {
    //       setError('username', {
    //         message: 'Đăng nhập thất bại, vui lòng kiểm tra lại thông tin.',
    //       })
    //     }
    //   }
    // }
    try {
<<<<<<< HEAD
      const response = await axios.post('http://localhost:3000/api/login', {
        username,
        password,
      })

      if (response.status === 200) {
        const { token } = response.data
        localStorage.setItem('token', token)

        if (rememberMe) {
          localStorage.setItem('username', username)
        } else {
          localStorage.removeItem('username')
        }

        setTimeout(() => {
          router.push('/')
        }, 1000)
      }
=======
      await login(data.email, data.password)
      // toast.success(MESSAGE.auth.loginSuccess)
      console.log('login ok')
      router.push('/')
>>>>>>> origin/dev
    } catch (error) {
      if (error instanceof Error) {
        // toast.error(error.message)
      }
      console.error(error)
    }
  }

  return (
    <>
      <NavbarComponent></NavbarComponent>
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="bg-white rounded-lg p-6 flex">
          {/* Form Đăng Nhập */}
          <div className="w-96 p-6">
            <h1 className="text-gray-700 text-2xl font-bold mb-6 text-center">
              Đăng nhập
            </h1>
            <form onSubmit={handleSubmit(onSubmit)}>
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
                  className="text-gray-700 w-full"
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
                  })}
                  className="text-gray-700 w-full"
                />
                {errors.password && (
                  <p className="text-red-500 mt-1 text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <div className="text-gray-700 flex items-center gap-2 mb-4">
                <Checkbox
                  id="rememberMe"
                  {...register('rememberMe')}
                  className="checked:bg-blue-500 focus-visible:outline-none"
                />
                <Label htmlFor="rememberMe">Ghi nhớ mật khẩu</Label>
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
                {isSubmitting ? 'Đang đăng nhập...' : 'Đăng nhập'}
              </button>
            </form>
            <div className="flex justify-between mt-4 text-sm text-blue-500">
              <a href="#">Quên mật khẩu?</a>
              <a href="/register">Đăng ký tài khoản</a>
            </div>
            <button className="w-full flex items-center justify-center mt-4 p-2 border rounded text-gray-700 bg-gray-200">
              <FcGoogle className="mr-2" />
              Đăng nhập với Google
            </button>
          </div>
          {/* Hình ảnh */}
          <div>
            <Image
              src="/images/anhnen.jpg"
              alt="Login Background"
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

export default Login
