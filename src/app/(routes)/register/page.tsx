"use client";

import Navbar from "../../../components/navbar";
import Image from "next/image";
import Message from "../../message";
import { useState } from "react";
import { registerUser } from "../../_api/login.api";
import { Button, Label, TextInput } from "flowbite-react";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage(Message.auth.passwordNotMatch);
      return;
    }

    try {
      const newUser = await registerUser({
        username,
        email,
        password,
        confirmPassword,
      });
      if (newUser) {
        setSuccessMessage(Message.auth.createSusses);
        setErrorMessage("");
      }
    } catch (error: any) {
      setErrorMessage(error.message || Message.auth.registrationfailed);
      setSuccessMessage("");
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
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
              >
                Đăng ký
              </button>
              {errorMessage && (
                <p className="text-red-500 mt-2">{errorMessage}</p>
              )}
              {successMessage && (
                <p className="text-green-500 mt-2">{successMessage}</p>
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
