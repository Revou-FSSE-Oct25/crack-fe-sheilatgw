"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { BsCart3 } from "react-icons/bs"
import { useAuth } from "@/hooks/useAuth"
import { useCartStore } from "@/store/useCartStore"

export default function CartButton() {
  const router = useRouter()
  const { isLoggedIn, loading } = useAuth()

  const items = useCartStore((state) => state.items)
  const fetchCart = useCartStore((state) => state.fetchCart)

  useEffect(() => {
    if (!loading && isLoggedIn) {
      fetchCart()
    } else if (!loading && !isLoggedIn) {
      useCartStore.setState({ items: [], subtotal: 0 })
    }
  }, [loading, isLoggedIn, fetchCart])

  const cartCount = items.reduce((total, item) => {
    return total + item.quantity
  }, 0)

  const handleClick = () => {
    if (loading) return

    if (!isLoggedIn) {
      router.push("/login")
      return
    }

    router.push("/user/cart")
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="relative block text-blue-800 cursor-pointer"
    >
      <BsCart3 size={25} />

      {cartCount > 0 && (
        <span className="absolute -top-2 -right-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-blue-800 px-1 text-xs font-bold text-white">
          {cartCount}
        </span>
      )}
    </button>
  )
}