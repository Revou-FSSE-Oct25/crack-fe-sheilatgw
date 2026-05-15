"use client"

import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { apiFetch } from "@/lib/api"

export default function ChangePasswordPage() {
  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showOld, setShowOld] = useState(false)
  const [showNew, setShowNew] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    try {
      setLoading(true)

      const token = localStorage.getItem("access_token")

      await apiFetch("/user/me/change-password", {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          currentPassword: oldPassword,
          newPassword,
          confirmPassword,
        }),
      })

      alert("Password berhasil diubah. Silakan login kembali.")

      localStorage.removeItem("access_token")
      window.location.href = "/login"
    } catch (error) {
      alert(error instanceof Error ? error.message : "Gagal ubah password")
    } finally {
      setLoading(false)
    }
  }

  return (
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-6 text-4xl font-bold text-gray-800">
          Change Password
        </h1>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl bg-white p-10 shadow"
        >
          <div className="mx-auto flex max-w-xl flex-col gap-5">
            <PasswordInput
              label="Old Password"
              value={oldPassword}
              show={showOld}
              onChange={setOldPassword}
              onToggle={() => setShowOld((prev) => !prev)}
            />

            <PasswordInput
              label="New Password"
              value={newPassword}
              show={showNew}
              onChange={setNewPassword}
              onToggle={() => setShowNew((prev) => !prev)}
            />

            <PasswordInput
              label="Confirm New Password"
              value={confirmPassword}
              show={showConfirm}
              onChange={setConfirmPassword}
              onToggle={() => setShowConfirm((prev) => !prev)}
            />

            <div className="mx-auto mt-2 w-full max-w-sm rounded-2xl bg-blue-50 px-6 py-4 text-center text-sm italic text-blue-900">
              Setelah kata sandi diubah, silakan masuk kembali dengan kata
              sandi baru
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mx-auto mt-1 w-full max-w-sm rounded-xl bg-blue-800 py-4 text-3xl font-bold text-white disabled:opacity-60"
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
  )
}

function PasswordInput({
  label,
  value,
  show,
  onChange,
  onToggle,
}: {
  label: string
  value: string
  show: boolean
  onChange: (value: string) => void
  onToggle: () => void
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-xl text-gray-700">{label}</span>

      <div className="flex h-14 items-center rounded-xl border border-gray-700 bg-white px-4">
        <input
          type={show ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-full flex-1 outline-none"
          required
        />

        <button type="button" onClick={onToggle}>
          {show ? <EyeOff size={24} /> : <Eye size={24} />}
        </button>
      </div>
    </label>
  )
}