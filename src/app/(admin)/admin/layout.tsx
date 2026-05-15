"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Sidebar from "@/components/admin/sidebar"
import Header from "@/components/admin/Header"
import { useAuth } from "@/hooks/useAuth"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter()
  const { loading, isLoggedIn, role } = useAuth()

  useEffect(() => {
    if (!loading && (!isLoggedIn || role !== "admin")) {
      router.push("/?error=access-denied")
    }
  }, [loading, isLoggedIn, role, router])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    )
  }

  if (!isLoggedIn || role !== "admin") {
    return null
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Header/>
        <main className="flex-1 p-6 bg-gray-100 min-h-screen">
          {children}
        </main>
      </div>
    </div>
  );
}
