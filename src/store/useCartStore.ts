"use client"

import { create } from "zustand"
import {
  getCart,
  addToCart,
  updateCartQty,
  removeCartItem,
} from "@/lib/cartApi"
import { Product } from "@/types/product"

type CartItem = {
  cart_id: number
  quantity: number
  dpAmount?: number | null

  product: Product
}

type AddPayload = {
  productId: number
  quantity: number
  dpAmount?: number
}

type CartStore = {
  items: CartItem[]
  subtotal: number
  loading: boolean

  fetchCart: () => Promise<void>

  addItem: (payload: AddPayload) => Promise<void>

  increaseQty: (item: CartItem) => Promise<void>

  decreaseQty: (item: CartItem) => Promise<void>

  removeItem: (cartId: number) => Promise<void>
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  subtotal: 0,
  loading: false,

  fetchCart: async () => {
    try {
      set({ loading: true })

      const data = await getCart()

      set({
        items: data.items,
        subtotal: data.subtotal,
      })
    } catch (error) {
      console.error(error)
    } finally {
      set({ loading: false })
    }
  },

  addItem: async (payload) => {
  try {
    set({ loading: true })

    await addToCart(payload)

    await get().fetchCart()
  } catch (error) {
    console.error(error)
    throw error
  } finally {
    set({ loading: false })
  }
},

  increaseQty: async (item) => {
    try {
      await updateCartQty(item.cart_id, item.quantity + 1)

      await get().fetchCart()
    } catch (error) {
      console.error(error)
    }
  },

  decreaseQty: async (item) => {
    try {
      const newQty = item.quantity - 1

      if (newQty <= 0) {
        await removeCartItem(item.cart_id)
      } else {
        await updateCartQty(item.cart_id, newQty)
      }

      await get().fetchCart()
    } catch (error) {
      console.error(error)
    }
  },

  removeItem: async (cartId) => {
    try {
      await removeCartItem(cartId)

      await get().fetchCart()
    } catch (error) {
      console.error(error)
    }
  },
}))