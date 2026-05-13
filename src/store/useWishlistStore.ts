import { create } from "zustand"
import { apiClient } from "@/lib/apiClient"
import { Product } from "@/types/product"

type WishlistItem = {
  wishlist_id: number
  userId: number
  productId: number
  product?: Product
  createdAt: string
}

type WishlistStore = {
  items: WishlistItem[]
  loading: boolean

  fetchWishlist: () => Promise<void>
  addWishlist: (productId: number) => Promise<void>
  removeWishlist: (productId: number) => Promise<void>
}

export const useWishlistStore = create<WishlistStore>((set, get) => ({
  items: [],
  loading: false,

  fetchWishlist: async () => {
    try {
      set({ loading: true })

      const data = await apiClient("/wishlist")

      set({ items: data })
    } catch (error) {
      console.error(error)
    } finally {
      set({ loading: false })
    }
  },

  addWishlist: async (productId) => {
    await apiClient("/wishlist", {
      method: "POST",
      body: JSON.stringify({ productId }),
    })

    await get().fetchWishlist()
  },

  removeWishlist: async (productId) => {
    await apiClient(`/wishlist/${productId}`, {
      method: "DELETE",
    })

    await get().fetchWishlist()
  },
}))