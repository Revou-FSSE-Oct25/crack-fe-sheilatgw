"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import WishlistCard from "@/components/wishlistCard"
import { useWishlistStore } from "@/store/useWishlistStore"
import { useAuth } from "@/hooks/useAuth"

export default function WishlistPage() {
  const router = useRouter()
  const { isLoggedIn, loading } = useAuth()
  const items = useWishlistStore((state) => state.items)

  const fetchWishlist = useWishlistStore(
    (state) => state.fetchWishlist
  )

  useEffect(() => {
    if (!loading && !isLoggedIn) {
      router.push("/login")
      return
    }
    
    if (!loading && isLoggedIn) {
      fetchWishlist()
    }
  }, [fetchWishlist, loading, isLoggedIn, router])

  return (
    <div className="mx-auto">
      <h1 className="mb-6 text-3xl font-bold text-gray-800">
        My Wishlist
      </h1>

      <div className="grid bg-white max-w-7xl rounded-lg grid-cols-5 gap-6">
        {items.map((item) => {
          if (!item.product) return null
          
          return (
            <WishlistCard
              key={item.wishlist_id}
              product={item.product}
            />
          )
        })}
      </div>
    </div>
  )
}