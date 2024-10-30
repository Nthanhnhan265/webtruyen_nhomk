"use client";

import axios, { AxiosError } from "axios";
import Image from "next/image";
import Navbar from "../../../components/navbar";
import Message from "../../message";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button, Label, TextInput } from "flowbite-react";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Trạng thái lỗi riêng cho từng trường
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false); // Trạng thái loading
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setUsernameError("");
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");

    // Kiểm tra tính hợp lệ của mật khẩu
    if (password !== confirmPassword) {
      setConfirmPasswordError(Message.auth.passwordNotMatch);
      setLoading(false); // Kết thúc trạng thái loading
      return;
    }

    try {
      // Kiểm tra tính duy nhất của username
      

      

      // Tiến hành đăng ký
      const newUserResponse = await axios.post("http://localhost:3000/api/register", {
        username,
        email,
        password,
        confirmPassword,
      });

      if (newUserResponse.status === 201) {
        setSuccessMessage(Message.auth.createSusses);
        setTimeout(() => {
          router.push("/login"); // Chuyển hướng đến trang đăng nhập sau khi đăng ký thành công
        }, 2000);
      }
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        const errorMsg = error.response.data.message;

        if (errorMsg.includes("Tên đăng nhập đã tồn tại")) {
          setUsernameError(Message.auth.nameExists);
        } else if (errorMsg.includes("Email đã tồn tại")) {
          setEmailError(Message.auth.emailExists);
        } else if (errorMsg.includes("Mật khẩu không chính xác")) {
          setPasswordError("Mật khẩu không chính xác");
        } else {
          setUsernameError("Đăng ký thất bại, vui lòng kiểm tra lại thông tin.");
        }
      } else {
        setUsernameError("Đăng ký thất bại, vui lòng kiểm tra lại thông tin.");
      }
    } finally {
      setLoading(false); // Kết thúc trạng thái loading
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="bg-white rounded-lg p-6 flex">
          <div className="w-96 p-6">
            <h1 className="text-gray-700 text-2xl font-bold mb-6 text-center">
              Đăng ký
            </h1>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <Label
                  htmlFor="username"
                  value="Tên đăng nhập:"
                  className="block text-gray-700 text-base"
                />
                <TextInput
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="text-gray-700 w-full mt-2"
                  required
                />
                {usernameError && <p className="text-red-500 mt-1 text-sm">{usernameError}</p>}
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="text-gray-700 w-full mt-2"
                  required
                />
                {emailError && <p className="text-red-500 mt-1 text-sm">{emailError}</p>}
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="text-gray-700 w-full mt-2"
                  required
                />
                {passwordError && <p className="text-red-500 mt-1 text-sm">{passwordError}</p>}
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
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="text-gray-700 w-full mt-2"
                  required
                />
                {confirmPasswordError && <p className="text-red-500 mt-1 text-sm">{confirmPasswordError}</p>}
              </div>
              <button
                type="submit"
                className={`w-full p-2 rounded ${loading ? 'bg-gray-400' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
                disabled={loading} // Vô hiệu hóa nút khi đang loading
              >
                {loading ? 'Đang đăng ký...' : 'Đăng ký'}
              </button>
              {successMessage && (
                <p className="text-green-500 mt-2 text-base">{successMessage}</p>
              )}
            </form>
            <div className="flex justify-between mt-4 text-sm text-blue-500">
              <a href="/login">Đăng nhập</a>
              <a href="#">Quên mật khẩu</a>
            </div>
          </div>
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
