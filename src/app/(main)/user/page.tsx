"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Lock, Pencil } from "lucide-react"
import UserSidebar from "@/components/user/userSidebar"
import { getUserProfile, UserProfile } from "@/lib/apiUser"

export default function UserPage() {
  const [user, setUser] = useState<UserProfile | null>(null)
  type EditField = "fullName" | "username" | "email" | "birthDate"

  const [editField, setEditField] = useState<EditField | null>(null)
  useEffect(() => {
    async function fetchUser() {
      const data = await getUserProfile()
      setUser(data)
    }

    fetchUser()
  }, [])

  if (!user) return null

  async function handleUpdateProfile(value: string) {
  if (!editField) return

  const token = localStorage.getItem("access_token")

  await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      [editField]: value,
    }),
  })

  const data = await getUserProfile()
  setUser(data)
  setEditField(null)
}

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-25">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 md:grid-cols-[250px_1fr]">
        <UserSidebar />

        <section className="rounded-xl bg-white p-5 shadow">
          <h1 className="mb-6 text-3xl font-bold text-gray-800">
            Hello, {user?.fullName?.split(" ")[0]}
          </h1>

          <div className="overflow-hidden rounded-2xl bg-blue-800 p-6 text-white">
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold">
                    {user.fullName}
                  </h2>

                  <button type="button" onClick={() => setEditField("fullName")}>
                    <Pencil size={16} />
                  </button>
                </div>

                <p className="text-sm">
                  Member Since{" "}
                  {new Date(user.createdAt).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-b-2xl bg-blue-50 p-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <InfoItem
  label="Username"
  value={user.username}
  onEdit={() => setEditField("username")}
/>

<InfoItem
  label="Email"
  value={user.email}
  onEdit={() => setEditField("email")}
/>

<InfoItem
  label="Birth Date"
  value={
    user.birthDate
      ? new Date(user.birthDate).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })
      : "-"
  }
  onEdit={() => setEditField("birthDate")}
/>

              <Link href="/user/account/change-password">
  <button className="flex px-2 h-14 items-center justify-center gap-2 rounded-lg bg-yellow-400 font-bold text-gray-800 shadow-md">
    <Lock size={18} />
    Change Password
  </button>
</Link>
            </div>
          </div>
        </section>
      </div>
      <EditProfileModal
  open={editField !== null}
  field={editField}
  value={editField && user ? String(user[editField] ?? "") : ""}
  onClose={() => setEditField(null)}
  onSubmit={handleUpdateProfile}
/>
    </main>
  )
}

function InfoItem({
  label,
  value,
  onEdit,
}: {
  label: string
  value: string
  onEdit: () => void
}) {
  return (
    <div>
      <div className="mb-1 flex items-center gap-2 text-sm text-gray-500">
        {label}

        <button type="button" onClick={onEdit}>
          <Pencil size={14} className="text-blue-500" />
        </button>
      </div>

      <p className="font-semibold text-gray-800">{value}</p>
    </div>
  )
}

function EditProfileModal({
  open,
  field,
  value,
  onClose,
  onSubmit,
}: {
  open: boolean
  field: "fullName" | "username" | "email" | "birthDate" | null
  value: string
  onClose: () => void
  onSubmit: (value: string) => Promise<void>
}) {
  const [inputValue, setInputValue] = useState(value)

  useEffect(() => {
    setInputValue(value)
  }, [value])

  if (!open || !field) return null

  const labels = {
    fullName: "Full Name",
    username: "Username",
    email: "Email",
    birthDate: "Birth Date",
  }

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/50">
      <div className="w-[90%] max-w-md rounded-2xl bg-white p-6">
        <div className="mb-5 flex items-center justify-between border-b pb-4">
          <h2 className="text-xl font-bold text-gray-800">
            Edit {labels[field]}
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="text-3xl text-gray-500"
          >
            ×
          </button>
        </div>

        <input
          type={field === "birthDate" ? "date" : "text"}
          value={
            field === "birthDate" && inputValue
              ? inputValue.slice(0, 10)
              : inputValue
          }
          onChange={(e) => setInputValue(e.target.value)}
          className="mb-5 w-full rounded-xl border px-4 py-3 outline-none focus:border-blue-800"
          placeholder={labels[field]}
        />

        <button
          type="button"
          onClick={() => onSubmit(inputValue)}
          className="w-full rounded-xl bg-blue-800 py-3 font-semibold text-white"
        >
          Save
        </button>
      </div>
    </div>
  )
}