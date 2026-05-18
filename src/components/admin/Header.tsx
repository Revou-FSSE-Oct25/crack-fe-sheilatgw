"use client"

import { useEffect, useState } from "react"
import { apiFetch } from "@/lib/api"

type Admin = {
  name: string
}

function Header() {
  const [admin, setAdmin] = useState<Admin | null>(null)

  useEffect(() => {
    async function fetchAdmin() {
      try {
        const data = await apiFetch("/admin/me")
        setAdmin(data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchAdmin()
  }, [])

  const adminName = admin?.name || "Admin"

  const initials = adminName
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()

  return (
    <header className="flex h-16 items-center justify-between bg-white px-6 shadow">
      <h1 className="font-semibold">Dashboard</h1>

      <div className="flex items-center gap-3">
        <div className="text-right">
          <p className="text-sm font-semibold text-gray-800">
            {adminName}
          </p>

          <p className="text-xs text-gray-500">
            Admin
          </p>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-800 text-sm font-bold text-white">
          {initials}
        </div>
      </div>
    </header>
  )
}

export default Header