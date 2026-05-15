"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Calendar } from "lucide-react"
import { RegisterAppleButton, RegisterGoogleButton, RegisterXButton,} from "@/components/platformAuth"
import { apiFetch } from "@/lib/api"

function RegisterPage() {
  const router = useRouter()

  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    username: "",
    password: "",
    birthDate: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      await apiFetch("/auth/register", {
        method: "POST",
        body: JSON.stringify({
          fullName: form.fullName,
          email: form.email,
          username: form.username,
          password: form.password,
          birthDate: form.birthDate,
        }),
      })

      router.push("/login")
    } catch (err: any) {
      setError(err.message || "Register failed")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-white">
      <div className="m-5 text-center flex flex-col items-center">
        <Link
          href="/"
          className="text-blue-800 hover:bg-gray-100 rounded-sm md:hover:bg-transparent md:p-0"
        >
          <Image
            src="/webicon.webp"
            width={128}
            height={40}
            alt="logo"
            priority
          />
        </Link>

        <p className="text-2xl text-gray-500">
          Let&apos;s Start Your Hobby Journey!
        </p>
      </div>

      <div className="bg-white w-96 max-w-[90%] mx-auto rounded-sm shadow p-8 mb-5">
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <p className="text-sm text-red-500 text-center">{error}</p>
          )}

          <div>
            <label className="block text-gray-500 mb-2">Full Name</label>
            <input
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              required
              className="w-full h-10 border border-gray-300 rounded-sm px-4 outline-none focus:border-blue-800"
            />
          </div>

          <div>
            <label className="block text-gray-500 mb-2">Email</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full h-10 border border-gray-300 rounded-sm px-4 outline-none focus:border-blue-800"
            />
          </div>

          <div>
            <label className="block text-gray-500 mb-2">Username</label>
            <input
              name="username"
              value={form.username}
              onChange={handleChange}
              required
              className="w-full h-10 border border-gray-300 rounded-sm px-4 outline-none focus:border-blue-800"
            />
          </div>

          <div>
            <label className="block text-gray-500 mb-2">Password</label>

            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={handleChange}
                required
                className="w-full h-10 border border-gray-300 rounded-sm px-4 pr-12 outline-none focus:border-blue-800"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-black"
              >
                {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-gray-500 mb-2">Birth Date</label>

            <div className="relative">
              <input
                name="birthDate"
                type="date"
                value={form.birthDate}
                onChange={handleChange}
                required
                className="w-full h-10 border border-gray-300 rounded-sm px-4 outline-none focus:border-blue-800"
              />

              <Calendar
                size={20}
                className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 bg-blue-800 text-white font-bold rounded-sm mt-6 disabled:opacity-60"
          >
            {isLoading ? "Registering..." : "Register"}
          </button>
        </form>
        <Link href="/login" className="block text-sm text-blue-800 mt-2 text-center hover:underline hover:text-blue-900">
          Already have an account? Click here!
        </Link>
      </div>
    </div>
  )
}

export default RegisterPage