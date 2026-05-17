"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { Heart, History, User, MapPin, Lock } from "lucide-react"
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
        icon: Heart
      },
      {
        label: "Order History",
        href: "/user/account/history",
        icon: History,
      },
    ],
  },

  {
    title: "Account Information",
    items: [
      {
        label: "Account Info",
        href: "/user",
        icon: User,
      },
      {
        label: "Address Book",
        href: "/user/account/address",
        icon: MapPin,
      },
      {
        label: "Change Password",
        href: "/user/account/change-password",
        icon: Lock,
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
    <aside className="hidden md:block h-fit rounded-xl bg-white shadow">
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
              const Icon = item.icon
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 text-sm font-semibold transition-colors",

                    active
                      ? "bg-blue-100 text-blue-600"
                      : "text-gray-600 hover:bg-gray-100",
                  )}
                >
                  <Icon size={17} />
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