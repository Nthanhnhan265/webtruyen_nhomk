"use client";

import axios, { AxiosError } from "axios";
import Image from "next/image";
import Navbar from "../../../components/navbar";
import Message from "../../message";
import { FaGoogle } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const savedUsername = localStorage.getItem("username");
    if (savedUsername) {
      setUsername(savedUsername);
      setRememberMe(true);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setUsernameError("");
    setPasswordError("");

    try {
      const response = await axios.post("http://localhost:3000/api/login", {
        username,
        password,
      });

      if (response.status === 200) {
        const { token } = response.data;
        localStorage.setItem("token", token);

        if (rememberMe) {
          localStorage.setItem("username", username);
        } else {
          localStorage.removeItem("username");
        }

        setTimeout(() => {
          router.push("/dashboard");
        }, 1000);
      }
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        const errorMsg = error.response.data.message;

        if (errorMsg === "Tên đăng nhập không tồn tại") {
          setUsernameError(Message.auth.nameError);
        } else if (errorMsg === "Mật khẩu không chính xác") {
          setPasswordError("Mật khẩu không chính xác");
        } else {
          setUsernameError(
            "Đăng nhập thất bại, vui lòng kiểm tra lại thông tin."
          );
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="bg-white rounded-lg p-6 flex">
          {/* Form Đăng Nhập */}
          <div className="w-96 p-6">
            <h1 className="text-gray-700 text-2xl font-bold mb-6 text-center">
              Đăng nhập
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
                  className="text-gray-700 w-full  "
                  required
                />
                {usernameError && (
                  <p className="text-red-500">{usernameError}</p>
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="text-gray-700 w-full"
                  required
                />
                {passwordError && (
                  <p className="text-red-500">{passwordError}</p>
                )}
              </div>
              <div className="text-gray-700 flex items-center gap-2 mb-4 ">
                <Checkbox
                  id="rememberMe"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className=" checked:bg-blue-500 focus-visible:outline-none"
                />
                <Label htmlFor="rememberMe">Ghi nhớ mật khẩu</Label>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                disabled={loading} // Vô hiệu hóa nút khi đang loading
              >
                {loading ? "Đang đăng nhập..." : "Đăng nhập"}
              </button>
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
              src="/anhnenlogin.png"
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
