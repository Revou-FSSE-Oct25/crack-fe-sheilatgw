"use client"

import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { IoMenu, IoClose } from "react-icons/io5"
import {
  Heart,
  History,
  LayoutDashboard,
  Lock,
  LogOut,
  MapPin,
  User,
} from "lucide-react"
import { useAuth } from "@/hooks/useAuth"
import { useCartStore } from "@/store/useCartStore"

export default function Hamburger() {
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

  function handleLogout() {
    localStorage.removeItem("access_token")
    localStorage.removeItem("role")

    useCartStore.setState({ items: [], subtotal: 0 })

    setOpen(false)
    router.push("/login")
    router.refresh()
  }

  if (loading) return null

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="text-2xl md:hidden"
      >
        <IoMenu />
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex flex-col bg-white md:hidden">
          <div className="flex items-center gap-3 border-b border-gray-200 px-4 py-4">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="text-2xl"
            >
              <IoClose />
            </button>

            <p className="text-sm font-medium text-gray-700">
              Account
            </p>
          </div>

          {!isLoggedIn ? (
            <div className="p-4">
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="flex w-full items-center justify-center rounded-xl bg-blue-800 px-4 py-3 text-sm font-semibold text-white"
              >
                Sign In
              </Link>
            </div>
          ) : (
            <>
              <div className="border-b border-gray-200 bg-blue-50 px-4 py-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-800 text-sm font-bold text-white">
                    {displayName?.charAt(0)?.toUpperCase()}
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-gray-900">
                      {fullDisplayName}
                    </p>
                    <p className="truncate text-xs text-gray-500">
                      {subtitle}
                    </p>
                  </div>
                </div>
              </div>

              <nav className="flex flex-col border-b border-gray-200 py-2">
                <Link
                  href={isAdmin ? "/admin" : "/user"}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-100"
                >
                  {isAdmin ? (
                    <LayoutDashboard size={17} />
                  ) : (
                    <User size={17} />
                  )}
                  {isAdmin ? "Admin Dashboard" : "My Account"}
                </Link>

                {!isAdmin && (
                  <>
                    <Link
                      href="/user/account/history"
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <History size={17} />
                      Order History
                    </Link>

                    <Link
                      href="/user/account/address"
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <MapPin size={17} />
                      Address Book
                    </Link>

                    <Link
                      href="/user/account/wishlist"
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <Heart size={17} />
                      Wishlist
                    </Link>

                    <Link
                      href="/user/account/change-password"
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <Lock size={17} />
                      Change Password
                    </Link>
                  </>
                )}
              </nav>

              <button
                type="button"
                onClick={handleLogout}
                className="flex w-full items-center gap-3 px-4 py-4 text-left text-sm font-semibold text-red-600 hover:bg-red-50"
              >
                <LogOut size={17} />
                Log Out
              </button>
            </>
          )}
        </div>
      )}
    </>
  )
}