"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { User, LogOut, LayoutDashboard } from "lucide-react"
import { useAuth } from "@/hooks/useAuth"
import { useCartStore } from "@/store/useCartStore"

export default function AuthButton() {
  const { user, loading, isLoggedIn } = useAuth()
  const [open, setOpen] = useState(false)
  const router = useRouter()

  const role =
    typeof window !== "undefined" ? localStorage.getItem("role") : null

  const isAdmin = role === "admin"

  const displayName = isAdmin
    ? user?.name
    : user?.fullName?.split(" ")[0]

  const fullDisplayName = isAdmin ? user?.name : user?.fullName
  const subtitle = isAdmin ? "Admin" : user?.username

  if (loading) return null

  function handleLogout() {
    localStorage.removeItem("access_token")
    localStorage.removeItem("role")

    useCartStore.setState({ items: [], subtotal: 0 })

    setOpen(false)
    router.push("/login")
    router.refresh()
  }

  if (!isLoggedIn) {
    return (
      <Link
        href="/login"
        className="hidden md:block py-2 text-sm font-medium text-blue-800 hover:underline md:p-0"
      >
        Sign In
      </Link>
    )
  }

  return (
    <div className="relative hidden md:block">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium text-blue-800 hover:bg-blue-50"
      >
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-800 text-xs font-bold text-white">
          {displayName?.charAt(0)?.toUpperCase()}
        </div>

        <span>Hello, {displayName}!</span>
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-3 w-72 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl">
          <div className="border-b bg-blue-50 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-800 text-sm font-bold text-white">
                {displayName?.charAt(0)?.toUpperCase()}
              </div>

              <div className="min-w-0">
                <p className="truncate font-semibold text-gray-900">
                  {fullDisplayName}
                </p>
                <p className="truncate text-sm text-gray-500">
                  {subtitle}
                </p>
              </div>
            </div>
          </div>

          <div className="p-2">
            <Link
              href={isAdmin ? "/admin" : "/user"}
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100"
            >
              {isAdmin ? <LayoutDashboard size={17} /> : <User size={17} />}
              {isAdmin ? "Admin Dashboard" : "My Account"}
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-semibold text-red-600 hover:bg-red-50"
            >
              <LogOut size={17} />
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  )
}