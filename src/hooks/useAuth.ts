"use client"

import { useEffect, useState } from "react"
import { getMe } from "@/lib/auth"

export function useAuth() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [role, setRole] = useState<string | null>(null)

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("access_token")
      const storedRole = localStorage.getItem("role")

      if (!token || !storedRole) {
        setLoading(false)
        setUser(null)
        setRole(null)
        return
      }

      setRole(storedRole)

      getMe(token, storedRole)
        .then(setUser)
        .catch(() => {
          localStorage.removeItem("access_token")
          localStorage.removeItem("role")
          setUser(null)
          setRole(null)
        })
        .finally(() => {
          setLoading(false)
        })
    }

    checkAuth()

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "access_token" || e.key === "role") {
        checkAuth()
      }
    }

    window.addEventListener("storage", handleStorageChange)
    return () => {
      window.removeEventListener("storage", handleStorageChange)
    }
  }, [])

  return {
    user,
    loading,
    isLoggedIn: !!user,
    role,
  }
}