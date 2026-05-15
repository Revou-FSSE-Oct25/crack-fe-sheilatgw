"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { apiFetch } from "@/lib/api"

const menus = [
  {
    title: "My Hobby Journey",
    items: [
      {
        label: "Wishlist",
        href: "/user/account/wishlist",
      },
      {
        label: "Order History",
        href: "/user/account/history",
      },
    ],
  },

  {
    title: "Account Information",
    items: [
      {
        label: "Account Info",
        href: "/user",
      },
      {
        label: "Address Book",
        href: "/user/account/address",
      },
      {
        label: "Change Password",
        href: "/user/account/change-password",
      },
    ],
  },
]

type User = {
  fullName: string
}

export default function UserSidebar() {
  const pathname = usePathname()

  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    async function fetchProfile() {
      try {
        const token = localStorage.getItem("access_token")

        const data = await apiFetch("/user/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        setUser(data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchProfile()
  }, [])

  return (
    <aside className="h-fit rounded-xl bg-white shadow">
      <div className="p-4">
        <h2 className="text-sm font-semibold text-gray-800">
          {user?.fullName || "Loading..."}
        </h2>
      </div>

      {menus.map((menu) => (
        <div key={menu.title} className="border-t mx-4 border-gray-300">
          <h3 className="p-4 text-sm font-bold text-gray-700">
            {menu.title}
          </h3>

          <nav className="flex flex-col pb-3">
            {menu.items.map((item) => {
              const active = pathname === item.href

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "px-4 py-3 text-sm font-semibold transition-colors",

                    active
                      ? "bg-blue-100 text-blue-600"
                      : "text-gray-600 hover:bg-gray-100",
                  )}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>
        </div>
      ))}
    </aside>
  )
}