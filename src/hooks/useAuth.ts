"use client"

import { useEffect, useState } from "react"
import { getMe } from "@/lib/auth"

export function useAuth() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem("access_token")
    const role = localStorage.getItem("role")

    if (!token || !role) {
      setLoading(false)
      return
    }

    getMe(token, role)
      .then(setUser)
      .catch(() => {
        localStorage.removeItem("access_token")
        localStorage.removeItem("role")
        setUser(null)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  return {
    user,
    loading,
    isLoggedIn: !!user,
  }
}