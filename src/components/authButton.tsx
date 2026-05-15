"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
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

const fullDisplayName = isAdmin
  ? user?.name
  : user?.fullName

const subtitle = isAdmin
  ? "admin"
  : user?.username
  if (loading) return null

  function handleLogout() {
    localStorage.removeItem("access_token")
    localStorage.removeItem("role")
    
    useCartStore.setState({ items: [], subtotal: 0 })

    setOpen(false)
    router.push("/login")
    router.refresh()
  }
console.log("ROLE:", role)
console.log("USER:", user)
  if (isLoggedIn) {
    return (
      <div className="relative hidden md:block">
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="py-2 text-sm text-blue-800 md:p-0"
        >
          Hello, {displayName}!
        </button>

        {open && (
          <div className="absolute right-0 top-full mt-4 w-64 rounded-md border border-gray-200 bg-white shadow-lg z-50">
            <div className="absolute -top-2 right-8 h-4 w-4 rotate-45 border-l border-t border-gray-200 bg-white" />

            <div className="p-4">
              <p className="font-semibold text-gray-900">
                {fullDisplayName}
              </p>

              <p className="mt-1 text-sm text-gray-500">
                {subtitle}
              </p>

              <button
                type="button"
                onClick={handleLogout}
                className="mt-4 w-full rounded-sm bg-red-500 py-2 text-sm font-semibold text-white hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <a
      href="/login"
      className="hidden md:block py-2 text-sm text-blue-800 md:p-0 hover:underline"
    >
      Sign In
    </a>
  )
}