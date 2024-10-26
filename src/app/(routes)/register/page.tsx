"use client"
import axios from 'axios';
import Image from "next/image";
import Navbar from '../../../components/navbar';
import { useState } from "react";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage("Mật khẩu và xác nhận mật khẩu không khớp!");
      return;
    }
    try {
      const response = await axios.post('http://localhost:3000/api/register', {
        username,
        email,
        password,
      });
      if (response.status === 200) {
        // Hiển thị thông báo thành công
        setSuccessMessage('Đăng ký thành công!');
        setErrorMessage('');
      }
    } catch (error) {
      setErrorMessage('Đăng ký thất bại, vui lòng thử lại.');
    }
  };

  return (
    <>
    <Navbar />
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="bg-white rounded-lg p-6 flex">
        {/* Form Đăng Ký */}
        <div className="w-96 p-6">
          <h1 className="text-gray-700 text-2xl font-bold mb-6 text-center">Đăng ký</h1>
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
              <label className="block text-gray-700">Email:</label>
              <input
                type="email"
                className="text-gray-700 w-full mt-2 p-2 border-gray-200 rounded bg-gray-200"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
            <div className="mb-4">
              <label className="block text-gray-700">Nhập lại mật khẩu:</label>
              <input
                type="password"
                className="text-gray-700 w-full mt-2 p-2 border-gray-200 rounded bg-gray-200"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
              Đăng ký
            </button>
            {errorMessage && <p className="text-red-500">{errorMessage}</p>} {/* Hiển thị lỗi */}
            {successMessage && <p className="text-green-500">{successMessage}</p>} {/* Hiển thị thành công */}
          </form>
          <div className="flex justify-between mt-4 text-sm text-blue-500">
            <a href="/login">Đăng nhập</a>
            <a href="#">Quên mật khẩu</a>
          </div>
        </div>
        {/* Hình ảnh */}
        <div>
          <Image
            src="/anhnenlogin.png"
            alt="Register Background"
            width={500}
            height={300}
          />
        </div>
      </div>
    </div>
    </>
  );
};

export default Register;
