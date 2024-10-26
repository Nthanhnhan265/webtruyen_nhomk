"use client"

import axios from 'axios';
import Image from "next/image";
import Navbar from '../../../components/navbar';
import { FaGoogle } from 'react-icons/fa';
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);  // Trạng thái loading
  const router = useRouter();

  // Tải lại username từ localStorage nếu "rememberMe" được bật
  useEffect(() => {
    const savedUsername = localStorage.getItem('username');
    if (savedUsername) {
      setUsername(savedUsername);
      setRememberMe(true);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);  // Bắt đầu loading
    try {
      const response = await axios.post('/api/login', {
        username,
        password,
      });
      if (response.status === 200) {
        setSuccessMessage('Đăng nhập thành công!');
        setErrorMessage('');
        
        // Nếu "rememberMe" được chọn, lưu username vào localStorage
        if (rememberMe) {
          localStorage.setItem('username', username);
        } else {
          localStorage.removeItem('username');
        }

        // Chuyển hướng tới trang chính sau khi đăng nhập thành công
        setTimeout(() => {
          router.push('/dashboard');
        }, 1000);  // Chuyển hướng sau 1 giây
      }
    } catch (error) {
      setErrorMessage('Đăng nhập thất bại, vui lòng kiểm tra lại tài khoản và mật khẩu.');
      setSuccessMessage('');
    } finally {
      setLoading(false);  // Kết thúc loading
    }
  };

  return (
    <>
    <Navbar />
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="bg-white rounded-lg p-6 flex">
        {/* Form Đăng Nhập */}
        <div className="w-96 p-6">
          <h1 className="text-gray-700 text-2xl font-bold mb-6 text-center">Đăng nhập</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700">Tên đăng nhập:</label>
              <input
                type="text"
                className="text-gray-700 w-full mt-2 p-2 border-gray-200 rounded bg-gray-200"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Mật khẩu:</label>
              <input
                type="password"
                className="text-gray-700 w-full mt-2 p-2 border-gray-200 rounded bg-gray-200"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="text-gray-700 flex items-center mb-4">
              <input
                type="checkbox"
                className="mr-2"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label>Ghi nhớ mật khẩu</label>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
              disabled={loading}  // Vô hiệu hóa nút khi đang loading
            >
              {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
            </button>
            {errorMessage && <p className="text-red-500">{errorMessage}</p>} {/* Hiển thị lỗi */}
            {successMessage && <p className="text-green-500">{successMessage}</p>} {/* Hiển thị thành công */}
          </form>
          <div className="flex justify-between mt-4 text-sm text-blue-500">
            <a href="#">Quên mật khẩu?</a>
            <a href="/register">Đăng ký tài khoản</a>
          </div>
          <button className="w-full flex items-center justify-center mt-4 p-2 border rounded text-gray-700 bg-gray-200">
            <FaGoogle className="mr-2" />
            Đăng nhập với Google
          </button>
        </div>
        {/* Hình ảnh */}
        <div>
          <Image
            src=""
            alt="Login Background"
            width={500}
            height={300}
          />
        </div>
      </div>
    </div>
    </>
  );
};

export default Login;
