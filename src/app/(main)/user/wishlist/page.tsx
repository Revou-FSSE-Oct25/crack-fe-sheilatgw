"use client"

import { useEffect } from "react"
import WishlistCard from "@/components/wishlistCard"
import { useWishlistStore } from "@/store/useWishlistStore"

export default function WishlistPage() {
  const items = useWishlistStore((state) => state.items)

  const fetchWishlist = useWishlistStore(
    (state) => state.fetchWishlist
  )

  useEffect(() => {
    fetchWishlist()
  }, [fetchWishlist])

  return (
    <div className="max-w-7xl mx-auto p-20">
      <h1 className="mb-6 text-3xl font-bold text-gray-800">
        My Wishlist
      </h1>

      <div className="grid bg-white max-w-7xl p-5 rounded-lg grid-cols-5 gap-6 border border-gray-300">
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