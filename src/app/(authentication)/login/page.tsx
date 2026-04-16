"use client"
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import {LoginGoogleButton, LoginAppleButton, LoginXButton} from "@/components/platformAuth"
import { FiEye, FiEyeOff } from "react-icons/fi";

const SignInPage = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)

    const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log({ username, password })
  }
  return (
  <div className="min-h-screen flex flex-col items-center">
    <div className="m-5 text-center flex flex-col items-center">
      <Link href="/" className="text-blue-800 hover:bg-gray-100 rounded-sm md:hover:bg-transparent md:p-0">
        <Image src="/webicon.webp" width={128} height={40} alt="logo" priority/>
      </Link>
      <p className="text-2xl text-gray-500">Explore Your Hobby With Us!</p>
    </div>

    <div className="bg-white w-96 mx-auto rounded-sm shadow p-8 mb-5">
      <h1 className="text-4xl font-bold mb-1">Log In</h1>
      <p className="font-medium mb-5 text-gray-500">Log in to your account</p>

      <form onSubmit={handleSubmit} className="mt-5">
        <div className="pb-3 mb-1">
          <p className="text-sm text-gray-500 mb-1">Username</p>
          <input type="text" name="email" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full p-3 rounded-sm bg-stone-50 mb-3" placeholder="Input Username"/>

          <p className="text-sm text-gray-500 mb-1">Password</p>
          <div className="relative">
            <input type={showPassword ? "text" : "password"} name="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-3 rounded-sm bg-stone-50" placeholder="Input your Password"/>
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3 text-sm text-gray-500">
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
          <Link href="/reset" className="text-sm text-blue-800 block text-right hover:underline hover:text-blue-900">Forgot Your Password?</Link>
        </div>
        <button type="submit" className="bg-blue-800 p-3 font-bold text-stone-50 w-full text-center rounded-sm hover:bg-blue-900 mb-3 cursor-pointer">
          Login
        </button>
      </form>

      <p className="text-sm text-gray-500 mb-3 text-center">Or Log in with the following methods</p>
      <div className="grid grid-cols-1 space-y-2">
            <LoginXButton/>
            <LoginGoogleButton/>
            <LoginAppleButton/>
     </div>
     <Link href="/register" className="block text-sm text-blue-800 mt-2 text-center hover:underline hover:text-blue-900">Don't have an account? Click here!</Link>
    </div>
  </div>
)}

export default SignInPage
